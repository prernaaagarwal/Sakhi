import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-text">Sakhi Help</div>
              <div className="logo-tagline">Voice Intelligence</div>
            </div>
            <p className="body-small footer-description">
              Transforming hotel guest experiences with intelligent voice technology.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
              <li><a href="#value" className="footer-link">Why Voice</a></li>
              <li><a href="#cta" className="footer-link">Get Started</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span className="body-small">hello@aura-ai.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span className="body-small">+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span className="body-small">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="caption">
            &copy; {currentYear} Sakhi Help. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="caption footer-legal-link">Privacy Policy</a>
            <span className="caption">•</span>
            <a href="#" className="caption footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
