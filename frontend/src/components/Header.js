import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-text">Sakhi Help</div>
            <div className="logo-tagline">Voice Intelligence</div>
          </div>

          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('features')} className="nav-link">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
              How It Works
            </button>
            <button onClick={() => scrollToSection('value')} className="nav-link">
              Why Voice
            </button>
            <button onClick={() => scrollToSection('cta')} className="btn-primary">
              Get Started
            </button>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
