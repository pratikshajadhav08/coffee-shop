import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { CursorGlow } from "./components/ui/CursorGlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Menu } from "./components/Menu";
import { Gallery } from "./components/Gallery";
import { Testimonial } from "./components/Testimonial";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { OrderPage } from "./components/OrderPage";

/* ---------------------------------------------------------
   EMBER & OAK — a small-batch coffee house
   Aesthetic: warm, editorial, "found-object" rustic-luxury.
   Animations hand-built in the spirit of reactbits.dev:
   staggered text reveal, magnetic buttons, scroll reveal,
   marquee, cursor-glow, count-up. See components/ui/*.
--------------------------------------------------------- */

function Landing() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Menu />
      <Gallery />
      <Testimonial />
      <CTA />
    </>
  );
}

// React Router's <Link> doesn't auto-scroll to a "#hash" the way a normal
// page load does. This watches every route change and either smooth-scrolls
// to the matching section id, or resets to the top for a plain route change
// (e.g. Navbar's "Order Ahead" -> /order).
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth" })
        );
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [location]);

  return null;
}

function ShopContent() {
  const { theme } = useTheme();

  return (
    <div className="shop-root" data-theme={theme}>
      <div className="grain" />
      <CursorGlow />

      <Navbar />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <ShopContent />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}