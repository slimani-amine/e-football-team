"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Target, Zap, Crown } from "lucide-react";

const highlights = [
  {
    id: 1,
    title: "Championship Final Domination",
    description: "BRC destroys opponents 6-0 in the grand final",
    thumbnail: "/football-championship-red-jerseys.png",
    videoUrl: "https://www.youtube.com/embed/ZPCfoCVCx3U", // FIFA highlights
    duration: "3:45",
    views: "125K",
    category: "Championship",
    icon: <Crown className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Captain Whitebeard's Hat-Trick",
    description: "Unstoppable performance in the semi-finals",
    thumbnail: "/football-goal-celebration.png",
    videoUrl: "https://www.youtube.com/watch?v=XUPBeAy6Rn0", // Football highlights
    duration: "2:30",
    views: "89K",
    category: "Goals",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Red Demon's Lightning Speed",
    description: "Incredible solo run and finish",
    thumbnail: "/football-player-speed.png",
    videoUrl: "https://www.youtube.com/embed/tYpwjB0IzoU", // Football skills
    duration: "1:15",
    views: "156K",
    category: "Skills",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Unbeaten Season Highlights",
    description: "Best moments from our perfect season",
    thumbnail: "/football-team-celebration.png",
    videoUrl: "https://www.youtube.com/embed/h4_uC-gpqPw", // Season highlights
    duration: "8:20",
    views: "203K",
    category: "Season",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Shadow Striker's Best Goals",
    description: "Compilation of unstoppable strikes",
    thumbnail: "/placeholder-scohq.png",
    videoUrl: "https://www.youtube.com/embed/ZPCfoCVCx3U", // Goal compilation
    duration: "4:12",
    views: "98K",
    category: "Goals",
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Iron Wall Defense",
    description: "How we kept 15 clean sheets in a row",
    thumbnail: "/football-goalkeeper-save.png",
    videoUrl: "https://www.youtube.com/embed/5xzaWzszX8w", // Defense highlights
    duration: "3:55",
    views: "67K",
    category: "Defense",
    icon: <Zap className="w-5 h-5" />,
  },
];

const categories = [
  "All",
  "Championship",
  "Goals",
  "Skills",
  "Season",
  "Defense",
];

export function HighlightsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredHighlights =
    selectedCategory === "All"
      ? highlights
      : highlights.filter((h) => h.category === selectedCategory);

  const handleVideoClick = (id: number) => {
    setSelectedVideo(id);
    console.log("[v0] Playing video:", id);
    // Scroll to the featured video section smoothly
    setTimeout(() => {
      const featuredSection = document.querySelector(".featured-video-section");
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    // Here you would integrate with a video player
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            } transition-all duration-300`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Video */}
      {selectedVideo && (
        <Card className="featured-video-section bg-black/80 border-red-600 border-2 shadow-2xl shadow-red-900/50 relative">
          <CardContent className="p-6">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-8 right-4 z-10 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Close video"
            >
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
              {selectedVideo &&
                (() => {
                  const videoUrl =
                    highlights.find((h) => h.id === selectedVideo)?.videoUrl ||
                    "";
                  // Convert YouTube URL to embed format
                  const embedUrl = videoUrl.includes("youtube.com/watch?v=")
                    ? videoUrl.replace(
                        "youtube.com/watch?v=",
                        "youtube.com/embed/"
                      )
                    : videoUrl.includes("youtu.be/")
                    ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
                    : videoUrl;

                  return (
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  );
                })()}
            </div>
            <div className="text-center mb-4">
              <h3 className="text-white text-xl font-bold mb-2">
                {highlights.find((h) => h.id === selectedVideo)?.title}
              </h3>
              <p className="text-gray-400">
                {highlights.find((h) => h.id === selectedVideo)?.description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHighlights.map((highlight) => (
          <Card
            key={highlight.id}
            className="bg-black/80 border-red-800 hover:border-red-500 transition-all duration-300 cursor-pointer group hover:scale-105"
            onClick={() => handleVideoClick(highlight.id)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={highlight.thumbnail || "/placeholder.svg"}
                  alt={highlight.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-12 h-12 text-red-500" />
                </div>
                <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {highlight.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-600 text-white">
                    {highlight.icon}
                    <span className="ml-1">{highlight.category}</span>
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-red-400 mb-2 font-serif">
                  {highlight.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {highlight.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{highlight.views} views</span>
                  <span className="text-red-400">▶ Watch Now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Card className="bg-gradient-to-r from-red-900/50 to-black/50 border-red-600 border-2">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-red-500 mb-4 font-serif">
              WANT TO BE IN THE NEXT HIGHLIGHT REEL?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              {
                "Join Barba Blanca Football and become part of our legendary moments"
              }
            </p>
            <Button
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-8 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "/join")}
            >
              🔥 JOIN THE CLAN 🔥
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
