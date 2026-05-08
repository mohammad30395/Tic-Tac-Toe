"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { readLeaderboard, saveLeaderboard } from "@/lib/storage";

export default function LeaderboardPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(readLeaderboard());
  }, []);

  function clearRecords() {
    saveLeaderboard([]);
    setRecords([]);
  }

  return (
    <main className="app-screen">
      <section className="page-shell grid grid-rows-[auto_auto_1fr] gap-4">
        <AppHeader title="Leaderboard" subtitle="Saved match records from this browser." />

        <div className="flex items-center justify-between gap-3">
          <Link
            className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
            href="/"
          >
            New Match
          </Link>
          <PrimaryButton disabled={!records.length} variant="secondary" onClick={clearRecords}>
            Clear Records
          </PrimaryButton>
        </div>

        <div className="panel min-h-0 overflow-hidden rounded-lg">
          {records.length ? (
            <div className="h-full overflow-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="sticky top-0 bg-slate-900 text-white">
                  <tr>
                    <th className="px-3 py-3 font-black">Game</th>
                    <th className="px-3 py-3 font-black">Winner</th>
                    <th className="px-3 py-3 font-black">Players</th>
                    <th className="px-3 py-3 font-black">Mode</th>
                    <th className="px-3 py-3 font-black">User</th>
                    <th className="px-3 py-3 font-black">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr className="border-b border-slate-200 odd:bg-white even:bg-slate-50" key={record.id}>
                      <td className="px-3 py-3 font-bold text-slate-900">{record.gameNumber}</td>
                      <td className="px-3 py-3 font-black text-teal-700">{record.winner}</td>
                      <td className="px-3 py-3 font-semibold text-slate-700">
                        {record.playerOne} vs {record.playerTwo}
                      </td>
                      <td className="px-3 py-3 font-semibold capitalize text-slate-700">
                        {record.mode} / {record.difficulty}
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-700">@{record.username}</td>
                      <td className="px-3 py-3 font-semibold text-slate-500">{record.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid h-full place-items-center p-6 text-center">
              <div>
                <h2 className="text-xl font-black text-slate-900">No saved games yet</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">Complete a round to add it here.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
