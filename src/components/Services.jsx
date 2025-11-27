import "../styles/landing/services.css"

        {/* ============== GRID TITLE ============== */}
        <div className="services-grid-title">
          <h3 className="services-grid-title-text">All Services Overview</h3>
          <div className="services-grid-title-line"></div>
        </div>

        {/* ============== SERVICES GRID ============== */}
        <div className="services-grid-enhanced">
          {services.map((service, index) => {
            const isActive = activeCard === index;
            const isVisible = visible.includes(index);

            return (
              <article
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`services-card-enhanced ${isVisible ? 'services-card-visible' : ''} ${hoveredCard === index ? 'services-card-hovered' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient border effect */}
                <div 
                  className="services-card-gradient-border"
                  style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}88)` }}
                ></div>

                {/* Card Header */}
                <div className="services-card-header-enhanced">
                  <div>
                    <h4 className="services-card-title-enhanced">{service.title}</h4>
                    <p 
                      className="services-card-tagline"
                      style={{ color: service.color }}
                    >
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <p className="services-card-desc-enhanced">{service.desc}</p>

                {/* Expandable Details */}
                <div 
                  className={`services-expandable-section ${isActive ? 'services-expandable-active' : ''}`}
                >
                  <div className="services-expanded-content">
                    <h5 className="services-expanded-title">Key Services Include:</h5>
                    <ul className="services-expanded-list">
                      {service.points.map((point, i) => (
                        <li key={i} className="services-expanded-list-item">
                          <span 
                            className="services-expanded-bullet"
                            style={{ backgroundColor: service.color }}
                          >
                            ✓
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Toggle Button */}
                <button 
                  className="services-toggle-button"
                  style={{ color: service.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(index);
                  }}
                >
                  {isActive ? (
                    <>
                      Show Less <span className="services-toggle-icon">↑</span>
                    </>
                  ) : (
                    <>
                      Explore Details <span className="services-toggle-icon">→</span>
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>

        {/* ============== BOTTOM CTA SECTION ============== */}
        <div className="services-bottom-cta">
          <h3 className="services-cta-title">Ready to Transform Your Business?</h3>
          <p className="services-cta-subtitle">
            Let's discuss how our financial solutions can help you achieve your strategic goals.
          </p>
          <div className="services-cta-buttons">
            <button className="services-cta-primary">
              Schedule Consultation
            </button>
            <button className="services-cta-secondary">
              Download Brochure
            </button>
          </div>
        </div>
