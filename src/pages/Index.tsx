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
      <ProgressSection />
      <LeaderboardSection />
       <DonationSection />
      <CountdownTimer />
            <AboutSection />
      <ItinerarySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
