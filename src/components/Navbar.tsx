import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Itinerary", href: "itinerary" },
  { label: "Progress", href: "donate" },
  { label: "Leaderboard", href: "leaderboard" },
  { label: "Contact", href: "contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <style>{`
        @keyframes navIn {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes mobileIn {
          0% { transform: translateY(-6px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .nav-glass {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow: 0 10px 30px rgba(17,24,39,0.08);
        }
        .nav-glass-dark {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
        }
        .nav-link {
          position: relative;
          padding: 8px 10px;
          border-radius: 999px;
          transition: transform 180ms ease, background-color 180ms ease, color 180ms ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 6px;
          height: 2px;
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 200ms ease;
          background: linear-gradient(90deg, rgba(139,92,246,1), rgba(217,70,239,1));
          opacity: .9;
        }
        .nav-link:hover {
          transform: translateY(-1px);
          background: rgba(139,92,246,0.08);
          color: rgb(88,28,135);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div
          className={[
            "mt-3 rounded-2xl transition-all duration-300",
            "animate-[navIn_420ms_ease-out_both]",
            isScrolled ? "nav-glass" : "nav-glass-dark",
          ].join(" ")}
        >
          <div className="flex items-center justify-between h-14 md:h-16 px-3 md:px-4">
            {/* Logo */}
            <button
              onClick={goTop}
              className={[
                "text-base md:text-lg font-bold tracking-tight transition-colors",
                isScrolled ? "text-foreground" : "text-white",
              ].join(" ")}
            >
              <span className="text-gradient">EduTour</span> 2026
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={[
                    "nav-link text-sm font-medium",
                    isScrolled ? "text-foreground/80" : "text-white/90",
                  ].join(" ")}
                >
                  {link.label}
                </button>
              ))}

              <Button
                onClick={() => scrollToSection("donate")}
                className="ml-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition-opacity shadow-sm"
              >
                Donate
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={[
                "md:hidden p-2 rounded-xl transition-all",
                isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10",
              ].join(" ")}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden px-3 pb-3" style={{ animation: "mobileIn 220ms ease-out both" }}>
              <div className="rounded-2xl border border-border/60 bg-white/70 backdrop-blur-xl overflow-hidden">
                <div className="p-2 space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="block w-full text-left py-3 px-4 rounded-xl hover:bg-violet-500/10 transition-colors text-foreground"
                    >
                      <span className="font-medium">{link.label}</span>
                    </button>
                  ))}

                  <Button
                    onClick={() => scrollToSection("donate")}
                    className="w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition-opacity mt-2"
                  >
                    Donate
                  </Button>

                  <button
                    onClick={goTop}
                    className="w-full text-center text-sm text-muted-foreground py-2"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
