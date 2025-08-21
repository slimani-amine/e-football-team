import { Header } from "@/components/header"
import { JoinClanForm } from "@/components/join-clan-form"

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto mt-4">
          <JoinClanForm />
        </div>
      </div>
    </div>
  )
}
