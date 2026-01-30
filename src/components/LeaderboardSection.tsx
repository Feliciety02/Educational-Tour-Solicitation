"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Trophy, Medal, Award, Gamepad2, Sparkles } from "lucide-react";
import type { Donation } from "@/data/donationsSeed";
import { seedDonations } from "@/data/donationsSeed";

const STORAGE_KEY = "educ_tour_donations_v1";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

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

const LeaderboardSection = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const bgRef = useRef<HTMLDivElement | null>(null);
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [combo, setCombo] = useState(0);
  const [spark, setSpark] = useState<{ id: string; x: number; y: number } | null>(null);

  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<number>(0);

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    if (!window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

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

  const displayDonations = sortedDonations;

  const winners = useMemo(() => displayDonations.slice(0, 3), [displayDonations]);
  const others = useMemo(() => displayDonations.slice(3), [displayDonations]);
  const shouldScroll = others.length > 10;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-violet-600" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-fuchsia-600" />;
    if (rank === 3) return <Award className="w-6 h-6 text-indigo-600" />;
    return (
      <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">
        {rank}
      </span>
    );
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-violet-500/14 to-fuchsia-500/14 border-violet-500/25";
    if (rank === 2) return "bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 border-fuchsia-500/22";
    if (rank === 3) return "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border-indigo-500/22";
    return "bg-white/80 border-border";
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
    <section id="leaderboard" className="relative overflow-hidden py-20 md:py-24 bg-white border-t border-border">
      <style>{`
        @keyframes floaty { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
        @keyframes shimmer { 0% { transform: translateX(-40%); opacity: 0; } 30% { opacity: .9; } 100% { transform: translateX(140%); opacity: 0; } }
        @keyframes pop { 0% { transform: scale(.85); opacity: 0; } 40% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }
        @keyframes cardIn { 0% { transform: translateY(8px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }

        @keyframes sectionOrbA {
          0%   { transform: translate3d(-6%, -4%, 0) scale(1); }
          50%  { transform: translate3d(8%, 6%, 0) scale(1.12); }
          100% { transform: translate3d(-6%, -4%, 0) scale(1); }
        }

        @keyframes sectionOrbB {
          0%   { transform: translate3d(6%, 3%, 0) scale(1); }
          50%  { transform: translate3d(-8%, -5%, 0) scale(1.15); }
          100% { transform: translate3d(6%, 3%, 0) scale(1); }
        }

        @keyframes sectionOrbC {
          0%   { transform: translate3d(0%, 6%, 0) scale(1); }
          50%  { transform: translate3d(4%, -8%, 0) scale(1.10); }
          100% { transform: translate3d(0%, 6%, 0) scale(1); }
        }
      `}</style>

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full blur-[120px]"
            style={{
              background: "rgba(139,92,246,0.35)",
              animation: "sectionOrbA 7s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-0 right-[-220px] h-[620px] w-[620px] rounded-full blur-[140px]"
            style={{
              background: "rgba(217,70,239,0.30)",
              animation: "sectionOrbB 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-48 left-1/4 h-[640px] w-[640px] rounded-full blur-[160px]"
            style={{
              background: "rgba(99,102,241,0.28)",
              animation: "sectionOrbC 9s ease-in-out infinite",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/65 to-white" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-violet-500/10 mb-4 select-none relative overflow-hidden">
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
            A heartfelt thank you to all our generous donors. Your support makes this educational journey possible.
          </p>

          {!reduceMotion && (
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Gamepad2 className="w-4 h-4" />
              Tap the background to collect sparkles
              {combo > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-1 text-violet-800">
                  <Sparkles className="w-3.5 h-3.5" /> combo x{combo}
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
            <div className="max-w-2xl mx-auto">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Winners */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-violet-800">All Donors</p>
                      <p className="text-xs text-muted-foreground">Top 3 donors</p>
                    </div>

                    <div className="grid gap-3">
                      {winners.map((donation, index) => {
                        const rank = index + 1;
                        const displayName = donation.is_anonymous ? "Anonymous Donor" : maskName(donation.donor_name);

                        return (
                          <div
                            key={donation.id}
                            className={[
                              "relative flex items-center gap-4 p-5 rounded-2xl border",
                              "shadow-sm overflow-hidden",
                              getRankBg(rank),
                            ].join(" ")}
                          >
                            <div
                              className="flex-shrink-0"
                              style={{
                                animation: !reduceMotion && rank <= 3 ? "floaty 2.8s ease-in-out infinite" : undefined,
                              }}
                            >
                              {getRankIcon(rank)}
                            </div>

                            <div className="flex-grow min-w-0">
                              <p className="font-semibold truncate text-base md:text-lg">{displayName}</p>
                            </div>

                            <div className="flex-shrink-0 text-right">
                              <p className="text-xl md:text-2xl font-bold text-gradient">
                                ₱{Number(donation.amount).toLocaleString()}
                              </p>
                            </div>

                            {!reduceMotion && rank === 1 && (
                              <span
                                className="pointer-events-none absolute inset-0 rounded-2xl"
                                style={{
                                  background:
                                    "radial-gradient(640px 240px at 20% 18%, rgba(139,92,246,0.18), transparent 55%)",
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* All donors */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                    </div>

                    <div className={`${shouldScroll ? "max-h-[520px] overflow-y-auto pr-1" : ""} space-y-3`}>
                      {others.map((donation, index) => {
                        const rank = index + 4;
                        const displayName = donation.is_anonymous ? "Anonymous Donor" : maskName(donation.donor_name);

                        return (
                          <div
                            key={donation.id}
                            className={[
                              "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                              "bg-white/85 border-border hover:shadow-md active:scale-[0.995]",
                            ].join(" ")}
                            style={{
                              animation: reduceMotion ? undefined : "cardIn 380ms ease-out both",
                              animationDelay: `${Math.min(index, 10) * 30}ms`,
                            }}
                          >
                            <span className="w-7 text-sm font-semibold text-muted-foreground tabular-nums">{rank}</span>

                            <div className="flex-grow min-w-0">
                              <p className="font-semibold truncate">{displayName}</p>
                            </div>

                            <div className="flex-shrink-0 text-right">
                              <p className="text-lg font-bold text-gradient">
                                ₱{Number(donation.amount).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
