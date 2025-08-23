
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Palette, 
  Settings, 
  Globe, 
  Users, 
  Trophy, 
  Calendar,
  Play,
  Edit,
  Plus,
  Save,
  X,
  Eye,
  Trash2,
  Upload,
  Download,
  Copy,
  Star,
  Target,
  Zap,
  Shield,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Camera,
  Video
} from "lucide-react";

// Import types from database
import { 
  TeamMember, 
  NewsArticle, 
  JoinRequest, 
  Match, 
  Achievement, 
  DashboardSettings, 
  Tournament,
  TrainingSession,
  Sponsor
} from "@/lib/database";

interface User {
  id: string;
  username: string;
  roles: string[];
  isAdmin: boolean;
}

export default function CustomizationPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("appearance");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Dialog states
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [isSponsorDialogOpen, setIsSponsorDialogOpen] = useState(false);
  const [isAdvancedDialogOpen, setIsAdvancedDialogOpen] = useState(false);

  // Data states
  const [settings, setSettings] = useState<DashboardSettings>({
    teamName: "Barba Blanca FC",
    primaryColor: "#dc2626",
    secondaryColor: "#000000",
    accentColor: "#ffffff",
    description: "",
    founded: "",
    headquarters: "",
    website: "",
    socialLinks: {},
    recruitmentOpen: true,
    maxTeamSize: 25,
    contactEmail: "",
    motto: "",
    achievements: [],
    sponsors: [],
    theme: "dark",
    customCSS: "",
    notifications: {
      emailNotifications: false,
      discordIntegration: false,
      autoAcceptRequests: false
    },
    gameSettings: {
      primaryGame: "",
      platforms: [],
      competitionLevel: "",
      trainingSchedule: ""
    }
  });

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);

  // Form states
  const [sponsorForm, setSponsorForm] = useState({
    name: "",
    logo: "",
    website: "",
    type: "partner" as const,
    contractValue: 0,
    contractEndDate: ""
  });

  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    status: "upcoming" as const,
    participants: 0,
    prizePool: "",
    format: "",
    rules: "",
    registrationDeadline: "",
    entryFee: 0
  });

  const [trainingForm, setTrainingForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: 60,
    type: "tactical" as const,
    location: "",
    coach: "",
    description: "",
    objectives: "",
    equipment: "",
    status: "scheduled" as const
  });

  // Options
  const themes = ["dark", "light", "custom"];
  const sponsorTypes = ["main", "secondary", "partner"];
  const competitionLevels = ["Beginner", "Intermediate", "Advanced", "Professional", "Elite"];
  const platforms = ["PlayStation 5", "Xbox Series X", "PC", "Nintendo Switch", "Mobile"];
  const tournamentTypes = ["League", "Knockout", "Swiss", "Round Robin"];
  const trainingTypes = ["tactical", "physical", "technical", "mental"];

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
      const [settingsRes, tournamentsRes, trainingRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/tournaments'),
        fetch('/api/training')
      ]);

      if (settingsRes.ok) {
        const { settings } = await settingsRes.json();
        setSettings(settings);
      }

      if (tournamentsRes.ok) {
        const { tournaments } = await tournamentsRes.json();
        setTournaments(tournaments);
      }

      if (trainingRes.ok) {
        const { trainingSessions } = await trainingRes.json();
        setTrainingSessions(trainingSessions);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    }
  };

  // Settings Management
  const handleUpdateSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
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

  // Sponsor Management
  const handleAddSponsor = () => {
    const newSponsor: Sponsor = {
      id: Date.now(),
      ...sponsorForm
    };
    setSettings({
      ...settings,
      sponsors: [...(settings.sponsors || []), newSponsor]
    });
    setSponsorForm({
      name: "",
      logo: "",
      website: "",
      type: "partner",
      contractValue: 0,
      contractEndDate: ""
    });
    setIsSponsorDialogOpen(false);
  };

  // Tournament Management
  const handleAddTournament = async () => {
    try {
      const response = await fetch('/api/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournamentForm)
      });

      if (response.ok) {
        const { tournament } = await response.json();
        setTournaments([...tournaments, tournament]);
        setTournamentForm({
          name: "",
          type: "",
          startDate: "",
          endDate: "",
          status: "upcoming",
          participants: 0,
          prizePool: "",
          format: "",
          rules: "",
          registrationDeadline: "",
          entryFee: 0
        });
        toast({
          title: "Success",
          description: "Tournament added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tournament",
        variant: "destructive",
      });
    }
  };

  // Training Management
  const handleAddTraining = async () => {
    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...trainingForm,
          objectives: trainingForm.objectives.split(',').map(o => o.trim()).filter(o => o),
          equipment: trainingForm.equipment.split(',').map(e => e.trim()).filter(e => e)
        })
      });

      if (response.ok) {
        const { session } = await response.json();
        setTrainingSessions([...trainingSessions, session]);
        setTrainingForm({
          title: "",
          date: "",
          time: "",
          duration: 60,
          type: "tactical",
          location: "",
          coach: "",
          description: "",
          objectives: "",
          equipment: "",
          status: "scheduled"
        });
        toast({
          title: "Success",
          description: "Training session added successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add training session",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center">
        <Card className="bg-black/60 border-red-800/50 p-8">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 animate-spin text-red-400" />
            <span className="text-white">Loading customization panel...</span>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2 font-serif">TEAM CUSTOMIZATION</h1>
          <p className="text-gray-300">Complete control over your team's appearance and features</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-black/50 border border-red-800/50 grid grid-cols-6 w-full">
            <TabsTrigger value="appearance" className="data-[state=active]:bg-red-600">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="team-info" className="data-[state=active]:bg-red-600">
              <Users className="w-4 h-4 mr-2" />
              Team Info
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-red-600">
              <Settings className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-red-600">
              <Trophy className="w-4 h-4 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-red-600">
              <Calendar className="w-4 h-4 mr-2" />
              Training
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-red-600">
              <Zap className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Color Scheme
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        className="w-20 h-10"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                        className="w-20 h-10"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                        className="w-20 h-10"
                      />
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value: any) => setSettings({...settings, theme: value})}>
                      <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-red-800">
                        {themes.map((theme) => (
                          <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Branding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Team Name</Label>
                    <Input
                      value={settings.teamName}
                      onChange={(e) => setSettings({...settings, teamName: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Team Logo URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={settings.teamLogo || ''}
                        onChange={(e) => setSettings({...settings, teamLogo: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white flex-1"
                        placeholder="https://example.com/logo.png"
                      />
                      <Button variant="outline" className="border-blue-600 text-blue-400">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Team Motto</Label>
                    <Input
                      value={settings.motto || ''}
                      onChange={(e) => setSettings({...settings, motto: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white"
                      placeholder="Unity, Strength, Victory"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Custom CSS</Label>
                    <Textarea
                      value={settings.customCSS || ''}
                      onChange={(e) => setSettings({...settings, customCSS: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white h-24"
                      placeholder="/* Custom CSS rules */"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Info Tab */}
          <TabsContent value="team-info" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Team Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Description</Label>
                    <Textarea
                      value={settings.description}
                      onChange={(e) => setSettings({...settings, description: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white h-24"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Founded</Label>
                      <Input
                        value={settings.founded || ''}
                        onChange={(e) => setSettings({...settings, founded: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        placeholder="2023"
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
                  </div>
                  <div>
                    <Label className="text-white">Headquarters</Label>
                    <Input
                      value={settings.headquarters || ''}
                      onChange={(e) => setSettings({...settings, headquarters: e.target.value})}
                      className="bg-gray-900 border-red-800 text-white"
                      placeholder="Madrid, Spain"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Website</Label>
                      <Input
                        value={settings.website || ''}
                        onChange={(e) => setSettings({...settings, website: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                        placeholder="https://team.com"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Contact Email</Label>
                      <Input
                        type="email"
                        value={settings.contactEmail || ''}
                        onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Social Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Discord</Label>
                    <Input
                      value={settings.socialLinks.discord || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialLinks: {...settings.socialLinks, discord: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Twitter</Label>
                    <Input
                      value={settings.socialLinks.twitter || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialLinks: {...settings.socialLinks, twitter: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">YouTube</Label>
                    <Input
                      value={settings.socialLinks.youtube || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialLinks: {...settings.socialLinks, youtube: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Twitch</Label>
                    <Input
                      value={settings.socialLinks.twitch || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialLinks: {...settings.socialLinks, twitch: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Instagram</Label>
                    <Input
                      value={settings.socialLinks.instagram || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        socialLinks: {...settings.socialLinks, instagram: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Game Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Primary Game</Label>
                    <Input
                      value={settings.gameSettings?.primaryGame || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        gameSettings: {...settings.gameSettings, primaryGame: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                      placeholder="FIFA 24"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Competition Level</Label>
                    <Select 
                      value={settings.gameSettings?.competitionLevel || ''} 
                      onValueChange={(value) => setSettings({
                        ...settings,
                        gameSettings: {...settings.gameSettings, competitionLevel: value}
                      })}
                    >
                      <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-red-800">
                        {competitionLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Training Schedule</Label>
                    <Input
                      value={settings.gameSettings?.trainingSchedule || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        gameSettings: {...settings.gameSettings, trainingSchedule: e.target.value}
                      })}
                      className="bg-gray-900 border-red-800 text-white"
                      placeholder="Tuesday & Thursday 18:00 UTC"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Supported Platforms</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {platforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            id={platform}
                            checked={settings.gameSettings?.platforms?.includes(platform) || false}
                            onCheckedChange={(checked) => {
                              const currentPlatforms = settings.gameSettings?.platforms || [];
                              const newPlatforms = checked
                                ? [...currentPlatforms, platform]
                                : currentPlatforms.filter(p => p !== platform);
                              setSettings({
                                ...settings,
                                gameSettings: {...settings.gameSettings, platforms: newPlatforms}
                              });
                            }}
                            className="border-red-600"
                          />
                          <Label htmlFor={platform} className="text-white text-sm">{platform}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recruitment"
                      checked={settings.recruitmentOpen}
                      onCheckedChange={(checked) => setSettings({...settings, recruitmentOpen: checked as boolean})}
                      className="border-red-600"
                    />
                    <Label htmlFor="recruitment" className="text-white">Recruitment Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailNotifications"
                      checked={settings.notifications?.emailNotifications || false}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        notifications: {...settings.notifications, emailNotifications: checked as boolean}
                      })}
                      className="border-red-600"
                    />
                    <Label htmlFor="emailNotifications" className="text-white">Email Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="discordIntegration"
                      checked={settings.notifications?.discordIntegration || false}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        notifications: {...settings.notifications, discordIntegration: checked as boolean}
                      })}
                      className="border-red-600"
                    />
                    <Label htmlFor="discordIntegration" className="text-white">Discord Integration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoAccept"
                      checked={settings.notifications?.autoAcceptRequests || false}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        notifications: {...settings.notifications, autoAcceptRequests: checked as boolean}
                      })}
                      className="border-red-600"
                    />
                    <Label htmlFor="autoAccept" className="text-white">Auto-Accept Join Requests</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sponsors Section */}
            <Card className="bg-black/60 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Sponsors
                  </div>
                  <Dialog open={isSponsorDialogOpen} onOpenChange={setIsSponsorDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Sponsor
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-red-800">
                      <DialogHeader>
                        <DialogTitle className="text-red-400">Add New Sponsor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white">Sponsor Name</Label>
                          <Input
                            value={sponsorForm.name}
                            onChange={(e) => setSponsorForm({...sponsorForm, name: e.target.value})}
                            className="bg-gray-900 border-red-800 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Logo URL</Label>
                          <Input
                            value={sponsorForm.logo}
                            onChange={(e) => setSponsorForm({...sponsorForm, logo: e.target.value})}
                            className="bg-gray-900 border-red-800 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Website</Label>
                          <Input
                            value={sponsorForm.website}
                            onChange={(e) => setSponsorForm({...sponsorForm, website: e.target.value})}
                            className="bg-gray-900 border-red-800 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Type</Label>
                          <Select value={sponsorForm.type} onValueChange={(value: any) => setSponsorForm({...sponsorForm, type: value})}>
                            <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-red-800">
                              {sponsorTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddSponsor} className="bg-red-600 hover:bg-red-700 w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Add Sponsor
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {settings.sponsors?.map((sponsor) => (
                    <div key={sponsor.id} className="bg-gray-900/50 border border-gray-700 rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{sponsor.name}</h4>
                        <Badge className={`${sponsor.type === 'main' ? 'bg-gold-600' : sponsor.type === 'secondary' ? 'bg-silver-600' : 'bg-bronze-600'} text-white`}>
                          {sponsor.type}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{sponsor.website}</p>
                      {sponsor.contractValue && (
                        <p className="text-green-400 text-sm">${sponsor.contractValue.toLocaleString()}</p>
                      )}
                    </div>
                  )) || []}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Tournament Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Tournament
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Create New Tournament</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Tournament Name</Label>
                        <Input
                          value={tournamentForm.name}
                          onChange={(e) => setTournamentForm({...tournamentForm, name: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Type</Label>
                        <Select value={tournamentForm.type} onValueChange={(value) => setTournamentForm({...tournamentForm, type: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {tournamentTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Start Date</Label>
                        <Input
                          type="date"
                          value={tournamentForm.startDate}
                          onChange={(e) => setTournamentForm({...tournamentForm, startDate: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">End Date</Label>
                        <Input
                          type="date"
                          value={tournamentForm.endDate}
                          onChange={(e) => setTournamentForm({...tournamentForm, endDate: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Participants</Label>
                        <Input
                          type="number"
                          value={tournamentForm.participants}
                          onChange={(e) => setTournamentForm({...tournamentForm, participants: parseInt(e.target.value)})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Prize Pool</Label>
                        <Input
                          value={tournamentForm.prizePool}
                          onChange={(e) => setTournamentForm({...tournamentForm, prizePool: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                          placeholder="$10,000"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddTournament} className="bg-red-600 hover:bg-red-700 w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Create Tournament
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                          <Badge className={`${tournament.status === 'ongoing' ? 'bg-green-600' : tournament.status === 'upcoming' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}>
                            {tournament.status}
                          </Badge>
                          <Badge className="bg-purple-600 text-white">
                            {tournament.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Start:</span>
                            <span className="text-white ml-2">{tournament.startDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">End:</span>
                            <span className="text-white ml-2">{tournament.endDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Participants:</span>
                            <span className="text-white ml-2">{tournament.participants}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Prize:</span>
                            <span className="text-white ml-2">{tournament.prizePool}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Training Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Training
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-red-800 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Schedule Training Session</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div>
                      <Label className="text-white">Session Title</Label>
                      <Input
                        value={trainingForm.title}
                        onChange={(e) => setTrainingForm({...trainingForm, title: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white">Date</Label>
                        <Input
                          type="date"
                          value={trainingForm.date}
                          onChange={(e) => setTrainingForm({...trainingForm, date: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Time</Label>
                        <Input
                          type="time"
                          value={trainingForm.time}
                          onChange={(e) => setTrainingForm({...trainingForm, time: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Duration (min)</Label>
                        <Input
                          type="number"
                          value={trainingForm.duration}
                          onChange={(e) => setTrainingForm({...trainingForm, duration: parseInt(e.target.value)})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Type</Label>
                        <Select value={trainingForm.type} onValueChange={(value: any) => setTrainingForm({...trainingForm, type: value})}>
                          <SelectTrigger className="bg-gray-900 border-red-800 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-red-800">
                            {trainingTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Location</Label>
                        <Input
                          value={trainingForm.location}
                          onChange={(e) => setTrainingForm({...trainingForm, location: e.target.value})}
                          className="bg-gray-900 border-red-800 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">Coach</Label>
                      <Input
                        value={trainingForm.coach}
                        onChange={(e) => setTrainingForm({...trainingForm, coach: e.target.value})}
                        className="bg-gray-900 border-red-800 text-white"
                      />
                    </div>
                    <Button onClick={handleAddTraining} className="bg-red-600 hover:bg-red-700 w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Schedule Session
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {trainingSessions.map((session) => (
                <Card key={session.id} className="bg-black/60 border-red-800/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{session.title}</h3>
                          <Badge className={`${session.status === 'completed' ? 'bg-green-600' : session.status === 'scheduled' ? 'bg-blue-600' : 'bg-red-600'} text-white`}>
                            {session.status}
                          </Badge>
                          <Badge className="bg-purple-600 text-white">
                            {session.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white ml-2">{session.date}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Time:</span>
                            <span className="text-white ml-2">{session.time}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Duration:</span>
                            <span className="text-white ml-2">{session.duration}min</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Coach:</span>
                            <span className="text-white ml-2">{session.coach}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-600 w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Clone Configuration
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Cache</span>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400">Clear</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Database</span>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">Optimize</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Images</span>
                    <Button size="sm" variant="outline" className="border-green-600 text-green-400">Compress</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <Button onClick={handleUpdateSettings} className="bg-red-600 hover:bg-red-700 shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
