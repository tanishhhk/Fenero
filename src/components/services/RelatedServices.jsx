// src/components/services/RelatedServices.jsx

import React from 'react';
import '../../styles/services/RelatedServices.css';

const RelatedServices = ({ otherServices, handleServiceChange }) => {
  return (
    <section className="related-services-section-v2">
      <div className="related-services-container-v2">
        <div className="section-header-v2">
          <div className="header-tag">Explore More</div>
          <h2 className="section-title-v2">Other Services</h2>
          <p className="section-description-v2">
            Comprehensive financial solutions designed for your success
          </p>
        </div>

        <div className="related-services-grid-v2">
          {otherServices.map((service) => (
            <div
              key={service.id}
              className="related-service-card-v2"
              onClick={() => handleServiceChange(service.id)}
            >
              <div className="service-card-header">
                <div className="service-tag">{service.tagline}</div>
                <h3 className="service-title">{service.title}</h3>
              </div>

              <p className="service-description">{service.shortDesc}</p>

              <div className="service-card-footer">
                <button className="service-explore-btn">
                  <span>Explore Service</span>
                  <svg viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M7.5 15l5-5-5-5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="card-gradient-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;