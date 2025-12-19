// src/components/SmoothScroll.jsx

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

import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Hero continuous parallax
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = document.querySelector('.hero-section');
      
      if (hero) {
        const heroHeight = hero.offsetHeight;
        const scrollPercent = Math.min(scrolled / heroHeight, 1);
        
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = Math.max(1 - scrollPercent * 1.5, 0);
      }
    };

    // Intersection Observer with proper reset
    const observerOptions = {
      threshold: [0, 0.1, 0.2],
      rootMargin: '-10% 0px -10% 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is visible - animate in
          entry.target.classList.add('scroll-animate-in');
        } else {
          // Section is out of view - remove class to allow re-animation
          entry.target.classList.remove('scroll-animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections and their child elements
    const servicesHeader = document.querySelector('.services-header');
    const servicesTabContainer = document.querySelector('.services-tab-container');
    const servicesFeaturedCard = document.querySelector('.services-featured-card');
    const highlightsSection = document.querySelector('.highlights-bg');
    const highlightsLeft = document.querySelector('.highlights-left');
    const highlightsContainer = document.querySelector('.highlights-container');

    // Observe Services elements separately
    if (servicesHeader) observer.observe(servicesHeader);
    if (servicesTabContainer) observer.observe(servicesTabContainer);
    if (servicesFeaturedCard) observer.observe(servicesFeaturedCard);
    
    // Observe Highlights elements
    if (highlightsSection) observer.observe(highlightsSection);
    if (highlightsLeft) observer.observe(highlightsLeft);
    if (highlightsContainer) observer.observe(highlightsContainer);

    // Add scroll listener for hero
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
};

export default SmoothScroll;