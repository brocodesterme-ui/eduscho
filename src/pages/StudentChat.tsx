import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, Users, Lock, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface PublicProfile {
  id: string;
  display_name: string;
  masked_email: string;
}

const StudentChat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [profiles, setProfiles] = useState<Record<string, PublicProfile>>({});
  const [currentUserProfile, setCurrentUserProfile] = useState<PublicProfile | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMessages();
      fetchCurrentUserProfile();
      const unsubscribe = subscribeToMessages();
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user]);

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

  const fetchCurrentUserProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("public_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (data) {
      setCurrentUserProfile(data as PublicProfile);
    }
  };

  const fetchMessages = async () => {
    const { data: messagesData, error } = await supabase
      .from("student_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100);

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    // Fetch public profiles for all users using the view
    const userIds = [...new Set(messagesData?.map(m => m.user_id) || [])];
    if (userIds.length > 0) {
      const { data: profilesData } = await supabase
        .from("public_profiles")
        .select("id, display_name, masked_email")
        .in("id", userIds);

      const profileMap: Record<string, PublicProfile> = {};
      profilesData?.forEach(p => {
        profileMap[p.id] = p as PublicProfile;
      });
      setProfiles(profileMap);
    }

    setMessages(messagesData || []);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("student-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "student_messages"
        },
        async (payload) => {
          const newMsg = payload.new as Message;
          
          // Fetch profile if not cached
          if (!profiles[newMsg.user_id]) {
            const { data: profile } = await supabase
              .from("public_profiles")
              .select("id, display_name, masked_email")
              .eq("id", newMsg.user_id)
              .single();
            
            if (profile) {
              setProfiles(prev => ({
                ...prev,
                [profile.id]: profile as PublicProfile
              }));
            }
          }
          
          setMessages(prev => [...prev, newMsg]);
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
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);
    const { error } = await supabase.from("student_messages").insert({
      user_id: user.id,
      content: newMessage.trim()
    });

    if (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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

  const getProfile = (userId: string): PublicProfile => {
    return profiles[userId] || { id: userId, display_name: "Student", masked_email: "" };
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.created_at);
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Student Chat</h1>
              <p className="text-muted-foreground">Share notes and ideas with fellow students</p>
            </div>
          </div>
          <Button asChild className="rounded-full shadow-lg">
            <Link to="/messages">
              <Lock className="mr-2 h-4 w-4" />
              Private Messages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat */}
          <Card className="lg:col-span-3 h-[calc(100vh-280px)] flex flex-col border-0 shadow-xl overflow-hidden">
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-card to-muted/30">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Community Chat
                <Badge variant="secondary" className="ml-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Public
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {Object.entries(groupedMessages).map(([date, msgs]) => (
                    <div key={date}>
                      <div className="flex justify-center mb-4">
                        <span className="text-xs text-muted-foreground bg-muted px-4 py-1.5 rounded-full font-medium">
                          {date}
                        </span>
                      </div>
                      {msgs.map((message) => {
                        const isOwn = message.user_id === user?.id;
                        const profile = getProfile(message.user_id);
                        return (
                          <div
                            key={message.id}
                            className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className="h-10 w-10 shrink-0 border-2 border-card shadow-md">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.display_name}`}
                              />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                                {profile.display_name[0]?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`max-w-[70%] ${isOwn ? "text-right" : ""}`}>
                              <div className={`flex items-center gap-2 mb-1 ${isOwn ? "flex-row-reverse" : ""}`}>
                                <span className="text-sm font-semibold">
                                  {isOwn ? "You" : profile.display_name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(message.created_at)}
                                </span>
                              </div>
                              <div
                                className={`rounded-2xl px-4 py-2.5 inline-block text-left shadow-sm ${
                                  isOwn
                                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-tr-sm"
                                    : "bg-card border border-border rounded-tl-sm"
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                      <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-card/50">
                <div className="flex gap-3">
                  <Input
                    placeholder="Type a message..."
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
          </Card>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUserProfile?.display_name || 'U'}`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {currentUserProfile?.display_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{currentUserProfile?.display_name || 'Loading...'}</p>
                    <p className="text-xs text-muted-foreground">{currentUserProfile?.masked_email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                  <Link to="/messages">
                    <Lock className="mr-2 h-4 w-4" />
                    Private Messages
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                  <Link to="/share">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Invite Friends
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChat;