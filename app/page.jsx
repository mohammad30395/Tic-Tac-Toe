"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import ColorInput from "@/components/ColorInput";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { readProfile, saveProfile } from "@/lib/storage";

const defaultProfile = {
  name: "",
  username: "",
  gridColor: "#14b8a6",
  xColor: "#ef4444",
  oColor: "#2563eb"
};

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    setProfile(readProfile() ?? defaultProfile);
  }, []);

  function updateProfile(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    saveProfile({
      ...profile,
      name: profile.name.trim(),
      username: profile.username.trim()
    });
    router.push("/ground");
  }

  const isReady = profile.name.trim() && profile.username.trim();

  return (
    <main className="app-screen">
      <section className="page-shell grid grid-rows-[auto_1fr] gap-4">
        <AppHeader
          title="Build your match profile"
          subtitle="Choose your name, player tag, board grid color, and the colors used by X and O."
        />

        <div className="grid min-h-0 items-center md:grid-cols-[1fr_0.9fr] md:gap-8">
          <form className="panel rounded-lg p-4 sm:p-6" onSubmit={submit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextInput
                label="Name"
                maxLength={28}
                placeholder="Your name"
                required
                value={profile.name}
                onChange={(event) => updateProfile("name", event.target.value)}
              />
              <TextInput
                label="Username"
                maxLength={18}
                placeholder="Player tag"
                required
                value={profile.username}
                onChange={(event) => updateProfile("username", event.target.value)}
              />
              <ColorInput
                label="Grid Color"
                value={profile.gridColor}
                onChange={(event) => updateProfile("gridColor", event.target.value)}
              />
              <ColorInput
                label="X Color"
                value={profile.xColor}
                onChange={(event) => updateProfile("xColor", event.target.value)}
              />
              <ColorInput
                label="O Color"
                value={profile.oColor}
                onChange={(event) => updateProfile("oColor", event.target.value)}
              />
            </div>
            <PrimaryButton className="mt-5 w-full" disabled={!isReady} type="submit">
              Choose Playing Ground
            </PrimaryButton>
          </form>

          <div className="hidden h-full min-h-0 place-items-center md:grid">
            <div
              className="grid aspect-square w-full max-w-sm grid-cols-3 gap-2 rounded-lg p-4"
              style={{ backgroundColor: profile.gridColor }}
            >
              {["X", "O", "X", "O", "X", "O", "X", "O", "X"].map((symbol, index) => (
                <div className="grid place-items-center rounded-md bg-white/90 text-5xl font-black" key={`${symbol}-${index}`}>
                  <span style={{ color: symbol === "X" ? profile.xColor : profile.oColor }}>{symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
