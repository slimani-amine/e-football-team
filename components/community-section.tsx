"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Heart, Share2 } from "lucide-react";
import CountUp from "react-countup";

const testimonials = [
  {
    name: "Jake_Gamer23",
    message:
      "Barba Blanca Football Club (BRC) inspired me to take e-football seriously. Their gameplay is incredible!",
    avatar: "/gaming-avatar-profile.png",
  },
  {
    name: "FootballFan_Sarah",
    message:
      "Best team in the league! Their coordination and strategy is unmatched.",
    avatar: "/female-gamer-avatar.png",
  },
  {
    name: "ProGamer_Mike",
    message:
      "Following Barba Blanca Football Club (BRC) has made me a better player. True legends!",
    avatar: "/esports-fan-avatar.png",
  },
];

const communityStats = [
  {
    icon: Users,
    label: "Community Members",
    value: "25,000+",
    countValue: 25000,
    suffix: "+",
  },
  {
    icon: MessageCircle,
    label: "Discord Active",
    value: "5,000+",
    countValue: 5000,
    suffix: "+",
  },
  {
    icon: Heart,
    label: "Social Followers",
    value: "100,000+",
    countValue: 100000,
    suffix: "+",
  },
  {
    icon: Share2,
    label: "Monthly Views",
    value: "2M+",
    countValue: 2,
    suffix: "M+",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with thousands of fans, share strategies, and be part of the
            Barba Blanca Football Club (BRC) family
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">
                  <CountUp
                    end={stat.countValue}
                    duration={2.5}
                    delay={index * 0.2}
                    suffix={stat.suffix}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="font-playfair font-bold text-2xl text-center mb-8">
            What Our Fans Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6">
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
}
