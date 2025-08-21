import { Header } from "@/components/header"
import { JoinClanForm } from "@/components/join-clan-form"

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-red-500 mb-4 font-serif">JOIN THE CLAN</h1>
            <p className="text-xl text-gray-300">
              {
                "Ready to dominate the field? Join Barba Blanca Football and become part of the most feared clan in e-football."
              }
            </p>
          </div>
          <JoinClanForm />
        </div>
      </div>
    </div>
  )
}
