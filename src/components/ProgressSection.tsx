import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Users, Wallet } from "lucide-react";

const GOAL_AMOUNT = 24800;
const STORAGE_KEY = "educ_tour_donations_v1";

type Donation = {
  id: string;
  donor_name: string;
  amount: number;
  is_anonymous: boolean;
  created_at: string;
};

const loadDonations = (): Donation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Donation[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const ProgressSection = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => {
    setDonations(loadDonations());
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();

    const onUpdate = () => refresh();
    window.addEventListener("donations_updated", onUpdate);

    return () => window.removeEventListener("donations_updated", onUpdate);
  }, []);

  const totalRaised = useMemo(() => {
    return donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  }, [donations]);

  const donorCount = useMemo(() => donations.length, [donations]);

  const remaining = Math.max(GOAL_AMOUNT - totalRaised, 0);
  const percentage = Math.min((totalRaised / GOAL_AMOUNT) * 100, 100);

  const statusText = useMemo(() => {
    if (remaining <= 0) return "Goal reached. Thank you so much for the support!";
    if (totalRaised <= 0) return "No donations recorded yet. Your support will mean a lot.";
    return `We are ₱${remaining.toLocaleString()} away from the goal.`;
  }, [remaining, totalRaised]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Fundraising Progress
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tour Fund <span className="text-gradient">Progress</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This tracker shows the total amount raised and how close we are to the goal.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-xl">
            {/* main numbers */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-2">Total Raised</p>
              <p className="text-5xl md:text-6xl font-bold text-gradient mb-2">
                {isLoading ? "..." : `₱${totalRaised.toLocaleString()}`}
              </p>
              <p className="text-lg text-muted-foreground">
                Goal: ₱{GOAL_AMOUNT.toLocaleString()}
              </p>

              <div className="mt-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Target className="w-4 h-4" />
                  {statusText}
                </span>
              </div>
            </div>

            {/* progress bar */}
            <div className="mb-8">
              <div className="relative">
                <Progress value={percentage} className="h-6 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground drop-shadow">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>₱{Math.min(totalRaised, GOAL_AMOUNT).toLocaleString()} raised</span>
                <span>₱{remaining.toLocaleString()} remaining</span>
              </div>
            </div>

            {/* clear breakdown tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">₱{GOAL_AMOUNT.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Goal</p>
              </div>

              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <Wallet className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold">₱{remaining.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Remaining</p>
              </div>

              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">{percentage.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>

              <div className="text-center p-4 rounded-2xl bg-muted/50">
                <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{isLoading ? "..." : donorCount}</p>
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
