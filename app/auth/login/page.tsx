"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth');
        if (response.ok) {
          const { user } = await response.json();
          if (user.isAdmin) {
            router.push('/dashboard');
          } else {
            setError('Admin access required. Please contact the team captain.');
          }
        }
      } catch (error) {
        // User not authenticated, show login
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-black/60 border-red-800/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-400">Admin Access Required</CardTitle>
          <p className="text-gray-300">
            You need administrator privileges to access the dashboard.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          <div className="text-center space-y-4">
            <div className="bg-gray-900/50 border border-gray-700 rounded p-4">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">Barba Blanca FC</p>
              <p className="text-gray-400 text-sm">Team Management Portal</p>
            </div>

            {/* Replit Auth */}
            <div className="replit-auth-container">
              <script
                src="https://auth.util.repl.co/script.js"
                data-authed="window.location.href = '/dashboard'"
              />
            </div>

            <p className="text-xs text-gray-400">
              Only team administrators can access this area.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}