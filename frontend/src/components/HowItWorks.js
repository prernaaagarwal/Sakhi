import React from 'react';
import { Mic, CheckCircle, PhoneCall, Hash, CheckCheck } from 'lucide-react';
import { howItWorksSteps } from '../data/mock';
import './HowItWorks.css';

const visualIcons = {
  'microphone': Mic,
  'check-buttons': CheckCircle,
  'callback-options': PhoneCall,
  'phone-input': Hash,
  'success-check': CheckCheck
};

const HowItWorks = () => {
  return (
    <section className="section how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1 section-title">How It Works</h2>
          <p className="body-large section-subtitle">
            A seamless 5-step journey from voice query to resolution
          </p>
        </div>

        <div className="flow-container">
          {howItWorksSteps.map((step, index) => {
            const Icon = visualIcons[step.visualElement];
            return (
              <React.Fragment key={step.id}>
                <div className="flow-step">
                  <div className="step-badge">
                    <span className="mono-text">Screen {step.screen}</span>
                  </div>
                  <div className="flow-card">
                    <div className="flow-icon-container">
                      {Icon && <Icon className="flow-icon" size={32} />}
                    </div>
                    <h3 className="heading-3 flow-title">{step.title}</h3>
                    <p className="body-small flow-description">{step.description}</p>
                    <div className="flow-example">
                      <span className="caption">Example:</span>
                      <p className="body-small">{step.example}</p>
                    </div>
                  </div>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="flow-arrow">↓</div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
