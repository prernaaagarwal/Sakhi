import React from 'react';
import { Building2 } from 'lucide-react';
import './ViewToggle.css';

const ViewToggle = ({ isBusinessView, onToggle }) => {
  return (
    <div className="view-toggle-container">
      <div className="view-toggle-content">
        <Building2 size={18} className="toggle-icon" />
        <span className="toggle-label">Business View</span>
        <button
          onClick={onToggle}
          className={`toggle-switch ${isBusinessView ? 'active' : ''}`}
          aria-label="Toggle business view"
        >
          <span className="toggle-slider"></span>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
