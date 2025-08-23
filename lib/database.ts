
// In-memory database system for the dashboard
// In production, replace with a real database like PostgreSQL

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  status: string;
  joinDate: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  nationality?: string;
  age?: number;
  stats?: {
    goals: number;
    assists: number;
    matches: number;
    rating: number;
    yellowCards: number;
    redCards: number;
    playtime: number;
  };
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    twitch?: string;
  };
  achievements?: string[];
  preferredPosition?: string;
  contractEndDate?: string;
  salary?: number;
}

export interface NewsArticle {
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
  featured?: boolean;
  publishDate?: string;
  lastModified?: string;
  readTime?: number;
  likes?: number;
  comments?: Comment[];
  metaDescription?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

export interface JoinRequest {
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
  availableDays?: string[];
  timezone?: string;
  languages?: string[];
  previousTeams?: string[];
  preferredRole?: string;
  motivation?: string;
  videoLink?: string;
  socialProof?: string;
  phoneNumber?: string;
  nationality?: string;
}

export interface DashboardSettings {
  teamName: string;
  teamLogo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  description: string;
  founded?: string;
  headquarters?: string;
  website?: string;
  socialLinks: {
    discord?: string;
    twitter?: string;
    youtube?: string;
    twitch?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  recruitmentOpen: boolean;
  maxTeamSize: number;
  contactEmail?: string;
  motto?: string;
  achievements?: string[];
  sponsors?: Sponsor[];
  theme?: 'dark' | 'light' | 'custom';
  customCSS?: string;
  notifications?: {
    emailNotifications: boolean;
    discordIntegration: boolean;
    autoAcceptRequests: boolean;
  };
  gameSettings?: {
    primaryGame: string;
    platforms: string[];
    competitionLevel: string;
    trainingSchedule: string;
  };
}

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  type: 'main' | 'secondary' | 'partner';
  contractValue?: number;
  contractEndDate?: string;
}

export interface Match {
  id: number;
  opponent: string;
  opponentLogo?: string;
  date: string;
  time?: string;
  result?: string;
  score?: string;
  competition: string;
  status: 'upcoming' | 'live' | 'completed' | 'postponed' | 'cancelled';
  venue?: string;
  importance?: 'friendly' | 'league' | 'tournament' | 'championship';
  liveStream?: string;
  ticketInfo?: string;
  weather?: string;
  attendance?: number;
  highlights?: string;
  matchReport?: string;
  playerRatings?: {[playerId: number]: number};
  formations?: {
    our: string;
    opponent: string;
  };
  statistics?: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
    yellowCards: number;
    redCards: number;
  };
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'tournament' | 'milestone' | 'recognition' | 'individual' | 'team';
  image?: string;
  importance?: 'bronze' | 'silver' | 'gold' | 'platinum';
  competition?: string;
  prize?: string;
  participants?: string[];
  proof?: string;
  celebrationVideo?: string;
}

export interface Tournament {
  id: number;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: number;
  prizePool?: string;
  format: string;
  rules?: string;
  registrationDeadline?: string;
  entryFee?: number;
  contactPerson?: string;
}

export interface TrainingSession {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: 'tactical' | 'physical' | 'technical' | 'mental';
  location?: string;
  coach: string;
  attendees?: number[];
  description?: string;
  objectives?: string[];
  equipment?: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

// Database storage
class Database {
  private teamMembers: TeamMember[] = [
    { 
      id: 1, 
      name: "CAPTAIN WHITEBEARD",
      position: "Captain",
      status: "active",
      joinDate: "2023-01-15",
      email: "captain@barbablanca.com",
      phone: "+1234567890",
      bio: "Legendary captain with exceptional leadership skills",
      nationality: "Spain",
      age: 28,
      stats: {
        goals: 45,
        assists: 32,
        matches: 120,
        rating: 9.2,
        yellowCards: 8,
        redCards: 0,
        playtime: 10800
      },
      achievements: ["Champion 2023", "Best Captain Award"],
      preferredPosition: "Attacking Midfielder",
      contractEndDate: "2025-12-31"
    },
    { 
      id: 2, 
      name: "RED DEMON",
      position: "Striker",
      status: "active",
      joinDate: "2023-03-20",
      email: "striker@barbablanca.com",
      phone: "+1234567891",
      bio: "Fierce striker known for powerful shots",
      nationality: "Brazil",
      age: 25,
      stats: {
        goals: 67,
        assists: 18,
        matches: 98,
        rating: 8.9,
        yellowCards: 12,
        redCards: 1,
        playtime: 8820
      }
    }
  ];

