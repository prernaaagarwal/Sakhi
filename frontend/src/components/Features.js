import React from 'react';
import {  Mic, Brain, ArrowUpRight, Phone, Languages, LayoutDashboard } from 'lucide-react';
import { features } from '../data/mock';
import './Features.css';

const iconMap = {
  Mic,
  Brain,
  ArrowUpRight,
  Phone,
  Languages,
  LayoutDashboard
};

const Features = () => {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1 section-title">Powerful Features</h2>
          <p className="body-large section-subtitle">
            Everything you need to deliver exceptional voice-based guest support
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.id} className={`voice-card ${feature.accent}`}>
                {Icon && <Icon className="voice-card-icon" />}
                <h3 className="voice-card-title">{feature.title}</h3>
                <p className="voice-card-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
