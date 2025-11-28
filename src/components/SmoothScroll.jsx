// src/components/SmoothScroll.jsx
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

    // Intersection Observer for Services and Highlights with proper reset
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for better detection
      rootMargin: '-10% 0px -10% 0px' // Trigger earlier
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is visible - animate in
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        } else {
          // Section is out of view - reset for re-animation
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(80px)';
          entry.target.style.transition = 'none'; // Remove transition during reset
          
          // Re-enable transition after a brief moment
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          }, 50);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections
    const servicesSection = document.querySelector('.services-section-enhanced');
    const highlightsSection = document.querySelector('.highlights-bg');

    if (servicesSection) {
      servicesSection.style.opacity = '0';
      servicesSection.style.transform = 'translateY(80px)';
      observer.observe(servicesSection);
    }

    if (highlightsSection) {
      highlightsSection.style.opacity = '0';
      highlightsSection.style.transform = 'translateY(80px)';
      observer.observe(highlightsSection);
    }

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