import React, { useState } from "react";
import { SplitReveal } from "./ui/SplitReveal";
import { FadeUp } from "./ui/FadeUp";
import { MENU, MENU_FILTERS } from "../data/menu";
import { useCart } from "../context/CartContext";

// Eagerly bundles every image dropped into src/assets/menu/, keyed by
// filename — so item.image ("ember-pour-over.jpg") just has to match a
// file in that folder and it's picked up automatically, no per-item
// import statements needed. Missing files fall back to a gradient card.
const menuImages = import.meta.glob("../assets/menu/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

function resolveImage(filename) {
  const match = Object.entries(menuImages).find(([path]) =>
    path.endsWith(`/${filename}`)
  );
  return match ? match[1] : null;
}

export function Menu() {
  const [filter, setFilter] = useState("All");
  const [justAdded, setJustAdded] = useState(null);
  const { addItem } = useCart();

  const filtered =
    filter === "All" ? MENU : MENU.filter((item) => item.tag === filter);

  const handleAdd = (item) => {
    addItem(item);
    setJustAdded(item.name);
    setTimeout(() => setJustAdded((cur) => (cur === item.name ? null : cur)), 1100);
  };

  return (
    <section className="pad" id="menu">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">The Menu</div>
          <h2 className="section-title display">
            <SplitReveal text="Small list. Big care." />
          </h2>
        </div>
      </div>

      <div className="menu-band">
        <FadeUp delay={0.1}>
          <div className="filter-row">
            {MENU_FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-chip ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="menu-grid">
          {filtered.map((item, i) => {
            const img = resolveImage(item.image);
            return (
              <FadeUp key={item.name} delay={i * 0.06}>
                <div className="menu-card">
                  {item.rating && (
                    <span className="menu-card-rating">
                      {item.rating.toFixed(1)}
                      <span className="star">★</span>
                    </span>
                  )}
                  <div className="menu-card-img">
                    {img ? (
                      <img src={img} alt={item.name} />
                    ) : (
                      <span className="menu-card-img-placeholder">
                        {item.name}
                      </span>
                    )}
                  </div>
                  <div className="menu-card-name display">{item.name}</div>
                  <div className="menu-card-bottom">
                    <span className="menu-card-price">{item.price}</span>
                    <button
                      className="menu-card-cta"
                      onClick={() => handleAdd(item)}
                    >
                      {justAdded === item.name ? (
                        "Added ✓"
                      ) : (
                        <>
                          Get This Brew <span className="arrow">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}