// src/components/HeroSection.jsx
import { useRef } from "react";

function HeroSection() {
  const scrollToServices = () => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="hero">
      <div className="hero-card">
        <h1>
          Unlock Capital. Optimize Finances.
          <br />
          Accelerate Growth with <span className="highlight-text">Fenero.</span>
        </h1>

        <p>
          Strategic debt advisory and financial structuring for growing
          businesses.
        </p>

        <div className="hero-actions">
          <button className="explore-btn" onClick={scrollToServices}>
            Explore Services
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
