
// In-memory database system for the dashboard
// In production, replace with a real database like PostgreSQL

export interface TeamMember {
  id: number;
  name: string;
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
}

export interface DashboardSettings {
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

export interface Match {
  id: number;
  opponent: string;
  date: string;
  result?: string;
  score?: string;
  competition: string;
  status: 'upcoming' | 'live' | 'completed';
  venue?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'tournament' | 'milestone' | 'recognition';
  image?: string;
}

// Database storage
class Database {
  private teamMembers: TeamMember[] = [
    { id: 1, name: "CAPTAIN WHITEBEARD" },
    { id: 2, name: "RED DEMON" },
    { id: 3, name: "IRON WALL" },
    { id: 4, name: "SHADOW KEEPER" }
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
      excerpt: "Historic victory in the championship final"
    },
    { 
      id: 2, 
      title: "New Player Recruitment", 
      status: "draft", 
      date: "2024-03-02", 
      views: 0, 
      category: "Recruitment", 
      content: "Looking for new talent to join our ranks. We're seeking skilled players in midfielder and winger positions who can contribute to our success.",
      author: "Admin Tarek",
      tags: ["recruitment", "players", "opportunities"],
      excerpt: "Seeking talented players for key positions"
    },
    { 
      id: 3, 
      title: "Training Schedule Update", 
      status: "published", 
      date: "2024-03-03", 
      views: 950, 
      category: "Training", 
      content: "Updated training schedule for the upcoming season. All players must attend mandatory training sessions on Tuesdays and Thursdays.",
      author: "Admin Tarek",
      tags: ["training", "schedule", "team"],
      excerpt: "New training schedule announced"
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
      skillLevel: "Advanced"
    },
    { 
      id: 2, 
      name: "Maria Storm", 
      position: "Winger", 
      experience: "2 years", 
      status: "pending", 
      date: "2024-03-02", 
      email: "maria@email.com", 
      message: "Experienced winger looking for a competitive team to showcase my speed and agility.",
      age: 20,
      gamertag: "StormWing",
      platform: "Xbox Series X",
      skillLevel: "Intermediate"
    },
    { 
      id: 3, 
      name: "John Blaze", 
      position: "Defender", 
      experience: "4 years", 
      status: "pending", 
      date: "2024-03-03", 
      email: "john@email.com", 
      message: "Solid defender with leadership skills looking to join a championship-winning team.",
      age: 25,
      gamertag: "BlazeDefender",
      platform: "PC",
      skillLevel: "Expert"
    }
  ];

  private matches: Match[] = [
    {
      id: 1,
      opponent: "Fire Dragons FC",
      date: "2024-03-15",
      result: "won",
      score: "3-1",
      competition: "Champions League",
      status: "completed",
      venue: "Home"
    },
    {
      id: 2,
      opponent: "Thunder Bolts",
      date: "2024-03-22",
      competition: "League Cup",
      status: "upcoming",
      venue: "Away"
    }
  ];

  private achievements: Achievement[] = [
    {
      id: 1,
      title: "Champions League Winners",
      description: "Won the prestigious Champions League tournament",
      date: "2024-03-01",
      type: "tournament"
    },
    {
      id: 2,
      title: "100 Goals Milestone",
      description: "Team reached 100 goals this season",
      date: "2024-02-15",
      type: "milestone"
    }
  ];

  private settings: DashboardSettings = {
    teamName: "Barba Blanca FC",
    primaryColor: "#dc2626",
    secondaryColor: "#000000",
    description: "Elite e-sports football club dedicated to excellence and teamwork",
    socialLinks: {
      discord: "https://discord.gg/barbablanca",
      twitter: "https://twitter.com/barbablancafc",
      youtube: "https://youtube.com/@barbablancafc"
    },
    recruitmentOpen: true,
    maxTeamSize: 25
  };

  // Team Members methods
  getTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }

  addTeamMember(member: Omit<TeamMember, 'id'>): TeamMember {
    const newMember = {
      id: Date.now(),
      name: member.name
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
      views: 0
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
