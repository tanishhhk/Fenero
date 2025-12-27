import "../../styles/landing/hero.css";
import { useState, useEffect, useRef } from 'react';

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToServices = () => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // REMOVED THE DUPLICATE SCROLL HANDLER - SmoothScroll.jsx handles it now

  return (
    <div ref={heroRef} className="hero-section">
      {/* Animated Grid Background */}
      <div className="hero-grid-bg"></div>

      {/* Floating Orbs */}
      <div className="hero-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Spotlight Effect */}
      <div 
        className="hero-spotlight"
        style={{
          opacity: isHovering ? 0.3 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 40%)`
        }}
      ></div>

      {/* Main Content */}
      <div 
        className="hero-content"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Badge */}
        {/* <div className="hero-badge">
          <span className="badge-pulse-container">
            <span className="badge-pulse"></span>
            <span className="badge-dot"></span>
          </span>
          Fenero Capital Advisory LLP
        </div> */}

        {/* Main Heading */}
        <h1 className="hero-heading">
          <span className="heading-line">Unlock Capital.</span>
          <span className="heading-line">Optimize Finances.</span>
          <span className="heading-line heading-gradient">Accelerate Growth.</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subheading">
          Strategic debt advisory and financial structuring designed for ambitious businesses ready to scale.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <button onClick={scrollToServices} className="btn-primary">
            <span className="btn-content">
              Explore Services
              <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 11l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
            </span>
            <div className="btn-gradient-overlay"></div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-border">
          <div className="scroll-indicator-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;