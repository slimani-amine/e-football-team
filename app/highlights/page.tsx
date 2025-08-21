import { Header } from "@/components/header"
import { HighlightsSection } from "@/components/highlights-section"

export default function HighlightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-red-500 mb-4 font-serif">CLAN HIGHLIGHTS</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {
              "Witness the dominance of Barba Blanca Football. These are the moments that define our legacy and strike fear into our opponents."
            }
          </p>
        </div>
        <HighlightsSection />
      </div>
    </div>
  )
}
