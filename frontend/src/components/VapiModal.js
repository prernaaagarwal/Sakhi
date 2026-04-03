import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './VapiModal.css';

const VapiModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="vapi-modal-overlay" onClick={onClose}>
      <div className="vapi-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="vapi-modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        <div className="vapi-modal-header">
          <h2 className="heading-2">Book Your Hotel with AI</h2>
          <p className="body-small">Click "Book with AI" button to start voice conversation</p>
        </div>
        <div className="vapi-widget-container">
          <iframe
            src="/vapi-widget.html"
            title="Vapi AI Widget"
            className="vapi-iframe"
            allow="microphone; camera"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          />
        </div>
      </div>
    </div>
  );
};

export default VapiModal;
