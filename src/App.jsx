// src/App.jsx
import "./App.css";
import HeroSection from "./components/HeroSection";
import HighlightsSection from "./components/HighlightsSection";
import ServicesSection from "./components/ServicesSection";
import Navbar from "./components/Navbar";
import Consult from "./components/Consult";

function App() {
  return (
    <div>
      <Navbar />

      <div className="hero-bg-wrapper">
        <HeroSection />
      </div>

      <ServicesSection />
      <HighlightsSection />
      <Consult/>
    </div>
  );
}

export default App;
