import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlayersShowcase } from "@/components/players-showcase"
import { AchievementsSection } from "@/components/achievements-section"
import { CommunitySection } from "@/components/community-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PlayersShowcase />
        <AchievementsSection />
        <CommunitySection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  )
}
