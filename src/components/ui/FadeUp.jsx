import React from "react";
import { useReveal } from "../../hooks/useReveal";

// Wraps children and fades + slides them up once scrolled into view.
export function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal(0.15);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(.16,.84,.24,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