  private newsArticles: NewsArticle[] = [
    { 
      id: 1, 
      title: "Championship Final Victory", 
      status: "published", 
      date: "2024-03-01", 
      views: 2500, 
      category: "Tournament", 
      content: "We dominated the championship final with a spectacular 3-1 victory against our rivals. The team showed incredible teamwork and determination throughout the match.",
      author: "Admin Tarek",
      tags: ["championship", "victory", "tournament"],
      excerpt: "Historic victory in the championship final",
      featured: true,
      publishDate: "2024-03-01",
      readTime: 5,
      likes: 245,
      priority: "high"
    }
  ];

  private joinRequests: JoinRequest[] = [
    { 
      id: 1, 
      name: "Alex Thunder", 
      position: "Midfielder", 
      experience: "3 years", 
      status: "pending", 
      date: "2024-03-01", 
      email: "alex@email.com", 
      message: "I want to join your clan and contribute to the team's success with my midfield skills.",
      age: 22,
      gamertag: "ThunderStrike",
      platform: "PlayStation 5",
      skillLevel: "Advanced",
      timezone: "UTC+1",
      languages: ["English", "Spanish"],
      nationality: "Germany"
    }
  ];

  private matches: Match[] = [
    {
      id: 1,
      opponent: "Fire Dragons FC",
      date: "2024-03-15",
      time: "20:00",
      result: "won",
      score: "3-1",
      competition: "Champions League",
      status: "completed",
      venue: "Home",
      importance: "championship",
      attendance: 5000,
      statistics: {
        possession: 65,
        shots: 18,
        shotsOnTarget: 12,
        corners: 8,
        fouls: 14,
        yellowCards: 3,
        redCards: 0
      }
    }
  ];

  private achievements: Achievement[] = [
    {
      id: 1,
      title: "Champions League Winners",
      description: "Won the prestigious Champions League tournament after an intense final",
      date: "2024-03-01",
      type: "tournament",
      importance: "gold",
      competition: "Champions League 2024",
      prize: "$50,000"
    }
  ];

  private tournaments: Tournament[] = [
    {
      id: 1,
      name: "Spring Championship 2024",
      type: "League Tournament",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      status: "upcoming",
      participants: 16,
      prizePool: "$100,000",
      format: "Double Elimination",
      registrationDeadline: "2024-03-25"
    }
  ];

  private trainingSessions: TrainingSession[] = [
    {
      id: 1,
      title: "Tactical Formation Training",
      date: "2024-03-20",
      time: "18:00",
      duration: 120,
      type: "tactical",
      location: "Training Ground A",
      coach: "Coach Martinez",
      status: "scheduled",
      objectives: ["Practice 4-3-3 formation", "Improve passing combinations"]
    }
  ];

  private settings: DashboardSettings = {
    teamName: "Barba Blanca FC",
    primaryColor: "#dc2626",
    secondaryColor: "#000000",
    accentColor: "#ffffff",
    description: "Elite e-sports football club dedicated to excellence and teamwork",
    founded: "2023",
    headquarters: "Madrid, Spain",
    motto: "Unity, Strength, Victory",
    socialLinks: {
      discord: "https://discord.gg/barbablanca",
      twitter: "https://twitter.com/barbablancafc",
      youtube: "https://youtube.com/@barbablancafc",
      instagram: "https://instagram.com/barbablancafc"
    },
    recruitmentOpen: true,
    maxTeamSize: 25,
    contactEmail: "contact@barbablanca.com",
    theme: "dark",
    notifications: {
      emailNotifications: true,
      discordIntegration: true,
      autoAcceptRequests: false
    },
    gameSettings: {
      primaryGame: "FIFA 24",
      platforms: ["PlayStation 5", "Xbox Series X", "PC"],
      competitionLevel: "Professional",
      trainingSchedule: "Tuesday & Thursday 18:00 UTC"
    },
    sponsors: [
      {
        id: 1,
        name: "Gaming Tech Pro",
        logo: "/gaming-tech-logo.png",
        website: "https://gamingtechpro.com",
        type: "main",
        contractValue: 25000,
        contractEndDate: "2024-12-31"
      }
    ]
  };

  // Team Members methods
  getTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }

  addTeamMember(member: Omit<TeamMember, 'id'>): TeamMember {
    const newMember = {
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      ...member
    };
    this.teamMembers.push(newMember);
    return newMember;
  }

