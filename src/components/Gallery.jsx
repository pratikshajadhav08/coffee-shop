import React from "react";
import { SplitReveal } from "./ui/SplitReveal";
import { FadeUp } from "./ui/FadeUp";
import AccordionGallery from "./ui/AccordionGallery";
import { GALLERY_ITEMS } from "../data/menu";

// Eagerly bundles any local photo dropped into src/assets/gallery/, keyed
// by filename. If you add a file matching an item's `image` field, it's
// used automatically; otherwise the item falls back to its Unsplash photo.
const galleryImages = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

function resolveImage(filename) {
  const match = Object.entries(galleryImages).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return match ? match[1] : null;
}

export function Gallery() {
  const items = GALLERY_ITEMS.map((item) => ({
    image: resolveImage(item.image) || item.unsplash,
    label: item.label,
    alt: item.label,
  }));

  return (
    <section style={{ padding: "60px 0 120px" }} id="gallery">
      <div style={{ padding: "0 6vw", marginBottom: 44 }}>
        <div className="section-eyebrow">Around The Bar</div>
        <h2 className="section-title display">
          <SplitReveal text="A few moments in between pours." />
        </h2>
      </div>

      <FadeUp>
        <div style={{ padding: "0 6vw" }}>
          <AccordionGallery
            items={items}
            defaultIndex={2}
            expandRatio={0.5}
            trigger="hover"
            height={420}
            radius={20}
            gap={12}
            accentColor="#e2803f"
            overlayColor="#241a12"
            textColor="#f7ecd9"
          />
        </div>
      </FadeUp>
    </section>
  );
}