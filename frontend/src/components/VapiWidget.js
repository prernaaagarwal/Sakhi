import React, { useEffect, useRef, useState } from 'react';

const VapiWidget = () => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for Vapi script to load
    const checkVapiLoaded = setInterval(() => {
      if (window.vapiSDK || document.querySelector('vapi-widget')) {
        clearInterval(checkVapiLoaded);
        initializeWidget();
      }
    }, 100);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkVapiLoaded);
      if (isLoading) {
        setError('Vapi widget failed to load. Please refresh the page.');
        setIsLoading(false);
      }
    }, 10000);

    const initializeWidget = () => {
      if (containerRef.current) {
        try {
          // Create the vapi-widget element
          const widget = document.createElement('vapi-widget');
          widget.setAttribute('public-key', 'f3e7f027-60ad-4b91-b7e1-b585282907b4');
          widget.setAttribute('assistant-id', '7c2af9b0-ae22-43e8-9a31-a8c3a7a39a7a');
          widget.setAttribute('mode', 'voice');
          widget.setAttribute('theme', 'dark');
          widget.setAttribute('base-bg-color', '#000000');
          widget.setAttribute('accent-color', '#14B8A6');
          widget.setAttribute('cta-button-color', '#000000');
          widget.setAttribute('cta-button-text-color', '#ffffff');
          widget.setAttribute('border-radius', 'large');
          widget.setAttribute('size', 'full');
          widget.setAttribute('position', 'bottom-right');
          widget.setAttribute('title', 'Book with AI');
          widget.setAttribute('start-button-text', 'Start');
          widget.setAttribute('end-button-text', 'End Call');
          widget.setAttribute('chat-first-message', 'Hey, How can I help you today?');
          widget.setAttribute('chat-placeholder', 'Type your message...');
          widget.setAttribute('voice-show-transcript', 'true');
          widget.setAttribute('consent-required', 'true');
          widget.setAttribute('consent-title', 'Terms and conditions');
          widget.setAttribute('consent-content', 'By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service.');
          widget.setAttribute('consent-storage-key', 'vapi_widget_consent');

          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(widget);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to initialize widget: ' + err.message);
          setIsLoading(false);
        }
      }
    };

    return () => {
      clearInterval(checkVapiLoaded);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: 'calc(100vh - 44px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          color: '#666',
          fontFamily: 'SF Mono, monospace',
          fontSize: '0.875rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>Loading AI Assistant...</div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #D4AF37',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </div>
      )}
      {error && (
        <div style={{ 
          textAlign: 'center', 
          color: '#ff4444',
          fontFamily: 'SF Mono, monospace',
          fontSize: '0.875rem',
          padding: '2rem'
        }}>
          {error}
        </div>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VapiWidget;
