import "../styles/landing/navbar.css"
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(location.pathname);
  }, [location.pathname]);

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

  return (
    <nav className="navbar">
      <div className="logo"><a href="/">Fenero</a></div>

      <div className="nav-links">
        <a href="/" className={isLinkActive('/') ? 'active' : ''}>Home</a>
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>About Us</a>
        <a href="services" className={isLinkActive('services') ? 'active' : ''}>Services</a>
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>Borrower</a>
        <a href="#" className={isLinkActive('#') ? 'active' : ''}>Partner</a>
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