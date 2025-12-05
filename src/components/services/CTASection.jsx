// src/components/services/CTASection.jsx
import React from 'react';
import '../../styles/services/CTASection.css';

const CTASection = ({ navigate }) => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Let's discuss how we can help achieve your financial objectives</p>
        </div>
        
        <div className="cta-buttons">
          <button 
            className="cta-btn cta-primary"
            onClick={() => navigate('/auth', { state: { mode: 'signup', fromConsultation: true } })}
          >
            Schedule Consultation
          </button>
          <button 
            className="cta-btn cta-secondary"
            onClick={() => window.location.href = 'tel:+918130718822'}
          >
            Call Us Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;