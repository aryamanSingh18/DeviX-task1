import React, { useState } from "react";
import { useChat } from "../context/ChatContext.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

export default function Navbar({ onToggleSidebar }) {
  const { username, hasChangedName, changeUsername } = useChat();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(username);
  const [error, setError] = useState("");

  function startEditing() {
    setDraft(username);
    setError("");
    setEditing(true);
  }

  function submit(e) {
    e.preventDefault();
    const result = changeUsername(draft);
    if (!result.ok) {
      setError(
        result.reason === "empty"
          ? "Name can't be empty."
          : result.reason === "too-long"
          ? "Keep it under 24 characters."
          : "You can only change your name once per session."
      );
      return;
    }
    setEditing(false);
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-700 bg-ink-900/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-mist-200 hover:bg-ink-800 md:hidden"
          aria-label="Toggle rooms"
        >
          ☰
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ghost/20 text-lg">
            👻
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-mist-50">
            whisper
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <DarkModeToggle />

        {editing ? (
          <form onSubmit={submit} className="flex items-center gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={24}
              className="w-32 rounded-md border border-ink-600 bg-ink-800 px-2 py-1 text-sm text-mist-50 outline-none focus:border-ghost sm:w-40"
            />
            <button
              type="submit"
              className="rounded-md bg-ghost px-2 py-1 text-sm font-medium text-white hover:bg-ghost-dark"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-sm text-mist-400 hover:text-mist-200"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={startEditing}
            disabled={hasChangedName}
            title={
              hasChangedName
                ? "You've already used your one name change this session"
                : "Change your name (once per session)"
            }
            className="group flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800 px-3 py-1.5 text-sm font-mono text-mist-50 disabled:cursor-not-allowed disabled:opacity-70 enabled:hover:border-ghost"
          >
            {username}
            {!hasChangedName && (
              <span className="text-xs text-mist-400 group-hover:text-ghost-light">✎</span>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="absolute right-4 top-16 mt-1 rounded-md bg-red-500/10 px-3 py-1 text-xs text-red-400">
          {error}
        </div>
      )}
    </header>
  );
}
