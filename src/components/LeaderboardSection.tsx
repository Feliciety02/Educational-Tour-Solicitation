import { useEffect, useMemo, useRef, useState } from "react";
import { Trophy, Medal, Award, Gamepad2, Lock, EyeOff, Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  is_anonymous: boolean;
  created_at: string;
}

const ADMIN_PASSWORD = "123";
const STORAGE_KEY = "educ_tour_donations_v1";

/* seed data lives in code */
const seedDonations: Donation[] = [
  {
    id: "seed-1",
    donor_name: "Be the First!",
    amount: 50,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
];

/* placeholders shown only if no saved data and seed is empty */
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

const maskName = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => {
      const clean = part.trim();
      if (!clean) return "";
      if (clean.length === 1) return clean;
      if (clean.length === 2) return `${clean[0]}•`;
      return `${clean[0]}${"•".repeat(clean.length - 2)}${clean[clean.length - 1]}`;
    })
    .filter(Boolean)
    .join(" ");
};

const loadDonations = (): Donation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedDonations;
    const parsed = JSON.parse(raw) as Donation[];
    if (!Array.isArray(parsed)) return seedDonations;
    return parsed;
  } catch {
    return seedDonations;
  }
};

const saveDonations = (donations: Donation[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
  window.dispatchEvent(new Event("donations_updated"));
};

const LeaderboardSection = () => {
  const { toast } = useToast();

  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* hidden unlock logic */
  const [askPassword, setAskPassword] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<number | null>(null);

  /* CRUD state */
  const [newEntry, setNewEntry] = useState({
    donorName: "",
    amount: "",
    isAnonymous: false,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState({
    donorName: "",
    amount: "",
    isAnonymous: false,
  });

  const refresh = () => {
    const data = loadDonations();
    setDonations(data);
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();

    const onUpdate = () => refresh();
    window.addEventListener("donations_updated", onUpdate);

    return () => window.removeEventListener("donations_updated", onUpdate);
  }, []);

  const sortedDonations = useMemo(() => {
    const list = [...donations];
    list.sort((a, b) => Number(b.amount) - Number(a.amount));
    return list;
  }, [donations]);

  const isShowingPlaceholders = sortedDonations.length === 0;
  const displayDonations = isShowingPlaceholders ? placeholderDonors : sortedDonations;

  const shouldScroll = !isShowingPlaceholders && displayDonations.length > 10;

  const getRankIcon = (rank: number, isPlaceholder: boolean) => {
    if (isPlaceholder) {
      return (
        <span className="w-6 h-6 flex items-center justify-center text-muted-foreground/50 font-bold">
          {rank}
        </span>
      );
    }
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return (
      <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">
        {rank}
      </span>
    );
  };

  const getRankBg = (rank: number, isPlaceholder: boolean) => {
    if (isPlaceholder) return "bg-muted/30 border-dashed border-muted-foreground/20";
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-orange-500/20 border-amber-600/30";
    return "bg-card border-border";
  };

  const handleHiddenTap = () => {
    tapCountRef.current += 1;

    if (tapTimerRef.current) window.clearTimeout(tapTimerRef.current);
    tapTimerRef.current = window.setTimeout(() => {
      tapCountRef.current = 0;
      tapTimerRef.current = null;
    }, 1400);

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      if (!showAdmin) setAskPassword(true);
    }
  };

  const unlockAdmin = () => {
    if (password !== ADMIN_PASSWORD) {
      toast({ title: "Wrong password", description: "Try again", variant: "destructive" });
      return;
    }
    setShowAdmin(true);
    setAskPassword(false);
    setPassword("");
    toast({ title: "Unlocked", description: "Admin controls enabled" });
  };

  const lockAdmin = () => {
    setShowAdmin(false);
    setAskPassword(false);
    setPassword("");
    setEditingId(null);
    toast({ title: "Locked", description: "Admin controls hidden" });
  };

  const addDonation = () => {
    const donorName = newEntry.donorName.trim();
    const amount = Number(newEntry.amount);

    if (!donorName || !newEntry.amount) {
      toast({ title: "Missing info", description: "Add donor name and amount", variant: "destructive" });
      return;
    }
    if (Number.isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", description: "Enter a valid amount", variant: "destructive" });
      return;
    }

    const created: Donation = {
      id: crypto.randomUUID(),
      donor_name: donorName,
      amount,
      is_anonymous: newEntry.isAnonymous,
      created_at: new Date().toISOString(),
    };

    const next = [...donations, created];
    setDonations(next);
    saveDonations(next);

    setNewEntry({ donorName: "", amount: "", isAnonymous: false });
    toast({ title: "Added", description: "Donor saved" });
  };

  const startEdit = (d: Donation) => {
    setEditingId(d.id);
    setEditEntry({
      donorName: d.donor_name,
      amount: String(d.amount),
      isAnonymous: d.is_anonymous,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditEntry({ donorName: "", amount: "", isAnonymous: false });
  };

  const saveEdit = () => {
    if (!editingId) return;

    const donorName = editEntry.donorName.trim();
    const amount = Number(editEntry.amount);

    if (!donorName || !editEntry.amount) {
      toast({ title: "Missing info", description: "Add donor name and amount", variant: "destructive" });
      return;
    }
    if (Number.isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", description: "Enter a valid amount", variant: "destructive" });
      return;
    }

    const next = donations.map((d) =>
      d.id === editingId
        ? {
            ...d,
            donor_name: donorName,
            amount,
            is_anonymous: editEntry.isAnonymous,
          }
        : d
    );

    setDonations(next);
    saveDonations(next);
    setEditingId(null);

    toast({ title: "Updated", description: "Donor updated" });
  };

  const deleteDonation = (id: string) => {
    const next = donations.filter((d) => d.id !== id);
    setDonations(next);
    saveDonations(next);
    toast({ title: "Deleted", description: "Donor removed" });
  };

  return (
    <section id="leaderboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* hidden tap target, looks normal as part of design */}
          <div
            onClick={handleHiddenTap}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500/10 mb-4 cursor-pointer select-none"
            title=""
          >
            <Trophy className="w-7 h-7 text-yellow-600" />
          </div>
          <span className="block text-yellow-600 font-medium mb-4">
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

        {askPassword && !showAdmin && (
          <div className="max-w-2xl mx-auto mb-10 bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold">
                <Lock className="w-4 h-4 text-muted-foreground" />
                Admin access
              </div>
              <Button variant="ghost" size="sm" type="button" onClick={() => setAskPassword(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <Label>Password</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <Button type="button" onClick={unlockAdmin}>
                Unlock
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Tip: tap the badge five times again if you close this.
            </p>
          </div>
        )}

        {showAdmin && (
          <div className="max-w-2xl mx-auto mb-10 bg-card rounded-3xl p-8 border border-border shadow-xl text-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-primary" />
                Admin controls
              </h3>
              <Button type="button" variant="outline" className="rounded-full" onClick={lockAdmin}>
                Hide
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label>Donor name</Label>
                <Input
                  className="mt-2"
                  value={newEntry.donorName}
                  onChange={(e) => setNewEntry((p) => ({ ...p, donorName: e.target.value }))}
                  placeholder="Full name"
                />
              </div>

              <div>
                <Label>Amount</Label>
                <Input
                  className="mt-2"
                  type="number"
                  min="1"
                  value={newEntry.amount}
                  onChange={(e) => setNewEntry((p) => ({ ...p, amount: e.target.value }))}
                  placeholder="0"
                />
              </div>

              <div className="md:col-span-3 flex items-center gap-3">
                <Checkbox
                  checked={newEntry.isAnonymous}
                  onCheckedChange={(checked) => setNewEntry((p) => ({ ...p, isAnonymous: checked as boolean }))}
                />
                <Label>Anonymous</Label>
              </div>

              <div className="md:col-span-3">
                <Button type="button" className="w-full rounded-xl" onClick={addDonation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add donor
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Edits save to your browser only. If you open the site on a different device, you will not see the same admin edits unless you add them there too.
            </div>
          </div>
        )}

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

        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : (
            <div className={`${shouldScroll ? "max-h-[560px] overflow-y-auto pr-2" : ""} space-y-4`}>
              {displayDonations.map((donation, index) => {
                const isPlaceholder = donation.id.startsWith("placeholder");
                const rank = index + 1;

                const displayName = donation.is_anonymous
                  ? "Anonymous Donor"
                  : isPlaceholder
                    ? donation.donor_name
                    : maskName(donation.donor_name);

                const isEditing = showAdmin && editingId === donation.id && !isPlaceholder;

                return (
                  <div
                    key={donation.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      isPlaceholder ? "" : "hover:shadow-lg"
                    } ${getRankBg(rank, isPlaceholder)}`}
                  >
                    <div className="flex-shrink-0">{getRankIcon(rank, isPlaceholder)}</div>

                    <div className="flex-grow min-w-0">
                      {!isEditing ? (
                        <>
                          <p className={`font-semibold truncate ${isPlaceholder ? "text-muted-foreground/60 italic" : ""}`}>
                            {displayName}
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
                        </>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            value={editEntry.donorName}
                            onChange={(e) => setEditEntry((p) => ({ ...p, donorName: e.target.value }))}
                            placeholder="Donor name"
                          />
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              min="1"
                              value={editEntry.amount}
                              onChange={(e) => setEditEntry((p) => ({ ...p, amount: e.target.value }))}
                              placeholder="Amount"
                            />
                            <div className="flex items-center gap-2 px-2">
                              <Checkbox
                                checked={editEntry.isAnonymous}
                                onCheckedChange={(checked) =>
                                  setEditEntry((p) => ({ ...p, isAnonymous: checked as boolean }))
                                }
                              />
                              <span className="text-sm text-muted-foreground">Anon</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button type="button" size="sm" className="rounded-full" onClick={saveEdit}>
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button type="button" size="sm" variant="outline" className="rounded-full" onClick={cancelEdit}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <p className={`text-xl font-bold ${isPlaceholder ? "text-muted-foreground/40" : "text-gradient"}`}>
                        ₱{Number(donation.amount).toLocaleString()}
                      </p>

                      {showAdmin && !isPlaceholder && !isEditing && (
                        <div className="mt-2 flex justify-end gap-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="rounded-lg"
                            onClick={() => startEdit(donation)}
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>

                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="rounded-lg"
                            onClick={() => deleteDonation(donation.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
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
