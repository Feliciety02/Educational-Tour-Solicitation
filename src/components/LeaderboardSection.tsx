import { useEffect, useMemo, useRef, useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  Gamepad2,
  Lock,
  EyeOff,
  Pencil,
  Trash2,
  Plus,
  Save,
  X,
  Sparkles,
} from "lucide-react";
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

const seedDonations: Donation[] = [
  {
    id: "seed-1",
    donor_name: "Be the First!",
    amount: 50,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
];

const placeholderDonors: Donation[] = [
  {
    id: "placeholder-1",
    donor_name: "???",
    amount: 5000,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-2",
    donor_name: "???",
    amount: 3000,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-3",
    donor_name: "???",
    amount: 2000,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-4",
    donor_name: "???",
    amount: 1500,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-5",
    donor_name: "???",
    amount: 1000,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-6",
    donor_name: "Your Name Here!",
    amount: 500,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-7",
    donor_name: "???",
    amount: 300,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-8",
    donor_name: "???",
    amount: 200,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-9",
    donor_name: "???",
    amount: 100,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "placeholder-10",
    donor_name: "Be the First!",
    amount: 50,
    is_anonymous: false,
    created_at: new Date().toISOString(),
  },
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

type Orb = {
  id: string;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  pop?: boolean;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const LeaderboardSection = () => {
  const { toast } = useToast();

  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [askPassword, setAskPassword] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<number | null>(null);

  const [newEntry, setNewEntry] = useState({ donorName: "", amount: "", isAnonymous: false });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState({ donorName: "", amount: "", isAnonymous: false });

  const bgRef = useRef<HTMLDivElement | null>(null);
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [combo, setCombo] = useState(0);
  const [spark, setSpark] = useState<{ id: string; x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<number>(0);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    if (rank === 1) return <Trophy className="w-6 h-6 text-violet-600" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-fuchsia-600" />;
    if (rank === 3) return <Award className="w-6 h-6 text-indigo-600" />;
    return (
      <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">
        {rank}
      </span>
    );
  };

  const getRankBg = (rank: number, isPlaceholder: boolean) => {
    if (isPlaceholder) return "bg-white/70 border-dashed border-muted-foreground/20";
    if (rank === 1) return "bg-gradient-to-r from-violet-500/14 to-fuchsia-500/14 border-violet-500/25";
    if (rank === 2) return "bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 border-fuchsia-500/22";
    if (rank === 3) return "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500/22";
    return "bg-white/80 border-border";
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

  const burstOrbs = (n: number) => {
    if (!bgRef.current) return;
    const rect = bgRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    setOrbs((prev) => {
      const add: Orb[] = Array.from({ length: n }).map(() => {
        const r = 9 + Math.random() * 10;
        return {
          id: `burst-${Math.random().toString(16).slice(2)}`,
          x: Math.random() * (w - r * 2) + r,
          y: Math.random() * (h - r * 2) + r,
          r,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6,
          hue: 255 + Math.random() * 55,
          pop: true,
        };
      });
      return [...prev, ...add].slice(-24);
    });
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
    if (!reduceMotion) burstOrbs(6);
  };

  const startEdit = (d: Donation) => {
    setEditingId(d.id);
    setEditEntry({ donorName: d.donor_name, amount: String(d.amount), isAnonymous: d.is_anonymous });
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
      d.id === editingId ? { ...d, donor_name: donorName, amount, is_anonymous: editEntry.isAnonymous } : d
    );

    setDonations(next);
    saveDonations(next);
    setEditingId(null);

    toast({ title: "Updated", description: "Donor updated" });
    if (!reduceMotion) burstOrbs(4);
  };

  const deleteDonation = (id: string) => {
    const next = donations.filter((d) => d.id !== id);
    setDonations(next);
    saveDonations(next);

    toast({ title: "Deleted", description: "Donor removed" });
    if (!reduceMotion) burstOrbs(3);
  };

  const initOrbs = () => {
    if (!bgRef.current) return;
    const rect = bgRef.current.getBoundingClientRect();
    const w = Math.max(320, rect.width);
    const h = Math.max(420, rect.height);

    const count = w < 420 ? 10 : 14;
    const next: Orb[] = Array.from({ length: count }).map((_, i) => {
      const r = 10 + Math.random() * (w < 420 ? 12 : 16);
      return {
        id: `orb-${i}-${Math.random().toString(16).slice(2)}`,
        x: Math.random() * (w - r * 2) + r,
        y: Math.random() * (h - r * 2) + r,
        r,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        hue: 255 + Math.random() * 55,
      };
    });

    setOrbs(next);
  };

  useEffect(() => {
    if (reduceMotion) return;
    initOrbs();

    const onResize = () => initOrbs();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!bgRef.current) return;

    const step = () => {
      tickRef.current += 1;

      setOrbs((prev) => {
        if (!bgRef.current) return prev;
        const rect = bgRef.current.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        return prev.map((o) => {
          let x = o.x + o.vx;
          let y = o.y + o.vy;
          let vx = o.vx;
          let vy = o.vy;

          const pad = o.r + 6;

          if (x < pad) {
            x = pad;
            vx = Math.abs(vx);
          }
          if (x > w - pad) {
            x = w - pad;
            vx = -Math.abs(vx);
          }
          if (y < pad) {
            y = pad;
            vy = Math.abs(vy);
          }
          if (y > h - pad) {
            y = h - pad;
            vy = -Math.abs(vy);
          }

          if (tickRef.current % 180 === 0) {
            vx = clamp(vx + (Math.random() - 0.5) * 0.22, -0.9, 0.9);
            vy = clamp(vy + (Math.random() - 0.5) * 0.22, -0.9, 0.9);
          }

          let r = o.r;
          if (o.pop) r = Math.max(6, r - 0.06);

          return { ...o, x, y, vx, vy, r };
        });
      });

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  const handleBgTap = (clientX: number, clientY: number) => {
    if (reduceMotion) return;
    if (!bgRef.current) return;

    const rect = bgRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const hitRadius = rect.width < 420 ? 28 : 34;

    let hit = false;

    setOrbs((prev) => {
      const next = prev.filter((o) => {
        const dx = o.x - x;
        const dy = o.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const tapped = dist <= o.r + hitRadius;
        if (tapped) hit = true;
        return !tapped;
      });
      return next;
    });

    if (hit) {
      setCombo((c) => c + 1);
      setSpark({ id: `spark-${Date.now()}`, x, y });
      window.setTimeout(() => setSpark(null), 420);
    } else {
      setCombo(0);
      setOrbs((prev) => {
        const r = 9 + Math.random() * 10;
        const newOrb: Orb = {
          id: `tap-${Math.random().toString(16).slice(2)}`,
          x,
          y,
          r,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          hue: 255 + Math.random() * 55,
          pop: true,
        };
        return [...prev, newOrb].slice(-24);
      });
    }
  };

  const onPointerDownBg = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    handleBgTap(e.clientX, e.clientY);
  };

  const bgStyle = useMemo(() => {
    return {
      background:
        "radial-gradient(1200px 600px at 18% 10%, rgba(139,92,246,0.16), transparent 55%), radial-gradient(900px 520px at 82% 18%, rgba(217,70,239,0.12), transparent 55%), radial-gradient(900px 600px at 50% 92%, rgba(99,102,241,0.10), transparent 60%), linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,1))",
    } as React.CSSProperties;
  }, []);

  return (
    <section id="leaderboard" className="py-20 md:py-24 bg-white border-t border-border">
      <style>{`
        @keyframes floaty { 
          0% { transform: translateY(0px); } 
          50% { transform: translateY(-8px); } 
          100% { transform: translateY(0px); } 
        }
        @keyframes shimmer { 
          0% { transform: translateX(-40%); opacity: 0; } 
          30% { opacity: .9; } 
          100% { transform: translateX(140%); opacity: 0; } 
        }
        @keyframes pop { 
          0% { transform: scale(.85); opacity: 0; } 
          40% { transform: scale(1.05); opacity: 1; } 
          100% { transform: scale(1); opacity: 0; } 
        }
        @keyframes cardIn { 
          0% { transform: translateY(8px); opacity: 0; } 
          100% { transform: translateY(0); opacity: 1; } 
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <div
            onClick={handleHiddenTap}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-violet-500/10 mb-4 cursor-pointer select-none relative overflow-hidden"
            title=""
          >
            <Trophy className="w-7 h-7 text-violet-600" />
            {!reduceMotion && (
              <span
                className="absolute inset-0"
                style={{
                  animation: "shimmer 2.8s ease-in-out infinite",
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(139,92,246,0.22) 35%, rgba(217,70,239,0.20) 55%, transparent 90%)",
                }}
              />
            )}
          </div>

          <span className="block text-violet-700 font-medium mb-3">Hall of Heroes</span>

          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Top <span className="text-gradient">Donors</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {isShowingPlaceholders
              ? "Be the first to claim your spot on the leaderboard!"
              : "A heartfelt thank you to all our generous donors. Your support makes this educational journey possible."}
          </p>

          {!reduceMotion && (
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Gamepad2 className="w-4 h-4" />
              Tap the background to collect sparkles
              {combo > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-1 text-violet-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  combo x{combo}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          ref={bgRef}
          onPointerDown={onPointerDownBg}
          className="relative max-w-2xl mx-auto rounded-[28px] border border-border shadow-lg overflow-hidden"
          style={bgStyle}
        >
          {!reduceMotion && (
            <div className="absolute inset-0">
              {orbs.map((o) => (
                <div
                  key={o.id}
                  className="absolute rounded-full blur-[0.2px]"
                  style={{
                    left: o.x - o.r,
                    top: o.y - o.r,
                    width: o.r * 2,
                    height: o.r * 2,
                    background: `radial-gradient(circle at 30% 30%, hsla(${o.hue}, 95%, 65%, .55), hsla(${o.hue}, 95%, 55%, .18) 55%, transparent 70%)`,
                    boxShadow: "0 10px 30px rgba(139,92,246,0.08)",
                    transform: "translateZ(0)",
                  }}
                />
              ))}

              {spark && (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: spark.x - 16,
                    top: spark.y - 16,
                    width: 32,
                    height: 32,
                    animation: "pop 420ms ease-out",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-violet-500/20" />
                </div>
              )}

              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
          )}

          <div className="relative p-4 md:p-6">
            {askPassword && !showAdmin && (
              <div className="mb-6 bg-white/90 backdrop-blur rounded-2xl p-5 border border-border shadow-lg">
                <div className="flex items-center justify-between mb-3">
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
              <div className="mb-6 bg-white/90 backdrop-blur rounded-3xl p-5 md:p-6 border border-border shadow-xl text-left">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <EyeOff className="w-5 h-5 text-primary" />
                    Admin controls
                  </h3>
                  <Button type="button" variant="outline" className="rounded-full" onClick={lockAdmin}>
                    Hide
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-5">
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
                      onCheckedChange={(checked) =>
                        setNewEntry((p) => ({ ...p, isAnonymous: checked as boolean }))
                      }
                    />
                    <Label>Anonymous</Label>
                  </div>

                  <div className="md:col-span-3">
                    <Button
                      type="button"
                      className="w-full rounded-xl active:scale-[0.99] transition-transform"
                      onClick={addDonation}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add donor
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Edits save to your browser only. Different devices will have different saved data unless you add them there too.
                </div>
              </div>
            )}

            {isShowingPlaceholders && (
              <div className="mb-6">
                <div className="rounded-2xl p-5 border border-border text-center bg-white/85 backdrop-blur">
                  <Gamepad2 className="w-10 h-10 mx-auto mb-3 text-violet-700" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">Leaderboard Awaits</h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Donate to see your name on the board. Top donors take the spotlight.
                  </p>
                </div>
              </div>
            )}

            <div className="max-w-2xl mx-auto">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
                </div>
              ) : (
                <div className={`${shouldScroll ? "max-h-[520px] overflow-y-auto pr-1" : ""} space-y-3`}>
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
                        className={[
                          "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                          isPlaceholder ? "" : "hover:shadow-md active:scale-[0.995]",
                          getRankBg(rank, isPlaceholder),
                        ].join(" ")}
                        style={{
                          animation: reduceMotion ? undefined : "cardIn 380ms ease-out both",
                          animationDelay: `${Math.min(index, 10) * 40}ms`,
                        }}
                      >
                        <div
                          className="flex-shrink-0"
                          style={{
                            animation:
                              !reduceMotion && !isPlaceholder && rank <= 3 ? "floaty 2.8s ease-in-out infinite" : undefined,
                          }}
                        >
                          {getRankIcon(rank, isPlaceholder)}
                        </div>

                        <div className="flex-grow min-w-0">
                          {!isEditing ? (
                            <>
                              <p
                                className={[
                                  "font-semibold truncate",
                                  isPlaceholder ? "text-muted-foreground/60 italic" : "",
                                ].join(" ")}
                              >
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
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="rounded-full"
                                  onClick={cancelEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <p
                            className={`text-lg md:text-xl font-bold ${
                              isPlaceholder ? "text-muted-foreground/40" : "text-gradient"
                            }`}
                          >
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

            {!reduceMotion && (
              <div className="mt-5 text-center text-xs text-muted-foreground">
                little secret game: tap near a floating glow to collect it... miss and it resets
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
