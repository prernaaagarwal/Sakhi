import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import './CTA.css';

const CTA = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - will be replaced with backend integration
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ hotelName: '', email: '', phone: '' });
    }, 3000);
  };

  return (
    <section className="section cta-section" id="cta">
      <AnimatedBackground variant="simple" />
      <div className="container">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="heading-1 cta-title">Ready to Transform Your Guest Experience?</h2>
            <p className="body-large cta-subtitle">
              Join modern hotels using Sakhi Help to provide 24/7 voice support.
              Start your free trial today - no credit card required.
            </p>
            <ul className="cta-benefits">
              <li className="body-medium">
                <CheckCircle size={20} className="check-icon" />
                Free 30-day trial
              </li>
              <li className="body-medium">
                <CheckCircle size={20} className="check-icon" />
                No credit card required
              </li>
              <li className="body-medium">
                <CheckCircle size={20} className="check-icon" />
                Setup in under 10 minutes
              </li>
            </ul>
          </div>

          <div className="cta-form-wrapper">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="cta-form">
                <h3 className="heading-3 form-title">Get Started</h3>
                <div className="form-group">
                  <label htmlFor="hotelName" className="body-small">Hotel Name</label>
                  <input
                    type="text"
                    id="hotelName"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    required
                    placeholder="Your Hotel Name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="body-small">Business Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@hotel.com"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="body-small">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="form-input"
                  />
                </div>
                <button type="submit" className="btn-primary form-submit">
                  <Send size={18} />
                  Start Free Trial
                </button>
                <p className="caption form-disclaimer">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            ) : (
              <div className="success-message">
                <CheckCircle size={64} className="success-icon" />
                <h3 className="heading-3">Thank You!</h3>
                <p className="body-medium">
                  We've received your request. Our team will contact you within 24 hours to set up your Sakhi Help demo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
