"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize the hash change handler to prevent infinite loops
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, []);

  // Handle hash navigation when component mounts or hash changes
  useEffect(() => {
    // Handle initial load with hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [handleHashChange]);

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the homepage
    if (window.location.pathname === "/" || window.location.pathname === "") {
      // If on homepage, scroll to section
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on different page, navigate to homepage with section hash
      window.location.href = `/#${sectionId}`;
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

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
            onClick={() => scrollToSection("players")}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Players
          </button>
          <button
            onClick={() => scrollToSection("achievements")}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Achievements
          </button>
          <button
            onClick={() => scrollToSection("community")}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Community
          </button>
          <button
            onClick={() => scrollToSection("sponsors")}
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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("players")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Players
            </button>
            <button
              onClick={() => scrollToSection("achievements")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Achievements
            </button>
            <button
              onClick={() => scrollToSection("community")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection("sponsors")}
              className="text-left text-foreground hover:text-primary transition-colors py-2"
            >
              Sponsors
            </button>
            <a
              href="/highlights"
              className="text-left text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Highlights
            </a>
            <div className="pt-2 border-t border-border">
              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = "/join";
                  setIsMobileMenuOpen(false);
                }}
              >
                Join the Clan!
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
