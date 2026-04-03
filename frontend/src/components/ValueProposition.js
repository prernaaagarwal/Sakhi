import React from 'react';
import { Users, Globe, Eye } from 'lucide-react';
import { valuePropositions } from '../data/mock';
import './ValueProposition.css';

const iconMap = {
  1: Users,
  2: Globe,
  3: Eye
};

const ValueProposition = () => {
  return (
    <section className="section value-section" id="value">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1 section-title">Why Voice?</h2>
          <p className="body-large section-subtitle">
            Voice interfaces open doors for guests who need them most
          </p>
        </div>

        <div className="value-grid">
          {valuePropositions.map((value) => {
            const Icon = iconMap[value.id];
            return (
              <div key={value.id} className="value-card">
                <div className="value-icon-wrapper">
                  {Icon && <Icon className="value-icon" size={40} />}
                </div>
                <h3 className="heading-3 value-title">{value.title}</h3>
                <p className="body-medium value-description">{value.description}</p>
                <div className="value-benefit">
                  <span className="benefit-label mono-text">Impact:</span>
                  <p className="body-small">{value.benefit}</p>
                </div>
                <div className="value-stat">
                  <span className="stat-highlight">{value.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="value-cta">
          <p className="body-large">
            Make your hotel accessible to everyone. Start with Sakhi Help today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
