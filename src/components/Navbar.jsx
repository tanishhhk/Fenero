import "../styles/landing/navbar.css"
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogin = () => {
    navigate('/auth', { state: { mode: 'login' } });
    setMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    navigate('/auth', { state: { mode: 'signup' } });
    setMobileMenuOpen(false);
  };

  const isLinkActive = (href) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.includes(href)) return true;
    return false;
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
    setShowServicesDropdown(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const services = [
    { id: 'debt-syndication', label: 'Debt Syndication' },
    { id: 'debt-resolution', label: 'Debt Resolution' },
    { id: 'investment-banking', label: 'Investment Banking' },
    { id: 'virtual-cfo', label: 'Virtual CFO' }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo"><a href="/">Fenero</a></div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <a href="/" className={isLinkActive('/') ? 'active' : ''}>Home</a>

          <div className="services-dropdown-wrapper" ref={dropdownRef}>
            <button 
              className={`services-link ${isLinkActive('services') ? 'active' : ''}`}
              onClick={() => setShowServicesDropdown(!showServicesDropdown)}
            >
              Services
            </button>
            
            {showServicesDropdown && (
              <div className="services-dropdown">
                {services.map(service => (
                  <button
                    key={service.id}
                    className="dropdown-item"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <a href="auth" className={isLinkActive('auth') ? 'active' : ''}>Borrower</a>
          <a href="auth" className={isLinkActive('auth') ? 'active' : ''}>Partner</a>
          <a href="about" className={isLinkActive('about') ? 'active' : ''}>About Us</a>
          <a href="blog" className={isLinkActive('blog') ? 'active' : ''}>Blog</a>
        </div>

        <div className="new-actions">
          <button className="login-btn" onClick={handleLogin}>Log in</button>
          <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-menu ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="/" className={isLinkActive('/') ? 'active' : ''}>Home</a>

          <div className={`mobile-services-wrapper ${mobileServicesOpen ? 'open' : ''}`}>
            <button 
              className="mobile-services-link"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              <span>Services</span>
              <span className="mobile-services-arrow">▼</span>
            </button>
            
            <div className={`mobile-services-dropdown ${mobileServicesOpen ? 'open' : ''}`}>
              {services.map(service => (
                <button
                  key={service.id}
                  className="mobile-dropdown-item"
                  onClick={() => handleServiceClick(service.id)}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>
          
          <a href="auth">Borrower</a>
          <a href="auth">Partner</a>
          <a href="about">About Us</a>
          <a href="blog">Blog</a>
        </div>

        <div className="mobile-actions">
          <button className="login-btn" onClick={handleLogin}>Log in</button>
          <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;