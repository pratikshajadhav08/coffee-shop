import React from "react";
import { EmberField } from "./ui/EmberField";
import { SITE } from "../data/site";

export function Footer() {
  return (
    <footer>
      <EmberField density={100} />

      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <h4
              className="display"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "1.1rem",
                textTransform: "none",
                letterSpacing: 0,
                color: "#f7ecd9",
              }}
            >
              Beanro Coffee
            </h4>
            <p style={{ maxWidth: 240, opacity: 0.7 }}>{SITE.address}</p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#about">Our Story</a>
            <a href="#menu">Menu</a>
            <a href="#gallery">Gallery</a>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <a href="#">Directions</a>
            <a href="#">Catering</a>
            <a href="#">Wholesale</a>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <a href="#">Instagram</a>
            <a href="#">Journal</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 - Beanro Coffee House</span>
          <span>made with love and iced strawberry matcha lattes 🫶🏼🧊🍓🍵</span>
          <span>Slow roasted, always fresh.</span>
        </div>
      </div>
    </footer>
  );
}
