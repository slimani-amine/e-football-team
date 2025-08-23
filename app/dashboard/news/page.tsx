"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Eye } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  status: string;
  date: string;
  views: number;
  author: string;
}

export default function NewsManagementPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([
    { 
      id: 1, 
      title: "Championship Final Victory", 
      description: "Barba Blanca FC dominates the championship final with a spectacular 6-0 victory",
      content: "In an incredible display of skill and teamwork, Barba Blanca FC secured their position as champions...",
      category: "Tournament", 
      status: "published", 
      date: "2024-03-01", 
      views: 2500,
      author: "Admin"
    },
    { 
      id: 2, 
      title: "New Player Recruitment", 
      description: "We're looking for skilled warriors to join our ranks",
      content: "Applications are now open for dedicated players who want to dominate the field...",
      category: "Recruitment", 
      status: "draft", 
      date: "2024-03-02", 
      views: 0,
      author: "Admin"
    },
    { 
      id: 3, 
      title: "Training Schedule Update", 
      description: "Weekly training sessions have been updated for all clan members",
      content: "All clan members are expected to participate in skill development and strategy sessions...",
      category: "Training", 
      status: "published", 
      date: "2024-03-03", 
      views: 950,
      author: "Captain"
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    status: "draft",
  });

  const categories = ["Tournament", "Recruitment", "Training", "General", "Achievement"];
  const statuses = ["draft", "published", "archived"];

  const handleAddArticle = () => {
    const newArticle: NewsArticle = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      author: "Admin",
    };
    setNewsArticles([...newsArticles, newArticle]);
    setFormData({ title: "", description: "", content: "", category: "", status: "draft" });
    setIsAddDialogOpen(false);
  };

  const handleEditArticle = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      category: article.category,
      status: article.status,
    });
  };

  const handleUpdateArticle = () => {
    if (editingArticle) {
      setNewsArticles(newsArticles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...formData }
          : article
      ));
      setEditingArticle(null);
      setFormData({ title: "", description: "", content: "", category: "", status: "draft" });
    }
  };

  const handleDeleteArticle = (id: number) => {
    setNewsArticles(newsArticles.filter(article => article.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-600";
      case "draft": return "bg-yellow-600";
      case "archived": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tournament": return "bg-red-600";
      case "Recruitment": return "bg-blue-600";
      case "Training": return "bg-purple-600";
      case "Achievement": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">NEWS MANAGEMENT</h1>
            <p className="text-gray-300">Create and manage clan news and announcements</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter article title"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter article description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="content" className="text-white">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter article content"
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-red-800">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-white">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-red-800">
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddArticle} className="bg-red-600 hover:bg-red-700 flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Create Article
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-gray-600">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {newsArticles.map((article) => (
            <Card key={article.id} className="bg-black/60 border-red-800/50">
              <CardContent className="p-6">
                {editingArticle?.id === article.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-white">Content</Label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        rows={6}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateArticle} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingArticle(null)} className="border-gray-600">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-white">{article.title}</h3>
                        <Badge className={`${getStatusColor(article.status)} text-white`}>
                          {article.status}
                        </Badge>
                        <Badge className={`${getCategoryColor(article.category)} text-white`}>
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-4">{article.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
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
                          <span className="text-gray-400">Status:</span>
                          <span className="text-white ml-2">{article.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-blue-600 text-blue-400 hover:bg-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-yellow-600 text-yellow-400 hover:bg-yellow-600"
                        onClick={() => handleEditArticle(article)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-600 text-red-400 hover:bg-red-600"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}