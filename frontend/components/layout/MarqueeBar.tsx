"use client";

import { TICKER_ITEMS } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function MarqueeBar() {
  const [item, setItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setItem((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="marquee-container">
      <span className="marquee-content">
        ~~~ {TICKER_ITEMS[item]} ~~~
      </span>
    </div>
  );
}
