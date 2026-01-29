import { Mail, Phone, MapPin, Facebook, Instagram, Sparkles } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 text-violet-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Contact <span className="text-gradient">Me</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about the tour or your donation? Message me and I’ll reply as soon as I can.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* My Info */}
          <div className="bg-card rounded-3xl p-8 border border-border">
            <h3 className="text-xl font-bold mb-6">Tour Organizer</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold">
                  FA
                </div>
                <div>
                  <p className="font-semibold text-lg">Fe Anne Malasarte</p>
                  <p className="text-muted-foreground">BS Computer Science</p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:feannemlsrte@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5 text-violet-600" />
                  <span>feannemlsrte@gmail.com</span>
                </a>

                <a
                  href="tel:09758373702"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Phone className="w-5 h-5 text-violet-600" />
                  <span>0975 837 3702</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <MapPin className="w-5 h-5 text-violet-600" />
                  <span>University of Mindanao, Philippines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promise & Social */}
          <div className="space-y-8">
            {/* Promise */}
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">My Promise</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  <p className="text-muted-foreground">Donations go directly to tour-related expenses and requirements</p>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  <p className="text-muted-foreground">I’ll post transparent updates on progress and usage</p>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  <p className="text-muted-foreground">Post-tour recap with photos and acknowledgments for supporters</p>
                </li>
              </ul>
            </div>

            {/* Social links (retain FB/IG colors) */}
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">Follow My Journey</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/feanneLM"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>

                <a
                  href="https://www.instagram.com/feli_ciety/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Follow me for tour updates, photos, and behind-the-scenes content!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
