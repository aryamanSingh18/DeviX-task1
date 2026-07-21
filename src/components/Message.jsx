import React from "react";

function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

// Deterministically derive a color from the username so the same
// anonymous handle always gets the same accent color in a room.
function colorFor(name) {
  const palette = [
    "#7C6FF0",
    "#3ECF8E",
    "#F0B429",
    "#EF6461",
    "#4FA3E3",
    "#E36BAE",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

export default function Message({ message, isOwn }) {
  const accent = colorFor(message.username);

  return (
    <div className="msg-enter flex gap-3 px-1 py-1.5">
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-ink-950"
        style={{ backgroundColor: accent }}
      >
        {message.username.replace("Anonymous", "").slice(0, 1) || "?"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span
            className="truncate font-mono text-sm font-medium"
            style={{ color: accent }}
          >
            {message.username}
            {isOwn && <span className="ml-1 text-mist-400">(you)</span>}
          </span>
          <span className="shrink-0 text-[11px] text-mist-400">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <p className="mt-0.5 break-words text-sm text-mist-50">{message.text}</p>
      </div>
    </div>
  );
}
