import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "./ui/MagneticButton";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${solid ? "solid" : ""}`}>
      <div className="nav-logo display">
        Beanro<span><img src="src/assets/logo.png" alt="logo"></img></span>
      </div>

      <div className="nav-links">
        <a href="/#about">Story</a>
        <a href="/#menu">Menu</a>
        <a href="/#gallery">Gallery</a>
        <a href="/#visit">Visit</a>
      </div>

      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light and dark mode"
        >
          <span className="knob">{theme === "dark" ? "🌙" : "☀️"}</span>
        </button>
        <span className="nav-order-wrap">
          <MagneticButton
            className="btn-primary"
            onClick={() => navigate("/order")}
          >
            Order Ahead
          </MagneticButton>
          {count > 0 && <span className="nav-cart-badge">{count}</span>}
        </span>
      </div>
    </nav>
  );
}