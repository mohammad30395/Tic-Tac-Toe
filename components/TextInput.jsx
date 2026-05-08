"use client";

export default function TextInput({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">{label}</span>
      <input
        className="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900"
        {...props}
      />
    </label>
  );
}
