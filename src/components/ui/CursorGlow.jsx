import React, { useEffect, useRef } from "react";

// A soft glow blob that follows the mouse (desktop only, see .cursor-glow CSS).
export function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${
          e.clientY - 200
        }px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}
