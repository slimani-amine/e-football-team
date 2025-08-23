"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  FileText, 
  UserCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Trophy,
  Settings,
  BarChart3,
  Save,
  X,
  Loader2,
  Shield,
  Target,
  Award,
  Globe,
  Palette,
  MessageSquare
} from "lucide-react";

// Types (importing from database)
interface User {
  id: string;
  username: string;
  roles: string[];
  isAdmin: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  status: string;
  joinDate: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  stats?: {
    goals: number;
    assists: number;
    matches: number;
    rating: number;
  };
}

interface NewsArticle {
  id: number;
  title: string;
  status: string;
  date: string;
  views: number;
  category: string;
  content: string;
  author: string;
  image?: string;
  tags: string[];
  excerpt?: string;
}

interface JoinRequest {
  id: number;
  name: string;
  position: string;
  experience: string;
  status: string;
  date: string;
  email: string;
  message: string;
  age?: number;
  gamertag?: string;
  platform?: string;
  skillLevel?: string;
}

interface Match {
  id: number;
  opponent: string;
  date: string;
  result?: string;
  score?: string;
  competition: string;
  status: 'upcoming' | 'live' | 'completed';
  venue?: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'tournament' | 'milestone' | 'recognition';
  image?: string;
}

interface DashboardSettings {
  teamName: string;
  teamLogo?: string;
  primaryColor: string;
  secondaryColor: string;
  description: string;
  socialLinks: {
    discord?: string;
    twitter?: string;
    youtube?: string;
    twitch?: string;
  };
  recruitmentOpen: boolean;
  maxTeamSize: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Dialog states
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isAddNewsDialogOpen, setIsAddNewsDialogOpen] = useState(false);
  const [isAddMatchDialogOpen, setIsAddMatchDialogOpen] = useState(false);
  const [isAddAchievementDialogOpen, setIsAddAchievementDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  // Data states
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [settings, setSettings] = useState<DashboardSettings>({
    teamName: "Barba Blanca FC",
    primaryColor: "#dc2626",
    secondaryColor: "#000000",
    description: "",
    socialLinks: {},
    recruitmentOpen: true,
    maxTeamSize: 25
  });

  // Form States
  const [memberForm, setMemberForm] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    status: "active",
    bio: "",
    stats: { goals: 0, assists: 0, matches: 0, rating: 0 }
  });

  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "",
    content: "",
    status: "draft",
    tags: "",
    excerpt: ""
  });

  const [matchForm, setMatchForm] = useState({
    opponent: "",
    date: "",
    competition: "",
    status: "upcoming" as const,
    venue: "",
    result: "",
    score: ""
  });

  const [achievementForm, setAchievementForm] = useState({
    title: "",
    description: "",
    type: "tournament" as const,
    date: ""
  });

  // Form Options
  const positions = ["Captain", "Striker", "Midfielder", "Defender", "Goalkeeper", "Winger"];
  const newsCategories = ["Tournament", "Recruitment", "Training", "General", "Achievement"];
  const competitions = ["Champions League", "League Cup", "Friendly", "Tournament"];
  const achievementTypes = ["tournament", "milestone", "recognition"];

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth');
        if (!response.ok) {
          router.push('/auth/login');
          return;
        }

        const { user } = await response.json();
        if (!user.isAdmin) {
          router.push('/auth/login');
          return;
        }

        setUser(user);
        await loadData();
      } catch (error) {
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Load all data
  const loadData = async () => {
    try {
      const [teamRes, newsRes, requestsRes, matchesRes, achievementsRes, settingsRes] = await Promise.all([
        fetch('/api/team'),
        fetch('/api/news'),
        fetch('/api/requests'),
        fetch('/api/matches'),
        fetch('/api/achievements'),
        fetch('/api/settings')
      ]);

      if (teamRes.ok) {
        const { teamMembers } = await teamRes.json();
        setTeamMembers(teamMembers);
      }

      if (newsRes.ok) {
        const { newsArticles } = await newsRes.json();
        setNewsArticles(newsArticles);
      }

      if (requestsRes.ok) {
        const { joinRequests } = await requestsRes.json();
        setJoinRequests(joinRequests);
      }

      if (matchesRes.ok) {
        const { matches } = await matchesRes.json();
        setMatches(matches);
      }

      if (achievementsRes.ok) {
        const { achievements } = await achievementsRes.json();
        setAchievements(achievements);
      }

      if (settingsRes.ok) {
        const { settings } = await settingsRes.json();
        setSettings(settings);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    }
  };

  // Team Management Functions
  const handleAddMember = async () => {
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberForm)
      });

      if (response.ok) {
        const { member } = await response.json();
        setTeamMembers([...teamMembers, member]);
        setMemberForm({ name: "", position: "", email: "", phone: "", status: "active", bio: "", stats: { goals: 0, assists: 0, matches: 0, rating: 0 } });
        setIsAddMemberDialogOpen(false);
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    }
  };

  const handleUpdateMember = async () => {
    if (!editingMember) return;

    try {
      const response = await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingMember.id, ...memberForm })
      });

      if (response.ok) {
        setTeamMembers(teamMembers.map(member => 
          member.id === editingMember.id ? { ...member, ...memberForm } : member
        ));
        setEditingMember(null);
        setMemberForm({ name: "", position: "", email: "", phone: "", status: "active", bio: "", stats: { goals: 0, assists: 0, matches: 0, rating: 0 } });
        setIsAddMemberDialogOpen(false);
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team member",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMember = async (id: number) => {
    try {
      const response = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });

      if (response.ok) {
        setTeamMembers(teamMembers.filter(member => member.id !== id));
        toast({
          title: "Success",
          description: "Team member deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      position: member.position,
      email: member.email,
      phone: member.phone,
      status: member.status,
      bio: member.bio || "",
      stats: member.stats || { goals: 0, assists: 0, matches: 0, rating: 0 }
    });
    setIsAddMemberDialogOpen(true);
  };

  // Similar functions for News, Matches, Achievements...
  const handleAddNews = async () => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newsForm,
          tags: newsForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      });

      if (response.ok) {
        const { article } = await response.json();
        setNewsArticles([...newsArticles, article]);
        setNewsForm({ title: "", category: "", content: "", status: "draft", tags: "", excerpt: "" });
        setIsAddNewsDialogOpen(false);
        toast({
          title: "Success",
          description: "News article created successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create news article",
        variant: "destructive",
      });
    }
  };

  const handleAddMatch = async () => {
    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchForm)
      });

      if (response.ok) {
        const { match } = await response.json();
        setMatches([...matches, match]);
        setMatchForm({ opponent: "", date: "", competition: "", status: "upcoming", venue: "", result: "", score: "" });
        setIsAddMatchDialogOpen(false);
        toast({
          title: "Success",
          description: "Match added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add match",
        variant: "destructive",
      });
    }
  };

  const handleAddAchievement = async () => {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achievementForm)
      });

      if (response.ok) {
        const { achievement } = await response.json();
        setAchievements([...achievements, achievement]);
        setAchievementForm({ title: "", description: "", type: "tournament", date: "" });
        setIsAddAchievementDialogOpen(false);
        toast({
          title: "Success",
          description: "Achievement added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setIsSettingsDialogOpen(false);
        toast({
          title: "Success",
          description: "Settings updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  // Request Management Functions (same as before)
  const handleAcceptRequest = async (id: number) => {
    try {
      const response = await fetch('/api/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: "accepted" })
      });

      if (response.ok) {
        const request = joinRequests.find(r => r.id === id);
        if (request) {
          await fetch('/api/team', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: request.name,
              position: request.position,
              email: request.email,
              phone: "Not provided",
              status: "active"
            })
          });

          setJoinRequests(joinRequests.map(req => 
            req.id === id ? { ...req, status: "accepted" } : req
          ));
          await loadData();
          toast({
            title: "Success",
            description: "Join request accepted and member added to team",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept join request",
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (id: number) => {
    try {
      const response = await fetch('/api/requests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: "rejected" })
      });

      if (response.ok) {
        setJoinRequests(joinRequests.map(request => 
          request.id === id ? { ...request, status: "rejected" } : request
        ));
        toast({
          title: "Success",
          description: "Join request rejected",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject join request",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": 
      case "published": 
      case "accepted": 
      case "completed": return "bg-green-600";
      case "draft": 
      case "pending": 
      case "upcoming": return "bg-yellow-600";
      case "inactive": 
      case "archived": 
      case "rejected": 
      case "live": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  // Enhanced Statistics
  const stats = [
    { title: "Team Members", value: teamMembers.length, icon: Users, color: "text-blue-500" },
    { title: "Published News", value: newsArticles.filter(n => n.status === "published").length, icon: FileText, color: "text-green-500" },
    { title: "Pending Requests", value: joinRequests.filter(r => r.status === "pending").length, icon: UserCheck, color: "text-orange-500" },
    { title: "Achievements", value: achievements.length, icon: Trophy, color: "text-purple-500" },
    { title: "Upcoming Matches", value: matches.filter(m => m.status === "upcoming").length, icon: Calendar, color: "text-blue-500" },
    { title: "Total Views", value: newsArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString(), icon: BarChart3, color: "text-red-500" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center">
        <Card className="bg-black/60 border-red-800/50 p-8">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-red-400" />
            <span className="text-white">Loading dashboard...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">{settings.teamName.toUpperCase()} DASHBOARD</h1>
            <p className="text-gray-300">Comprehensive team management system</p>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-red-400">Dashboard Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <Label className="text-white">Team Name</Label>
                    <Input
                      value={settings.teamName}
                      onChange={(e) => setSettings({...settings, teamName: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Primary Color</Label>
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white h-12"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Secondary Color</Label>
                    <Input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white h-12"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Description</Label>
                    <Textarea
                      value={settings.description}
                      onChange={(e) => setSettings({...settings, description: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Max Team Size</Label>
                    <Input
                      type="number"
                      value={settings.maxTeamSize}
                      onChange={(e) => setSettings({...settings, maxTeamSize: parseInt(e.target.value)})}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Discord Link</Label>
                    <Input
                      value={settings.socialLinks.discord || ''}
                      onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, discord: e.target.value}})}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Twitter Link</Label>
                    <Input
                      value={settings.socialLinks.twitter || ''}
                      onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, twitter: e.target.value}})}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <Button onClick={handleUpdateSettings} className="bg-red-600 hover:bg-red-700 w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg border border-red-800/50">
              <Shield className="w-5 h-5 text-red-400" />
              <span className="text-white">Welcome, {user.username}</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/50 border border-red-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">Overview</TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-red-600">Team</TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-red-600">News</TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-red-600">Matches</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-red-600">Achievements</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-red-600">Requests</TabsTrigger>
          </TabsList>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {joinRequests.filter(r => r.status === "pending").slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">New join request from {request.name}</span>
                      </div>
                    ))}
                    {newsArticles.filter(n => n.status === "published").slice(0, 2).map((article) => (
                      <div key={article.id} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Published: {article.title}</span>
                      </div>
                    ))}
                    {matches.filter(m => m.status === "upcoming").slice(0, 2).map((match) => (
                      <div key={match.id} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">Upcoming match vs {match.opponent}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => setIsAddMemberDialogOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsAddNewsDialogOpen(true)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Create News
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setIsAddMatchDialogOpen(true)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Add Match
                    </Button>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setIsAddAchievementDialogOpen(true)}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Team Members ({teamMembers.length}/{settings.maxTeamSize})</h2>
              <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">
                      {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div>
                      <Label htmlFor="teamName" className="text-white">Name</Label>
                      <Input
                        id="teamName"
                        value={memberForm.name}
                        onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        placeholder="Enter member name"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={editingMember ? handleUpdateMember : handleAddMember} 
                        className="bg-red-600 hover:bg-red-700 flex-1"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingMember ? 'Update Member' : 'Add Member'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddMemberDialogOpen(false);
                          setEditingMember(null);
                          setMemberForm({ name: "", position: "", email: "", phone: "", status: "active", bio: "", stats: { goals: 0, assists: 0, matches: 0, rating: 0 } });
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <Badge className={`${getStatusColor(member.status)} text-white`}>
                            {member.status}
                          </Badge>
                          <Badge className="bg-blue-600 text-white">
                            {member.position}
                          </Badge>
                        </div>
                        {member.bio && (
                          <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-400">Join Date:</span>
                            <span className="text-white ml-2">{member.joinDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white ml-2">{member.email}</span>
                          </div>
                          {member.stats && (
                            <>
                              <div>
                                <span className="text-gray-400">Goals:</span>
                                <span className="text-white ml-2">{member.stats.goals}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Assists:</span>
                                <span className="text-white ml-2">{member.stats.assists}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Matches:</span>
                                <span className="text-white ml-2">{member.stats.matches}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Rating:</span>
                                <span className="text-white ml-2">{member.stats.rating}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-yellow-600 text-yellow-400 hover:bg-yellow-600"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-400 hover:bg-red-600"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* News Tab (enhanced) */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">News Articles</h2>
              <Dialog open={isAddNewsDialogOpen} onOpenChange={setIsAddNewsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">
                      {editingNews ? 'Edit Article' : 'Create New Article'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Category</Label>
                        <Select value={newsForm.category} onValueChange={(value) => setNewsForm({...newsForm, category: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {newsCategories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Status</Label>
                        <Select value={newsForm.status} onValueChange={(value) => setNewsForm({...newsForm, status: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Excerpt</Label>
                      <Input
                        value={newsForm.excerpt}
                        onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        placeholder="Brief summary of the article"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Tags (comma-separated)</Label>
                      <Input
                        value={newsForm.tags}
                        onChange={(e) => setNewsForm({...newsForm, tags: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        placeholder="e.g., tournament, victory, championship"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Content</Label>
                      <Textarea
                        value={newsForm.content}
                        onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white h-32"
                        rows={6}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleAddNews} 
                        className="bg-red-600 hover:bg-red-700 flex-1"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingNews ? 'Update Article' : 'Create Article'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsAddNewsDialogOpen(false);
                          setEditingNews(null);
                          setNewsForm({ title: "", category: "", content: "", status: "draft", tags: "", excerpt: "" });
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {newsArticles.map((article) => (
                <Card key={article.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{article.title}</h3>
                          <Badge className={`${getStatusColor(article.status)} text-white`}>
                            {article.status}
                          </Badge>
                          <Badge className="bg-blue-600 text-white">
                            {article.category}
                          </Badge>
                        </div>
                        {article.excerpt && (
                          <p className="text-gray-400 text-sm mb-2">{article.excerpt}</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white ml-2">{article.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Views:</span>
                            <span className="text-white ml-2">{article.views}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Author:</span>
                            <span className="text-white ml-2">{article.author}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Tags:</span>
                            <span className="text-white ml-2">{article.tags?.join(', ')}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{article.content}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* New Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Matches</h2>
              <Dialog open={isAddMatchDialogOpen} onOpenChange={setIsAddMatchDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Match
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Add New Match</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Opponent</Label>
                        <Input
                          value={matchForm.opponent}
                          onChange={(e) => setMatchForm({...matchForm, opponent: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Date</Label>
                        <Input
                          type="date"
                          value={matchForm.date}
                          onChange={(e) => setMatchForm({...matchForm, date: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Competition</Label>
                        <Select value={matchForm.competition} onValueChange={(value) => setMatchForm({...matchForm, competition: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue placeholder="Select competition" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {competitions.map((comp) => (
                              <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Venue</Label>
                        <Select value={matchForm.venue} onValueChange={(value) => setMatchForm({...matchForm, venue: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue placeholder="Select venue" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            <SelectItem value="Home">Home</SelectItem>
                            <SelectItem value="Away">Away</SelectItem>
                            <SelectItem value="Neutral">Neutral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleAddMatch} className="bg-red-600 hover:bg-red-700 w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Add Match
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {matches.map((match) => (
                <Card key={match.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">vs {match.opponent}</h3>
                          <Badge className={`${getStatusColor(match.status)} text-white`}>
                            {match.status}
                          </Badge>
                          <Badge className="bg-purple-600 text-white">
                            {match.competition}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white ml-2">{match.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Venue:</span>
                            <span className="text-white ml-2">{match.venue}</span>
                          </div>
                          {match.result && (
                            <div>
                              <span className="text-gray-400">Result:</span>
                              <span className="text-white ml-2">{match.result}</span>
                            </div>
                          )}
                          {match.score && (
                            <div>
                              <span className="text-gray-400">Score:</span>
                              <span className="text-white ml-2">{match.score}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* New Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
              <Dialog open={isAddAchievementDialogOpen} onOpenChange={setIsAddAchievementDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Add New Achievement</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={achievementForm.title}
                        onChange={(e) => setAchievementForm({...achievementForm, title: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={achievementForm.description}
                        onChange={(e) => setAchievementForm({...achievementForm, description: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Type</Label>
                        <Select value={achievementForm.type} onValueChange={(value: any) => setAchievementForm({...achievementForm, type: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {achievementTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Date</Label>
                        <Input
                          type="date"
                          value={achievementForm.date}
                          onChange={(e) => setAchievementForm({...achievementForm, date: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddAchievement} className="bg-red-600 hover:bg-red-700 w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Trophy className="w-6 h-6 text-yellow-500" />
                          <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                          <Badge className="bg-yellow-600 text-white">
                            {achievement.type}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                        <div className="text-sm">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white ml-2">{achievement.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enhanced Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Join Requests</h2>
              <Badge className="bg-orange-600 text-white">
                {joinRequests.filter(r => r.status === "pending").length} Pending
              </Badge>
            </div>

            <div className="grid gap-6">
              {joinRequests.map((request) => (
                <Card key={request.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{request.name}</h3>
                          <Badge className={`${getStatusColor(request.status)} text-white`}>
                            {request.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-400">Position:</span>
                            <span className="text-white ml-2">{request.position}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Experience:</span>
                            <span className="text-white ml-2">{request.experience}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white ml-2">{request.email}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Applied:</span>
                            <span className="text-white ml-2">{request.date}</span>
                          </div>
                          {request.age && (
                            <div>
                              <span className="text-gray-400">Age:</span>
                              <span className="text-white ml-2">{request.age}</span>
                            </div>
                          )}
                        </div>
                        {request.gamertag && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-400">Gamertag:</span>
                              <span className="text-white ml-2">{request.gamertag}</span>
                            </div>
                            {request.platform && (
                              <div>
                                <span className="text-gray-400">Platform:</span>
                                <span className="text-white ml-2">{request.platform}</span>
                              </div>
                            )}
                            {request.skillLevel && (
                              <div>
                                <span className="text-gray-400">Skill Level:</span>
                                <span className="text-white ml-2">{request.skillLevel}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-gray-300 text-sm">{request.message}</p>
                      </div>
                      {request.status === "pending" && (
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-600 text-red-400 hover:bg-red-600"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            Reject
                          </Button>
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}