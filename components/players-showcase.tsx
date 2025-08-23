
"use client";

import { useState, useEffect } from "react";

interface Player {
  id: number;
  name: string;
}

export function PlayersShowcase() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (response.ok) {
          const data = await response.json();
          setPlayers(data.players || []);
        }
      } catch (error) {
        console.error('Failed to fetch players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();

    // Set up polling to check for updates every 5 seconds
    const interval = setInterval(fetchPlayers, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section id="players" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-red-500">
              PLAYERS LIST
            </h2>
          </div>
          <div className="text-center text-white">Loading players...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="players" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-red-500">
            PLAYERS LIST
          </h2>
        </div>

        {players.length === 0 ? (
          <div className="text-center text-gray-400">No players available</div>
        ) : (
          <ul className="space-y-4 max-w-md mx-auto">
            {players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between bg-black/80 border border-red-500/40 rounded-lg px-4 py-3"
              >
                <span className="text-white font-bold">{player.name}</span>
                <span className="text-red-400 font-mono">ID: {player.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
