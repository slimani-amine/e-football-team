import { Calendar, Trophy, Megaphone } from "lucide-react";

export function News() {
  return (
    <section
      id="news"
      className="py-20 bg-gradient-to-b from-black via-red-950 to-black relative"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="font-playfair font-bold text-4xl md:text-6xl text-red-500 mb-12 drop-shadow-lg">
          CLAN NEWS & EVENTS
        </h2>

        {/* News Card */}
        <div className="relative max-w-4xl mx-auto bg-black/80 border border-red-600/50 rounded-2xl shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
          {/* Decorative Top Bar */}
          <div className="bg-gradient-to-r from-red-800 via-red-600 to-red-800 py-4 px-6">
            <h3 className="text-white font-extrabold text-2xl md:text-3xl tracking-widest flex items-center justify-center gap-3">
              <Trophy className="w-7 h-7 text-yellow-400 drop-shadow" />
              BARBA BLANCA CHAMPIONSHIP
              <Trophy className="w-7 h-7 text-yellow-400 drop-shadow" />
            </h3>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-red-900/20 blur-3xl opacity-30 group-hover:opacity-60 transition"></div>

            {/* Date & Time */}
            <div className="flex items-center justify-center gap-3 text-red-400 font-bold mb-6">
              <Calendar className="w-5 h-5" />
              <span className="uppercase tracking-wider">Sunday, March 2 - 18:00</span>
            </div>

            {/* Headline */}
            <h4 className="text-2xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              THE ULTIMATE SHOWDOWN ⚡
            </h4>

            {/* Description */}
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              The warriors of <span className="text-red-400 font-bold">Barba Blanca FC</span> 
              are preparing for the fiercest battle yet! Witness strategy, power, and pure
              determination as our clan strikes fear into the hearts of their rivals.
              Stay tuned for unforgettable action.
            </p>

            {/* Call to Action */}
            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:shadow-red-600/50">
                <Megaphone className="w-5 h-5" />
                Stay Updated
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-red-700 to-red-900 py-4 text-center">
            <span className="text-white font-bold tracking-widest text-sm md:text-base">
              BARBA BLANCA FC ⚔ DOMINATE THE PITCH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
