import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingConfig, ACCENT_COLORS } from '../types';
import CrlLogoSvg from './CrlLogoSvg';
import { Activity, ShieldAlert, Zap, Cpu, BatteryCharging } from 'lucide-react';

interface PreviewCanvasProps {
  key?: React.Key;
  config: LoadingConfig;
  previewMode?: boolean; // True inside the builder preview area, false if full screen popout
  onComplete?: () => void;
  loop?: boolean;
}

const BACKGROUND_STYLES = {
  'dark-space': 'bg-[#0d1117] text-white',
  'light-slate': 'bg-slate-50 text-slate-900 border border-slate-200',
  'electric-navy': 'bg-gradient-to-br from-[#060b19] via-[#0b132b] to-[#1c2541] text-white',
  'industrial-grid': 'bg-zinc-950 text-white relative overflow-hidden',
  'brand-paine': 'bg-gradient-to-tr from-[#140b30] via-[#1F1454] to-[#2B1D6F] text-white',
};

// Simulation statuses for the electrician theme
const CHILL_STATUSES = [
  { text: 'Conectando cables principales de acometida...', icon: Zap, delay: 1200 },
  { text: 'Verificando interruptores diferenciales...', icon: ShieldAlert, delay: 1000 },
  { text: 'Midiendo puesta a tierra (óhmetro)...', icon: Activity, delay: 1100 },
  { text: 'Estabilizando frecuencia a 50Hz (Paine Red)...', icon: Cpu, delay: 900 },
  { text: 'Cargando capacitores de alta potencia...', icon: BatteryCharging, delay: 1000 },
  { text: '¡Suministro eléctrico CRL activado!', icon: Zap, delay: 800 },
];

