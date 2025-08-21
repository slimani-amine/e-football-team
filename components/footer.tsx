import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, Youtube, Twitch } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-bounce-slow absolute top-10 left-10 w-8 h-8 bg-primary rounded-full opacity-20"></div>
        <div
          className="animate-bounce-slow absolute top-20 right-20 w-6 h-6 bg-destructive rounded-full opacity-30"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="animate-bounce-slow absolute bottom-20 left-1/4 w-4 h-4 bg-primary rounded-full opacity-25"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="animate-bounce-slow absolute bottom-10 right-1/3 w-5 h-5 bg-destructive rounded-full opacity-20"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image src="/images/barba-blanca-logo.png" alt="BRC Logo" fill className="object-contain" />
              </div>
              <div>
                <span className="font-playfair font-bold text-xl text-primary">Barba Blanca</span>
                <div className="text-sm text-muted-foreground">Football Club - BRC</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              The Clan That Dominates. Professional e-football warriors conquering every battlefield.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                <Youtube className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 hover:text-primary transition-all duration-300"
              >
                <Twitch className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="#home"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
              >
                Home
              </a>
              <a
                href="#players"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
              >
                The Clan
              </a>
              <a
                href="#achievements"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
              >
                Victories
              </a>
              <a
                href="#community"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform"
              >
                Community
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: info@barbablancafc.com</p>
              <p>Press: press@barbablancafc.com</p>
              <p>Partnerships: partnerships@barbablancafc.com</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Join The Clan</h3>
            <p className="text-muted-foreground text-sm">Get exclusive updates, match results, and clan news.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1 border-primary/20 focus:border-primary" />
              <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Barba Blanca Football Club (BRC). All rights reserved. The Clan That Dominates.</p>
        </div>
      </div>
    </footer>
  )
}
