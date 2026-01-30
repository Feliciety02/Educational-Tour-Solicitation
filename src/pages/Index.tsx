import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ItinerarySection from "@/components/ItinerarySection";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressSection from "@/components/ProgressSection";
import DonationSection from "@/components/DonationSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ItinerarySection />
      <ProgressSection />
      <LeaderboardSection />
       <DonationSection />
      <AboutSection />
      <ContactSection />
      <CountdownTimer />
      <Footer />
    </div>
  );
};

export default Index;
