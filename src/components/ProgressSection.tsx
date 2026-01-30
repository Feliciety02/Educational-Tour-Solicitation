import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Users, Wallet } from "lucide-react";
import type { Donation } from "@/data/donationsSeed";
import { seedDonations } from "@/data/donationsSeed";

const GOAL_AMOUNT = 24800;
const STORAGE_KEY = "educ_tour_donations_v1";

const loadDonations = (): Donation[] => {
  try {
    if (typeof window === "undefined") return seedDonations;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedDonations;

    const parsed = JSON.parse(raw) as Donation[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedDonations;

    return parsed;
  } catch {
    return seedDonations;
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

  const totalRaised = useMemo(() => donations.reduce((sum, d) => sum + Number(d.amount || 0), 0), [donations]);
  const donorCount = useMemo(() => donations.length, [donations]);

  const remaining = Math.max(GOAL_AMOUNT - totalRaised, 0);
  const percentage = Math.min((totalRaised / GOAL_AMOUNT) * 100, 100);

  const statusText = useMemo(() => {
    if (remaining <= 0) return "Goal reached. Thank you so much for the support!";
    if (totalRaised <= 0) return "No donations recorded yet. Your support will mean a lot.";
    return `We are ₱${remaining.toLocaleString()} away from the goal.`;
  }, [remaining, totalRaised]);

  return (
    <section id="progress" className="relative overflow-hidden py-16 sm:py-20 md:py-24 bg-background">
      {/* animated ombre glow background (mobile-safe sizing) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full bg-fuchsia-400/35 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
        <div className="absolute top-10 right-[-160px] h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full bg-pink-400/30 blur-3xl animate-[pulse_11s_ease-in-out_infinite]" />
        <div className="absolute -bottom-36 left-1/3 h-[460px] w-[460px] sm:h-[560px] sm:w-[560px] rounded-full bg-purple-400/25 blur-3xl animate-[pulse_13s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-fuchsia-500/15 mb-4 shadow-[0_0_0_6px_rgba(217,70,239,0.12)]">
            <Target className="w-6 h-6 sm:w-7 sm:h-7 text-fuchsia-700" />
          </div>

          <span className="block text-fuchsia-700 font-medium mb-3 sm:mb-4">
            Fundraising Progress
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Progress
            </span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A quick snapshot of where the fund stands right now.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card/70 backdrop-blur-md rounded-3xl p-5 sm:p-8 md:p-12 border border-border shadow-xl">
            {/* main numbers */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-muted-foreground text-sm sm:text-base mb-2">Total Raised</p>

              <p className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 leading-tight">
                <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500 bg-clip-text text-transparent break-words">
                  {isLoading ? "..." : `₱${totalRaised.toLocaleString()}`}
                </span>
              </p>

              <p className="text-sm sm:text-lg text-muted-foreground">
                Goal: ₱{GOAL_AMOUNT.toLocaleString()}
              </p>

              <div className="mt-4">
                <span className="inline-flex items-start sm:items-center gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-fuchsia-500/15 text-fuchsia-800 text-xs sm:text-sm font-medium shadow-sm text-left sm:text-center max-w-[92%] sm:max-w-none">
                  <Target className="w-4 h-4 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <span className="leading-snug">{statusText}</span>
                </span>
              </div>
            </div>

            {/* progress bar */}
            <div className="mb-6 sm:mb-8">
              <div className="relative">
                <Progress value={percentage} className="h-5 sm:h-6 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-bold text-primary-foreground drop-shadow">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <span>₱{Math.min(totalRaised, GOAL_AMOUNT).toLocaleString()} raised</span>
                <span>₱{remaining.toLocaleString()} remaining</span>
              </div>
            </div>

            {/* breakdown tiles */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              <div className="text-center p-3 sm:p-4 rounded-2xl bg-background/60 border border-border/60">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-fuchsia-700" />
                <p className="text-lg sm:text-2xl font-bold leading-tight">₱{GOAL_AMOUNT.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Goal</p>
              </div>

              <div className="text-center p-3 sm:p-4 rounded-2xl bg-background/60 border border-border/60">
                <Wallet className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-pink-700" />
                <p className="text-lg sm:text-2xl font-bold leading-tight">₱{remaining.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Remaining</p>
              </div>

              <div className="text-center p-3 sm:p-4 rounded-2xl bg-background/60 border border-border/60">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-purple-700" />
                <p className="text-lg sm:text-2xl font-bold leading-tight">{percentage.toFixed(0)}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Complete</p>
              </div>

              <div className="text-center p-3 sm:p-4 rounded-2xl bg-background/60 border border-border/60">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-lg sm:text-2xl font-bold leading-tight">{isLoading ? "..." : donorCount}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Donors</p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border/60 text-center text-xs sm:text-sm text-muted-foreground">
              This section updates instantly when the leaderboard changes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
