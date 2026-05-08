"use client";

import Link from "next/link";

export default function AppHeader({ title, subtitle, compact = false }) {
  return (
    <header className="flex min-w-0 items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs sm:tracking-[0.2em]">
          Tic Tac Toe Arena
        </p>
        <h1 className={`${compact ? "text-lg sm:text-2xl" : "text-2xl sm:text-4xl"} truncate font-black leading-tight text-slate-900`}>
          {title}
        </h1>
        {subtitle ? <p className="mt-0.5 line-clamp-1 text-xs text-slate-600 sm:mt-1 sm:text-sm">{subtitle}</p> : null}
      </div>
      <Link
        className="focus-ring shrink-0 rounded-md border border-slate-300 bg-white px-2 py-2 text-xs font-bold text-slate-800 transition hover:border-teal-500 hover:text-teal-700 sm:px-3 sm:text-sm"
        href="/leaderboard"
      >
        <span className="hidden sm:inline">Leaderboard</span>
        <span className="sm:hidden">Board</span>
      </Link>
    </header>
  );
}
