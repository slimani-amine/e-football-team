import { Card, CardContent } from "@/components/ui/card";

const sponsors = [
  {
    name: "GameTech Pro",
    logo: "/gaming-tech-logo.png",
    tier: "Title Sponsor",
  },
  {
    name: "EliteGear",
    logo: "/gaming-equipment-logo.png",
    tier: "Equipment Partner",
  },
  {
    name: "StreamMax",
    logo: "/generic-streaming-logo.png",
    tier: "Streaming Partner",
  },
  {
    name: "EnergyBoost",
    logo: "/generic-energy-drink-logo.png",
    tier: "Official Drink",
  },
];

export function SponsorsSection() {
  return (
    <section id="sponsors" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proud to work with industry-leading brands that support our journey
            to excellence
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
            {sponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-none"
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={sponsor.name}
                    className="w-full h-16 object-contain mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <h3 className="font-semibold text-sm mb-1">{sponsor.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {sponsor.tier}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Interested in partnering with us?
          </p>
          <a
            href="mailto:partnerships@thunderboltsfc.com"
            className="text-primary hover:underline font-semibold"
          >
            Contact our partnership team
          </a>
        </div>
      </div>
    </section>
  );
}
