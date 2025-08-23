"use client";

import { Calendar, Trophy, Megaphone, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "BARBA BLANCA CHAMPIONSHIP FINAL",
    description: "The warriors of Barba Blanca FC are preparing for the fiercest battle yet! Witness strategy, power, and pure determination as our clan strikes fear into the hearts of their rivals.",
    date: "Sunday, March 2 - 18:00",
    category: "Tournament",
    priority: "high",
    image: "/images/stadium-scene.png",
    readTime: "3 min read",
    views: "2.5K"
  },
  {
    id: 2,
    title: "NEW PLAYER RECRUITMENT OPEN",
    description: "We're looking for skilled warriors to join our ranks. Applications are now open for dedicated players who want to dominate the field.",
    date: "Monday, March 4 - 12:00",
    category: "Recruitment",
    priority: "medium",
    image: "/images/clan-poster.png",
    readTime: "2 min read",
    views: "1.8K"
  },
  {
    id: 3,
    title: "TRAINING SESSION SCHEDULE",
    description: "Weekly training sessions have been updated. All clan members are expected to participate in skill development and strategy sessions.",
    date: "Wednesday, March 6 - 20:00",
    category: "Training",
    priority: "normal",
    image: "/football-team-celebration.png",
    readTime: "1 min read",
    views: "950"
  }
];

export function News() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-600 text-white";
      case "medium": return "bg-orange-500 text-white";
      default: return "bg-blue-500 text-white";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tournament": return <Trophy className="w-4 h-4" />;
      case "Recruitment": return <Users className="w-4 h-4" />;
      case "Training": return <Megaphone className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="news"
      className="py-20 bg-gradient-to-b from-black via-red-950 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-red-500 mb-4 drop-shadow-lg">
            CLAN NEWS & UPDATES
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, tournaments, and clan activities
          </p>
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-red-900/80 to-black/80 border-red-600/50 border-2 overflow-hidden group hover:scale-[1.02] transition-all duration-500 shadow-2xl shadow-red-900/30">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img 
                  src={newsItems[0].image || "/placeholder.svg"} 
                  alt={newsItems[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className={`absolute top-4 left-4 ${getPriorityColor(newsItems[0].priority)}`}>
                  FEATURED
                </Badge>
              </div>
              <CardContent className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  {getCategoryIcon(newsItems[0].category)}
                  <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">
                    {newsItems[0].category}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
                  {newsItems[0].title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {newsItems[0].description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{newsItems[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{newsItems[0].readTime}</span>
                    </div>
                  </div>
                  <span>{newsItems[0].views} views</span>
                </div>
                
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold w-fit">
                  Read Full Article
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.slice(1).map((news, index) => (
            <Card 
              key={news.id} 
              className="bg-black/60 border-red-800/50 hover:border-red-500/70 transition-all duration-300 group hover:scale-105 overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={news.image || "/placeholder.svg"} 
                  alt={news.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <Badge className={`absolute top-3 right-3 ${getPriorityColor(news.priority)}`}>
                  {news.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(news.category)}
                  <span className="text-red-400 font-semibold text-xs uppercase tracking-wider">
                    {news.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-serif group-hover:text-red-400 transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {news.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                  <span>{news.views} views</span>
                </div>
                
                <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-red-900/50 to-black/50 border-red-600 border-2 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-red-500 mb-4 font-serif">
                STAY IN THE LOOP
              </h3>
              <p className="text-gray-300 mb-6">
                Never miss important clan updates and tournament announcements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                  Subscribe to Updates
                </Button>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                  View All News
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}