"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, Award, X } from "lucide-react";

const players = [
  {
    name: "CAPTAIN WHITEBEARD",
    role: "STRIKER",
    position: "ST",
    rating: 96,
    image: "/muscular-football-captain.png",
    nationality: "Tunisia",
    stats: {
      pace: 95,
      shooting: 98,
      passing: 85,
      defending: 50,
      dribbling: 92,
      physical: 95,
    },
    achievements: ["Clan Leader", "Terror of the Pitch"],
    specialty: "Ruthless Finishing",
  },
  {
    name: "RED DEMON",
    role: "MIDFIELDER",
    position: "CAM",
    rating: 94,
    image: "/intense-football-midfielder.png",
    nationality: "Tunisia",
    stats: {
      pace: 88,
      shooting: 90,
      passing: 96,
      defending: 75,
      dribbling: 95,
      physical: 82,
    },
    achievements: ["Master Tactician", "Fear Inducer"],
    specialty: "Mind Games",
  },
  {
    name: "IRON WALL",
    role: "DEFENDER",
    position: "CB",
    rating: 92,
    image: "/football-defender.png",
    nationality: "Tunisia",
    stats: {
      pace: 70,
      shooting: 40,
      passing: 80,
      defending: 98,
      dribbling: 68,
      physical: 96,
    },
    achievements: ["Unbreakable", "Nightmare Stopper"],
    specialty: "Intimidation",
  },
  {
    name: "SHADOW KEEPER",
    role: "GOALKEEPER",
    position: "GK",
    rating: 95,
    image: "/placeholder-v5j5t.png",
    nationality: "Tunisia",
    stats: {
      diving: 96,
      handling: 94,
      kicking: 82,
      reflexes: 98,
      speed: 72,
      positioning: 95,
    },
    achievements: ["Clan Guardian", "Untouchable"],
    specialty: "Supernatural Saves",
  },
];

// Function to get player biography based on their name
const getPlayerBio = (playerName: string) => {
  const bios: { [key: string]: string } = {
    "CAPTAIN WHITEBEARD":
      "The legendary leader of Barba Blanca FC, known for his devastating finishing ability and tactical brilliance. His presence on the field strikes fear into the hearts of opponents, and his leadership has guided the clan to countless victories.",
    "RED DEMON":
      "A master of mind games and tactical warfare, the Red Demon controls the midfield with supernatural precision. His ability to read the game and manipulate opponents' strategies has earned him the reputation as the most dangerous playmaker in the league.",
    "IRON WALL":
      "An unbreakable force in defense, the Iron Wall has never been truly defeated in one-on-one combat. His intimidating presence and perfect positioning make him the ultimate nightmare for any striker brave enough to challenge him.",
    "SHADOW KEEPER":
      "The guardian of Barba Blanca's goal, possessing reflexes that seem to defy human limitations. His supernatural saves and commanding presence in the box have kept the clan's goal secure in the most crucial moments.",
  };
  return (
    bios[playerName] ||
    "A formidable warrior of Barba Blanca FC, dedicated to the clan's dominance on the virtual pitch."
  );
};

export function PlayersShowcase() {
  return (
    <section id="players" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="font-playfair font-bold text-4xl md:text-6xl text-red-500">
              MEET THE CLAN
            </h2>
          </div>
          <p className="text-xl text-red-300 max-w-2xl mx-auto font-bold">
            WARRIORS WHO STRIKE FEAR INTO OPPONENTS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {players.map((player, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="player-card-glow group transition-all duration-500 hover:scale-105 bg-black/80 border-red-500/30 cursor-pointer">
                  <CardContent className="p-0 relative overflow-hidden">
                    <div className="relative">
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-red-600 to-red-800 p-3 text-center">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-bold text-2xl">
                            {player.rating}
                          </div>
                          <div className="text-white font-bold text-sm">
                            {player.position}
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-3 bg-red-600 rounded-sm border border-white"></div>
                          <div className="text-white font-bold text-xs tracking-wider">
                            {player.nationality}
                          </div>
                        </div>
                      </div>

                      {/* Player Image */}
                      <div className="relative bg-gradient-to-b from-red-900/20 to-black p-4">
                        <img
                          src={player.image || "/placeholder.svg"}
                          alt={player.name}
                          className="w-full h-48 object-cover rounded-lg border-2 border-red-500/50"
                        />
                        <Badge className="absolute top-2 right-2 bg-red-600 text-white font-bold">
                          {player.role}
                        </Badge>
                      </div>

                      {/* Player Info */}
                      <div className="p-4 bg-black/90">
                        <h3 className="font-bold text-red-400 text-sm mb-2 tracking-wider">
                          {player.name}
                        </h3>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                          {Object.entries(player.stats)
                            .slice(0, 6)
                            .map(([stat, value]) => (
                              <div key={stat} className="text-center">
                                <div className="text-red-400 font-bold">
                                  {value}
                                </div>
                                <div className="text-gray-400 uppercase text-xs">
                                  {stat.slice(0, 3)}
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Achievements */}
                        <div className="space-y-1 mb-3">
                          {player.achievements
                            .slice(0, 2)
                            .map((achievement, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs"
                              >
                                <Award className="h-3 w-3 text-yellow-500" />
                                <span className="text-gray-300">
                                  {achievement}
                                </span>
                              </div>
                            ))}
                        </div>

                        {/* Specialty */}
                        <div className="flex items-center gap-2 text-xs">
                          <Star className="h-3 w-3 text-red-500" />
                          <span className="text-red-400 font-bold">
                            {player.specialty}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="bg-gradient-to-r from-red-800 to-red-600 p-2 text-center">
                        <div className="text-white font-bold text-xs tracking-widest">
                          BARBA BLANCA FC - BRC
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Player Details Modal */}
              <DialogContent className="max-w-2xl bg-black/95 border-red-500 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-red-400 text-center">
                    {player.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Player Image */}
                  <div className="text-center">
                    <img
                      src={player.image || "/placeholder.svg"}
                      alt={player.name}
                      className="w-48 h-48 mx-auto object-cover rounded-lg border-2 border-red-500"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-gray-400 text-sm">Rating</div>
                        <div className="text-red-400 font-bold text-2xl">
                          {player.rating}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400 text-sm">Position</div>
                        <div className="text-white font-bold text-lg">
                          {player.position}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400 text-sm">Role</div>
                        <div className="text-white font-bold">
                          {player.role}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-400 text-sm">Specialty</div>
                        <div className="text-red-400 font-bold">
                          {player.specialty}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h3 className="text-red-400 font-bold mb-2">STATISTICS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(player.stats).map(([stat, value]) => (
                        <div key={stat} className="flex justify-between">
                          <span className="text-gray-400 capitalize">
                            {stat}:
                          </span>
                          <span className="text-red-400 font-bold">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-red-400 font-bold mb-2">
                      ACHIEVEMENTS
                    </h3>
                    <div className="space-y-1">
                      {player.achievements.map((achievement, i) => (
                        <p key={i} className="text-white text-sm">
                          • {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
