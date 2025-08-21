"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";

const achievements = [
  {
    year: "2024",
    title: "World e-Football Championship",
    description:
      "First place in the global tournament with a perfect 15-0 record",
    icon: Crown,
    color: "text-yellow-500",
  },
  {
    year: "2023",
    title: "Regional Champions League",
    description:
      "Dominated the regional competition with record-breaking performances",
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
];

export function AchievementsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4">
            Our Legacy
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A timeline of victories, records, and milestones that define our
            journey to the top
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99] as const,
            }}
            viewport={{ once: true, margin: "-200px" }}
          />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col gap-8`}
                variants={itemVariants}
              >
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className={`p-3 rounded-full bg-muted ${achievement.color}`}
                            initial={{ rotate: 0, scale: 0.8 }}
                            whileInView={{ rotate: 360, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: 0.2,
                              ease: [0.6, -0.05, 0.01, 0.99] as const,
                            }}
                            viewport={{ once: true }}
                          >
                            <achievement.icon className="h-6 w-6" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-semibold text-primary">
                                {achievement.year}
                              </span>
                            </div>
                            <h3 className="font-playfair font-bold text-xl mb-2">
                              {achievement.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="hidden md:block w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                />

                <div className="flex-1" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
