// src/components/services/ServicesHero.jsx

import React, { useEffect, useRef } from 'react';
import '../../styles/services/ServicesHero.css';

const ServicesHero = ({ activeService }) => {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    if (heroRef.current) {
      heroRef.current.classList.add('animate-in');
    }
  }, [activeService]);

  return (
    <section className="services-hero-v2" ref={heroRef}>
      <div className="hero-parallax-bg" ref={parallaxRef}>
        <div className="hero-grid-pattern"></div>
        <div className="hero-gradient-orb hero-orb-1"></div>
        <div className="hero-gradient-orb hero-orb-2"></div>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-breadcrumb">
          <span>Financial Advisory</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="breadcrumb-current">{activeService.title}</span>
        </div>

        <h1 className="hero-main-title">
          <span className="title-line">{activeService.hero.title}</span>
        </h1>

        <div className="hero-subtitle-box">
          <div className="subtitle-accent-line"></div>
          <p className="hero-subtitle">{activeService.hero.subtitle}</p>
        </div>

        <p className="hero-description">{activeService.hero.description}</p>
      </div>
    </section>
  );
};

export default ServicesHero;