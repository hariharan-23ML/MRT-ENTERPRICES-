import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, Layers, Users, Stethoscope, Sparkles } from "lucide-react";

interface Slide {
  id: number;
  tagline: string;
  headline: string;
  subtitle: string;
  image: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tagline: "INSTITUTIONAL HEALTHCARE SUPPLY",
    headline: "Healthcare Supplies Delivered Smarter.",
    subtitle:
      "Explore medical equipment and healthcare solutions for hospitals, clinics, diagnostic laboratories and healthcare businesses.",
    image: "/images/hero/hero-slide-1.svg",
    alt: "Medical equipment console and diagnostic monitoring display",
  },
  {
    id: 2,
    tagline: "CERTIFIED CLINICAL INVENTORY",
    headline: "Medical Consumables and Supplies.",
    subtitle:
      "High-grade sterile disposables, surgical instrumentation, and ward essentials structured for bulk healthcare procurement.",
    image: "/images/hero/hero-slide-2.svg",
    alt: "Medical consumables, patient care disposables, and PPE",
  },
  {
    id: 3,
    tagline: "DIRECT WHOLESALE CONTRACTS",
    headline: "Bulk Medical Equipment Procurement.",
    subtitle:
      "Direct institutional supply lines, comprehensive product specifications, and manufacturer quotations tailored for hospital expansion.",
    image: "/images/hero/hero-slide-3.svg",
    alt: "Wholesale medical equipment procurement infrastructure",
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-content-wrap">
        {/* Left Headline & Action Side */}
        <div className="hero-text-side">
          <div className="hero-tagline-badge">
            <Sparkles size={14} />
            <span>{slide.tagline}</span>
          </div>

          <h1 className="hero-headline">{slide.headline}</h1>

          <p className="hero-subtitle">{slide.subtitle}</p>

          <div className="hero-cta-buttons">
            <Link to="/products" className="hero-cta-primary">
              <span>Shop Products</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/request-quote" className="hero-cta-secondary">
              <span>Request a Quote</span>
            </Link>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="hero-carousel-controls" aria-label="Hero slide navigation">
            {SLIDES.map((s, index) => (
              <button
                key={s.id}
                className={`hero-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {/* Right Imagery Side */}
        <div className="hero-image-side">
          <div className="hero-image-wrapper">
            <img src={slide.image} alt={slide.alt} />
          </div>
        </div>
      </div>

      {/* 4 Bottom Value Indicators */}
      <div className="hero-value-indicators">
        <div className="hero-indicator-item">
          <div className="indicator-icon-box">
            <Layers size={18} />
          </div>
          <div className="indicator-text-wrap">
            <span className="indicator-label">Product Range</span>
            <span className="indicator-sub">12 Equipment Categories</span>
          </div>
        </div>

        <div className="hero-indicator-item">
          <div className="indicator-icon-box">
            <Users size={18} />
          </div>
          <div className="indicator-text-wrap">
            <span className="indicator-label">Bulk Procurement</span>
            <span className="indicator-sub">Wholesale Supply Orders</span>
          </div>
        </div>

        <div className="hero-indicator-item">
          <div className="indicator-icon-box">
            <Stethoscope size={18} />
          </div>
          <div className="indicator-text-wrap">
            <span className="indicator-label">Business Support</span>
            <span className="indicator-sub">Dedicated Account Desk</span>
          </div>
        </div>

        <div className="hero-indicator-item">
          <div className="indicator-icon-box">
            <FileCheck size={18} />
          </div>
          <div className="indicator-text-wrap">
            <span className="indicator-label">Technical Info</span>
            <span className="indicator-sub">311+ Linked Specifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};
