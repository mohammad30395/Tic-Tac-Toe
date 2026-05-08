"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { readArena, readProfile, saveMatchConfig } from "@/lib/storage";

export default function ModePage() {
  const router = useRouter();
  const [mode, setMode] = useState("players");
  const [difficulty, setDifficulty] = useState("medium");
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  useEffect(() => {
    const profile = readProfile();
    const arena = readArena();
    if (!profile || !arena) {
      router.replace("/");
      return;
    }

    setPlayerOne(profile.name || "Player 1");
    setPlayerTwo("Player 2");
  }, [router]);

  function startGame(event) {
    event.preventDefault();
    saveMatchConfig({
      mode,
      difficulty,
      playerOne: playerOne.trim() || "Player 1",
      playerTwo: mode === "computer" ? "Computer" : playerTwo.trim() || "Player 2"
    });
    router.push("/game");
  }

  return (
    <main className="app-screen">
      <section className="page-shell grid grid-rows-[auto_1fr] gap-4">
        <AppHeader title="Set match mode" subtitle="Play with another person or challenge the computer at three levels." />

        <form className="panel grid min-h-0 content-center gap-4 rounded-lg p-4 sm:p-6" onSubmit={startGame}>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`focus-ring rounded-lg border p-4 text-left transition ${
                mode === "players" ? "border-teal-600 bg-teal-50" : "border-slate-300 bg-white"
              }`}
              type="button"
              onClick={() => setMode("players")}
            >
              <h2 className="text-lg font-black text-slate-900">Two Players</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">Player 1 vs Player 2 on the same device.</p>
            </button>
            <button
              className={`focus-ring rounded-lg border p-4 text-left transition ${
                mode === "computer" ? "border-teal-600 bg-teal-50" : "border-slate-300 bg-white"
              }`}
              type="button"
              onClick={() => setMode("computer")}
            >
              <h2 className="text-lg font-black text-slate-900">Computer</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">Easy, medium, or hard AI opponent.</p>
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput
              label="Player 1"
              maxLength={24}
              required
              value={playerOne}
              onChange={(event) => setPlayerOne(event.target.value)}
            />
            {mode === "players" ? (
              <TextInput
                label="Player 2"
                maxLength={24}
                required
                value={playerTwo}
                onChange={(event) => setPlayerTwo(event.target.value)}
              />
            ) : (
              <label className="block">
                <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Computer Level</span>
                <select
                  className="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-bold text-slate-900"
                  value={difficulty}
                  onChange={(event) => setDifficulty(event.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
            )}
          </div>

          <PrimaryButton className="w-full sm:w-auto sm:justify-self-end" type="submit">
            OK, Start Game
          </PrimaryButton>
        </form>
      </section>
    </main>
  );
}
