import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Contact the <span className="text-gradient">Organizers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about the tour or your donation? We're here to help!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Organizer Info */}
          <div className="bg-card rounded-3xl p-8 border border-border">
            <h3 className="text-xl font-bold mb-6">Tour Organizer</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-vibrant flex items-center justify-center text-white text-2xl font-bold">
                  FM
                </div>
                <div>
                  <p className="font-semibold text-lg">Feanne Malasarte</p>
                  <p className="text-muted-foreground">BS Computer Science</p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:feanne.malasarte@email.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span>feanne.malasarte@email.com</span>
                </a>
                <a
                  href="tel:+639171234567"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+63 917 123 4567</span>
                </a>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Your University, City, Philippines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Social */}
          <div className="space-y-8">
            {/* Trust badges */}
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">Our Promise</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p className="text-muted-foreground">100% of donations go directly to tour expenses</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p className="text-muted-foreground">Transparent fund usage and regular updates</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p className="text-muted-foreground">Post-tour report with photos and acknowledgments</p>
                </li>
              </ul>
            </div>

            {/* Social links */}
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Follow us for tour updates, photos, and behind-the-scenes content!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
