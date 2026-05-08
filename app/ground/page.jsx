"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { readProfile, saveArena } from "@/lib/storage";

const arenas = [
  {
    id: "classic",
    name: "Classic Court",
    border: "Solid Border",
    className: "grid-classic bg-emerald-600",
    boardClass: "border-[10px] border-white"
  },
  {
    id: "neon",
    name: "Neon Zone",
    border: "Glow Border",
    className: "grid-neon bg-slate-950",
    boardClass: "border-[8px] border-cyan-300 shadow-[0_0_28px_rgba(103,232,249,0.8)]"
  },
  {
    id: "court",
    name: "City Court",
    border: "Double Border",
    className: "grid-court bg-indigo-700",
    boardClass: "border-[12px] border-double border-amber-300"
  },
  {
    id: "paper",
    name: "Paper Grid",
    border: "Dashed Border",
    className: "bg-stone-100",
    boardClass: "border-[8px] border-dashed border-slate-700"
  }
];

export default function GroundPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(arenas[0]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = readProfile();
    if (!stored) {
      router.replace("/");
      return;
    }
    setProfile(stored);
  }, [router]);

  function continueToMode() {
    saveArena(selected);
    router.push("/mode");
  }

  return (
    <main className="app-screen">
      <section className="page-shell grid grid-rows-[auto_1fr_auto] gap-4">
        <AppHeader title="Choose a playing ground" subtitle="Select a board area and border style for the game screen." />

        <div className="grid min-h-0 grid-cols-2 gap-3 md:grid-cols-4">
          {arenas.map((arena) => (
            <button
              className={`focus-ring panel grid min-h-0 rounded-lg p-3 text-left transition ${
                selected.id === arena.id ? "ring-4 ring-teal-500" : "hover:-translate-y-0.5"
              }`}
              key={arena.id}
              type="button"
              onClick={() => setSelected(arena)}
            >
              <div className={`grid aspect-square place-items-center rounded-md ${arena.className}`}>
                <div className={`grid h-4/5 w-4/5 grid-cols-3 gap-1 rounded-md p-2 ${arena.boardClass}`}>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div className="rounded-sm bg-white/85" key={index} />
                  ))}
                </div>
              </div>
              <div className="mt-3 min-w-0">
                <h2 className="truncate text-base font-black text-slate-900">{arena.name}</h2>
                <p className="truncate text-sm font-semibold text-slate-500">{arena.border}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-sm font-bold text-slate-600">
            {profile ? `${profile.name} @${profile.username}` : "Loading profile"}
          </p>
          <PrimaryButton onClick={continueToMode}>Continue</PrimaryButton>
        </div>
      </section>
    </main>
  );
}
