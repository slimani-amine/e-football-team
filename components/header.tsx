"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a className="flex items-center gap-2" href="/">
          <img
            src="/images/barba-blanca-logo.png"
            alt="BRC Logo"
            className="h-8 w-8"
          />
          <span className="font-playfair font-bold text-xl">
            Barba Blanca FC
          </span>
          <span className="text-red-500 font-bold text-sm">BRC</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() =>
              document
                .getElementById("players")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Players
          </button>
          <button
            onClick={() =>
              document
                .getElementById("achievements")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Achievements
          </button>
          <button
            onClick={() =>
              document
                .getElementById("community")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Community
          </button>
          <button
            onClick={() =>
              document
                .getElementById("sponsors")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Sponsors
          </button>
          <a
            href="/highlights"
            className="text-foreground hover:text-primary transition-colors"
          >
            Highlights
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            className="hidden md:inline-flex"
            onClick={() => (window.location.href = "/join")}
          >
            Join the Clan!
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
