import React, { createContext, useContext, useEffect, useState } from "react";
import { generateUsername, generateSessionId } from "../utils/usernameGenerator";

const ChatContext = createContext(null);

export const ROOMS = [
  { id: "general", label: "General", emoji: "💬" },
  { id: "confessions", label: "Confessions", emoji: "🤫" },
  { id: "advice", label: "Advice", emoji: "🧭" },
  { id: "random", label: "Random", emoji: "🎲" },
  { id: "tech-talk", label: "Tech Talk", emoji: "🖥️" },
];

export function ChatProvider({ children }) {
  const [username, setUsernameState] = useState("");
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem("chat_session_id");
    if (existing) return existing;
    const fresh = generateSessionId();
    sessionStorage.setItem("chat_session_id", fresh);
    return fresh;
  });
  const [hasChangedName, setHasChangedName] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(ROOMS[0].id);
  const [darkMode, setDarkMode] = useState(true);

  // Initialize username once per session.
  useEffect(() => {
    const existing = sessionStorage.getItem("chat_username");
    const existingChanged = sessionStorage.getItem("chat_username_changed");
    if (existing) {
      setUsernameState(existing);
      setHasChangedName(existingChanged === "true");
    } else {
      const fresh = generateUsername();
      sessionStorage.setItem("chat_username", fresh);
      setUsernameState(fresh);
    }
  }, []);

  // Initialize dark mode from localStorage (defaults to dark).
  useEffect(() => {
    const stored = localStorage.getItem("chat_theme");
    const isDark = stored ? stored === "dark" : true;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("chat_theme", next ? "dark" : "light");
      return next;
    });
  }

  function changeUsername(newName) {
    if (hasChangedName) return { ok: false, reason: "already-changed" };
    const trimmed = newName.trim();
    if (!trimmed) return { ok: false, reason: "empty" };
    if (trimmed.length > 24) return { ok: false, reason: "too-long" };
    setUsernameState(trimmed);
    sessionStorage.setItem("chat_username", trimmed);
    sessionStorage.setItem("chat_username_changed", "true");
    setHasChangedName(true);
    return { ok: true };
  }

  const value = {
    username,
    sessionId,
    hasChangedName,
    changeUsername,
    currentRoom,
    setCurrentRoom,
    darkMode,
    toggleDarkMode,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
