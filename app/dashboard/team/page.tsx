"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  status: string;
  joinDate: string;
  email: string;
  phone: string;
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "CAPTAIN WHITEBEARD", position: "Captain", status: "active", joinDate: "2023-01-15", email: "captain@barbablanca.com", phone: "+1234567890" },
    { id: 2, name: "RED DEMON", position: "Striker", status: "active", joinDate: "2023-02-20", email: "demon@barbablanca.com", phone: "+1234567891" },
    { id: 3, name: "IRON WALL", position: "Defender", status: "active", joinDate: "2023-03-10", email: "wall@barbablanca.com", phone: "+1234567892" },
    { id: 4, name: "SHADOW KEEPER", position: "Goalkeeper", status: "active", joinDate: "2023-04-05", email: "keeper@barbablanca.com", phone: "+1234567893" },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    status: "active",
    email: "",
    phone: "",
  });

  const positions = ["Captain", "Striker", "Midfielder", "Defender", "Goalkeeper", "Winger"];
  const statuses = ["active", "inactive", "suspended"];

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: Date.now(),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
    };
    setTeamMembers([...teamMembers, newMember]);
    setFormData({ name: "", position: "", status: "active", email: "", phone: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      status: member.status,
      email: member.email,
      phone: member.phone,
    });
  };

  const handleUpdateMember = () => {
    if (editingMember) {
      setTeamMembers(teamMembers.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...formData }
          : member
      ));
      setEditingMember(null);
      setFormData({ name: "", position: "", status: "active", email: "", phone: "" });
    }
  };

  const handleDeleteMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-600";
      case "inactive": return "bg-gray-600";
      case "suspended": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">TEAM MANAGEMENT</h1>
            <p className="text-gray-300">Manage your clan members and their roles</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter member name"
                  />
                </div>
                <div>
                  <Label htmlFor="position" className="text-white">Position</Label>
                  <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
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
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter phone number"
                  />
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
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddMember} className="bg-red-600 hover:bg-red-700 flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Add Member
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
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-black/60 border-red-800/50">
              <CardContent className="p-6">
                {editingMember?.id === member.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Position</Label>
                        <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue />
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
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
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
                      <Button onClick={handleUpdateMember} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingMember(null)} className="border-gray-600">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}