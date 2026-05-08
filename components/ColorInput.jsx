"use client";

export default function ColorInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">{label}</span>
      <div className="flex h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-2">
        <input
          aria-label={label}
          className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
          type="color"
          value={value}
          onChange={onChange}
        />
        <span className="text-sm font-bold text-slate-700">{value.toUpperCase()}</span>
      </div>
    </label>
  );
}
