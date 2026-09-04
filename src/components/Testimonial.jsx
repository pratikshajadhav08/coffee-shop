import React from "react";
import { FadeUp } from "./ui/FadeUp";

export function Testimonial() {
  return (
    <section className="pad">
      <FadeUp>
        <div className="quote-block">
          <p className="display">
            "The kind of place that makes you slow down on purpose. The
            cortado tastes like someone actually thought about it."
          </p>
          <div className="quote-attr">— Rhea M., regular since 2019</div>
        </div>
      </FadeUp>
    </section>
  );
}
