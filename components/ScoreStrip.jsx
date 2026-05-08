"use client";

export default function ScoreStrip({ scores, playerOne, playerTwo }) {
  const items = [
    ["Games", scores.games],
    [playerOne, scores.playerOne],
    [playerTwo, scores.playerTwo],
    ["Draws", scores.draws]
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(([label, value]) => (
        <div className="rounded-md border border-slate-200 bg-white/90 px-2 py-2 text-center" key={label}>
          <p className="truncate text-[11px] font-black uppercase text-slate-500">{label}</p>
          <p className="text-lg font-black text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
}
