type Player = {
  id: number;
  name: string;
};

const players: Player[] = [
  { id: 1, name: "CAPTAIN WHITEBEARD" },
  { id: 2, name: "RED DEMON" },
  { id: 3, name: "IRON WALL" },
  { id: 4, name: "SHADOW KEEPER" },
];

export function PlayersShowcase() {
  return (
    <section id="players" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-red-500">
            PLAYERS LIST
          </h2>
        </div>

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
      </div>
    </section>
  );
}
