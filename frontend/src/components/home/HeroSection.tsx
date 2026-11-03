import React from "react";
import { HeroCarousel } from "./HeroCarousel";
import { WhyChooseUs } from "./WhyChooseUs";

export const HeroSection: React.FC = () => {
  return (
    <section className="home-hero-section" aria-label="Welcome and Value Highlights">
      <div className="container">
        <div className="hero-grid">
          <HeroCarousel />
          <WhyChooseUs />
        </div>
      </div>
    </section>
  );
};
