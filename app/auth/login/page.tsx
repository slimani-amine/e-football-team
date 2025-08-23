
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load Replit auth script
    const script = document.createElement('script');
    script.src = 'https://auth.util.repl.co/script.js';
    script.async = true;
    document.head.appendChild(script);

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

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://auth.util.repl.co/script.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [router]);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);

    // Replit auth function
    function LoginWithReplit() {
      window.addEventListener("message", authComplete);
      var h = 500;
      var w = 350;
      var left = screen.width / 2 - w / 2;
      var top = screen.height / 2 - h / 2;

      var authWindow = window.open(
        "https://replit.com/auth_with_repl_site?domain=" + location.host,
        "_blank",
        "modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
          w +
          ", height=" +
          h +
          ", top=" +
          top +
          ", left=" +
          left
      );

      function authComplete(e) {
        if (e.data !== "auth_complete") {
          return;
        }

        window.removeEventListener("message", authComplete);
        authWindow.close();
        
        // Check auth status after login
        setTimeout(async () => {
          try {
            const response = await fetch('/api/auth');
            if (response.ok) {
              const { user } = await response.json();
              if (user.isAdmin) {
                router.push('/dashboard');
              } else {
                setError('Admin access required. Please contact the team captain.');
                setIsLoading(false);
              }
            } else {
              setError('Authentication failed. Please try again.');
              setIsLoading(false);
            }
          } catch (error) {
            setError('Authentication failed. Please try again.');
            setIsLoading(false);
          }
        }, 1000);
      }
    }

    LoginWithReplit();
  };

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

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Login with Replit'}
            </Button>

            <p className="text-xs text-gray-400">
              Only team administrators can access this area.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
