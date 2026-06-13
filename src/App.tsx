import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingConfig } from './types';
import PreviewCanvas from './components/PreviewCanvas';
import Controls from './components/Controls';
import CodeExporter from './components/CodeExporter';
import TechGuide from './components/TechGuide';
import { Zap, Maximize2, RotateCw, Globe, Shield, Sparkles, AlertCircle, X, CheckCircle } from 'lucide-react';

const DEFAULT_CONFIG: LoadingConfig = {
  style: 'high-voltage',
  speed: 'medium',
  accentColor: 'yellow',
  backgroundStyle: 'electric-navy',
  logoSrc: null,
  logoName: null,
  showTools: true,
  spinningOuterCircle: true,
  pulsingLightning: true,
  glowStrength: 'medium',
  progressMode: 'voltage',
  soundSimulation: false,
  statusText: 'Iniciando Red Eléctrica...',
};

export default function App() {
  const [config, setConfig] = useState<LoadingConfig>(DEFAULT_CONFIG);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [simulationKey, setSimulationKey] = useState(0); // For rebuilding/re-triggering Preview canvas animations
  const [showNotification, setShowNotification] = useState(false);

  // Trigger escape key listener to close full screen demo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setSimulationKey((prev) => prev + 1);
    triggerNotice();
  };

  const handleConfigChange = (newConfig: LoadingConfig) => {
    setConfig(newConfig);
  };

  const restartSimulation = () => {
    setSimulationKey((prev) => prev + 1);
  };

  const triggerNotice = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-yellow-500 selection:text-slate-950">
      
      {/* 1. HEADER BRANDING */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-yellow-500/10">
              <Zap size={20} className="fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-lg tracking-tight text-white uppercase">Electricidad Paine</h1>
                <span className="text-[10px] bg-yellow-500/20 text-yellow-500 font-mono font-bold px-1.5 py-0.5 rounded border border-yellow-500/30">SEC CLASE A</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Estudio de Pantallas de Carga Corporativa y Código de Alto Suministro</p>
            </div>
          </div>

          {/* Quick links & URL */}
          <div className="flex items-center gap-3.5 text-xs">
            <a 
              href="https://www.electricidadpaine.cl" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-850 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-slate-300 hover:text-white transition duration-300"
            >
              <Globe size={14} className="text-yellow-500 shrink-0" />
              <span>www.electricidadpaine.cl</span>
            </a>
            
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Restablecer Valores
            </button>
          </div>

        </div>
      </header>

      {/* 2. DYNAMIC BROADCAST NOTIFICATION */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-yellow-500/30 rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2 text-xs"
          >
            <CheckCircle size={15} className="text-yellow-500" />
            <span className="text-slate-200">Parámetros de red restablecidos correctamente</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-950/40 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-display font-extrabold text-md text-white flex items-center gap-1.5 mb-1">
              <Sparkles size={16} className="text-yellow-500 shrink-0" />
              ¿Por qué integrar una pantalla de carga dinámica?
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Para los clientes de Paine, Buin y Santiago, la primera impresión es crucial. Esta pantalla de carga dinámica simula una prueba técnica de tu sistema eléctrico mientras transiciona suavemente hacia tu contenido principal, creando expectativa y reforzando tu imagen de electricista SEC certificado.
            </p>
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-450 text-slate-950 font-bold font-display text-xs tracking-tight transition duration-300 shadow-lg shadow-yellow-500/10 shrink-0 cursor-pointer"
          >
            <Maximize2 size={15} />
            Demostración en Pantalla Completa
          </button>
        </div>

        {/* Bento Board: Viewport & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Lado Izquierdo: Simulación en Navegador (7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Mock browser container */}
            <div className="border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden flex flex-col shadow-2xl shrink-0">
              
              {/* Browser bar */}
              <div className="bg-slate-900/60 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                {/* Traffic lights */}
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                {/* URL input bar */}
                <div className="flex-1 max-w-sm mx-auto bg-slate-950 rounded-lg py-1 px-3 border border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="truncate">https://www.electricidadpaine.cl</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                {/* Right controls */}
                <span className="w-8 shrink-0" />
              </div>

              {/* Rendering canvas frame with key for resets */}
              <div className="p-1.5 bg-slate-900/20">
                <PreviewCanvas key={simulationKey} config={config} previewMode={true} />
              </div>

              {/* Quick utility drawer */}
              <div className="bg-slate-900/50 border-t border-slate-800/80 px-5 py-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-mono text-[10px]">
                  <Shield size={12} className="text-emerald-500" />
                  PROTECCIÓN DIFERENCIAL INTEGRADA
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={restartSimulation}
                    className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg flex items-center gap-1 border border-slate-800 hover:border-slate-700 transition"
                    title="Simular reinicio de carga"
                  >
                    <RotateCw size={13} />
                    <span className="text-[11px]">Reiniciar</span>
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg flex items-center gap-1 border border-slate-800 hover:border-slate-700 transition"
                    title="Pasar a Pantalla completa"
                  >
                    <Maximize2 size={13} />
                    <span className="text-[11px]">Ver Completo</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Quick tips */}
            <div className="bg-slate-900/40 p-4 border border-slate-850 rounded-2xl flex items-start gap-3">
              <AlertCircle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-white mb-0.5">💡 ¿Cómo funciona el logo original de CRL?</p>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Hemos recreado meticulosamente tu logotipo corporativo en formato **SVG vectorial con textos orbitales nativos**. Esto significa que se ve de manera perfecta y sin pixelarse, sin importar el tamaño del navegador o celular desde el que tus clientes te contacten.
                </p>
              </div>
            </div>

          </div>

          {/* Lado Derecho: Controles de Configuración (5/12) */}
          <div className="lg:col-span-5">
            <Controls 
              config={config} 
              onChange={handleConfigChange} 
              onReset={handleReset}
              triggerMockFinish={restartSimulation}
            />
          </div>

        </div>

        {/* 4. CODE EXPORTER SECTION */}
        <CodeExporter config={config} />

        {/* 5. MANUAL GUIDE SECTION */}
        <TechGuide />

      </main>

      {/* 4. FULLSCREEN OVERLAY MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* ESC floating banner */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-white/50 bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/15 backdrop-blur-md">
                PULSA [ESC] PARA VOLVER AL EDITOR
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-xl border border-white/10 hover:border-white/20 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Simulated fullscreen payload loader */}
            <PreviewCanvas config={config} previewMode={false} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-6 mt-12 text-xs text-slate-500 text-center font-mono">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <p>© 2026 Electricidad Paine. Todos los derechos reservados.</p>
          <p className="text-[11px] opacity-70">
            Diseñado especialmente para la pyme de instalaciones eléctricas CRL. Hecho con ❤️ para Paine, Buin y toda la Región Metropolitana de Chile.
          </p>
        </div>
      </footer>

    </div>
  );
}
