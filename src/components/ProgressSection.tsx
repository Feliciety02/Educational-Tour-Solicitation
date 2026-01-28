import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const GOAL_AMOUNT = 50000;

const ProgressSection = () => {
  const [totalRaised, setTotalRaised] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDonationStats = async () => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("amount");
      
      if (error) throw error;
      
      const total = data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      setTotalRaised(total);
      setDonorCount(data?.length || 0);
    } catch (error) {
      console.error("Error fetching donation stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationStats();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("donations-progress")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "donations" },
        () => {
          fetchDonationStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const percentage = Math.min((totalRaised / GOAL_AMOUNT) * 100, 100);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Fundraising Progress
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Help Us Reach Our <span className="text-gradient">Goal</span>
          </h2>
        </div>

        {/* Progress card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-xl">
            {/* Amount display */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-2">Total Raised</p>
              <p className="text-5xl md:text-6xl font-bold text-gradient mb-2">
                {isLoading ? "..." : `₱${totalRaised.toLocaleString()}`}
              </p>
              <p className="text-lg text-muted-foreground">
                of ₱{GOAL_AMOUNT.toLocaleString()} goal
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="relative">
                <Progress value={percentage} className="h-6 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground drop-shadow">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">₱{GOAL_AMOUNT.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Goal</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold">{percentage.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">{donorCount}</p>
                <p className="text-sm text-muted-foreground">Donors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
