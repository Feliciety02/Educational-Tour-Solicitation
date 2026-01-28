import { Heart } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Educational Tour 2025</h3>
            <p className="text-background/60">
              Helping BS Computer Science students explore, learn, and grow through experiential education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  About the Tour
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("itinerary")}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  Itinerary
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("donate")}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  Donate
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("leaderboard")}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-background/60 hover:text-background transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <p className="text-background/60 mb-4">
              Have questions? Reach out to us anytime. We appreciate every donation, big or small!
            </p>
            <button
              onClick={() => scrollToSection("donate")}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Donate Now
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 text-center">
          <p className="text-background/60 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by BS Computer Science Students
          </p>
          <p className="text-background/40 text-sm mt-2">
            © {new Date().getFullYear()} Educational Tour Fundraiser. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
