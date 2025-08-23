"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: number;
  name: string;
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({ id: "", name: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.teamMembers || []);
      } else {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleAddMember = async () => {
    if (!formData.id.trim() || !formData.name.trim()) {
      toast({
        title: "Error",
        description: "ID and Name are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(formData.id.trim()), name: formData.name.trim() }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
        setIsAddDialogOpen(false);
        setFormData({ id: "", name: "" });
        await fetchTeamMembers();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add member');
      }
    } catch (error) {
      console.error("Failed to add team member:", error);
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ id: member.id.toString(), name: member.name });
    setIsAddDialogOpen(true);
  };

  const handleUpdateMember = async () => {
    if (!editingMember || !formData.name.trim() || !formData.id.trim()) {
      toast({
        title: "Error",
        description: "ID and Name are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingMember.id,
          name: formData.name.trim(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
        setEditingMember(null);
        setFormData({ id: "", name: "" });
        await fetchTeamMembers();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update member');
      }
    } catch (error) {
      console.error("Failed to update team member:", error);
      toast({
        title: "Error",
        description: "Failed to update team member",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMember = async (id: number) => {
    try {
      const response = await fetch(`/api/team?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Team member deleted successfully",
        });
        setFormData({ id: "", name: "" });
        await fetchTeamMembers();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete member');
      }
    } catch (error) {
      console.error("Failed to delete team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">TEAM MANAGEMENT</h1>
            <p className="text-gray-300">Manage your clan members</p>
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
                <DialogTitle className="text-red-400">{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {!editingMember && (
                  <div>
                    <Label htmlFor="id" className="text-white">Player ID</Label>
                    <Input
                      id="id"
                      type="number"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="bg-gray-900 border-red-800 text-white"
                      placeholder="Enter unique player ID"
                      min="1"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="name" className="text-white">Player Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-900 border-red-800 text-white"
                    placeholder="Enter player name"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={editingMember ? handleUpdateMember : handleAddMember} className="bg-red-600 hover:bg-red-700 flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    {editingMember ? "Save Changes" : "Add Member"}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingMember(null);
                    setFormData({ id: "", name: "" });
                  }} className="border-gray-600">
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
                    <div>
                      <Label className="text-white">Player Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateMember} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditingMember(null);
                        setFormData({ id: "", name: "" });
                      }} className="border-gray-600">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <span className="text-red-400 font-mono">ID: {member.id}</span>
                    </div>
                    <div className="flex gap-2">
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