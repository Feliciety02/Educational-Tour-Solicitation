import { Heart } from "lucide-react";

const Footer = () => {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="py-12 border-t border-violet-200/20 bg-gradient-to-b from-violet-950 to-violet-900 text-violet-50">
      <div className="container mx-auto px-4 text-center">
        {/* identity */}
        <p className="text-lg font-bold text-white">Feanne Malasarte</p>
        <p className="text-sm text-violet-200/70 mt-1">
          BS Computer Science • educational tour fundraiser
        </p>

        {/* links */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            { id: "about", label: "About" },
            { id: "itinerary", label: "Plan" },
            { id: "donate", label: "Donate" },
            { id: "leaderboard", label: "Donors" },
            { id: "contact", label: "Contact" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="px-3 py-1.5 rounded-full text-sm bg-violet-500/10 text-violet-100 hover:bg-violet-500/20 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* bottom */}
        <div className="mt-8 pt-6 border-t border-violet-200/10">
          <p className="text-sm text-violet-200/70 flex items-center justify-center gap-1">
            Made with
            <Heart className="w-4 h-4 text-violet-300 fill-violet-300" />
            by Feanne
          </p>
          <p className="text-xs text-violet-200/40 mt-2">
            © {new Date().getFullYear()} Personal Tour Page
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
