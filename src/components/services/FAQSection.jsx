// src/components/services/FAQSection.jsx

import React, { useState } from 'react';
import '../../styles/services/FAQSection.css';

const FAQSection = ({ faqs }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Common queries about our services</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeFAQ === index ? 'active' : ''}`}
          >
            <button
              className="faq-question-btn"
              onClick={() => toggleFAQ(index)}
            >
              <span className="faq-question-text">{faq.question}</span>
              <svg
                className={`faq-chevron ${activeFAQ === index ? 'rotate' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            {activeFAQ === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;