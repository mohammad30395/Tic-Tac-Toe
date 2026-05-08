"use client";

import Link from "next/link";

export default function AppHeader({ title, subtitle, compact = false }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Tic Tac Toe Arena</p>
        <h1 className={`${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-4xl"} truncate font-black text-slate-900`}>
          {title}
        </h1>
        {subtitle ? <p className="mt-1 line-clamp-2 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      <Link
        className="focus-ring shrink-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
        href="/leaderboard"
      >
        Leaderboard
      </Link>
    </header>
  );
}
