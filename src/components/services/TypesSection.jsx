// src/components/services/TypesSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/services/TypesSection.css';

const TypesSection = ({ types }) => {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.type-card-v2');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [types]);

  return (
    <section className="types-section-v2" ref={sectionRef}>
      <div className="section-header-v2">
        <div className="header-tag">Our Solutions</div>
        <h2 className="section-title-v2">
          Comprehensive Service Portfolio
        </h2>
        <p className="section-description-v2">
          Strategic financial solutions tailored to your business objectives
        </p>
      </div>

      <div className="types-grid-v2">
        {types.map((type, index) => (
          <div
            key={index}
            data-index={index}
            className={`type-card-v2 ${visibleCards.includes(index) ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
            
            <div className="card-header-v2">
              <h3 className="card-title-v2">{type.title}</h3>
              <p className="card-description-v2">{type.description}</p>
            </div>

            <div className="card-divider"></div>

            <div className="card-features-v2">
              {type.features.map((feature, idx) => (
                <div key={idx} className="feature-item-v2">
                  <div className="feature-check">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.5 4.5L6 12 2.5 8.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="card-hover-overlay">
              <div className="overlay-content">
                <svg className="overlay-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Explore Details</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TypesSection;