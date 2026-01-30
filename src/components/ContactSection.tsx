import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Music2,
  AtSign,
  Sparkles,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 text-violet-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Contact <span className="text-gradient">Me</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Have questions about the tour or your donation? Message me and I’ll reply as soon as I can.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 md:gap-8">
          {/* My Info */}
          <div className="bg-card rounded-3xl p-5 sm:p-8 border border-border">
            <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">Tour Organizer</h3>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  FA
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-base sm:text-lg truncate">Fe Anne Malasarte</p>
                  <p className="text-muted-foreground text-sm sm:text-base">BS Computer Science</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:feannemlsrte@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-all">feannemlsrte@gmail.com</span>
                </a>

                <a
                  href="tel:09758373702"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Phone className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">0975 837 3702</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <MapPin className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    University of Mindanao, Philippines
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Promise & Social */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-card rounded-3xl p-5 sm:p-8 border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-4">My Promise</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Donations go directly to tour-related expenses and requirements
                  </p>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    I’ll post transparent updates on progress and usage
                  </p>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Post-tour recap with photos and acknowledgments for supporters
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-3xl p-5 sm:p-8 border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Follow My Journey</h3>

              {/* mobile: centered row with wrap, no weird spacing */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                <a
                  href="https://www.facebook.com/feanneLM"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>

                <a
                  href="https://www.instagram.com/feli_ciety/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>

                <a
                  href="https://www.linkedin.com/in/fe-anne-malasarte-2a492a322/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>

                <a
                  href="https://www.threads.com/@feli_ciety"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Threads"
                >
                  <AtSign className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>

                <a
                  href="https://tiktok.com/@feannemalasarte"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
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
