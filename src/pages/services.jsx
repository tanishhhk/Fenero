// src/pages/ServicesPage.jsx

/**
 * Copyright (c) 2025-2026 Fenero Capital Advisory LLP
 * All Rights Reserved.
 * 
 * This file is part of the Fenero platform and is proprietary software.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * 
 * Author: Tanishk Jain
 * Company: Fenero Capital Advisory LLP
 * Contact: fenerocapitaladvisory@gmail.com
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import servicesData from '../components/services/servicesData';
import ServicesHero from '../components/services/ServicesHero';
import ServicesTabs from '../components/services/ServicesTabs';
import TypesSection from '../components/services/TypesSection';
import ProcessSection from '../components/services/ProcessSection';
import BenefitsSection from '../components/services/BenefitsSection';
import FAQSection from '../components/services/FAQSection';
import RelatedServices from '../components/services/RelatedServices';
import CTASection from '../components/services/CTASection';

import '../styles/services/ServicesPage.css';

const ServicesPage = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);
  const [activeTab, setActiveTab] = useState('types');

  useEffect(() => {
    if (serviceType && servicesData[serviceType]) {
      setActiveService(servicesData[serviceType]);
    } else {
      setActiveService(servicesData['debt-syndication']);
    }
  }, [serviceType]);

  const handleServiceChange = (serviceId) => {
    navigate(`/services/${serviceId}`);
    setActiveTab('types');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!activeService) return null;

  const allServices = Object.values(servicesData);
  const otherServices = allServices.filter(s => s.id !== activeService.id);

  return (
    <div className="services-page">
      <Navbar />
      
      <ServicesHero activeService={activeService} />
      
      <ServicesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="services-content">
        {activeTab === 'types' && <TypesSection types={activeService.types} />}
        {activeTab === 'process' && <ProcessSection process={activeService.process} />}
        {activeTab === 'benefits' && <BenefitsSection benefits={activeService.benefits} />}
        {activeTab === 'faq' && <FAQSection faqs={activeService.faqs} />}
      </div>


      
      {otherServices.length > 0 && (
        <RelatedServices 
          otherServices={otherServices} 
          handleServiceChange={handleServiceChange} 
        />
      )}
      
      <CTASection navigate={navigate} />
      <SmoothScroll />
      <Footer />
    </div>
  );
};

export default ServicesPage;