import { useEffect, useState } from "react";
import { Trophy, Medal, Award, User, Gamepad2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  is_anonymous: boolean;
  created_at: string;
}

// Placeholder donors for empty state - game-style leaderboard
const placeholderDonors: Donation[] = [
  { id: "placeholder-1", donor_name: "???", amount: 5000, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-2", donor_name: "???", amount: 3000, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-3", donor_name: "???", amount: 2000, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-4", donor_name: "???", amount: 1500, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-5", donor_name: "???", amount: 1000, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-6", donor_name: "Your Name Here!", amount: 500, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-7", donor_name: "???", amount: 300, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-8", donor_name: "???", amount: 200, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-9", donor_name: "???", amount: 100, is_anonymous: false, created_at: new Date().toISOString() },
  { id: "placeholder-10", donor_name: "Be the First!", amount: 50, is_anonymous: false, created_at: new Date().toISOString() },
];

const LeaderboardSection = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("amount", { ascending: false })
        .limit(10);

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("donations-leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "donations" },
        () => {
          fetchDonations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getRankIcon = (rank: number, isPlaceholder: boolean) => {
    if (isPlaceholder) {
      return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground/50 font-bold">{rank}</span>;
    }
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isPlaceholder: boolean) => {
    if (isPlaceholder) {
      return "bg-muted/30 border-dashed border-muted-foreground/20";
    }
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-500/20 border-amber-600/30";
      default:
        return "bg-card border-border";
    }
  };

  // Display real donations or placeholders
  const displayDonations = donations.length > 0 ? donations : placeholderDonors;
  const isShowingPlaceholders = donations.length === 0;

  return (
    <section id="leaderboard" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Hall of Heroes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Top <span className="text-gradient">Donors</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isShowingPlaceholders 
              ? "Be the first to claim your spot on the leaderboard! 🎮"
              : "A heartfelt thank you to all our generous donors. Your support makes this educational journey possible!"}
          </p>
        </div>

        {/* Game-style banner for empty state */}
        {isShowingPlaceholders && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 text-center">
              <Gamepad2 className="w-12 h-12 mx-auto mb-3 text-primary animate-bounce" />
              <h3 className="text-xl font-bold mb-2">Leaderboard Awaits!</h3>
              <p className="text-muted-foreground">
                Donate now to see your name on the board. Top donors get the glory! 🏆
              </p>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayDonations.map((donation, index) => {
                const isPlaceholder = donation.id.startsWith("placeholder");
                return (
                  <div
                    key={donation.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      isPlaceholder ? "" : "hover:-translate-y-1 hover:shadow-lg"
                    } ${getRankBg(index + 1, isPlaceholder)}`}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0">{getRankIcon(index + 1, isPlaceholder)}</div>

                    {/* Name & Date */}
                    <div className="flex-grow min-w-0">
                      <p className={`font-semibold truncate ${isPlaceholder ? "text-muted-foreground/60 italic" : ""}`}>
                        {donation.is_anonymous ? "Anonymous Donor" : donation.donor_name}
                      </p>
                      {!isPlaceholder && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(donation.created_at).toLocaleDateString("en-PH", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}
                      {isPlaceholder && (
                        <p className="text-xs text-muted-foreground/50">Waiting for a hero...</p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="flex-shrink-0 text-right">
                      <p className={`text-xl font-bold ${isPlaceholder ? "text-muted-foreground/40" : "text-gradient"}`}>
                        ₱{Number(donation.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
