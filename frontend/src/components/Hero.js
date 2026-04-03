import React, { useState } from 'react';
import { Mic, ArrowRight, Sparkles, Phone } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import VapiModal from './VapiModal';
import CallbackModal from './CallbackModal';
import './Hero.css';

const Hero = () => {
  const [isVapiModalOpen, setIsVapiModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="hero-section" id="hero">
        <AnimatedBackground variant="full" />
        <div className="container">
        <div className="hero-content fade-in">
          <div className="hero-announcement">
            <Sparkles size={14} />
            <span>Transforming Hotel Guest Experience</span>
          </div>

          <h1 className="heading-hero hero-title">
            Voice-First AI Agent
            <br />
            <span className="text-golden">For Modern Hotels</span>
          </h1>

          <p className="body-large hero-subtitle">
            Sakhi Help provides instant, natural voice support for your guests.
            Answer questions, handle escalations, and deliver seamless experiences
            with intelligent voice technology.
          </p>

          <div className="hero-actions">
            <button onClick={() => scrollToSection('cta')} className="btn-primary">
              <Mic size={18} />
              Start Free Trial
            </button>
            <button onClick={() => setIsVapiModalOpen(true)} className="btn-secondary">
              Let AI handle bookings
              <ArrowRight size={18} />
            </button>
            <button onClick={() => setIsCallbackModalOpen(true)} className="btn-secondary">
              <Phone size={18} />
              Let AI solve customer queries
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">&lt;1.5s</div>
              <div className="stat-label mono-text">Response Time</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label mono-text">Availability</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">85%</div>
              <div className="stat-label mono-text">Query Resolution</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">2min</div>
              <div className="stat-label mono-text">Callback Time</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="voice-pulse-container">
              <div className="voice-pulse pulse"></div>
              <Mic className="voice-icon" size={48} />
            </div>
          </div>
        </div>
      </div>
    </section>
      
    <VapiModal 
      isOpen={isVapiModalOpen} 
      onClose={() => setIsVapiModalOpen(false)} 
    />
    
    <CallbackModal 
      isOpen={isCallbackModalOpen} 
      onClose={() => setIsCallbackModalOpen(false)} 
    />
  </>
  );
};

export default Hero;
