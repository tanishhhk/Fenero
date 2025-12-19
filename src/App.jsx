// src/App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from './components/AdminDashboard';
import { useEffect } from "react";
import AuthPage from "./components/AuthPage";
import HeroSection from "./components/landing/HeroSection";
import HighlightsSection from "./components/landing/HighlightsSection";
import ServicesSection from "./components/landing/ServicesSection";
import Navbar from "./components/Navbar";
import Consult from "./components/landing/Consult";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ServicesPage from "./pages/services";
import AboutUs from "./pages/AboutUs";
import BlogPage from "./pages/BlogPage";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isServicesPage = location.pathname.startsWith('/services');
  const isAboutPage = location.pathname === '/about';
  const isBlogPage = location.pathname === '/blog';
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    // Reset all body styles first
    document.body.style.background = '';
    document.body.style.backgroundColor = '';
    document.body.style.backgroundAttachment = '';

    if (isAuthPage) {
      document.body.style.backgroundColor = '#0a0e27';
    } else if (isServicesPage || isAboutPage || isBlogPage || isAdminPage) {
      // These pages handle their own backgrounds
      document.body.style.backgroundColor = 'transparent';
    } else {
      // Home page - restore the gradient
      document.body.style.background = 'linear-gradient(to bottom, #0f172a, #1e3a8a, #0f172a)';
      document.body.style.backgroundAttachment = 'fixed';
    }

    // Cleanup function to reset when component unmounts
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundColor = '';
      document.body.style.backgroundAttachment = '';
    };
  }, [location.pathname]);

  return (
    <>
      {!isAuthPage && !isServicesPage && !isAboutPage && !isBlogPage && !isAdminPage && <SmoothScroll />}
      
      <Routes>
        {/* Home Page Route */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <div className="hero-bg-wrapper">
                <HeroSection />
              </div>
              <ServicesSection />
              <HighlightsSection />
              <Consult />
              <Footer />
            </>
          }
        />

        {/* Auth Page Route */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Services Page Route - with optional serviceType parameter */}
        <Route path="/services/:serviceType?" element={<ServicesPage />} />
        
        {/* About Us Page Route */}
        <Route path="/about" element={<AboutUs />} />

        {/* Blog Page Route */}
        <Route 
          path="/blog" 
          element={
            <>
              <Navbar />
              <BlogPage />
              <Footer />
            </>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
