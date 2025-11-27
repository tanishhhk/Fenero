import "../styles/landing/navbar.css"
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Fenero</div>

      <div className="nav-links">
        <a href="#">About Us</a>
        <a href="#">Services</a>
        <a href="#">Borrower</a>
        <a href="#">Lender</a>
        <a href="#">Partner</a>
        <a href="#">Due Diligence</a>
      </div>

      <div className="new-actions">
        <button className="login-btn">Log in</button>
        <button className="cta-btn">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
