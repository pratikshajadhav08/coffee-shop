import React from "react";
import { SplitReveal } from "./ui/SplitReveal";
import { FadeUp } from "./ui/FadeUp";
import aboutImg from "../assets/about1.jpg";

export function About() {
  return (
    <section className="pad" id="about">
      <div className="about-grid">
        <FadeUp>
          <div className="about-art">
            <img src={aboutImg} alt="Inside the Ember & Oak coffee bar" />
          </div>
        </FadeUp>

        <div className="about-copy">
          <div className="section-eyebrow">Our Story</div>
          <h2 className="section-title display" style={{ marginBottom: 28 }}>
            <SplitReveal text="Rooted in the ritual of a good morning." />
          </h2>
          <FadeUp delay={0.15}>
            <p>
              Ember &amp; Oak started as a single hand-crank roaster on a
              balcony. Nine years on, we still buy in small lots, cup every
              batch before it's approved, and roast just enough for the
              week ahead — never more.
            </p>
            <p>
              We work directly with growers across Karnataka, Kerala and
              Ethiopia, paying above market rate for lots we'd happily
              drink ourselves. What's left on the shelf gets donated by
              Friday.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}