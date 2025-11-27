import "../styles/landing/ServicesSection.css"
// ===================================================================
// ServicesSection.jsx - Enhanced Services Component (Professional)
// ===================================================================

import React, { useState, useEffect, useRef } from "react";

// Services data with comprehensive information
const services = [
  {
    title: "Debt Syndication",
    tagline: "Capital That Fuels Growth",
    desc: "End-to-end debt capital arrangement designed to fuel sustainable business expansion with strategic financial partnerships.",
    points: [
      "Structured funding strategy aligned with business goals",
      "Financial institution alignment and lender sourcing",
      "Term sheet negotiation and documentation assistance",
      "Competitive rate optimization",
      "Timeline management and execution support"
    ],
    color: "#0066ff"
  },
  {
    title: "Debt Resolution",
    tagline: "Navigate Financial Challenges",
    desc: "Comprehensive support in managing stressed debt situations and restoring financial stability through strategic restructuring.",
    points: [
      "Customized debt restructuring plans",
      "Creditor negotiation and stakeholder management",
      "Regulatory & compliance guidance",
      "Cash flow optimization strategies",
      "Insolvency prevention frameworks"
    ],
    color: "#00c853"
  },
  {
    title: "Investment Banking",
    tagline: "Strategic Transaction Advisory",
    desc: "Expert advisory for strategic financing, mergers, acquisitions, and business-scale transactions that drive value creation.",
    points: [
      "Equity & debt capital raising",
      "M&A advisory and strategic partnerships",
      "Business valuation & financial modeling",
      "Transaction structuring and execution",
      "Due diligence coordination"
    ],
    color: "#ff6d00"
  },
  {
    title: "Balance Sheet Optimization",
    tagline: "Maximize Financial Efficiency",
    desc: "Strategic enhancement of capital structure to maximize financial efficiency, reduce costs, and improve overall business performance.",
    points: [
      "Cost of capital reduction strategies",
      "Leverage rebalancing and optimization",
      "Working capital improvement initiatives",
      "Asset-liability management",
      "Financial ratio enhancement"
    ],
    color: "#9c27b0"
  }
];

function ServicesSection() {
  // State management
  const [activeCard, setActiveCard] = useState(null); // Track expanded cards in grid
  const [hoveredCard, setHoveredCard] = useState(null); // Track hovered cards
  const cardRefs = useRef([]); // References to card elements for intersection observer
  const [visible, setVisible] = useState([]); // Track which cards are visible
  const [selectedTab, setSelectedTab] = useState(0); // Track selected tab in featured section

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target);
            if (idx !== -1 && !visible.includes(idx)) {
              // Stagger the animations with delay
              setTimeout(() => {
                setVisible((prev) => [...prev, idx]);
              }, idx * 150);
            }
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    const currentRefs = cardRefs.current;
    currentRefs.forEach((ref) => ref && observer.observe(ref));

    // Cleanup observer on unmount
    return () => {
      currentRefs.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [visible]);

  // Handle card expansion in grid view
  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section className="services-section-enhanced" id="services">
      <div className="services-container-enhanced">
        
        {/* ============== HEADER SECTION ============== */}
        <div className="services-header">
          <h2 className="services-main-title">Comprehensive Financial Solutions</h2>
          <p className="services-main-subtitle">
            Strategic capital advisory and transaction support tailored to accelerate your business growth and optimize financial performance.
          </p>
        </div>

        {/* ============== TAB NAVIGATION ============== */}
        <div className="services-tab-container">
          {services.map((service, idx) => (
            <button
              key={idx}
              className={`services-tab ${selectedTab === idx ? 'services-tab-active' : ''}`}
              style={{ borderBottom: selectedTab === idx ? `3px solid ${service.color}` : '3px solid transparent' }}
              onClick={() => setSelectedTab(idx)}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <span className="services-tab-text">{service.title}</span>
            </button>
          ))}
        </div>

        {/* ============== FEATURED SERVICE DISPLAY ============== */}
        <div className="services-featured-card">
          <div 
            className="services-featured-content"
            style={{ borderLeft: `5px solid ${services[selectedTab].color}` }}
          >
            <div className="services-featured-header">
              <div>
                <h3 className="services-featured-title">{services[selectedTab].title}</h3>
                <p 
                  className="services-featured-tagline"
                  style={{ color: services[selectedTab].color }}
                >
                  {services[selectedTab].tagline}
                </p>
              </div>
            </div>
            
            <p className="services-featured-desc">{services[selectedTab].desc}</p>
            
            <div className="services-points-grid">
              {services[selectedTab].points.map((point, i) => (
                <div key={i} className="services-point-item">
                  <span 
                    className="services-point-bullet"
                    style={{ backgroundColor: services[selectedTab].color }}
                  >
                    ✓
                  </span>
                  <span className="services-point-text">{point}</span>
                </div>
              ))}
            </div>

            <button 
              className="services-cta-button"
              style={{ backgroundColor: services[selectedTab].color }}
            >
              Learn More About {services[selectedTab].title}
              <span className="services-arrow">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;