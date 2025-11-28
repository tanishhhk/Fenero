import React, { useState, useEffect, useRef } from "react";
import "../styles/landing/ServicesSection.css";

// Services data with comprehensive information
const services = [
  {
    title: "Debt Syndication",
    tagline: "Capital That Fuels Growth",
    desc: "End-to-end debt capital arrangement designed to fuel sustainable business expansion with strategic financial partnerships.",
    points: [
"Loan Against Property - Raise capital by pledging commercial or residential property.",
"Working Capital Loans - Short-term funding to manage daily business expenses and cash flow.",
"Supply Chain Financing - Improve vendor payments and receivables by using credit linked to supply chain transactions.",
"Revenue-Based Financing - Flexible funding that is repaid as a percentage of future sales, not fixed EMIs.",
"Asset Financing - Loans for purchasing or leveraging machinery, equipment, or other physical assets.",
"Trade Finance - Funding support for domestic or international buying and selling of goods.",
"Unsecured Business Loans - Business loans without collateral, given on the basis of credit and cash flow strength.",
"Project Financing - Long-term funding for large projects, backed by projected future cash flows.",
"Domestic and Export Factoring - Get immediate cash by selling invoices, improving working capital and reducing payment delays."
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
  const [selectedTab, setSelectedTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeTab = tabRefs.current[selectedTab];
      if (activeTab) {
        setIndicatorStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [selectedTab]);

  return (
    <section className="services-section-enhanced" id="services">
      <div className="services-container-enhanced">
        
        {/* ============== ENHANCED HEADER SECTION ============== */}
        <div className="services-header">
          <div className="services-header-badge">
            <span className="services-badge-dot"></span>
            <span className="services-badge-text">Our Services</span>
          </div>
          
          <h2 className="services-main-title">
            <span className="services-title-line">Comprehensive Financial</span>
            <span className="services-title-line services-title-highlight">Solutions for Growth</span>
          </h2>
          
          <p className="services-main-subtitle">
            Strategic capital advisory and transaction support tailored to accelerate 
            <span className="services-subtitle-highlight"> your business growth</span> and optimize financial performance
          </p>

          <div className="services-header-decoration">
            <div className="services-decoration-line"></div>
            <div className="services-decoration-dot"></div>
            <div className="services-decoration-line"></div>
          </div>
        </div>

        {/* ============== TAB NAVIGATION ============== */}
        <div className="services-tab-container">
          <div 
            className="services-tab-slider"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              borderBottom: `3px solid ${services[selectedTab].color}`
            }}
          />
          {services.map((service, idx) => (
            <button
              key={idx}
              ref={(el) => (tabRefs.current[idx] = el)}
              className={`services-tab ${selectedTab === idx ? 'services-tab-active' : ''}`}
              style={{ 
                '--tab-color': service.color
              }}
              onClick={() => setSelectedTab(idx)}
            >
              <span className="services-tab-text">{service.title}</span>
            </button>
          ))}
        </div>

        {/* ============== FEATURED SERVICE DISPLAY ============== */}
        <div className="services-featured-card">
          <div 
            className="services-featured-content"
            style={{ 
              borderLeft: `5px solid ${services[selectedTab].color}`,
              '--service-color': services[selectedTab].color
            }}
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