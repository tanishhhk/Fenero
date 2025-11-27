import { useEffect } from 'react';

function SmoothScroll() {
  useEffect(() => {
    // Locomotive Scroll alternative - Pure CSS/JS implementation
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let currentScrollY = scrollY;

    const smoothScroll = () => {
      targetScrollY = window.scrollY;
      currentScrollY += (targetScrollY - currentScrollY) * 0.1; // Easing factor

      // Apply transform to body for smooth effect
      document.body.style.transform = `translateY(${scrollY - currentScrollY}px)`;

      if (Math.abs(targetScrollY - currentScrollY) > 0.5) {
        requestAnimationFrame(smoothScroll);
      }
    };

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      // Parallax for hero section
      const hero = document.querySelector('.hero-minimal');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Fade in sections on scroll
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          section.classList.add('section-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('scroll', smoothScroll);
    };
  }, []);

  return null;
}

export default SmoothScroll;
