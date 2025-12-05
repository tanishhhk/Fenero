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

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isServicesPage = location.pathname.startsWith('/services');

  useEffect(() => {
    if (isAuthPage) {
      document.body.style.background = 'none';
      document.body.style.backgroundColor = '#0a0e27';
    } else if (isServicesPage) {
      // Let ServicesPage handle its own background
      document.body.style.background = 'none';
      document.body.style.backgroundColor = 'transparent';
    } else {
      document.body.style.background = 'linear-gradient(to bottom, #0f172a, #1e3a8a, #0f172a)';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [isAuthPage, isServicesPage]);

  return (
    <>
      {!isAuthPage && !isServicesPage && <SmoothScroll />}
      
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
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Services Page Route - handles both /services and /services/:serviceType */}
        <Route path="/services/:serviceType?" element={<ServicesPage />} />
      </Routes>
    </>
  );
}

export default App;