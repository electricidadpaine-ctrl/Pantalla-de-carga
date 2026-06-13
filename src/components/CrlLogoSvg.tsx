import React from 'react';
import { ACCENT_COLORS, AccentColor, AnimationSpeed } from '../types';

interface CrlLogoSvgProps {
  accentColor: AccentColor;
  showTools: boolean;
  spinningOuterCircle: boolean;
  pulsingLightning: boolean;
  glowStrength: 'low' | 'medium' | 'high';
  customLogoSrc?: string | null;
  className?: string;
  size?: number;
  speed?: AnimationSpeed;
}

export default function CrlLogoSvg({
  accentColor,
  showTools = true,
  spinningOuterCircle = true,
  pulsingLightning = true,
  glowStrength = 'medium',
  customLogoSrc = null,
  className = '',
  size = 350,
  speed = 'medium',
}: CrlLogoSvgProps) {
  const activeColor = ACCENT_COLORS[accentColor];
  
  // Glow filter based on strength
  const glowIntensities = {
    low: 'blur(3px)',
    medium: 'blur(6px) drop-shadow(0 0 4px rgba(234, 179, 8, 0.4))',
    high: 'blur(10px) drop-shadow(0 0 12px rgba(234, 179, 8, 0.85)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))',
  };

  const glowStyle = glowIntensities[glowStrength];

  if (customLogoSrc) {
    return (
      <div 
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {/* Glow behind custom logo */}
        <div 
          className="absolute inset-0 rounded-full transition-all duration-700 opacity-60"
          style={{
            background: `radial-gradient(circle, ${activeColor.hex}30 10%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
        
        {/* Decorative electric orbiting sparks */}
        {spinningOuterCircle && (
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
            <div 
              className="absolute top-2 left-1/2 w-4 h-4 -ml-2 rounded-full border border-white"
              style={{
                backgroundColor: activeColor.hex,
                boxShadow: `0 0 16px 4px ${activeColor.hex}`,
              }}
            />
            <div 
              className="absolute bottom-2 left-1/2 w-3 h-3 -ml-1.5 rounded-full border border-white"
              style={{
                backgroundColor: activeColor.hex,
                boxShadow: `0 0 12px 3px ${activeColor.hex}`,
              }}
            />
          </div>
        )}

        {/* The client's actual uploaded image logo */}
        <img 
          src={customLogoSrc} 
          alt="Logo Electricidad Paine URL" 
          referrerPolicy="no-referrer"
          className="w-4/5 h-4/5 object-contain z-10 drop-shadow-xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
      </div>
    );
  }

  return (
    <svg
      id="crl-dynamic-logo-svg"
      width={size}
      height={size}
      viewBox="0 0 500 500"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        
        <linearGradient id="blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>

        <linearGradient id="wire-red" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        <linearGradient id="wire-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <linearGradient id="wire-ground" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id="tool-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="50%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="electric-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Text arches definition */}
        <path
          id="textPath-top"
          d="M 120 250 A 130 130 0 0 1 380 250"
          fill="none"
        />
        <path
          id="textPath-bottom"
          d="M 380 250 A 130 130 0 0 1 120 250"
          fill="none"
        />
      </defs>

      {/* BACKGROUND: RADIAL CABLES & ELECTRICAL TOOLS (If toggled) */}
      {showTools && (
        <g id="radial-assets" className="opacity-90">
          {/* Radial electrical wires coming behind */}
          {/* Top Wires */}
          <path d="M 230 40 Q 240 100 248 110" stroke="url(#wire-ground)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 250 30 Q 250 100 250 110" stroke="#EF4444" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 270 40 Q 260 100 252 110" stroke="url(#wire-blue)" strokeWidth="8" fill="none" strokeLinecap="round" />
          
          {/* Top-Right Screwdriver */}
          <g transform="translate(340, 110) rotate(45)">
            <rect x="-6" y="-80" width="12" height="90" fill="url(#tool-metal)" rx="3" />
            <rect x="-14" y="10" width="28" height="60" fill="#111827" rx="6" />
            <rect x="-8" y="10" width="16" height="60" fill="#EAB308" rx="2" />
            {/* Magnetic tip */}
            <rect x="-6" y="-80" width="12" height="15" fill="#374151" rx="2" />
          </g>

          {/* Left Pliers (Alicates) */}
          <g transform="translate(100, 190) rotate(-60)">
            {/* Red handles */}
            <path d="M -15 30 L -25 110" stroke="#EF4444" strokeWidth="18" strokeLinecap="round" />
            <path d="M 15 30 L 25 110" stroke="#EF4444" strokeWidth="18" strokeLinecap="round" />
            {/* Metal parts */}
            <path d="M 0 0 L -12 30" stroke="url(#tool-metal)" strokeWidth="14" strokeLinecap="round" />
            <path d="M 0 0 L 12 30" stroke="url(#tool-metal)" strokeWidth="14" strokeLinecap="round" />
            <rect x="-16" y="-30" width="32" height="35" fill="url(#tool-metal)" rx="5" />
            <circle cx="0" cy="5" r="7" fill="#374151" />
            {/* Teeth of pliers */}
            <rect x="-12" y="-45" width="10" height="20" fill="url(#tool-metal)" rx="2" />
            <rect x="2" y="-45" width="10" height="20" fill="url(#tool-metal)" rx="2" />
          </g>

          {/* Right Multimeter */}
          <g transform="translate(410, 310) rotate(15)">
            {/* Multimeter body */}
            <rect x="-35" y="-50" width="70" height="100" fill="#EA580C" rx="10" stroke="#1F2937" strokeWidth="3" />
            <rect x="-28" y="-42" width="56" height="30" fill="#111827" rx="3" />
            {/* Display digits */}
            <text x="0" y="-22" fill="#22C55E" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle" className="tracking-widest">
              220.5
            </text>
            <text x="18" y="-34" fill="#22C55E" fontSize="8" fontFamily="monospace" textAnchor="middle">
              V
            </text>
            {/* Rotary dial */}
            <circle cx="0" cy="18" r="14" fill="#374151" stroke="#F97316" strokeWidth="2" />
            <line x1="0" y1="18" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            {/* Terminals */}
            <circle cx="-15" cy="38" r="4" fill="#EF4444" />
            <circle cx="0" cy="38" r="4" fill="#111827" />
            <circle cx="15" cy="38" r="4" fill="#EAB308" />
            {/* Test leads */}
            <path d="M -15 42 Q -30 90 -45 50" stroke="#EF4444" strokeWidth="4" fill="none" />
            <path d="M 0 42 Q 10 95 30 70" stroke="#111827" strokeWidth="4" fill="none" />
          </g>

          {/* Bottom Cables / Wires coming out of tubes */}
          <g transform="translate(140, 410) rotate(-25)">
            <path d="M 0 100 Q 20 50 10 0" stroke="url(#wire-red)" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M 40 100 Q 15 50 25 0" stroke="url(#wire-blue)" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M -20 100 Q -10 40 -15 0" stroke="#EAB308" strokeWidth="8" fill="none" strokeLinecap="round" />
          </g>

          <g transform="translate(360, 400) rotate(35)">
            <path d="M 0 100 Q -25 50 -10 -15" stroke="url(#wire-ground)" strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M -30 100 Q -40 60 -35 -5" stroke="url(#wire-red)" strokeWidth="8" fill="none" strokeLinecap="round" />
          </g>

          {/* Wire strippers on bottom-left */}
          <g transform="translate(240, 430) rotate(-5)">
            <path d="M -10 50 L -18 10" stroke="#1E40AF" strokeWidth="14" strokeLinecap="round" />
            <path d="M 10 50 L 18 10" stroke="#1E40AF" strokeWidth="14" strokeLinecap="round" />
            <circle cx="0" cy="12" r="5" fill="#9CA3AF" />
          </g>
        </g>
      )}

      {/* CORE ROUND BADGE OF "CRL" */}
      <g id="central-badge">
        {/* Glow under the main badge */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="none"
          stroke={activeColor.hex}
          strokeWidth="35"
          className="opacity-20 transition-all duration-700"
          style={{ filter: 'blur(15px)' }}
        />

        {/* White Solid/Glassmorphic Base of badge */}
        <circle
          cx="250"
          cy="250"
          r="135"
          fill="#FFFFFF"
          stroke="#1E3A8A"
          strokeWidth="6"
          className="drop-shadow-lg"
        />

        {/* Double Inner Circle lines */}
        <circle cx="250" cy="250" r="125" fill="none" stroke="#1E40AF" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="115" fill="none" stroke="#EAB308" strokeWidth="2.5" strokeDasharray="3 4" />
        <circle cx="250" cy="250" r="105" fill="none" stroke="#1E40AF" strokeWidth="1.5" />

        {/* Spinning Dotted Circle (If enabled) */}
        {spinningOuterCircle && (
          <circle
            cx="250"
            cy="250"
            r="120"
            fill="none"
            stroke={activeColor.hex}
            strokeWidth="4"
            strokeDasharray="6 14"
            className="origin-center animate-spin"
            style={{
              animationDuration: speed === 'turbo' ? '1s' : speed === 'fast' ? '3.5s' : speed === 'slow' ? '16s' : '8s',
              transformOrigin: '250px 250px',
            }}
          />
        )}

        {/* Dotted border just inside */}
        <circle
          cx="250"
          cy="250"
          r="92"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="3"
          strokeDasharray="2 6"
        />

        {/* TEXT: INSTALACIONES ELECTRICAS */}
        <text fill="#EAB308" fontSize="19" fontFamily="'Space Grotesk', 'Inter', sans-serif" fontWeight="800" letterSpacing="4.5">
          <textPath href="#textPath-top" startOffset="50%" textAnchor="middle">
            INSTALACIONES
          </textPath>
        </text>

        <text fill="#EAB308" fontSize="19" fontFamily="'Space Grotesk', 'Inter', sans-serif" fontWeight="800" letterSpacing="4.5">
          <textPath href="#textPath-bottom" startOffset="50%" textAnchor="middle">
            -ELÉCTRICAS-
          </textPath>
        </text>

        {/* LIGHTNING BOLTS ON THE LEFT AND RIGHT (Flanking CRL) */}
        {/* Left Lightning Bolt */}
        <g 
          transform="translate(125, 222) scale(0.8)"
          className={pulsingLightning ? 'origin-center animate-pulse' : ''}
          style={{ animationDuration: '0.8s', transformOrigin: '140px 245px' }}
        >
          <path
            d="M 15 0 L 0 25 L 12 25 L 2 50 L 22 20 L 10 20 Z"
            fill="url(#gold-grad)"
            stroke="#1E3A8A"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            style={{ filter: activeColor.hex === '#EAB308' ? 'drop-shadow(0 0 4px rgba(234,179,8,0.8))' : '' }}
          />
        </g>

        {/* Right Lightning Bolt */}
        <g 
          transform="translate(345, 222) scale(0.8)"
          className={pulsingLightning ? 'origin-center animate-pulse' : ''}
          style={{ animationDuration: '0.8s', transformOrigin: '360px 245px' }}
        >
          <path
            d="M 15 0 L 0 25 L 12 25 L 2 50 L 22 20 L 10 20 Z"
            fill="url(#gold-grad)"
            stroke="#1E3A8A"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            style={{ filter: activeColor.hex === '#EAB308' ? 'drop-shadow(0 0 4px rgba(234,179,8,0.8))' : '' }}
          />
        </g>

        {/* CENTER LOGO TEXT: "CRL" */}
        <g transform="translate(250, 272)" className="cursor-pointer">
          {/* Shadow layer for 3D outline effect */}
          <text
            x="0"
            y="0"
            fill="#1E3A8A"
            fontSize="78"
            fontFamily="'Space Grotesk', 'Inter', sans-serif"
            fontWeight="900"
            textAnchor="middle"
            stroke="#1E1B4B"
            strokeWidth="12"
            strokeLinejoin="round"
          >
            CRL
          </text>
          
          {/* Inner Golden Layer */}
          <text
            x="0"
            y="0"
            fill="url(#gold-grad)"
            fontSize="78"
            fontFamily="'Space Grotesk', 'Inter', sans-serif"
            fontWeight="900"
            textAnchor="middle"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
            className="tracking-tight"
            style={{
              filter: `drop-shadow(0 3px 5px rgba(30,58,138,0.6)) ${glowStrength === 'high' ? 'drop-shadow(0 0 8px rgba(234,179,8,0.8))' : ''}`,
            }}
          >
            CRL
          </text>
        </g>
      </g>

      {/* DYNAMIC PARTICLE SPARKS ORBITING LOGO */}
      {spinningOuterCircle && (
        <g id="electric-sparks">
          <circle cx="250" cy="100" r="5" fill="#FFFFFF" filter="url(#electric-glow)" className="animate-pulse" />
          <circle cx="100" cy="250" r="3.5" fill="#EAB308" filter="url(#electric-glow)" />
          <circle cx="400" cy="250" r="4" fill="#3B82F6" filter="url(#electric-glow)" />
          <circle cx="250" cy="400" r="5" fill="#FFFFFF" filter="url(#electric-glow)" className="animate-pulse" />
        </g>
      )}
    </svg>
  );
}
