import React from "react";
import { useReveal } from "../../hooks/useReveal";

// Reveals each word of `text` with a staggered slide-up, reactbits-style.
export function SplitReveal({ text, className = "", delay = 0, as: Tag = "span" }) {
  const [ref, visible] = useReveal(0.4);
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            marginRight: "0.28em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0%)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.9s cubic-bezier(.16,.84,.24,1) ${
                delay + i * 0.06
              }s, opacity 0.7s ease ${delay + i * 0.06}s`,
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </Tag>
  );
}
