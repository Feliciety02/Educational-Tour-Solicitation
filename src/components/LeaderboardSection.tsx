import { useEffect, useState } from "react";
import { Trophy, Medal, Award, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  is_anonymous: boolean;
  created_at: string;
}

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

  const getRankIcon = (rank: number) => {
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

  const getRankBg = (rank: number) => {
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
            A heartfelt thank you to all our generous donors. Your support makes this educational journey possible!
          </p>
        </div>

        {/* Leaderboard */}
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : donations.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-3xl border border-border">
              <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Be the First Donor!</h3>
              <p className="text-muted-foreground">
                No donations yet. Your name could be at the top!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation, index) => (
                <div
                  key={donation.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${getRankBg(
                    index + 1
                  )}`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>

                  {/* Name & Date */}
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold truncate">
                      {donation.is_anonymous ? "Anonymous Donor" : donation.donor_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(donation.created_at).toLocaleDateString("en-PH", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xl font-bold text-gradient">
                      ₱{Number(donation.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
