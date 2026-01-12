import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, Lock, ArrowLeft, MessageCircle, Plus, Search, 
  Check, CheckCheck, Sparkles, Users
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  created_at: string;
  last_message_at: string | null;
  other_user?: {
    id: string;
    display_name: string;
  };
  last_message?: string;
  unread_count?: number;
}

interface PrivateMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

interface PublicProfile {
  id: string;
  display_name: string;
  masked_email: string;
}

const PrivateMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PublicProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      markAsRead(selectedConversation.id);
      subscribeToMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchConversations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("private_conversations")
      .select("*")
      .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
      .order("last_message_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      return;
    }

    // Fetch other user profiles
    const otherUserIds = data?.map(c => 
      c.participant_1 === user.id ? c.participant_2 : c.participant_1
    ) || [];

    if (otherUserIds.length > 0) {
      const { data: profiles } = await supabase
        .from("public_profiles")
        .select("id, display_name")
        .in("id", otherUserIds);

      const enrichedConversations = data?.map(conv => {
        const otherId = conv.participant_1 === user.id ? conv.participant_2 : conv.participant_1;
        const otherProfile = profiles?.find(p => p.id === otherId);
        return {
          ...conv,
          other_user: otherProfile || { id: otherId, display_name: "User" }
        };
      }) || [];

      setConversations(enrichedConversations);
    } else {
      setConversations(data || []);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("private_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data || []);
  };

  const markAsRead = async (conversationId: string) => {
    if (!user) return;
    
    await supabase
      .from("private_messages")
      .update({ read_at: new Date().toISOString() })
      .eq("conversation_id", conversationId)
      .neq("sender_id", user.id)
      .is("read_at", null);
  };

  const subscribeToMessages = (conversationId: string) => {
    const channel = supabase
      .channel(`private-messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "private_messages",
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const newMsg = payload.new as PrivateMessage;
          setMessages(prev => [...prev, newMsg]);
          if (newMsg.sender_id !== user?.id) {
            markAsRead(conversationId);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !selectedConversation) return;

    setIsLoading(true);
    const { error } = await supabase.from("private_messages").insert({
      conversation_id: selectedConversation.id,
      sender_id: user.id,
      content: newMessage.trim()
    });

    if (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
      // Update conversation last_message_at
      await supabase
        .from("private_conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", selectedConversation.id);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const searchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const { data, error } = await supabase
      .from("public_profiles")
      .select("id, display_name, masked_email")
      .ilike("display_name", `%${query}%`)
      .neq("id", user?.id)
      .limit(10);

    if (!error && data) {
      setSearchResults(data as PublicProfile[]);
    }
    setIsSearching(false);
  };

  const startConversation = async (otherUserId: string) => {
    if (!user) return;

    // Check if conversation already exists
    const { data: existing } = await supabase
      .from("private_conversations")
      .select("*")
      .or(`and(participant_1.eq.${user.id},participant_2.eq.${otherUserId}),and(participant_1.eq.${otherUserId},participant_2.eq.${user.id})`)
      .single();

    if (existing) {
      setSelectedConversation(existing);
      setIsDialogOpen(false);
      return;
    }

    // Create new conversation
    const { data, error } = await supabase
      .from("private_conversations")
      .insert({
        participant_1: user.id,
        participant_2: otherUserId
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to start conversation");
      return;
    }

    // Fetch the other user's profile
    const { data: profile } = await supabase
      .from("public_profiles")
      .select("id, display_name")
      .eq("id", otherUserId)
      .single();

    const newConv = {
      ...data,
      other_user: profile || { id: otherUserId, display_name: "User" }
    };

    setConversations(prev => [newConv, ...prev]);
    setSelectedConversation(newConv);
    setIsDialogOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/student-chat")} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Private Messages</h1>
                <p className="text-sm text-muted-foreground">End-to-end private conversations</p>
              </div>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full shadow-lg gap-2">
                <Plus className="h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Start a Conversation</DialogTitle>
                <DialogDescription>
                  Search for a student to start a private conversation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      searchUsers(e.target.value);
                    }}
                    className="pl-10 rounded-xl"
                  />
                </div>
                <ScrollArea className="h-64">
                  {isSearching ? (
                    <div className="text-center py-8 text-muted-foreground">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((profile) => (
                        <div
                          key={profile.id}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => startConversation(profile.id)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.display_name}`} />
                            <AvatarFallback>{profile.display_name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{profile.display_name}</p>
                            <p className="text-xs text-muted-foreground">{profile.masked_email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length >= 2 ? (
                    <div className="text-center py-8 text-muted-foreground">No users found</div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Type at least 2 characters to search
                    </div>
                  )}
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Conversations List */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-card to-muted/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-340px)]">
                {conversations.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground mb-2">No conversations yet</p>
                    <Button size="sm" onClick={() => setIsDialogOpen(true)} className="rounded-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Start One
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`flex items-center gap-3 p-4 cursor-pointer transition-all hover:bg-muted/50 ${
                          selectedConversation?.id === conv.id ? "bg-primary/5 border-l-4 border-l-primary" : ""
                        }`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <Avatar className="h-12 w-12 border-2 border-card shadow-sm">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${conv.other_user?.display_name}`} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                            {conv.other_user?.display_name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{conv.other_user?.display_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {conv.last_message_at ? formatDate(conv.last_message_at) : "New conversation"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="md:col-span-2 border-0 shadow-xl overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="pb-3 border-b bg-gradient-to-r from-card to-muted/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedConversation.other_user?.display_name}`} />
                      <AvatarFallback>{selectedConversation.other_user?.display_name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConversation.other_user?.display_name}</CardTitle>
                      <p className="text-xs text-muted-foreground">Private conversation</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      <Lock className="h-3 w-3 mr-1" />
                      Encrypted
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isOwn = message.sender_id === user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
                          >
                            <div className={`max-w-[70%]`}>
                              <div
                                className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                                  isOwn
                                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-tr-sm"
                                    : "bg-card border border-border rounded-tl-sm"
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                              <div className={`flex items-center gap-1 mt-1 ${isOwn ? "justify-end" : ""}`}>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(message.created_at)}
                                </span>
                                {isOwn && (
                                  message.read_at ? (
                                    <CheckCheck className="h-3 w-3 text-primary" />
                                  ) : (
                                    <Check className="h-3 w-3 text-muted-foreground" />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={scrollRef} />
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t bg-card/50">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Type a private message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="rounded-full bg-background"
                      />
                      <Button 
                        onClick={handleSend} 
                        disabled={isLoading || !newMessage.trim()}
                        className="rounded-full px-6 shadow-md"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                    <Lock className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a conversation or start a new one
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)} className="rounded-full">
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivateMessages;