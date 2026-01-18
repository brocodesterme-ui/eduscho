import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, Edit3, Save, X, Users, UserPlus, UserCheck, UserX, 
  Clock, Trophy, BookOpen, MessageCircle, Sparkles, Star,
  GraduationCap, Heart, Send
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Profile {
  id: string;
  display_name: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  class_level: string | null;
  favorite_subjects: string[] | null;
  created_at: string;
}

interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
  created_at: string;
  profile?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
    class_level: string | null;
  };
}

const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", 
  "English", "Hindi", "History", "Geography", "Computer Science"
];

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: "",
    bio: "",
    class_level: "",
    favorite_subjects: [] as string[]
  });
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [friendshipStatus, setFriendshipStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    quizzes: 0,
    correct: 0,
    streak: 0
  });

  const isOwnProfile = !userId || userId === currentUser?.id;
  const profileId = userId || currentUser?.id;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (profileId) {
      fetchProfile();
      fetchFriends();
      fetchStats();
      if (!isOwnProfile && currentUser) {
        checkFriendship();
      }
    }
  }, [profileId, currentUser]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  const fetchProfile = async () => {
    if (!profileId) return;
    setIsLoading(true);

    if (isOwnProfile) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .single();

      if (!error && data) {
        setProfile(data as Profile);
        setEditForm({
          display_name: data.display_name || "",
          bio: data.bio || "",
          class_level: data.class_level || "",
          favorite_subjects: data.favorite_subjects || []
        });
      }
    } else {
      const { data, error } = await supabase
        .from("public_profiles")
        .select("*")
        .eq("id", profileId)
        .single();

      if (!error && data) {
        setProfile({
          id: data.id!,
          display_name: data.display_name || "User",
          email: data.masked_email || "",
          bio: data.bio,
          avatar_url: data.avatar_url,
          class_level: data.class_level,
          favorite_subjects: data.favorite_subjects,
          created_at: data.created_at || ""
        });
      }
    }
    setIsLoading(false);
  };

  const fetchFriends = async () => {
    if (!profileId) return;

    // Fetch accepted friends
    const { data: friendData } = await supabase
      .from("friends")
      .select("*")
      .or(`user_id.eq.${profileId},friend_id.eq.${profileId}`)
      .eq("status", "accepted");

    if (friendData) {
      const friendIds = friendData.map(f => 
        f.user_id === profileId ? f.friend_id : f.user_id
      );

      if (friendIds.length > 0) {
        const { data: profiles } = await supabase
          .from("public_profiles")
          .select("id, display_name, avatar_url, class_level")
          .in("id", friendIds);

        const enrichedFriends = friendData.map(f => {
          const friendId = f.user_id === profileId ? f.friend_id : f.user_id;
          return {
            ...f,
            profile: profiles?.find(p => p.id === friendId)
          };
        });

        setFriends(enrichedFriends);
      }
    }

    // Fetch pending requests (only for own profile)
    if (isOwnProfile) {
      const { data: pendingData } = await supabase
        .from("friends")
        .select("*")
        .eq("friend_id", profileId)
        .eq("status", "pending");

      if (pendingData && pendingData.length > 0) {
        const senderIds = pendingData.map(f => f.user_id);
        const { data: profiles } = await supabase
          .from("public_profiles")
          .select("id, display_name, avatar_url, class_level")
          .in("id", senderIds);

        const enrichedRequests = pendingData.map(f => ({
          ...f,
          profile: profiles?.find(p => p.id === f.user_id)
        }));

        setPendingRequests(enrichedRequests);
      }
    }
  };

  const fetchStats = async () => {
    if (!profileId) return;

    const { data } = await supabase
      .from("user_quiz_stats")
      .select("total_quizzes, correct_answers, longest_streak")
      .eq("user_id", profileId);

    if (data && data.length > 0) {
      const totals = data.reduce((acc, stat) => ({
        quizzes: acc.quizzes + stat.total_quizzes,
        correct: acc.correct + stat.correct_answers,
        streak: Math.max(acc.streak, stat.longest_streak)
      }), { quizzes: 0, correct: 0, streak: 0 });

      setStats(totals);
    }
  };

  const checkFriendship = async () => {
    if (!currentUser || !profileId) return;

    const { data } = await supabase
      .from("friends")
      .select("*")
      .or(`and(user_id.eq.${currentUser.id},friend_id.eq.${profileId}),and(user_id.eq.${profileId},friend_id.eq.${currentUser.id})`)
      .single();

    if (data) {
      setFriendshipStatus(data.status);
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: editForm.display_name,
        bio: editForm.bio,
        class_level: editForm.class_level,
        favorite_subjects: editForm.favorite_subjects,
        updated_at: new Date().toISOString()
      })
      .eq("id", currentUser.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      fetchProfile();
    }
  };

  const sendFriendRequest = async () => {
    if (!currentUser || !profileId) return;

    const { error } = await supabase
      .from("friends")
      .insert({
        user_id: currentUser.id,
        friend_id: profileId,
        status: "pending"
      });

    if (error) {
      toast.error("Failed to send friend request");
    } else {
      toast.success("Friend request sent!");
      setFriendshipStatus("pending");
    }
  };

  const handleFriendRequest = async (requestId: string, accept: boolean) => {
    const { error } = await supabase
      .from("friends")
      .update({ status: accept ? "accepted" : "blocked" })
      .eq("id", requestId);

    if (error) {
      toast.error("Failed to update request");
    } else {
      toast.success(accept ? "Friend request accepted!" : "Friend request declined");
      fetchFriends();
    }
  };

  const removeFriend = async () => {
    if (!currentUser || !profileId) return;

    const { error } = await supabase
      .from("friends")
      .delete()
      .or(`and(user_id.eq.${currentUser.id},friend_id.eq.${profileId}),and(user_id.eq.${profileId},friend_id.eq.${currentUser.id})`);

    if (!error) {
      toast.success("Friend removed");
      setFriendshipStatus(null);
      fetchFriends();
    }
  };

  const toggleSubject = (subject: string) => {
    setEditForm(prev => ({
      ...prev,
      favorite_subjects: prev.favorite_subjects.includes(subject)
        ? prev.favorite_subjects.filter(s => s !== subject)
        : [...prev.favorite_subjects, subject]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Profile Header */}
        <Card className="border-0 shadow-2xl overflow-hidden mb-8 bg-gradient-to-br from-card via-card to-primary/5">
          <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnY0aC0ydjJoMnYyaDJ2LTJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          </div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
              <Avatar className="h-32 w-32 border-4 border-card shadow-xl ring-4 ring-primary/20">
                <AvatarImage src={profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.display_name}`} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  {profile?.display_name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <Input
                    value={editForm.display_name}
                    onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                    className="text-2xl font-bold mb-2 max-w-xs"
                    placeholder="Your name"
                  />
                ) : (
                  <h1 className="text-3xl font-bold mb-1">{profile?.display_name}</h1>
                )}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  {profile?.class_level && (
                    <Badge variant="secondary" className="gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Class {profile.class_level}
                    </Badge>
                  )}
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    Joined {new Date(profile?.created_at || "").toLocaleDateString()}
                  </Badge>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="max-w-md"
                    rows={2}
                  />
                ) : profile?.bio ? (
                  <p className="text-muted-foreground max-w-md">{profile.bio}</p>
                ) : isOwnProfile ? (
                  <p className="text-muted-foreground italic">Add a bio to tell others about yourself</p>
                ) : null}
              </div>

              <div className="flex gap-2">
                {isOwnProfile ? (
                  isEditing ? (
                    <>
                      <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" /> Save
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                      <Edit3 className="h-4 w-4" /> Edit Profile
                    </Button>
                  )
                ) : (
                  <>
                    {friendshipStatus === "accepted" ? (
                      <Button variant="outline" onClick={removeFriend} className="gap-2">
                        <UserCheck className="h-4 w-4" /> Friends
                      </Button>
                    ) : friendshipStatus === "pending" ? (
                      <Button variant="secondary" disabled className="gap-2">
                        <Clock className="h-4 w-4" /> Request Sent
                      </Button>
                    ) : (
                      <Button onClick={sendFriendRequest} className="gap-2">
                        <UserPlus className="h-4 w-4" /> Add Friend
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/messages", { state: { startWith: profileId } })}
                      className="gap-2"
                    >
                      <MessageCircle className="h-4 w-4" /> Message
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{stats.quizzes}</p>
            <p className="text-sm text-muted-foreground">Quizzes Taken</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <Star className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{stats.correct}</p>
            <p className="text-sm text-muted-foreground">Correct Answers</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">{stats.streak}</p>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{friends.length}</p>
            <p className="text-sm text-muted-foreground">Friends</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={isOwnProfile && pendingRequests.length > 0 ? "requests" : "friends"} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="friends" className="gap-2">
              <Users className="h-4 w-4" />
              Friends ({friends.length})
            </TabsTrigger>
            {isOwnProfile && (
              <TabsTrigger value="requests" className="gap-2 relative">
                <UserPlus className="h-4 w-4" />
                Requests
                {pendingRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {pendingRequests.length}
                  </span>
                )}
              </TabsTrigger>
            )}
            <TabsTrigger value="subjects" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Subjects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {friends.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground mb-4">No friends yet</p>
                    {isOwnProfile && (
                      <Button onClick={() => navigate("/student-chat")} className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Meet Students in Chat
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {friends.map((friend) => (
                      <Link 
                        key={friend.id} 
                        to={`/profile/${friend.profile?.id}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Avatar className="h-14 w-14 border-2 border-card">
                          <AvatarImage src={friend.profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${friend.profile?.display_name}`} />
                          <AvatarFallback>{friend.profile?.display_name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{friend.profile?.display_name}</p>
                          {friend.profile?.class_level && (
                            <p className="text-sm text-muted-foreground">Class {friend.profile.class_level}</p>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {isOwnProfile && (
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Friend Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <UserPlus className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">No pending friend requests</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingRequests.map((request) => (
                        <div 
                          key={request.id} 
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                        >
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={request.profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${request.profile?.display_name}`} />
                            <AvatarFallback>{request.profile?.display_name?.[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold">{request.profile?.display_name}</p>
                            <p className="text-sm text-muted-foreground">
                              Sent {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleFriendRequest(request.id, true)}
                              className="gap-1"
                            >
                              <UserCheck className="h-4 w-4" /> Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFriendRequest(request.id, false)}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {isOwnProfile ? "Your Favorite Subjects" : "Favorite Subjects"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Select your favorite subjects to help others find study partners
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map((subject) => (
                        <Badge
                          key={subject}
                          variant={editForm.favorite_subjects.includes(subject) ? "default" : "outline"}
                          className="cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105"
                          onClick={() => toggleSubject(subject)}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-4">
                      <label className="text-sm font-medium mb-2 block">Class Level</label>
                      <Select 
                        value={editForm.class_level} 
                        onValueChange={(v) => setEditForm({ ...editForm, class_level: v })}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
                            <SelectItem key={c} value={c}>Class {c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.favorite_subjects && profile.favorite_subjects.length > 0 ? (
                      profile.favorite_subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-sm py-2 px-4">
                          {subject}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        {isOwnProfile ? "Click 'Edit Profile' to add your favorite subjects" : "No subjects added yet"}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;