export default function PreviewCanvas({ config, previewMode = true, onComplete, loop = true }: PreviewCanvasProps) {
  const [percentage, setPercentage] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const activeColor = ACCENT_COLORS[config.accentColor];

  // Map Animation Speeds
  const speedDurations = {
    slow: { duration: 6, percentStep: 1, interval: 200 },
    medium: { duration: 3.5, percentStep: 2, interval: 100 },
    fast: { duration: 2, percentStep: 4, interval: 50 },
    turbo: { duration: 0.8, percentStep: 8, interval: 20 },
  };

  const selectedSpeed = speedDurations[config.speed];

  // Simulating the loading progress percentage & voltage numbers
  useEffect(() => {
    let intervalId: any;
    
    // reset loading triggers
    setPercentage(0);
    setVoltage(0);
    setCurrentStatusIndex(0);

    intervalId = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          if (!loop) {
            clearInterval(intervalId);
            setTimeout(() => {
              if (onComplete) {
                onComplete();
              }
            }, 500);
            return 100;
          }
          return 0; // loops back for previewing continuously
        }
        return Math.min(prev + selectedSpeed.percentStep, 100);
      });

      // voltage climbs up to 220V or 380V (standard Chilean volts!)
      setVoltage((prev) => {
        if (percentage >= 98) return 220;
        const target = 220;
        const current = Math.floor((percentage / 100) * target);
        // add small electrical jitter
        const jitter = Math.floor(Math.random() * 8) - 4;
        const result = Math.min(Math.max(current + jitter, 0), 220);
        return result;
      });
    }, selectedSpeed.interval);

    return () => clearInterval(intervalId);
  }, [config.speed, selectedSpeed.interval, selectedSpeed.percentStep, loop, onComplete]);

  // Handle step-by-step electrician statuses
  useEffect(() => {
    if (percentage === 0) {
      setCurrentStatusIndex(0);
      return;
    }
    
    const index = Math.min(
      Math.floor((percentage / 100) * CHILL_STATUSES.length),
      CHILL_STATUSES.length - 1
    );
    setCurrentStatusIndex(index);
  }, [percentage]);

  // Motion preset based on selected Loading Screen Style
  const getLogoMotion = () => {
    switch (config.style) {
      case 'high-voltage': // Quick electric vibrative float
        return {
          animate: {
            y: [-6, 6, -6, 4, -4, 0, -6],
            x: [0, -1.5, 1.5, -1, 1, -0.5, 0],
            scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
            filter: [
              `drop-shadow(0 0 4px ${activeColor.hex}30)`,
              `drop-shadow(0 0 15px ${activeColor.hex}dd)`,
              `drop-shadow(0 0 6px ${activeColor.hex}40)`,
              `drop-shadow(0 0 22px ${activeColor.hex}ff)`,
              `drop-shadow(0 0 8px ${activeColor.hex}50)`,
            ],
          },
          transition: {
            duration: config.speed === 'slow' ? 3 : config.speed === 'medium' ? 1.8 : config.speed === 'fast' ? 0.9 : 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        };

      case 'circular-pulse': // Magnetic pumping glow
        return {
          animate: {
            scale: [1, 1.06, 0.98, 1.04, 1],
            y: [-10, 10, -10],
          },
          transition: {
            scale: {
              duration: config.speed === 'slow' ? 4 : config.speed === 'medium' ? 2.5 : 1.2,
              repeat: Infinity,
              ease: 'linear',
            },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        };

      case 'digital-pulse': // Technical scan jump step
        return {
          animate: {
            y: [-12, 12, -12],
            rotateY: [0, 8, -8, 0],
          },
          transition: {
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotateY: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          },
        };

      case 'minimal-glow': // Warm aesthetic float
      default:
        return {
          animate: {
            y: [-15, 15, -15],
            rotate: [-1.5, 1.5, -1.5],
          },
          transition: {
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          },
        };
    }
  };

  const logoMotionProps = getLogoMotion();
  const CurrentIcon = CHILL_STATUSES[currentStatusIndex]?.icon || Zap;

  return (
    <div 
      className={`w-full h-full flex flex-col items-center justify-center relative select-none rounded-2xl overflow-hidden transition-all duration-500 ${BACKGROUND_STYLES[config.backgroundStyle]} ${previewMode ? 'min-h-[480px] max-h-[600px] border border-white/5 shadow-2xl' : 'fixed inset-0 z-50'}`}
    >
      {/* Background grid details */}
      {config.backgroundStyle === 'industrial-grid' && (
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{
               backgroundImage: `radial-gradient(circle, ${activeColor.hex} 1.5px, transparent 1.5px)`,
               backgroundSize: '24px 24px'
             }} 
        />
      )}
      {config.backgroundStyle === 'electric-navy' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)] pointer-events-none" />
      )}
      {config.backgroundStyle === 'brand-paine' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,196,15,0.08),transparent_65%)] pointer-events-none" />
      )}

      {/* Decorative lightning spark behind badge for high voltage style */}
      {config.style === 'high-voltage' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <AnimatePresence>
            {percentage % 12 === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.7, 0.1, 0.4, 0], scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div 
                  className="w-80 h-80 rounded-full opacity-30 filter blur-3xl"
                  style={{ backgroundColor: activeColor.hex }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Floating Spark Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const left = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = Math.random() * 4 + 3;
          return (
            <div
              key={i}
              className="absolute bottom-0 rounded-full opacity-0"
              style={{
                left: `${left}%`,
                width: size,
                height: size,
                backgroundColor: activeColor.hex,
                boxShadow: `0 0 10px ${activeColor.hex}, 0 0 2px #fff`,
                animation: `spark-float ${duration}s infinite linear`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Header watermarks if simulated website */}
      {previewMode && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono opacity-40 z-20">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            VISTA PREVIA DE CARGA (SIMULADOR)
          </span>
          <span>WWW.ELECTRICIDADPAINE.CL</span>
        </div>
      )}

      {/* MAIN DYNAMIC ANIMATED LOGO CONTAINER */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center mb-6"
        animate={logoMotionProps.animate}
        transition={logoMotionProps.transition}
      >
        <CrlLogoSvg
          accentColor={config.accentColor}
          showTools={config.showTools}
          spinningOuterCircle={config.spinningOuterCircle}
          pulsingLightning={config.pulsingLightning}
          glowStrength={config.glowStrength}
          customLogoSrc={config.logoSrc}
          size={previewMode ? 260 : 340}
          speed={config.speed}
        />
        
        {/* Voltage Flash Wave Effect */}
        {config.style === 'circular-pulse' && (
          <motion.div
            className="absolute rounded-full border opacity-30 pointer-events-none"
            style={{ borderColor: activeColor.hex }}
            animate={{
              width: [240, 400],
              height: [240, 400],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.div>

      {/* ELECTRIC METERS & PROGRESS BAR DISPLAY */}
      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center text-center mt-2">
        
        {/* Tech readout display for Digital Style */}
        <div className="mb-4 h-5 flex items-center justify-center font-mono text-xs gap-3 font-semibold tracking-wider">
          {config.progressMode === 'voltage' ? (
            <motion.div 
              className="px-2.5 py-0.5 rounded flex items-center gap-1.5 transition-colors border"
              style={{ 
                color: activeColor.hex, 
                borderColor: `${activeColor.hex}40`,
                backgroundColor: `${activeColor.hex}08`
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap size={14} className="animate-bounce" />
              <span>ALIMENTACIÓN: {voltage} V</span>
              <span className="text-[10px] opacity-60">
                {voltage < 100 ? 'FASE INICIAL' : voltage < 200 ? 'ALTA TENSIÓN' : 'TRIFÁSICA OK'}
              </span>
            </motion.div>
          ) : (
            <span className="opacity-75 tracking-widest text-[11px]">
              {percentage === 100 ? 'SISTEMA INICIADO' : `CARGANDO SISTEMA DE ENERGÍA`}
            </span>
          )}
        </div>

        {/* The Progress Bar */}
        <div className="w-full bg-neutral-800/60 backdrop-blur-md rounded-full h-2 p-[2px] border border-white/5 mb-4 relative">
          <div 
            className="h-full rounded-full transition-all duration-300 relative"
            style={{
              width: `${percentage}%`,
              backgroundColor: activeColor.hex,
              boxShadow: `0 0 12px ${activeColor.hex}`,
            }}
          >
            {/* Lead sliding electric energy surge point */}
            <div 
              className="absolute -right-1.5 -top-1 w-3 h-3 rounded-full bg-white border shadow-lg"
              style={{
                borderColor: activeColor.hex,
                boxShadow: `0 0 10px 2px ${activeColor.hex}`,
              }}
            />
          </div>
        </div>

        {/* Readout stats/percentages below progress bar */}
        <div className="flex items-center justify-between w-full font-mono text-[11px] opacity-75 px-1">
          {config.progressMode === 'infinite' ? (
            <div className="flex items-center gap-1 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
              <span>Suministro Continuo...</span>
            </div>
          ) : (
            <span>COMPLETADO: {percentage}%</span>
          )}
          <span>Frecuencia: 50.0 Hz</span>
        </div>

        {/* Real-time Status updates (electric diagnostics) */}
        <div className="mt-5 h-12 flex items-center justify-center px-4 w-full text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStatusIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center gap-2 text-xs font-medium max-w-xs"
              style={{ color: percentage > 90 ? '#10B981' : activeColor.hex }}
            >
              <CurrentIcon size={14} className="shrink-0 animate-pulse" />
              <span>
                {CHILL_STATUSES[currentStatusIndex]?.text || config.statusText}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Decorative footer label in popout/full mode */}
      {!previewMode && (
        <div className="absolute bottom-6 flex flex-col items-center gap-1.5 opacity-40 font-mono text-xs z-20 text-center">
          <span className="tracking-widest font-semibold text-[11px]">ELECTRICIDAD PAINE - CRL INSTALACIONES</span>
          <span>Santiago de Chile • Certificación SEC Clase A</span>
        </div>
      )}
    </div>
  );
}
