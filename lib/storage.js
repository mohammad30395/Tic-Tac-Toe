"use client";

const PROFILE_KEY = "ttt-profile";
const ARENA_KEY = "ttt-arena";
const MATCH_KEY = "ttt-match";
const LEADERBOARD_KEY = "ttt-leaderboard";

export function readStore(key, fallback = null) {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readProfile() {
  return readStore(PROFILE_KEY);
}

export function saveProfile(profile) {
  writeStore(PROFILE_KEY, profile);
}

export function readArena() {
  return readStore(ARENA_KEY);
}

export function saveArena(arena) {
  writeStore(ARENA_KEY, arena);
}

export function readMatchConfig() {
  return readStore(MATCH_KEY);
}

export function saveMatchConfig(match) {
  writeStore(MATCH_KEY, match);
}

export function readLeaderboard() {
  return readStore(LEADERBOARD_KEY, []);
}

export function saveLeaderboard(records) {
  writeStore(LEADERBOARD_KEY, records);
}

export function addLeaderboardRecord(record) {
  const records = readLeaderboard();
  const nextRecords = [record, ...records].slice(0, 80);
  saveLeaderboard(nextRecords);
  return nextRecords;
}
