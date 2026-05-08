"use client";

export default function ScoreStrip({ scores, playerOne, playerTwo }) {
  const items = [
    ["Games", scores.games],
    [playerOne, scores.playerOne],
    [playerTwo, scores.playerTwo],
    ["Draws", scores.draws]
  ];

  return (
    <div className="grid min-w-0 grid-cols-4 gap-1 sm:gap-2">
      {items.map(([label, value]) => (
        <div className="min-w-0 rounded-md border border-slate-200 bg-white/90 px-1 py-1.5 text-center sm:px-2 sm:py-2" key={label}>
          <p className="truncate text-[9px] font-black uppercase text-slate-500 sm:text-[11px]">{label}</p>
          <p className="text-base font-black leading-tight text-slate-900 sm:text-lg">{value}</p>
        </div>
      ))}
    </div>
  );
}
