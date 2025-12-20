import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/landing/AuthPage.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

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
      description: 'Join our network of financial advisors and consultants'
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setTimeout(() => setStep('auth'), 300);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (authMode === 'signup') {
        const response = await fetch(`${API_BASE_URL}/api/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            role: selectedRole
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Signup failed');
        }

        setShowSuccessScreen(true);
      } else {
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccessScreen) {
    return (
      <div className="auth-page">
        <div className="success-screen-container">
          <h1>Account Created Successfully</h1>
          <p>Our team will contact you within 24–48 hours.</p>
          <button onClick={() => navigate('/')}>Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      {step === 'role' && (
        <div className="roles-grid">
          {roles.map(role => (
            <div key={role.id} className="role-card" onClick={() => handleRoleSelect(role.id)}>
              <h3>{role.title}</h3>
              <p>{role.subtitle}</p>
            </div>
          ))}
        </div>
      )}

      {step === 'auth' && (
        <form className="auth-form" onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <>
              <input name="name" placeholder="Full Name" onChange={handleInputChange} required />
              <input name="phone" placeholder="Phone" onChange={handleInputChange} required />
              <input name="company" placeholder="Company" onChange={handleInputChange} required />
              <input name="designation" placeholder="Designation" onChange={handleInputChange} required />
            </>
          )}

          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : authMode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
