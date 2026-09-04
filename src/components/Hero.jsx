import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { SplitReveal } from "./ui/SplitReveal";
import { FadeUp } from "./ui/FadeUp";
import { MagneticButton } from "./ui/MagneticButton";
import { CountUp } from "./ui/CountUp";
import { Coffee } from "./Coffee";
import { scrollToId } from "../utils/scroll";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 150, 55], fov: 38 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <Suspense fallback={null}>
            <Coffee scale={0.60} />
            <Environment preset="apartment" />
          </Suspense>
          <OrbitControls
            target={[0, 20, 0]}
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.4}
            minPolarAngle={0.35}
            maxPolarAngle={0.35}
          />
        </Canvas>
      </div>

      <div className="hero-eyebrow">Est. 2016 — Koregaon Park</div>

      <h1 className="display">
        <SplitReveal text="Coffee, roasted" />
        <br />
        <SplitReveal text="slow and " delay={0.15} />
        <em>
          <SplitReveal text="poured with intent." delay={0.15} />
        </em>
      </h1>

      <FadeUp delay={0.6}>
        <p className="hero-sub">
          A tiny roastery and pour-over bar built around one idea: every cup
          deserves the same care as the harvest that made it possible.
        </p>
      </FadeUp>

      <FadeUp delay={0.75}>
        <div className="hero-actions">
          <MagneticButton
            className="btn-primary"
            onClick={() => scrollToId("menu")}
          >
            View Menu
          </MagneticButton>
          <MagneticButton
            className="btn-outline"
            onClick={() => scrollToId("visit")}
          >
            Find Us
          </MagneticButton>
        </div>
      </FadeUp>

      <div className="hero-stats">
        <FadeUp delay={0.9}>
          <div className="stat-num display">
            <CountUp to={9} suffix="+" />
          </div>
          <div className="stat-label">Years Roasting</div>
        </FadeUp>
        <FadeUp delay={1.0}>
          <div className="stat-num display">
            <CountUp to={14} />
          </div>
          <div className="stat-label">Origin Farms</div>
        </FadeUp>
        <FadeUp delay={1.1}>
          <div className="stat-num display">
            <CountUp to={98} suffix="%" />
          </div>
          <div className="stat-label">Direct Trade</div>
        </FadeUp>
      </div>
    </header>
  );
}