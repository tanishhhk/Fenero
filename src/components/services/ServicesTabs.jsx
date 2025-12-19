// src/components/services/ServicesTabs.jsx

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

import React from 'react';
import '../../styles/services/ServicesTabs.css';

const ServicesTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { 
      id: 'types', 
      label: 'Service Types',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      id: 'process', 
      label: 'Our Process',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'benefits', 
      label: 'Benefits',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'faq', 
      label: 'FAQ',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="services-navigation-wrapper">
      <div className="services-navigation-container">
        <div className="navigation-label">Explore Details</div>
        <div className="services-navigation-grid">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-card ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="nav-card-icon">
                {tab.icon}
              </div>
              <span className="nav-card-label">{tab.label}</span>
              <div className="nav-card-indicator"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesTabs;