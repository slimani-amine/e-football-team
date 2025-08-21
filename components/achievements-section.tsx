import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Star, Crown } from "lucide-react"

const achievements = [
  {
    year: "2024",
    title: "World e-Football Championship",
    description: "First place in the global tournament with a perfect 15-0 record",
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    year: "2023",
    title: "Regional Champions League",
    description: "Dominated the regional competition with record-breaking performances",
    icon: Trophy,
    color: "text-primary",
  },
  {
    year: "2023",
    title: "Best Team Coordination Award",
    description: "Recognized for exceptional teamwork and strategic gameplay",
    icon: Star,
    color: "text-blue-500",
  },
  {
    year: "2022",
    title: "Rookie Team of the Year",
    description: "Outstanding debut season with multiple tournament victories",
    icon: Medal,
    color: "text-orange-500",
  },
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4">Our Legacy</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A timeline of victories, records, and milestones that define our journey to the top
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />

          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col gap-8`}
              >
                <div className="flex-1">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full bg-muted ${achievement.color}`}>
                          <achievement.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-primary">{achievement.year}</span>
                          </div>
                          <h3 className="font-playfair font-bold text-xl mb-2">{achievement.title}</h3>
                          <p className="text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
