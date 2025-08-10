"use client";

import { useMemo } from "react";
import { SORT, LOCAL_STORAGE_KEY } from "@/lib/constants";
/**
 * ListView
 * Props:
 *  - items: array of numbers to display (already sorted by parent)
 *  - sortOrder: "asc" | "desc" (the current order the parent applied)
 *  - onToggleSort(): parent flips sort order and re-computes items
 *  - onResetList(): parent clears the list
 *
 * Behavior:
 *  - Shows a “Sort” toggle that reflects current state (Asc/Desc)
 *  - Shows a “Clear list” button (disabled when there are no items)
 *  - Renders a small “Current order” hint
 *  - Lists each number; parent is responsible for preventing duplicates
 */

export default function ListView({ items, sortOrder, onToggleSort, onResetList }) {
const orderLabel =
    sortOrder === SORT.ASC ? "Ascending (1 → n)" : "Descending (n → 1)";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">List</h2>

        <button
          type="button"
          onClick={onToggleSort}
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
          aria-label="Toggle sort order"
        >
          Sort: {sortOrder === SORT.ASC ? "Ascending" : "Descending"}
        </button>

        <button
          type="button"
          onClick={onResetList}
          disabled={items.length === 0}
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition disabled:opacity-40"
        >
          Clear list
        </button>
      </div>
       <div className="text-xs text-white/60">
        Current order: <span className="text-white font-medium">{orderLabel}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-white/70">No numbers added yet. Add some above on the counter</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((n) => {
            return (
              <li
                key={n}
              >
                {n}
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs text-white/50">Duplicates are ignored. Sorting toggles between ascending and descending.</p>
    </div>
  );
}
