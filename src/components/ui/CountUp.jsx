import React, { useEffect, useState } from "react";
import { useReveal } from "../../hooks/useReveal";

// Animates a number counting up from 0 once it scrolls into view.
export function CountUp({ to, suffix = "", duration = 1400 }) {
  const [ref, visible] = useReveal(0.6);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * to));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
