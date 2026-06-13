import React, { useState } from 'react';
import { LoadingConfig, ACCENT_COLORS } from '../types';
import { Copy, Check, Code, FileCode2, Terminal, Info } from 'lucide-react';

interface CodeExporterProps {
  config: LoadingConfig;
}

export default function CodeExporter({ config }: CodeExporterProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'react'>('html');
  const [copied, setCopied] = useState(false);
  
  const activeColor = ACCENT_COLORS[config.accentColor];

  // Dynamic animation values based on config
  const getSpeedSeconds = () => {
    switch (config.speed) {
      case 'slow': return '5s';
      case 'medium': return '3.2s';
      case 'fast': return '1.5s';
      case 'turbo': return '0.7s';
    }
  };

  const getRotationSpeed = () => {
    switch (config.speed) {
      case 'slow': return '12s';
      case 'medium': return '7s';
      case 'fast': return '3s';
      case 'turbo': return '1s';
    }
  };

  const getGlowShadow = () => {
    switch (config.glowStrength) {
      case 'low': return `0 0 10px ${activeColor.hex}30`;
      case 'medium': return `0 0 18px ${activeColor.hex}dd`;
      case 'high': return `0 0 35px ${activeColor.hex}ff, 0 0 15px rgba(255,255,255,0.7)`;
    }
  };

  // 1. VANILLA HTML/CSS Code segment (highly requested for standard websites e.g. WordPress, Webflow, Shopify)
  const getHtmlSnippets = () => {
    const rawSvg = `
  <svg width="240" height="240" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gold-grad-paine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF275" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <path id="path-top" d="M 120 250 A 130 130 0 0 1 380 250" fill="none" />
      <path id="path-bottom" d="M 380 250 A 130 130 0 0 1 120 250" fill="none" />
    </defs>

    <!-- Radial wires and tools -->
    ${config.showTools ? `
    <g opacity="0.85">
      <path d="M 230 40 Q 240 100 248 110" stroke="#22C55E" stroke-width="8" fill="none" />
      <path d="M 250 30 Q 250 100 250 110" stroke="#EF4444" stroke-width="8" fill="none" />
      <path d="M 270 40 Q 260 100 252 110" stroke="#3B82F6" stroke-width="8" fill="none" />
    </g>
    ` : ''}

    <!-- Main Badge -->
    <circle cx="250" cy="250" r="135" fill="#FFFFFF" stroke="#1E3A8A" stroke-width="6" />
    <circle cx="250" cy="250" r="125" fill="none" stroke="#1E40AF" stroke-width="1.5" />
    <circle cx="250" cy="250" r="115" fill="none" stroke="#EAB308" stroke-width="2.5" stroke-dasharray="3 4" />
    <circle cx="250" cy="250" r="105" fill="none" stroke="#1E40AF" stroke-width="1.5" />

    ${config.spinningOuterCircle ? `
    <!-- Spinning circle -->
    <circle cx="250" cy="250" r="120" class="rotating-dash" fill="none" stroke="${activeColor.hex}" stroke-width="4" stroke-dasharray="6 14" style="transform-origin: 250px 250px;" />
    ` : ''}

    <circle cx="250" cy="250" r="92" fill="none" stroke="#1E3A8A" stroke-width="3" stroke-dasharray="2 6" />

    <!-- Typography -->
    <text fill="#EAB308" font-size="19" font-family="sans-serif" font-weight="900" letter-spacing="4.5">
      <textPath href="#path-top" startOffset="50%" text-anchor="middle">INSTALACIONES</textPath>
    </text>
    <text fill="#EAB308" font-size="19" font-family="sans-serif" font-weight="900" letter-spacing="4.5">
      <textPath href="#path-bottom" startOffset="50%" text-anchor="middle">-ELÉCTRICAS-</textPath>
    </text>

    <!-- Lightning bolts -->
    <g transform="translate(125, 222) scale(0.8)" ${config.pulsingLightning ? 'class="lightning-flash"' : ''}>
      <path d="M 15 0 L 0 25 L 12 25 L 2 50 L 22 20 L 10 20 Z" fill="url(#gold-grad-paine)" stroke="#1E3A8A" stroke-width="1.5" />
    </g>
    <g transform="translate(345, 222) scale(0.8)" ${config.pulsingLightning ? 'class="lightning-flash"' : ''}>
      <path d="M 15 0 L 0 25 L 12 25 L 2 50 L 22 20 L 10 20 Z" fill="url(#gold-grad-paine)" stroke="#1E3A8A" stroke-width="1.5" />
    </g>

    <!-- CRL Text -->
    <g transform="translate(250, 272)">
      <text x="0" y="0" fill="#1E3A8A" font-size="78" font-family="sans-serif" font-weight="900" text-anchor="middle" stroke="#1E1B4B" stroke-width="12" stroke-linejoin="round">CRL</text>
      <text x="0" y="0" fill="url(#gold-grad-paine)" font-size="78" font-family="sans-serif" font-weight="900" text-anchor="middle" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round">CRL</text>
    </g>
  </svg>
    `.trim();

    const customImageTag = `
  <!-- Logo Corporativo Personalizado de Electricidad Paine -->
  <div class="crl-logo-image-container">
    <img src="${config.logoSrc || 'TU_LOGO_BASE64_O_URL_AQUI'}" alt="Logo Electricidad Paine" class="crl-logo-pulse" />
  </div>
    `.trim();

    return `
<!-- 
  PANTALLA DE CARGA PROFESIONAL: ELECTRICIDAD PAINE (www.electricidadpaine.cl)
  Inserta este código justo después de la etiqueta <body> de tu sitio web.
-->
<div id="crl-loading-screen" class="crl-loader-wrapper">
  <div class="crl-loader-content">
    
    ${config.logoSrc ? customImageTag : rawSvg}

    <!-- Voltímetro Eléctrico / Barra de Progreso -->
    <div class="crl-progress-container">
      <div id="crl-voltage-readout" class="crl-voltage-readout">Iniciando Red Eléctrica...</div>
      <div class="crl-progress-track">
        <div id="crl-progress-bar" class="crl-progress-bar"></div>
      </div>
      <div class="crl-status-diagnostics">
        <span id="crl-percentage-text">Progreso: 0%</span>
        <span>Frecuencia: 50.0 Hz</span>
      </div>
    </div>
  </div>
</div>

<style>
  /* Clic de Carga Estilo General */
  .crl-loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${config.backgroundStyle === 'light-slate' ? '#f8fafc' : '#0a0d14'};
    color: ${config.backgroundStyle === 'light-slate' ? '#1e293b' : '#ffffff'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    opacity: 1;
    transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  .crl-loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    text-align: center;
  }

  /* Animación del Logo por CSS (Satisface: logo moviéndose de forma dinámica) */
  #crl-loading-screen svg, .crl-logo-image-container {
    animation: crl-dynamics ${getSpeedSeconds()} infinite ease-in-out;
    filter: ${getGlowShadow()};
    display: block;
  }

  .crl-logo-image-container {
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .crl-logo-pulse {
    width: 100%;
    height: 100%;
    object-contain: contain;
    animation: logo-pulsing 3s infinite ease-in-out;
  }

  @keyframes logo-pulsing {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Rotación Dinámica de la Corona de Puntos */
  .rotating-dash {
    animation: crl-spin-dash ${getRotationSpeed()} infinite linear;
  }

  /* Latido de los Rayos SEC de CRL */
  .lightning-flash {
    animation: crl-pulse-lightning 0.9s infinite ease-in-out;
    transform-origin: center;
  }

  @keyframes crl-dynamics {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(-1deg); }
    66% { transform: translateY(8px) rotate(1deg); }
  }

  @keyframes crl-spin-dash {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes crl-pulse-lightning {
    0%, 100% { opacity: 1; transform: scale(0.8) translate(5px, 5px); }
    50% { opacity: 0.5; transform: scale(0.95) translate(5px, 5px); }
  }

  /* Barra de Progreso y Datos */
  .crl-progress-container {
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .crl-voltage-readout {
    font-family: monospace;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${activeColor.hex};
    height: 16px;
  }

  .crl-progress-track {
    width: 100%;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 99px;
    overflow: hidden;
    position: relative;
  }

  .crl-progress-bar {
    width: 0%;
    height: 100%;
    border-radius: 99px;
    background-color: ${activeColor.hex};
    box-shadow: 0 0 10px ${activeColor.hex};
    transition: width 0.1s linear;
  }

  .crl-status-diagnostics {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    font-family: monospace;
    opacity: 0.7;
  }
</style>

<script>
  // Script que controla el progreso técnico y oculta la pantalla al final
  document.addEventListener('DOMContentLoaded', function() {
    var progressBar = document.getElementById('crl-progress-bar');
    var percentageText = document.getElementById('crl-percentage-text');
    var voltageText = document.getElementById('crl-voltage-readout');
    var loaderScreen = document.getElementById('crl-loading-screen');
    
    var progress = 0;
    var phrases = [
      'Encendiendo circuito principal...',
      'Verificando puesta a tierra SEC...',
      'Estabilizando suministro de red (220V)...',
      'Diagnóstico de aislamiento OK.',
      'Suministro listo!'
    ];
    
    var interval = setInterval(function() {
      progress += ${config.speed === 'turbo' ? 8 : config.speed === 'fast' ? 4 : config.speed === 'medium' ? 2 : 1};
      
      if (progress > 100) progress = 100;
      
      // Actualizar Barra
      if (progressBar) progressBar.style.width = progress + '%';
      
      // Actualizar porcentaje
      if (percentageText) percentageText.innerText = 'Progreso: ' + progress + '%';
      
      // Actualizar Voltaje / Mensaje Eléctrico
      if (voltageText) {
        var phraseIndex = Math.min(Math.floor((progress / 100) * phrases.length), phrases.length - 1);
        var simulatedVoltage = Math.floor((progress / 100) * 220);
        voltageText.innerText = 'VOLTAJE: ' + simulatedVoltage + ' V • ' + phrases[phraseIndex];
      }

      // Cerrar pantalla al llegar a 100%
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(function() {
          if (loaderScreen) {
            loaderScreen.style.opacity = '0';
            setTimeout(function() {
              loaderScreen.style.display = 'none';
            }, 600); // Esperar transicion de fade-out
          }
        }, 800); // Tiempo de cortesía una vez cargado
      }
    }, ${config.speed === 'turbo' ? 25 : config.speed === 'fast' ? 40 : config.speed === 'medium' ? 80 : 130});
  });
</script>
    `.trim();
  };

  // 2. React + Tailwind + Motion component structure
  const getReactCode = () => {
    return `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // o 'motion/react'
import { Zap, ShieldCheck, RefreshCw } from 'lucide-react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Ocultar pantalla tras cargado
          setTimeout(() => setVisible(false), 800);
          return 100;
        }
        return prev + 2; 
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d1117] text-white">
      {/* Contenedor del Logo con Movimiento Dinámico */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          scale: [1, 1.04, 1],
          filter: ['drop-shadow(0 0 8px ${activeColor.hex}40)', 'drop-shadow(0 0 20px ${activeColor.hex}cc)']
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-60 h-60 flex items-center justify-center relative mb-8"
      >
        {/* Aquí puedes insertar tu componente SVG de CRL del panel de control */}
        <div className="text-center font-display font-black text-4xl border-4 border-yellow-500 rounded-full p-8 bg-slate-900 shadow-lg">
          CRL
        </div>
      </motion.div>

      {/* Progress Technical Panel */}
      <div className="w-full max-w-xs flex flex-col gap-2.5 px-4">
        <div className="text-center font-mono text-xs text-yellow-500 tracking-widest uppercase">
          CARGANDO: {progress}% (Voltaje: {Math.floor((progress / 100) * 220)}V)
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-yellow-500 shadow-[0_0_10px_#eab308]"
            initial={{ width: 0 }}
            animate={{ width: \`\${progress}%\` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] opacity-60">
          <span>PROCESO ESTABLE</span>
          <span>Red: 50.0 Hz</span>
        </div>
      </div>
    </div>
  );
}
    `.trim();
  };

  const currentCode = activeTab === 'html' ? getHtmlSnippets() : getReactCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="code-exporter-panel" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5 mt-4">
      {/* Tab select header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Code size={18} className="text-yellow-500" />
          <h3 className="font-display font-semibold text-white text-md">Código de Integración</h3>
        </div>

        <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('html')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'html' ? 'bg-yellow-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FileCode2 size={13} />
            HTML/CSS/JS (Tradicional/WordPress)
          </button>
          <button
            onClick={() => setActiveTab('react')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'react' ? 'bg-yellow-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Terminal size={13} />
            React + Tailwind
          </button>
        </div>
      </div>

      {/* Code panel viewer */}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-700 transition flex items-center gap-1.5 text-xs z-10 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copiar Código</span>
            </>
          )}
        </button>

        {/* Text Area pre */}
        <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-[11px] font-mono leading-relaxed text-slate-300 overflow-x-auto max-h-[350px] scrollbar-thin">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Pro-Tips Infobard */}
      <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl flex gap-3 text-xs opacity-90">
        <Info size={16} className="text-yellow-500 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 tracking-wide leading-relaxed">
          <p className="font-bold text-white">🔥 Consejos de Velocidad y SEC:</p>
          {activeTab === 'html' ? (
            <p className="text-slate-400 text-[11px]">
              La opción de HTML es óptima para WordPress porque está construida en **CSS puro y JS nativo sin librerías externas**. No afectará en absoluto las métricas de Google Lighthouse o de velocidad de carga de www.electricidadpaine.cl.
            </p>
          ) : (
            <p className="text-slate-400 text-[11px]">
              Esta opción es perfecta para proyectos construidos en Next.js, Vite o Remix. Utiliza Framer Motion para asegurar que la transición y el desvanecimiento del logo sean fluidos a 60 FPS sin parpadeos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
