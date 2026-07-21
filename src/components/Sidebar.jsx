import React from "react";
import { ROOMS, useChat } from "../context/ChatContext.jsx";

export default function Sidebar({ open, onClose }) {
  const { currentRoom, setCurrentRoom } = useChat();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-30 h-full w-64 shrink-0 border-r border-ink-700 bg-ink-900 p-4 transition-transform duration-200 md:static md:z-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-mist-400">
          Rooms
        </p>
        <nav className="flex flex-col gap-1">
          {ROOMS.map((room) => {
            const active = room.id === currentRoom;
            return (
              <button
                key={room.id}
                onClick={() => {
                  setCurrentRoom(room.id);
                  onClose?.();
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "bg-ghost/15 text-ghost-light shadow-glow"
                    : "text-mist-200 hover:bg-ink-800"
                }`}
              >
                <span className="text-base">{room.emoji}</span>
                <span className="font-medium">{room.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ghost" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 rounded-lg border border-ink-700 bg-ink-800/60 p-3 text-xs leading-relaxed text-mist-400">
          Messages are anonymous and auto-delete after 24 hours. Be kind to
          whoever's on the other side of the screen.
        </div>
      </aside>
    </>
  );
}
