import React from "react";

export default function UserCount({ count }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800 px-3 py-1 text-xs text-mist-200">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span>👥 Online: {count}</span>
    </div>
  );
}
