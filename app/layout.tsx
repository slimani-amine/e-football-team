import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Barba Blanca Football Club (BRC) - Professional e-Football Team",
  description:
    "Join Barba Blanca Football Club (BRC) on our journey to the top of competitive e-football. Meet our players, see our achievements, and become part of our community.",
  generator: "v0.app",
};

import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${sourceSans.variable} antialiased`}
    >
      <body className="font-sans">
        {children}
        <Toaster />
        <div style={{ display: 'none' }}>
          <script
            src="https://auth.util.repl.co/script.js"
            data-authed="location.reload()"
          />
        </div>
      </body>
    </html>
  );
}
