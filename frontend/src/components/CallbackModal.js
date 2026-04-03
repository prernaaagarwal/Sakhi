import React, { useState } from 'react';
import { X, Phone, Check } from 'lucide-react';
import axios from 'axios';
import './CallbackModal.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CallbackModal = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmedNumber, setConfirmedNumber] = useState('');

  const validatePhoneNumber = (phone) => {
    phone = phone.trim().replace(/[^\d+]/g, '');

    if (!phone.startsWith('+')) {
      if (/^\d+$/.test(phone)) {
        phone = '+' + phone;
      } else {
        return { valid: false, error: 'Phone number must start with + (e.g., +919876543210)', phone: null };
      }
    }

    if (phone.length < 10) {
      return { valid: false, error: 'Phone number is too short', phone: null };
    }

    if (phone.length > 16) {
      return { valid: false, error: 'Phone number is too long', phone: null };
    }

    if (!/^\+\d+$/.test(phone)) {
      return { valid: false, error: 'Phone number can only contain digits after +', phone: null };
    }

    return { valid: true, phone: phone, error: null };
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const digits = phone.replace('+', '');

    if (phone.startsWith('+91') && digits.length === 12) {
      return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
    }

    if (phone.startsWith('+1') && digits.length === 11) {
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }

    if (digits.length > 5) {
      return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
    }

    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validatePhoneNumber(phoneNumber);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/retell-callback`, {
        phoneNumber: validation.phone
      });

      if (response.data.success) {
        setSuccess(true);
        setConfirmedNumber(formatPhoneNumber(validation.phone));
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to request callback. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPhoneNumber('');
    setError('');
    setIsLoading(false);
    setSuccess(false);
    setConfirmedNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="callback-modal-overlay" onClick={handleClose}>
      <div className="callback-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="callback-modal-close" onClick={handleClose} aria-label="Close">
          <X size={24} />
        </button>

        {!success ? (
          <>
            <div className="callback-modal-header">
              <div className="callback-icon-wrapper">
                <Phone size={32} />
              </div>
              <h2 className="heading-2">Need More Help?</h2>
              <p className="body-medium">Request a callback and we'll call you shortly</p>
            </div>

            <form onSubmit={handleSubmit} className="callback-form">
              <div className="form-group">
                <label htmlFor="callbackPhone" className="body-small">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="callbackPhone"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError('');
                  }}
                  placeholder="+91 98765 43210"
                  required
                  className={`callback-input ${error ? 'error' : ''}`}
                  disabled={isLoading}
                />
                {error && <span className="error-message">{error}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary callback-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner-small"></div>
                    Requesting...
                  </>
                ) : (
                  <>
                    <Phone size={18} />
                    Request Callback
                  </>
                )}
              </button>

              <p className="caption callback-time">We'll call you within 2 minutes</p>
            </form>
          </>
        ) : (
          <div className="callback-success">
            <div className="success-icon-wrapper">
              <Check size={48} />
            </div>
            <h3 className="heading-3">Callback Requested!</h3>
            <p className="body-medium">
              We'll call you shortly at <strong>{confirmedNumber}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallbackModal;
