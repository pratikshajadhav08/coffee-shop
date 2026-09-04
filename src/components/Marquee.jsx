import React from "react";
import { MARQUEE_WORDS } from "../data/menu";

export function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
          <span key={i} className={w === "•" ? "" : "display"}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
