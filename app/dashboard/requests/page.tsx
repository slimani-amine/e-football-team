"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, X, Eye, Mail, Phone, Calendar, User } from "lucide-react";

interface JoinRequest {
  id: number;
  name: string;
  email: string;
  age: number;
  position: string;
  experience: string;
  gamertag: string;
  platform: string;
  message: string;
  status: string;
  date: string;
}

export default function RequestsManagementPage() {
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([
    { 
      id: 1, 
      name: "Alex Thunder", 
      email: "alex.thunder@email.com",
      age: 22,
      position: "Midfielder", 
      experience: "3 years", 
      gamertag: "ThunderStrike22",
      platform: "PlayStation 5",
      message: "I've been playing e-football for 3 years and I'm looking for a competitive team to join. I specialize in midfield control and have experience in tournament play.",
      status: "pending", 
      date: "2024-03-01" 
    },
    { 
      id: 2, 
      name: "Maria Storm", 
      email: "maria.storm@email.com",
      age: 19,
      position: "Winger", 
      experience: "2 years", 
      gamertag: "StormWing19",
      platform: "Xbox Series X",
      message: "Fast-paced winger with excellent dribbling skills. I've won several local tournaments and I'm ready to take my game to the next level with Barba Blanca.",
      status: "pending", 
      date: "2024-03-02" 
    },
    { 
      id: 3, 
      name: "John Blaze", 
      email: "john.blaze@email.com",
      age: 25,
      position: "Defender", 
      experience: "4 years", 
      gamertag: "BlazeDefender",
      platform: "PC",
      message: "Solid defender with great tactical awareness. I've been captain of my previous team and I understand the importance of teamwork and communication.",
      status: "pending", 
      date: "2024-03-03" 
    },
    { 
      id: 4, 
      name: "Sarah Lightning", 
      email: "sarah.lightning@email.com",
      age: 20,
      position: "Striker", 
      experience: "2.5 years", 
      gamertag: "LightningStrike",
      platform: "PlayStation 5",
      message: "Goal-scoring machine with a 85% conversion rate. I'm passionate about e-football and I believe I can contribute significantly to the team's success.",
      status: "accepted", 
      date: "2024-02-28" 
    },
    { 
      id: 5, 
      name: "Mike Shadow", 
      email: "mike.shadow@email.com",
      age: 24,
      position: "Goalkeeper", 
      experience: "3.5 years", 
      gamertag: "ShadowKeeper",
      platform: "Xbox Series X",
      message: "Experienced goalkeeper with quick reflexes and excellent positioning. I've maintained a 78% save rate in competitive matches.",
      status: "rejected", 
      date: "2024-02-25" 
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);

  const handleAcceptRequest = (id: number) => {
    setJoinRequests(joinRequests.map(request => 
      request.id === id 
        ? { ...request, status: "accepted" }
        : request
    ));
  };

  const handleRejectRequest = (id: number) => {
    setJoinRequests(joinRequests.map(request => 
      request.id === id 
        ? { ...request, status: "rejected" }
        : request
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-600";
      case "accepted": return "bg-green-600";
      case "rejected": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Striker": return "bg-red-600";
      case "Midfielder": return "bg-blue-600";
      case "Defender": return "bg-green-600";
      case "Goalkeeper": return "bg-purple-600";
      case "Winger": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const pendingRequests = joinRequests.filter(r => r.status === "pending");
  const processedRequests = joinRequests.filter(r => r.status !== "pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">JOIN REQUESTS</h1>
            <p className="text-gray-300">Review and manage clan membership applications</p>
          </div>
          <div className="flex gap-4">
            <Badge className="bg-orange-600 text-white text-lg px-4 py-2">
              {pendingRequests.length} Pending
            </Badge>
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">
              {joinRequests.filter(r => r.status === "accepted").length} Accepted
            </Badge>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Pending Requests</h2>
            <div className="grid gap-6">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="bg-black/60 border-orange-600/50 hover:border-orange-400/70 transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{request.name}</h3>
                          <Badge className={`${getPositionColor(request.position)} text-white`}>
                            {request.position}
                          </Badge>
                          <Badge className="bg-orange-600 text-white">
                            {request.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{request.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Age:</span>
                            <span className="text-white">{request.age}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Experience:</span>
                            <span className="text-white">{request.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Platform:</span>
                            <span className="text-white">{request.platform}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2">{request.message}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-blue-600 text-blue-400 hover:bg-blue-600"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-red-400">Application Details</DialogTitle>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-gray-400">Name</Label>
                                    <p className="text-white font-semibold">{selectedRequest.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Position</Label>
                                    <p className="text-white">{selectedRequest.position}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Email</Label>
                                    <p className="text-white">{selectedRequest.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Age</Label>
                                    <p className="text-white">{selectedRequest.age}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Experience</Label>
                                    <p className="text-white">{selectedRequest.experience}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Platform</Label>
                                    <p className="text-white">{selectedRequest.platform}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Gamertag</Label>
                                    <p className="text-white">{selectedRequest.gamertag}</p>
                                  </div>
                                  <div>
                                    <Label className="text-gray-400">Applied</Label>
                                    <p className="text-white">{selectedRequest.date}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Message</Label>
                                  <p className="text-white mt-2 p-4 bg-gray-900 rounded-md">{selectedRequest.message}</p>
                                </div>
                                {selectedRequest.status === "pending" && (
                                  <div className="flex gap-2 pt-4">
                                    <Button 
                                      onClick={() => handleAcceptRequest(selectedRequest.id)} 
                                      className="bg-green-600 hover:bg-green-700 flex-1"
                                    >
                                      <Check className="w-4 h-4 mr-2" />
                                      Accept Application
                                    </Button>
                                    <Button 
                                      onClick={() => handleRejectRequest(selectedRequest.id)}
                                      variant="outline" 
                                      className="border-red-600 text-red-400 hover:bg-red-600 flex-1"
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      Reject Application
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-400 hover:bg-red-600"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Processed Requests</h2>
            <div className="grid gap-4">
              {processedRequests.map((request) => (
                <Card key={request.id} className="bg-black/40 border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-white">{request.name}</h3>
                        <Badge className={`${getPositionColor(request.position)} text-white`}>
                          {request.position}
                        </Badge>
                        <Badge className={`${getStatusColor(request.status)} text-white`}>
                          {request.status}
                        </Badge>
                        <span className="text-gray-400 text-sm">{request.date}</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-600 text-gray-400 hover:bg-gray-600"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-red-400">Application Details</DialogTitle>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-400">Name</Label>
                                  <p className="text-white font-semibold">{selectedRequest.name}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Position</Label>
                                  <p className="text-white">{selectedRequest.position}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Email</Label>
                                  <p className="text-white">{selectedRequest.email}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Age</Label>
                                  <p className="text-white">{selectedRequest.age}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Experience</Label>
                                  <p className="text-white">{selectedRequest.experience}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Platform</Label>
                                  <p className="text-white">{selectedRequest.platform}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Gamertag</Label>
                                  <p className="text-white">{selectedRequest.gamertag}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Status</Label>
                                  <Badge className={`${getStatusColor(selectedRequest.status)} text-white`}>
                                    {selectedRequest.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-gray-400">Message</Label>
                                <p className="text-white mt-2 p-4 bg-gray-900 rounded-md">{selectedRequest.message}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <label className={className}>{children}</label>;
}