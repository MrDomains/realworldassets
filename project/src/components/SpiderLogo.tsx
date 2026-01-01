import React from 'react';

const SpiderLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      className={`w-[50px] h-[50px] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spiderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#170584" />
          <stop offset="100%" stopColor="#ab9ff4" />
        </linearGradient>
        <clipPath id="circleClip">
          <circle cx="25" cy="25" r="25" />
        </clipPath>
      </defs>
      
      {/* Neural Network Connections (Legs) */}
      <g className="connections" style={{ opacity: 1 }} clipPath="url(#circleClip)">
        <line x1="25" y1="25" x2="12" y2="12" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="38" y2="12" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="43" y2="25" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="38" y2="38" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="25" y2="43" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="12" y2="38" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="7" y2="25" stroke="url(#spiderGradient)" strokeWidth="2" />
        <line x1="25" y1="25" x2="25" y2="7" stroke="url(#spiderGradient)" strokeWidth="2" />
      </g>

      {/* Neural Network Nodes */}
      <g className="nodes" style={{ opacity: 1 }} clipPath="url(#circleClip)">
        {/* Center node (body) */}
        <circle cx="25" cy="25" r="6" fill="url(#spiderGradient)" />
        
        {/* Outer nodes (leg joints) */}
        <circle cx="12" cy="12" r="4" fill="url(#spiderGradient)" />
        <circle cx="38" cy="12" r="4" fill="url(#spiderGradient)" />
        <circle cx="43" cy="25" r="4" fill="url(#spiderGradient)" />
        <circle cx="38" cy="38" r="4" fill="url(#spiderGradient)" />
        <circle cx="25" cy="43" r="4" fill="url(#spiderGradient)" />
        <circle cx="12" cy="38" r="4" fill="url(#spiderGradient)" />
        <circle cx="7" cy="25" r="4" fill="url(#spiderGradient)" />
        <circle cx="25" cy="7" r="4" fill="url(#spiderGradient)" />
      </g>
    </svg>
  );
};

export default SpiderLogo;