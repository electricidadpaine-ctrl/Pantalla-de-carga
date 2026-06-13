export type LoadingStyle = 'high-voltage' | 'circular-pulse' | 'digital-pulse' | 'minimal-glow';
export type AnimationSpeed = 'slow' | 'medium' | 'fast' | 'turbo';
export type AccentColor = 'yellow' | 'blue' | 'red' | 'green' | 'orange' | 'cyan';
export type BackgroundStyle = 'dark-space' | 'light-slate' | 'electric-navy' | 'industrial-grid';

export interface LoadingConfig {
  style: LoadingStyle;
  speed: AnimationSpeed;
  accentColor: AccentColor;
  backgroundStyle: BackgroundStyle;
  logoSrc: string | null; // Base64 or object URL of uploaded file
  logoName: string | null;
  showTools: boolean;
  spinningOuterCircle: boolean;
  pulsingLightning: boolean;
  glowStrength: 'low' | 'medium' | 'high';
  progressMode: 'infinite' | 'percentage' | 'voltage';
  soundSimulation: boolean;
  statusText: string;
}

export const ACCENT_COLORS = {
  yellow: {
    hex: '#EAB308',
    tailwind: 'text-yellow-500 bg-yellow-500 border-yellow-500',
    glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
    dropShadow: 'drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]',
    accentClass: 'text-yellow-400',
    bgBadge: 'bg-yellow-500/10 border-yellow-500/30'
  },
  blue: {
    hex: '#3B82F6',
    tailwind: 'text-blue-500 bg-blue-500 border-blue-500',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    dropShadow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]',
    accentClass: 'text-blue-400',
    bgBadge: 'bg-blue-500/10 border-blue-500/30'
  },
  red: {
    hex: '#EF4444',
    tailwind: 'text-red-500 bg-red-500 border-red-500',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    dropShadow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]',
    accentClass: 'text-red-400',
    bgBadge: 'bg-red-500/10 border-red-500/30'
  },
  green: {
    hex: '#22C55E',
    tailwind: 'text-green-500 bg-green-500 border-green-500',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    dropShadow: 'drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]',
    accentClass: 'text-green-400',
    bgBadge: 'bg-green-500/10 border-green-500/30'
  },
  orange: {
    hex: '#F97316',
    tailwind: 'text-orange-500 bg-orange-500 border-orange-500',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    dropShadow: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]',
    accentClass: 'text-orange-400',
    bgBadge: 'bg-orange-500/10 border-orange-500/30'
  },
  cyan: {
    hex: '#06B6D4',
    tailwind: 'text-cyan-500 bg-cyan-500 border-cyan-500',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    dropShadow: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]',
    accentClass: 'text-cyan-400',
    bgBadge: 'bg-cyan-500/10 border-cyan-500/30'
  }
};
