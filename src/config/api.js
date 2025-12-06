// API Configuration
// This allows easy switching between local development and production

const API_CONFIG = {
  development: 'http://localhost:5000',
  production: 'https://your-backend.onrender.com' // Update this after deployment
};

// Automatically detect environment
const API_URL = process.env.REACT_APP_API_URL || 
                API_CONFIG[process.env.NODE_ENV] || 
                API_CONFIG.development;

export default API_URL;

// Usage in components:
// import API_URL from '../config/api';
// const response = await fetch(`${API_URL}/api/signup`, {...});