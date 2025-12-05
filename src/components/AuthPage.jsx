import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/landing/AuthPage.css"

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [step, setStep] = useState('role');
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: ''
  });

  useEffect(() => {
    if (location.state?.mode) {
      setAuthMode(location.state.mode);
      
      if (location.state.fromConsultation) {
        setSelectedRole('borrower');
        setStep('auth');
      }
    }
  }, [location.state]);

  const roles = [
    {
      id: 'borrower',
      title: 'Borrower',
      subtitle: 'Seeking Capital',
      description: 'Access debt syndication, working capital loans, and strategic financing solutions'
    },
    {
      id: 'partner',
      title: 'Partner',
      subtitle: 'Strategic Collaboration',
      description: 'Join our network of financial advisors, consultants, and industry experts'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setTimeout(() => setStep('auth'), 300);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { role: selectedRole, mode: authMode, data: formData });
  };

  const resetToRoleSelection = () => {
    setStep('role');
    setSelectedRole(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      designation: ''
    });
  };

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {step === 'role' && (
          <div className="role-selection-wrapper">
            <button className="home-button" onClick={goBackHome}>
              ← Back to Home
            </button>
            
            <div className="auth-header">
              <h1 className="auth-main-title">Welcome to Fenero</h1>
              <p className="auth-main-subtitle">Choose your role to get started</p>
            </div>

            <div className="roles-grid">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="role-card"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="role-card-inner">
                    <h3 className="role-title">{role.title}</h3>
                    <p className="role-subtitle">{role.subtitle}</p>
                    <p className="role-description">{role.description}</p>
                    <div className="role-arrow">→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'auth' && (
          <div className="auth-form-wrapper">
            <button className="back-button" onClick={resetToRoleSelection}>
              ← Change Role
            </button>

            <div className="auth-form-container">
              <div className="auth-left">
                <div className="auth-branding">
                  <div className="selected-role-badge">
                    {roles.find(r => r.id === selectedRole)?.title}
                  </div>
                  
                  <h2 className="auth-form-title">
                    {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="auth-form-subtitle">
                    {authMode === 'login' 
                      ? 'Sign in to access your dashboard and continue your journey' 
                      : 'Join our platform and unlock strategic financial solutions'}
                  </p>

                  <div className="auth-features">
                    <div className="feature-item">
                      <span className="feature-bullet">•</span>
                      <span>Secure & Encrypted</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-bullet">•</span>
                      <span>Expert Advisory Support</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-bullet">•</span>
                      <span>Tailored Solutions</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="auth-right">
                <div className="auth-toggle">
                  <button
                    className={`toggle-btn ${authMode === 'login' ? 'active' : ''}`}
                    onClick={() => setAuthMode('login')}
                  >
                    Sign In
                  </button>
                  <button
                    className={`toggle-btn ${authMode === 'signup' ? 'active' : ''}`}
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign Up
                  </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  {authMode === 'signup' && (
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {authMode === 'signup' && (
                    <>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Company Name</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Designation</label>
                        <input
                          type="text"
                          name="designation"
                          placeholder="CEO / CFO / Manager"
                          value={formData.designation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </>
                  )}

                  {authMode === 'login' && (
                    <div className="form-extras">
                      <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                  )}

                  <button type="submit" className="submit-btn">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                    <span className="btn-arrow">→</span>
                  </button>

                  {authMode === 'signup' && (
                    <p className="terms-text">
                      By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </p>
                  )}
                </form>

                <div className="social-divider">
                  <span>or continue with</span>
                </div>

                <div className="social-buttons">
                  <button className="social-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="social-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;