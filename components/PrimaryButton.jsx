"use client";

export default function PrimaryButton({ children, className = "", variant = "primary", ...props }) {
  const styles =
    variant === "secondary"
      ? "border border-slate-300 bg-white text-slate-800 hover:border-teal-500 hover:text-teal-700"
      : "bg-teal-600 text-white hover:bg-teal-700";

  return (
    <button
      className={`focus-ring rounded-md px-4 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
