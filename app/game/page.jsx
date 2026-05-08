"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import PrimaryButton from "@/components/PrimaryButton";
import ScoreStrip from "@/components/ScoreStrip";
import { getComputerMove, getWinner } from "@/lib/game";
import { addLeaderboardRecord, readArena, readMatchConfig, readProfile } from "@/lib/storage";

const blankBoard = Array(9).fill(null);

export default function GamePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [arena, setArena] = useState(null);
  const [match, setMatch] = useState(null);
  const [board, setBoard] = useState(blankBoard);
  const [turn, setTurn] = useState("X");
  const [scores, setScores] = useState({ games: 0, playerOne: 0, playerTwo: 0, draws: 0 });
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("Player 1 starts with X");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const storedProfile = readProfile();
    const storedArena = readArena();
    const storedMatch = readMatchConfig();

    if (!storedProfile || !storedArena || !storedMatch) {
      router.replace("/");
      return;
    }

    setProfile(storedProfile);
    setArena(storedArena);
    setMatch(storedMatch);
    setMessage(`${storedMatch.playerOne} starts with X`);
  }, [router]);

  const names = useMemo(() => {
    return {
      X: match?.playerOne ?? "Player 1",
      O: match?.playerTwo ?? "Player 2"
    };
  }, [match]);

  useEffect(() => {
    if (!match || match.mode !== "computer" || turn !== "O" || locked) return;

    const timer = window.setTimeout(() => {
      const move = getComputerMove(board, match.difficulty, "O", "X");
      if (move !== null) playMove(move, "O");
    }, 420);

    return () => window.clearTimeout(timer);
  }, [board, locked, match, turn]);

  function finishRound(result, nextBoard) {
    const gameNumber = scores.games + 1;
    const outcome =
      result.symbol === "draw"
        ? { label: "Draw match", winnerName: "Draw", scoreKey: "draws" }
        : {
            label: `Congratulations ${names[result.symbol]} wins`,
            winnerName: names[result.symbol],
            scoreKey: result.symbol === "X" ? "playerOne" : "playerTwo"
          };

    const record = {
      id: `${Date.now()}-${gameNumber}`,
      date: new Date().toLocaleString(),
      username: profile?.username ?? "guest",
      mode: match.mode,
      difficulty: match.mode === "computer" ? match.difficulty : "two-player",
      gameNumber,
      winner: outcome.winnerName,
      playerOne: match.playerOne,
      playerTwo: match.playerTwo,
      board: nextBoard
    };

    setLocked(true);
    setMessage(outcome.label);
    setScores((current) => ({
      ...current,
      games: current.games + 1,
      [outcome.scoreKey]: current[outcome.scoreKey] + 1
    }));
    setRecords((current) => [record, ...current]);
    addLeaderboardRecord(record);
  }

  function playMove(index, symbol = turn) {
    if (locked || board[index] || !match) return;

    const nextBoard = [...board];
    nextBoard[index] = symbol;
    setBoard(nextBoard);

    const result = getWinner(nextBoard);
    if (result) {
      finishRound(result, nextBoard);
      return;
    }

    const nextTurn = symbol === "X" ? "O" : "X";
    setTurn(nextTurn);
    setMessage(`${names[nextTurn]}'s turn`);
  }

  function nextGame() {
    setBoard(blankBoard);
    setTurn("X");
    setLocked(false);
    setMessage(`${names.X} starts with X`);
  }

  function quitGame() {
    const winner =
      scores.playerOne === scores.playerTwo
        ? "No overall winner"
        : scores.playerOne > scores.playerTwo
          ? names.X
          : names.O;

    const summary = {
      id: `${Date.now()}-quit`,
      date: new Date().toLocaleString(),
      username: profile?.username ?? "guest",
      mode: match?.mode ?? "players",
      difficulty: match?.mode === "computer" ? match.difficulty : "two-player",
      gameNumber: "Final",
      winner,
      playerOne: names.X,
      playerTwo: names.O,
      board: []
    };

    addLeaderboardRecord(summary);
    router.push("/leaderboard");
  }

  if (!profile || !arena || !match) return null;

  return (
    <main className={`app-screen ${arena.className}`}>
      <section className="page-shell grid grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-2 sm:gap-3">
        <AppHeader compact title={`${names.X} vs ${names.O}`} subtitle={`${arena.name} • ${match.mode === "computer" ? `${match.difficulty} computer` : "two players"}`} />
        <ScoreStrip scores={scores} playerOne={names.X} playerTwo={names.O} />

        <div className="panel grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-2 rounded-lg p-2 sm:p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-black text-slate-900 sm:text-sm">{message}</p>
            {locked ? (
              <PrimaryButton className="px-3 py-1.5 sm:py-2" onClick={nextGame}>
                Next
              </PrimaryButton>
            ) : null}
          </div>

          <div className="grid min-h-0 min-w-0 place-items-center overflow-hidden">
            <div
              className={`game-board-size grid aspect-square grid-cols-3 gap-1.5 rounded-lg p-1.5 sm:gap-2 sm:p-2 ${arena.boardClass}`}
              style={{ backgroundColor: profile.gridColor }}
            >
              {board.map((cell, index) => (
                <button
                  aria-label={`Cell ${index + 1}`}
                  className="focus-ring grid min-h-0 place-items-center rounded-md bg-white/95 text-[clamp(1.8rem,11vmin,5rem)] font-black leading-none transition hover:bg-white disabled:cursor-not-allowed"
                  disabled={locked || Boolean(cell) || (match.mode === "computer" && turn === "O")}
                  key={index}
                  type="button"
                  onClick={() => playMove(index)}
                >
                  <span style={{ color: cell === "X" ? profile.xColor : profile.oColor }}>{cell}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-2">
          <p className="truncate text-[11px] font-bold text-white drop-shadow md:text-sm">
            Records this session: {records.length ? records.map((record) => `Game ${record.gameNumber}: ${record.winner}`).join(" | ") : "No completed games yet"}
          </p>
          <PrimaryButton variant="secondary" onClick={quitGame}>
            Quit
          </PrimaryButton>
        </div>
      </section>
    </main>
  );
}
