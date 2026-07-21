import React from "react";
import { useChat } from "../context/ChatContext.jsx";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useChat();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="relative flex h-8 w-14 items-center rounded-full bg-ink-700 px-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ghost dark:bg-ink-700 border border-ink-600"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-ghost text-xs shadow-glow transition-transform duration-200 ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {darkMode ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
