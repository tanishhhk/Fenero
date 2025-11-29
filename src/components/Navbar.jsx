import "../styles/landing/navbar.css"
import { useNavigate } from 'react-router-dom'; 

function Navbar() {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/auth', { state: { mode: 'login' } });
  };

  const handleGetStarted = () => {
    navigate('/auth', { state: { mode: 'signup' } });
  };

  return (
    <nav className="navbar">
      <div className="logo"><a href="">Fenero</a></div>

      <div className="nav-links">
        <a href="#">About Us</a>
        <a href="#">Services</a>
        <a href="#">Borrower</a>
        <a href="#">Lender</a>
        <a href="#">Partner</a>
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