"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart3
} from "lucide-react";

// Mock data
const teamMembers = [
  { id: 1, name: "CAPTAIN WHITEBEARD", position: "Captain", status: "active", joinDate: "2023-01-15" },
  { id: 2, name: "RED DEMON", position: "Striker", status: "active", joinDate: "2023-02-20" },
  { id: 3, name: "IRON WALL", position: "Defender", status: "active", joinDate: "2023-03-10" },
  { id: 4, name: "SHADOW KEEPER", position: "Goalkeeper", status: "active", joinDate: "2023-04-05" },
];

const newsArticles = [
  { id: 1, title: "Championship Final Victory", status: "published", date: "2024-03-01", views: 2500 },
  { id: 2, title: "New Player Recruitment", status: "draft", date: "2024-03-02", views: 0 },
  { id: 3, title: "Training Schedule Update", status: "published", date: "2024-03-03", views: 950 },
];

const joinRequests = [
  { id: 1, name: "Alex Thunder", position: "Midfielder", experience: "3 years", status: "pending", date: "2024-03-01" },
  { id: 2, name: "Maria Storm", position: "Winger", experience: "2 years", status: "pending", date: "2024-03-02" },
  { id: 3, name: "John Blaze", position: "Defender", experience: "4 years", status: "pending", date: "2024-03-03" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Team Members", value: teamMembers.length, icon: Users, color: "text-blue-500" },
    { title: "Published News", value: newsArticles.filter(n => n.status === "published").length, icon: FileText, color: "text-green-500" },
    { title: "Pending Requests", value: joinRequests.filter(r => r.status === "pending").length, icon: UserCheck, color: "text-orange-500" },
    { title: "Total Views", value: "4.5K", icon: BarChart3, color: "text-purple-500" },
  ];

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
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">New member joined: Alex Thunder</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">News article published: Championship Final</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">3 new join requests received</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Create News
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
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
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>

            <Card className="bg-black/60 border-red-800/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-red-800/50">
                      <tr>
                        <th className="text-left p-4 text-red-400">Name</th>
                        <th className="text-left p-4 text-red-400">Position</th>
                        <th className="text-left p-4 text-red-400">Status</th>
                        <th className="text-left p-4 text-red-400">Join Date</th>
                        <th className="text-left p-4 text-red-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="border-b border-red-800/30 hover:bg-red-900/20">
                          <td className="p-4 text-white font-semibold">{member.name}</td>
                          <td className="p-4 text-gray-300">{member.position}</td>
                          <td className="p-4">
                            <Badge className="bg-green-600 text-white">
                              {member.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-300">{member.joinDate}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Management Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">News Articles</h2>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
            </div>

            <Card className="bg-black/60 border-red-800/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-red-800/50">
                      <tr>
                        <th className="text-left p-4 text-red-400">Title</th>
                        <th className="text-left p-4 text-red-400">Status</th>
                        <th className="text-left p-4 text-red-400">Date</th>
                        <th className="text-left p-4 text-red-400">Views</th>
                        <th className="text-left p-4 text-red-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsArticles.map((article) => (
                        <tr key={article.id} className="border-b border-red-800/30 hover:bg-red-900/20">
                          <td className="p-4 text-white font-semibold">{article.title}</td>
                          <td className="p-4">
                            <Badge className={article.status === "published" ? "bg-green-600" : "bg-yellow-600"}>
                              {article.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-300">{article.date}</td>
                          <td className="p-4 text-gray-300">{article.views}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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
                        <h3 className="text-xl font-bold text-white mb-2">{request.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                          Reject
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
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