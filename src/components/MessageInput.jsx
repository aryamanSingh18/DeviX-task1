import React, { useState } from "react";
import { containsProfanity, censor } from "../utils/profanityFilter";

const MAX_LENGTH = 200;

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");

  const trimmedLength = text.length;
  const overLimit = trimmedLength > MAX_LENGTH;
  const isEmpty = text.trim().length === 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty) {
      setWarning("Message can't be empty.");
      return;
    }
    if (overLimit) {
      setWarning(`Message is over the ${MAX_LENGTH} character limit.`);
      return;
    }

    const clean = containsProfanity(text) ? censor(text) : text;
    onSend(clean.trim());
    setText("");
    setWarning("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-ink-700 bg-ink-900/80 p-3 backdrop-blur sm:p-4"
    >
      {warning && (
        <p className="mb-2 text-xs text-red-400">{warning}</p>
      )}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (warning) setWarning("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            rows={1}
            placeholder="Say something anonymously..."
            className="w-full resize-none rounded-xl border border-ink-600 bg-ink-800 px-4 py-2.5 text-sm text-mist-50 placeholder:text-mist-400 outline-none focus:border-ghost"
          />
          <div className="mt-1 flex justify-end px-1">
            <span
              className={`text-[11px] tabular-nums ${
                overLimit ? "text-red-400" : "text-mist-400"
              }`}
            >
              {trimmedLength} / {MAX_LENGTH}
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isEmpty || overLimit}
          className="rounded-xl bg-ghost px-4 py-2.5 text-sm font-medium text-white shadow-glow transition-colors hover:bg-ghost-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Send
        </button>
      </div>
    </form>
  );
}
