
import React from 'react';
import { Shield, Target, Users, TrendingUp, FileText, Calculator, Building, Award, Lock, Compass, BarChart3, Handshake, MessageSquare } from 'lucide-react';
import '../styles/AboutUs.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  const values = [
    { icon: Shield, title: 'Integrity', description: 'Upholding the highest ethical standards in every engagement' },
    { icon: Lock, title: 'Confidentiality', description: 'Protecting client information with absolute discretion' },
    { icon: Compass, title: 'Independent Guidance', description: 'Unbiased advice aligned solely with client interests' },
    { icon: BarChart3, title: 'Analytical Rigor', description: 'Data-driven insights backed by deep financial expertise' },
    { icon: Handshake, title: 'Long-Term Partnership', description: 'Building enduring relationships beyond transactions' },
    { icon: MessageSquare, title: 'Transparent Communication', description: 'Clear, honest dialogue at every stage' }
  ];

  const services = [
    { icon: Building, title: 'Debt Syndication', description: 'Structured financing solutions from banking and NBFC partners' },
    { icon: TrendingUp, title: 'Debt Resolution', description: 'Strategic restructuring and settlement advisory' },
    { icon: Award, title: 'Investment Banking Support', description: 'M&A advisory and capital raising assistance' },
    { icon: BarChart3, title: 'Balance Sheet Optimization', description: 'Working capital and liability management' },
    { icon: Users, title: 'Virtual CFO', description: 'Fractional finance leadership for growing businesses' },
    { icon: Target, title: 'Capital Planning', description: 'Strategic roadmaps for sustainable growth funding' },
    { icon: Calculator, title: 'Financial Modelling', description: 'Sophisticated projections and scenario analysis' }
  ];

  const differentiators = [
    { icon: Award, title: '40+ Years Combined Experience', description: 'Deep credit understanding from senior banking backgrounds' },
    { icon: Building, title: 'Lender-Aligned Structuring', description: 'Proposals designed for approval and execution' },
    { icon: TrendingUp, title: 'Complex Case Expertise', description: 'Proven ability to handle challenging situations' },
    { icon: Shield, title: 'Ethical & Transparent', description: 'Advisory built on trust and integrity' },
    { icon: Handshake, title: 'Long-Term Focus', description: 'Committed to sustainable financial health' }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            Independent. Experienced. Built for Businesses Seeking Clarity and Capital Strength.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-content-section">
        <div className="about-glass-card">
          <h2 className="about-section-title">Who We Are</h2>
          <p className="about-section-text">
            Fenero Capital Advisory LLP is a bootstrapped, specialized debt advisory and financial strategy firm committed to delivering clarity, structure, and intelligent capital planning. We bridge the gap between businesses seeking growth capital and financial institutions offering it, ensuring seamless transactions built on deep market understanding and relationship strength. Our approach combines traditional banking wisdom with modern efficiency, serving clients across diverse industries with precision and confidentiality.
          </p>
        </div>
      </section>

      {/* Our Motto */}
      <section className="about-content-section about-motto-section">
        <div className="about-glass-card about-motto-card">
          <span className="about-motto-label">Our Motto</span>
          <p className="about-motto-text">
            "You Drive Business, We Drive Finance"
          </p>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="about-content-section">
        <h2 className="about-section-title about-centered">Our Vision & Mission</h2>
        <div className="about-vision-mission-grid">
          <div className="about-glass-card about-vm-card">
            <div className="about-vm-icon">
              <Target size={40} />
            </div>
            <h3 className="about-vm-title">Our Vision</h3>
            <p className="about-vm-text">
              To be the trusted advisor of choice for businesses navigating capital decisions, recognized for empowering growth through reliable, transparent, and intelligent financial solutions that create lasting value.
            </p>
          </div>
          <div className="about-glass-card about-vm-card">
            <div className="about-vm-icon">
              <Compass size={40} />
            </div>
            <h3 className="about-vm-title">Our Mission</h3>
            <p className="about-vm-text">
              Delivering tailored debt solutions with disciplined execution, clarity-driven guidance, and a unique blend of traditional banking expertise and digital-age efficiency. We exist to simplify complex financial landscapes for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Our Foundation */}
      <section className="about-content-section">
        <div className="about-glass-card">
          <h2 className="about-section-title">Our Foundation</h2>
          <p className="about-section-text about-leadership-intro">
            Fenero is led by two seasoned banking professionals with complementary expertise and a shared commitment to excellence.
          </p>
          
          <div className="about-leadership-stats">
            <div className="about-leadership-stats-number">40+</div>
            <div className="about-leadership-stats-text">Years Combined Banking Experience</div>
          </div>

          <div className="about-leadership-grid">
            <div className="about-leader-card">
              <div className="about-leader-icon">
                <Users size={48} />
              </div>
              <div className="about-leader-info">
                <h3 className="about-leader-title">Managing Partner</h3>
                <p className="about-leader-experience">23+ Years Banking Experience</p>
                <p className="about-leader-description">
                  Extensive background in credit assessment, structured finance, and institutional banking relationships across multiple sectors.
                </p>
              </div>
            </div>
            <div className="about-leader-card">
              <div className="about-leader-icon">
                <Users size={48} />
              </div>
              <div className="about-leader-info">
                <h3 className="about-leader-title">Senior Partner</h3>
                <p className="about-leader-experience">17+ Years Banking Experience</p>
                <p className="about-leader-description">
                  Deep expertise in Banking , Risk Management , debt syndication, corporate finance, and advisory services with proven track record in complex mandates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-content-section">
        <h2 className="about-section-title about-centered">Our Values</h2>
        <div className="about-values-grid">
          {values.map((value, index) => (
            <div key={index} className="about-value-card about-glass-card">
              <div className="about-value-icon">
                <value.icon size={32} />
              </div>
              <h3 className="about-value-title">{value.title}</h3>
              <p className="about-value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="about-content-section">
        <h2 className="about-section-title about-centered">What We Do</h2>
        <div className="about-services-grid">
          {services.map((service, index) => (
            <div key={index} className="about-service-card about-glass-card">
              <div className="about-service-icon">
                <service.icon size={36} />
              </div>
              <h3 className="about-service-title">{service.title}</h3>
              <p className="about-service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Clients Work With Us */}
      <section className="about-content-section">
        <h2 className="about-section-title about-centered">Why Clients Work With Us</h2>
        <div className="about-differentiators-grid">
          {differentiators.map((diff, index) => (
            <div key={index} className="about-diff-card about-glass-card">
              <div className="about-diff-icon">
                <diff.icon size={32} />
              </div>
              <h3 className="about-diff-title">{diff.title}</h3>
              <p className="about-diff-description">{diff.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Model */}
      <section className="about-content-section">
        <div className="about-glass-card">
          <h2 className="about-section-title">Our Operating Model</h2>
          <p className="about-section-text">
            We operate a hybrid advisory model that combines the best of both worlds: personal, face-to-face interactions for critical discussions and relationship building, complemented by efficient digital communication for updates, documentation, and ongoing support. This approach ensures we remain accessible, responsive, and effective while respecting the time and preferences of our clients.
          </p>
          <div className="about-operating-features">
            <div className="about-op-feature">
              <div className="about-op-icon">
                <Users size={28} />
              </div>
              <div className="about-op-content">
                <h4>Physical Interactions</h4>
                <p>In-person meetings for strategic discussions and relationship depth</p>
              </div>
            </div>
            <div className="about-op-feature">
              <div className="about-op-icon">
                <MessageSquare size={28} />
              </div>
              <div className="about-op-content">
                <h4>Digital Efficiency</h4>
                <p>Real-time updates, documentation sharing, and seamless communication</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Commitment */}
      <section className="about-content-section">
        <div className="about-glass-card about-commitment-card">
          <h2 className="about-section-title about-centered">Our Commitment to You</h2>
          <p className="about-commitment-text">
            Every engagement with Fenero Capital Advisory is built on a foundation of trust, expertise, and unwavering ethical standards. We commit to understanding your unique situation, presenting honest assessments, and working tirelessly to achieve outcomes that strengthen your financial position for the long term. Your success is our success, and we measure our value by the lasting impact we create for your business.
          </p>
        </div>
      </section>
        <Navbar />
        <Footer />
    </div>
  );
};

export default AboutUs;