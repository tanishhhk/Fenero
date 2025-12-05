import "../styles/landing/navbar.css"
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate('/auth', { state: { mode: 'login' } });
  };

  const handleGetStarted = () => {
    navigate('/auth', { state: { mode: 'signup' } });
  };

  const isLinkActive = (href) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.includes(href)) return true;
    return false;
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
    setShowServicesDropdown(false);
  };

  const services = [
    { id: 'debt-syndication', label: 'Debt Syndication' },
    { id: 'debt-resolution', label: 'Debt Resolution' },
    { id: 'investment-banking', label: 'Investment Banking' },
    { id: 'virtual-cfo', label: 'Virtual CFO' }
  ];

  return (
    <nav className="navbar">
      <div className="logo"><a href="/">Fenero</a></div>

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
        
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>Borrower</a>
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>Partner</a>
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>About Us</a>
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>Blogs</a>
        {/* <a href="#">Due Diligence</a> */}
      </div>

      <div className="new-actions">
        <button className="login-btn" onClick={handleLogin}>Log in</button>
        <button className="cta-btn" onClick={handleGetStarted}>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;