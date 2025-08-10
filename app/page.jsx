"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Counter from "../components/Counter";
import ListView from "../components/ListView";
import { SORT, LOCAL_STORAGE_KEY } from "@/lib/constants";


export default function HomePage() {
  // Counter value and stored numbers
  // initialisaing 2 
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState(SORT.ASC); // "asc" | "desc"

  // Load the saved list once on mounting
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
  console.error("error found while saving the list",e);
    } 
  }, []);

  // Persist whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch {
  console.error("error while Persisting whenever the list changes",e);
    }
  }, [items]);

  // writing two handlers / callback functions , one for handling increment and one for handling decrement

  const handleIncrement = useCallback(() => setCount((count) => count + 1), []);
  const handleDecrement = useCallback(() => setCount((count) => (count > 0 ? count - 1 : 0)), []);

  const handleAdd = useCallback(() => {
    if (count <= 0) 
      {
       showFlash("Enter a number greater than 0 to add.", "warning");
return; 
      }// only add positive numbers

    setItems((prev) => {
      // duplicates are ignored
      if (prev.includes(count))
        {   
          console.log("Skipping the current count as the same count already presnet in the list of items");

          return prev;
         }
      return [...prev, count];
    });

    setCount(0); // reset after adding the numbers, updating state variable 
    // to 0 after addition
  }, [count]);

  const toggleSort = useCallback(() => {
    setSortOrder((o) => (o === SORT.ASC ? SORT.DEC : SORT.ASC));
  }, []);

  const clearList = useCallback(() => setItems([]), []);

  // Deriving a sorted view for rendering
  // using memo function , which is called only when items, sortOrder changes 
  const sortedItems = useMemo(() => {
    const out = [...items];
    out.sort((a, b) => (sortOrder ===  SORT.ASC  ? a - b : b - a));
    return out;
  }, [items, sortOrder]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8 flex items-center gap-3">

          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-pink-500 via-violet-500 to-cyan-400" />
          <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400">RAIQA Health</span>{" "}
            Assignment
          </h1>
        </header>

        <section className="mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Counter</h2>
            <Counter
              value={count}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onAdd={handleAdd}
            />
          </div>
        </section>

        <section>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
            <ListView
              items={sortedItems}
              sortOrder={sortOrder}
              onToggleSort={toggleSort}
              onResetList={clearList}
            />
          </div>
        </section>

      </div>
    </main>
  );
}