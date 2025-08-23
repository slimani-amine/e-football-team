
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  X
} from "lucide-react";

// Types
interface TeamMember {
  id: number;
  name: string;
  position: string;
  status: string;
  joinDate: string;
  email: string;
  phone: string;
}

interface NewsArticle {
  id: number;
  title: string;
  status: string;
  date: string;
  views: number;
  category: string;
  content: string;
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
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isAddNewsDialogOpen, setIsAddNewsDialogOpen] = useState(false);
  
  // Team Members State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "CAPTAIN WHITEBEARD", position: "Captain", status: "active", joinDate: "2023-01-15", email: "captain@barbablanca.com", phone: "+1234567890" },
    { id: 2, name: "RED DEMON", position: "Striker", status: "active", joinDate: "2023-02-20", email: "demon@barbablanca.com", phone: "+1234567891" },
    { id: 3, name: "IRON WALL", position: "Defender", status: "active", joinDate: "2023-03-10", email: "wall@barbablanca.com", phone: "+1234567892" },
    { id: 4, name: "SHADOW KEEPER", position: "Goalkeeper", status: "active", joinDate: "2023-04-05", email: "keeper@barbablanca.com", phone: "+1234567893" },
  ]);

  // News Articles State
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([
    { id: 1, title: "Championship Final Victory", status: "published", date: "2024-03-01", views: 2500, category: "Tournament", content: "We dominated the championship..." },
    { id: 2, title: "New Player Recruitment", status: "draft", date: "2024-03-02", views: 0, category: "Recruitment", content: "Looking for new talent..." },
    { id: 3, title: "Training Schedule Update", status: "published", date: "2024-03-03", views: 950, category: "Training", content: "Updated training times..." },
  ]);

  // Join Requests State
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([
    { id: 1, name: "Alex Thunder", position: "Midfielder", experience: "3 years", status: "pending", date: "2024-03-01", email: "alex@email.com", message: "I want to join your clan..." },
    { id: 2, name: "Maria Storm", position: "Winger", experience: "2 years", status: "pending", date: "2024-03-02", email: "maria@email.com", message: "Experienced winger looking for a team..." },
    { id: 3, name: "John Blaze", position: "Defender", experience: "4 years", status: "pending", date: "2024-03-03", email: "john@email.com", message: "Solid defender with leadership skills..." },
  ]);

  // Form States
  const [memberForm, setMemberForm] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    status: "active"
  });

  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "",
    content: "",
    status: "draft"
  });

  // Form Options
  const positions = ["Captain", "Striker", "Midfielder", "Defender", "Goalkeeper", "Winger"];
  const newsCategories = ["Tournament", "Recruitment", "Training", "General", "Achievement"];

  // Statistics
  const stats = [
    { title: "Team Members", value: teamMembers.length, icon: Users, color: "text-blue-500" },
    { title: "Published News", value: newsArticles.filter(n => n.status === "published").length, icon: FileText, color: "text-green-500" },
    { title: "Pending Requests", value: joinRequests.filter(r => r.status === "pending").length, icon: UserCheck, color: "text-orange-500" },
    { title: "Total Views", value: newsArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString(), icon: BarChart3, color: "text-purple-500" },
  ];

  // Team Management Functions
  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: Date.now(),
      ...memberForm,
      joinDate: new Date().toISOString().split('T')[0],
    };
    setTeamMembers([...teamMembers, newMember]);
    setMemberForm({ name: "", position: "", email: "", phone: "", status: "active" });
    setIsAddMemberDialogOpen(false);
  };

  const handleDeleteMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  // News Management Functions
  const handleAddNews = () => {
    const newArticle: NewsArticle = {
      id: Date.now(),
      ...newsForm,
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    setNewsArticles([...newsArticles, newArticle]);
    setNewsForm({ title: "", category: "", content: "", status: "draft" });
    setIsAddNewsDialogOpen(false);
  };

  const handleDeleteNews = (id: number) => {
    setNewsArticles(newsArticles.filter(article => article.id !== id));
  };

  const handlePublishNews = (id: number) => {
    setNewsArticles(newsArticles.map(article => 
      article.id === id ? { ...article, status: "published" } : article
    ));
  };

  // Request Management Functions
  const handleAcceptRequest = (id: number) => {
    const request = joinRequests.find(r => r.id === id);
    if (request) {
      // Add to team members
      const newMember: TeamMember = {
        id: Date.now(),
        name: request.name,
        position: request.position,
        status: "active",
        joinDate: new Date().toISOString().split('T')[0],
        email: request.email,
        phone: "Not provided"
      };
      setTeamMembers([...teamMembers, newMember]);
      
      // Update request status
      setJoinRequests(joinRequests.map(req => 
        req.id === id ? { ...req, status: "accepted" } : req
      ));
    }
  };

  const handleRejectRequest = (id: number) => {
    setJoinRequests(joinRequests.map(request => 
      request.id === id ? { ...request, status: "rejected" } : request
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": 
      case "published": 
      case "accepted": return "bg-green-600";
      case "draft": 
      case "pending": return "bg-yellow-600";
      case "inactive": 
      case "archived": 
      case "rejected": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">CLAN DASHBOARD</h1>
          <p className="text-gray-300">Manage your team, news, and recruitment</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/50 border border-red-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">Overview</TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-red-600">Team Management</TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-red-600">News Management</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-red-600">Join Requests</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      onClick={() => setActiveTab("requests")}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Review Requests
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Team Members</h2>
              <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Add New Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Name</Label>
                      <Input
                        value={memberForm.name}
                        onChange={(e) => setMemberForm({...memberForm, name: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Position</Label>
                      <Select value={memberForm.position} onValueChange={(value) => setMemberForm({...memberForm, position: value})}>
                        <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-red-800">
                          {positions.map((position) => (
                            <SelectItem key={position} value={position}>{position}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Email</Label>
                      <Input
                        type="email"
                        value={memberForm.email}
                        onChange={(e) => setMemberForm({...memberForm, email: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Phone</Label>
                      <Input
                        value={memberForm.phone}
                        onChange={(e) => setMemberForm({...memberForm, phone: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddMember} className="bg-red-600 hover:bg-red-700 flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Position:</span>
                            <span className="text-white ml-2">{member.position}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Join Date:</span>
                            <span className="text-white ml-2">{member.joinDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white ml-2">{member.email}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Phone:</span>
                            <span className="text-white ml-2">{member.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600">
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

          {/* News Management Tab */}
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
                    <DialogTitle className="text-red-400">Create New Article</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
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
                      <Label className="text-white">Content</Label>
                      <textarea
                        value={newsForm.content}
                        onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                        className="w-full h-32 bg-gray-900 border border-red-800 text-white rounded-md p-3"
                        rows={6}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddNews} className="bg-red-600 hover:bg-red-700 flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Create Article
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddNewsDialogOpen(false)}>
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white ml-2">{article.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Views:</span>
                            <span className="text-white ml-2">{article.views}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Status:</span>
                            <span className="text-white ml-2">{article.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {article.status === "draft" && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handlePublishNews(article.id)}
                          >
                            Publish
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-400 hover:bg-red-600"
                          onClick={() => handleDeleteNews(article.id)}
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

          {/* Join Requests Tab */}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-400">Position:</span>
                            <span className="text-white ml-2">{request.position}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Experience:</span>
                            <span className="text-white ml-2">{request.experience}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Applied:</span>
                            <span className="text-white ml-2">{request.date}</span>
                          </div>
                        </div>
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
