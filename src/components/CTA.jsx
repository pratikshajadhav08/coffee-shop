import React from "react";
import { SplitReveal } from "./ui/SplitReveal";
import { FadeUp } from "./ui/FadeUp";
import { MagneticButton } from "./ui/MagneticButton";
import { SITE } from "../data/site";

export function CTA() {
  return (
    <FadeUp>
      <section className="cta" id="visit">
        <h2 className="display">
          <SplitReveal text="Come sit with us a while." />
        </h2>
        <p style={{ color: "var(--cream-dim)", maxWidth: 480, margin: "0 auto 36px" }}>
          Open daily, 7am – 8pm. Walk-ins always welcome, the corner table
          is usually free before 9.
        </p>
        <div className="cta-actions">
          <MagneticButton
            className="btn-primary"
            onClick={() =>
              window.open(SITE.mapsUrl, "_blank", "noopener,noreferrer")
            }
          >
            Get Directions
          </MagneticButton>
          <MagneticButton
            className="btn-outline"
            onClick={() => {
              window.location.href = SITE.phoneHref;
            }}
          >
            Call the Bar
          </MagneticButton>
        </div>
      </section>
    </FadeUp>
  );
}