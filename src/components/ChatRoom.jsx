import React, { useEffect, useRef, useState } from "react";
import {
  db,
  ref,
  push,
  onValue,
  onDisconnect,
  set,
  remove,
} from "../firebase/firebase.js";
import { useChat } from "../context/ChatContext.jsx";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import UserCount from "./UserCount.jsx";
import { ROOMS } from "../context/ChatContext.jsx";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function ChatRoom() {
  const { currentRoom, username, sessionId } = useChat();
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(1);
  const bottomRef = useRef(null);

  const roomMeta = ROOMS.find((r) => r.id === currentRoom);

  // Subscribe to messages for the current room.
  useEffect(() => {
    if (!db) return;
    const messagesRef = ref(db, `rooms/${currentRoom}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const now = Date.now();

      const list = Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .filter((msg) => now - (msg.timestamp || 0) < ONE_DAY_MS) // client-side 24h cutoff
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

      setMessages(list);

      // Opportunistically clean up anything older than 24h so the
      // database doesn't grow forever. Safe to run from any client.
      Object.entries(data).forEach(([id, value]) => {
        if (now - (value.timestamp || 0) >= ONE_DAY_MS) {
          remove(ref(db, `rooms/${currentRoom}/messages/${id}`));
        }
      });
    });

    return () => unsubscribe();
  }, [currentRoom]);

  // Presence: mark this session online in this room, remove on disconnect.
  useEffect(() => {
    if (!db) return;
    const presenceRef = ref(db, `presence/${currentRoom}/${sessionId}`);
    set(presenceRef, true);
    const disconnectRef = onDisconnect(presenceRef);
    disconnectRef.remove();

    const roomPresenceRef = ref(db, `presence/${currentRoom}`);
    const unsubscribe = onValue(roomPresenceRef, (snapshot) => {
      const data = snapshot.val() || {};
      setOnlineCount(Math.max(1, Object.keys(data).length));
    });

    return () => {
      remove(presenceRef);
      unsubscribe();
    };
  }, [currentRoom, sessionId]);

  // Auto-scroll on new messages.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, currentRoom]);

  function handleSend(text) {
    if (!db) return;
    const messagesRef = ref(db, `rooms/${currentRoom}/messages`);
    push(messagesRef, {
      username,
      text,
      timestamp: Date.now(),
    });
  }

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-ink-700 bg-ink-900/60 px-4 py-3 sm:px-6">
        <div>
          <h2 className="font-display text-base font-semibold text-mist-50">
            {roomMeta?.emoji} {roomMeta?.label}
          </h2>
          <p className="text-xs text-mist-400">Anonymous · public · ephemeral</p>
        </div>
        <UserCount count={onlineCount} />
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-mist-400">
            <span className="text-3xl">👻</span>
            <p className="text-sm">
              No messages yet. Be the first to say something in{" "}
              {roomMeta?.label}.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              isOwn={msg.username === username}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