  updateTeamMember(id: number, updates: Partial<TeamMember>): boolean {
    const index = this.teamMembers.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.teamMembers[index] = { ...this.teamMembers[index], ...updates };
    return true;
  }

  deleteTeamMember(id: number): boolean {
    const index = this.teamMembers.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.teamMembers.splice(index, 1);
    return true;
  }

  // News methods
  getNewsArticles(): NewsArticle[] {
    return this.newsArticles;
  }

  addNewsArticle(article: Omit<NewsArticle, 'id' | 'date' | 'views'>): NewsArticle {
    const newArticle = {
      ...article,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: []
    };
    this.newsArticles.push(newArticle);
    return newArticle;
  }

  updateNewsArticle(id: number, updates: Partial<NewsArticle>): boolean {
    const index = this.newsArticles.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.newsArticles[index] = { ...this.newsArticles[index], ...updates };
    return true;
  }

  deleteNewsArticle(id: number): boolean {
    const index = this.newsArticles.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.newsArticles.splice(index, 1);
    return true;
  }

  // Join Requests methods
  getJoinRequests(): JoinRequest[] {
    return this.joinRequests;
  }

  addJoinRequest(request: Omit<JoinRequest, 'id' | 'date' | 'status'>): JoinRequest {
    const newRequest = {
      ...request,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    this.joinRequests.push(newRequest);
    return newRequest;
  }

  updateJoinRequest(id: number, updates: Partial<JoinRequest>): boolean {
    const index = this.joinRequests.findIndex(r => r.id === id);
    if (index === -1) return false;
    this.joinRequests[index] = { ...this.joinRequests[index], ...updates };
    return true;
  }

  // Matches methods
  getMatches(): Match[] {
    return this.matches;
  }

  addMatch(match: Omit<Match, 'id'>): Match {
    const newMatch = {
      ...match,
      id: Date.now()
    };
    this.matches.push(newMatch);
    return newMatch;
  }

  updateMatch(id: number, updates: Partial<Match>): boolean {
    const index = this.matches.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.matches[index] = { ...this.matches[index], ...updates };
    return true;
  }

  deleteMatch(id: number): boolean {
    const index = this.matches.findIndex(m => m.id === id);
    if (index === -1) return false;
    this.matches.splice(index, 1);
    return true;
  }

  // Achievements methods
  getAchievements(): Achievement[] {
    return this.achievements;
  }

  addAchievement(achievement: Omit<Achievement, 'id'>): Achievement {
    const newAchievement = {
      ...achievement,
      id: Date.now()
    };
    this.achievements.push(newAchievement);
    return newAchievement;
  }

  updateAchievement(id: number, updates: Partial<Achievement>): boolean {
    const index = this.achievements.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.achievements[index] = { ...this.achievements[index], ...updates };
    return true;
  }

  deleteAchievement(id: number): boolean {
    const index = this.achievements.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.achievements.splice(index, 1);
    return true;
  }

  // Tournament methods
  getTournaments(): Tournament[] {
    return this.tournaments;
  }

  addTournament(tournament: Omit<Tournament, 'id'>): Tournament {
    const newTournament = {
      ...tournament,
      id: Date.now()
    };
    this.tournaments.push(newTournament);
    return newTournament;
  }

  updateTournament(id: number, updates: Partial<Tournament>): boolean {
    const index = this.tournaments.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tournaments[index] = { ...this.tournaments[index], ...updates };
    return true;
  }

  deleteTournament(id: number): boolean {
    const index = this.tournaments.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tournaments.splice(index, 1);
    return true;
  }

  // Training Session methods
  getTrainingSessions(): TrainingSession[] {
    return this.trainingSessions;
  }

  addTrainingSession(session: Omit<TrainingSession, 'id'>): TrainingSession {
    const newSession = {
      ...session,
      id: Date.now()
    };
    this.trainingSessions.push(newSession);
    return newSession;
  }

  updateTrainingSession(id: number, updates: Partial<TrainingSession>): boolean {
    const index = this.trainingSessions.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.trainingSessions[index] = { ...this.trainingSessions[index], ...updates };
    return true;
  }

  deleteTrainingSession(id: number): boolean {
    const index = this.trainingSessions.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.trainingSessions.splice(index, 1);
    return true;
  }

  // Settings methods
  getSettings(): DashboardSettings {
    return this.settings;
  }

  updateSettings(updates: Partial<DashboardSettings>): boolean {
    this.settings = { ...this.settings, ...updates };
    return true;
  }
}

// Singleton instance
export const database = new Database();
