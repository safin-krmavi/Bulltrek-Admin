import React from 'react';
import './LoadingLogo.css';

export default function LoadingLogo({ size = 60 }: { size?: number }) {
  // Bar colors: red, neutral, green, neutral
  const barColors = ['#E92C2A', '#40101B', '#029447', '#40101B'];
  return (
    <div
      className="bulltrek-loading-logo"
      style={{ height: size, width: size * 2, display: 'flex', alignItems: 'end', justifyContent: 'center', gap: size * 0.2 }}
    >
      {barColors.map((color, i) => (
        <div
          key={i}
          className={`bulltrek-bar bulltrek-bar-${i + 1}`}
          style={{
            background: color,
            width: size * 0.18,
            height: size * 0.7,
            borderRadius: size * 0.09,
          }}
        />
      ))}
    </div>
  );
} 