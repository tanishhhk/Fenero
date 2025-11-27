// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import HeroSection from "./components/HeroSection";
import HighlightsSection from "./components/HighlightsSection";
import ServicesSection from "./components/ServicesSection";
import Navbar from "./components/Navbar";
import Consult from "./components/Consult";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  // Apply background gradient only to home page
  useEffect(() => {
    if (isAuthPage) {
      document.body.style.background = 'none';
      document.body.style.backgroundColor = '#0a0e27';
    } else {
      document.body.style.background = 'linear-gradient(to bottom, #0f172a, #1e3a8a, #0f172a)';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [isAuthPage]);

  return (
    <>
      {!isAuthPage && <SmoothScroll />}
      
      <Routes>
        {/* Home Route */}
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

        {/* Auth Route - completely standalone */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;