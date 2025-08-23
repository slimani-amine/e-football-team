"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Flame } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <img
          src="/images/barba-blanca-hero.png"
          alt="Barba Blanca Football Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 hero-flame-bg" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="football-float absolute top-20 left-10 w-8 h-8 bg-white rounded-full opacity-30 shadow-lg">
          <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </div>
        </div>
        <div
          className="football-bounce absolute top-32 right-16 w-6 h-6 bg-white rounded-full opacity-40 shadow-lg"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
        </div>
        <div
          className="football-float absolute bottom-32 left-20 w-5 h-5 bg-white rounded-full opacity-25 shadow-lg"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
        <div
          className="football-spin absolute top-1/2 right-8 w-4 h-4 bg-white rounded-full opacity-35 shadow-lg"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
        <div
          className="football-bounce absolute bottom-20 right-1/4 w-7 h-7 bg-white rounded-full opacity-30 shadow-lg"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-8">
          <h1 className="font-playfair font-bold text-6xl md:text-8xl text-glow-red leading-tight">
            ARE YOU <span className="text-red-500">READY</span>
          </h1>
        </div>

        <h2 className="font-playfair font-bold text-4xl md:text-6xl mb-8 text-white">
          FOR <span className="text-red-500">FOOTBALL</span>
        </h2>

        <div className="w-32 h-1 bg-red-500 mx-auto mb-8"></div>

        <p className="text-xl md:text-2xl mb-12 text-red-300 max-w-3xl mx-auto font-bold tracking-wide">
          BARBA BLANCA FOOTBALL - THE CLAN THAT DOMINATES
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            size="lg"
            className="text-lg px-12 py-8 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider border-2 border-red-500 shadow-lg shadow-red-500/50 transition-all duration-300 hover:scale-105"
            onClick={() => (window.location.href = "/join")}
          >
            <Flame className="mr-2 h-5 w-5" />
            JOIN YOUR CLAN
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-12 py-8 bg-black/50 border-2 border-red-500 text-red-400 hover:bg-red-600 hover:text-white font-bold tracking-wider shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105"
            onClick={() => (window.location.href = "/highlights")}
          >
            WATCH HIGHLIGHTS
          </Button>
        </div>

        <div className="mt-16 text-center">
          <div className="text-red-400 font-bold text-sm tracking-widest mb-2">
            FOOTBALL 2025
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-0.5 bg-red-500"></div>
            <div className="text-white font-bold text-xs">
              BARBA BLANCA FC - BRC
            </div>
            <div className="w-8 h-0.5 bg-red-500"></div>
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-red-400 animate-bounce hover:text-red-300 transition-colors cursor-pointer p-2"
        onClick={() => {
          const nextSection =
            document.getElementById("news") ||
            document.querySelector("section:nth-of-type(2)");
          nextSection?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
