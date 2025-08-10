"use client";

import { useMemo } from "react";

/**
 * Counter
 * Props:
 *  - value: current counter number (controlled by parent component Page component )
 *  - onIncrement(): bump the counter by 1 (parent updates state)
 *  - onDecrement(): lower by 1, parent should guard not going < 0
 *  - onAdd(): request to add the current value to the list (handled in parent)
 *
 * UX rules:
 *  - Decrement disabled when value is 0
 *  - Add disabled when value is 0
 *  - The big number uses tabular-nums for tidy alignment
 */


export default function Counter({ value, onIncrement, onDecrement, onAdd }) {
  const canDecrement = value > 0;
  const canAdd = value > 0;
  const display = useMemo(() => String(value), [value]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          disabled={!canDecrement}
          className="h-12 w-12 rounded-2xl border border-white/10 bg-white/10 text-2xl font-semibold disabled:opacity-40 hover:bg-white/20 transition"
          aria-label="Decrement"
        >
          –
        </button>

        <div className="min-w-[5rem] text-center text-3xl font-bold tabular-nums">{display}</div>

        <button
          type="button"
          onClick={onIncrement}
          className="h-12 w-12 rounded-2xl border border-white/10 bg-white/10 text-2xl font-semibold hover:bg-white/20 transition"
          aria-label="Increment"
        >
          +
        </button>
      </div>

      <div className="sm:ml-auto">
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className="h-12 rounded-2xl px-5 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400 font-semibold text-black disabled:opacity-40"
        >
          Add to list
        </button>
      </div>
    </div>
  );
}
