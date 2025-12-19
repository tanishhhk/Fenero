// src/components/services/ProcessSection.jsx

/**
 * Copyright (c) 2025-2026 Fenero Capital Advisory LLP
 * All Rights Reserved.
 * 
 * This file is part of the Fenero platform and is proprietary software.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * 
 * Author: Tanishk Jain
 * Company: Fenero Capital Advisory LLP
 * Contact: fenerocapitaladvisory@gmail.com
 */

import React, { useEffect, useRef, useState } from 'react';
import '../../styles/services/ProcessSection.css';

const ProcessSection = ({ process }) => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setActiveStep((prev) => Math.max(prev, index));
          }
        });
      },
      { threshold: 0.5 }
    );

    const steps = sectionRef.current?.querySelectorAll('.process-step-v2');
    steps?.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, [process]);

  useEffect(() => {
    if (activeStep >= 0) {
      const percentage = ((activeStep + 1) / process.length) * 100;
      setProgressHeight(percentage);
    }
  }, [activeStep, process.length]);

  return (
    <section className="process-section-v2" ref={sectionRef}>
      <div className="section-header-v2">
        <div className="header-tag">Our Methodology</div>
        <h2 className="section-title-v2">
          Structured Execution Process
        </h2>
        <p className="section-description-v2">
          A systematic approach ensuring precision and optimal outcomes
        </p>
      </div>

      <div className="process-timeline-v2">
        <div className="timeline-line">
          <div 
            className="timeline-progress"
            style={{ height: `${progressHeight}%` }}
          ></div>
        </div>

        {process.map((step, index) => (
          <div
            key={index}
            data-index={index}
            className={`process-step-v2 ${index <= activeStep ? 'active' : ''}`}
          >
            <div className="step-marker-wrapper">
              <div className="step-marker">
                <div className="marker-inner">
                  <span className="step-number-text">{step.step}</span>
                </div>
                <div className="marker-ring"></div>
              </div>
            </div>

            <div className="step-content-card">
              <div className="step-phase">Phase {step.step}</div>
              <h3 className="step-title-v2">{step.title}</h3>
              <p className="step-description-v2">{step.description}</p>
              
              <div className="step-status">
                <div className="status-dot"></div>
                <span>Key Milestone</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="process-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="summary-content">
            <h4>End-to-End Support</h4>
            <p>Comprehensive guidance throughout the entire journey</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;