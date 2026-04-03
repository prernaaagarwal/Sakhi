import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ variant = 'full' }) => {
  return (
    <div className="animated-background">
      {/* Floating Sound Waves */}
      <div className="sound-wave"></div>
      <div className="sound-wave"></div>
      <div className="sound-wave"></div>

      {/* Audio Particles */}
      <div className="audio-particle"></div>
      <div className="audio-particle"></div>
      <div className="audio-particle"></div>
      <div className="audio-particle"></div>

      {variant === 'full' && (
        <>
          {/* Waveform Lines */}
          <div className="waveform-line"></div>
          <div className="waveform-line"></div>
          <div className="waveform-line"></div>
          <div className="waveform-line"></div>
          <div className="waveform-line"></div>
          <div className="waveform-line"></div>
          <div className="waveform-line"></div>

          {/* Gradient Orbs */}
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>

          {/* Frequency Bars */}
          <div className="frequency-bars">
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
            <div className="frequency-bar"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
