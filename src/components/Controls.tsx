import React, { useRef, useState } from 'react';
import { LoadingConfig, ACCENT_COLORS, AccentColor, LoadingStyle, AnimationSpeed, BackgroundStyle } from '../types';
import { 
  Zap, 
  RotateCw, 
  Eye, 
  Upload, 
  Trash2, 
  Activity, 
  Gauge, 
  Settings2, 
  Info,
  Sliders,
  Sparkles,
  HelpCircle,
  Clock,
  Volume2,
  VolumeX,
  Layers
} from 'lucide-react';

interface ControlsProps {
  config: LoadingConfig;
  onChange: (newConfig: LoadingConfig) => void;
  onReset: () => void;
  triggerMockFinish: () => void;
}

export default function Controls({ config, onChange, onReset, triggerMockFinish }: ControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Helper updates
  const setField = (field: keyof LoadingConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  // Image upload handling
  const handleLogoUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({
        ...config,
        logoSrc: e.target?.result as string,
        logoName: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoUpload(e.target.files[0]);
    }
  };

  const clearUploadedLogo = () => {
    onChange({
      ...config,
      logoSrc: null,
      logoName: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const activeColor = ACCENT_COLORS[config.accentColor];

  return (
    <div id="builder-controls-panel" className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-6 shadow-xl h-full flex flex-col gap-6 overflow-y-auto">
      
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-500 animate-pulse">
            <Settings2 size={18} />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white">Configuración</h2>
            <p className="text-xs text-slate-400">Personaliza la animación y estilo</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono px-2.5 py-1.5 rounded-md border border-slate-700 transition"
        >
          Restablecer
        </button>
      </div>

      {/* 1. SELECT DEL ESTILO DE PANTALLA DE CARGA */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles size={13} className="text-yellow-500" />
          Estilo de Animación Dinámica
        </label>
        
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: 'high-voltage', title: '⚡ Voltaje Relámpago', desc: 'Oscilaciones energéticas rápidas' },
            { id: 'circular-pulse', title: '⭕ Carga Cuadrante', desc: 'Pulso electromagnético radial' },
            { id: 'digital-pulse', title: '📊 Test Avanzado', desc: 'Diagnóstico técnico secuencial' },
            { id: 'minimal-glow', title: '✨ Brillo Elíptico', desc: 'Transición flotante elegante' },
          ] as const).map((styleOpt) => (
            <button
              key={styleOpt.id}
              onClick={() => setField('style', styleOpt.id)}
              className={`p-3 rounded-xl text-left border transition relative overflow-hidden group flex flex-col justify-between h-20 ${config.style === styleOpt.id ? 'bg-slate-800/80 border-yellow-500 text-white shadow-md' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'}`}
            >
              <div className="absolute top-1 right-2 opacity-5 font-mono text-4xl font-extrabold select-none select-none group-hover:scale-110 transition duration-300">
                {styleOpt.id[0]}
              </div>
              <span className="font-bold text-xs tracking-tight block text-ellipsis overflow-hidden whitespace-nowrap">
                {styleOpt.title}
              </span>
              <span className="text-[10px] text-slate-400 leading-tight">
                {styleOpt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. REBOBINADO DE LOGO PERSONALIZADO O ORIGINAL */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Upload size={13} className="text-yellow-500" />
          Imagen del Logo (Opcional)
        </label>

        {config.logoSrc ? (
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={config.logoSrc} 
                alt="Logo personalizado" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-contain rounded bg-white/5 p-1 border border-slate-800 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate max-w-[130px]">
                  {config.logoName || 'Imagen cargada'}
                </p>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                  Logo Activo
                </span>
              </div>
            </div>
            <button 
              onClick={clearUploadedLogo}
              className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition"
              title="Quitar logo personalizado y usar SVG original de CRL"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ) : (
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${dragActive ? 'bg-slate-800/40 border-yellow-500' : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'}`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <Upload size={22} className="mx-auto text-slate-500 mb-1.5 group-hover:scale-110 transition duration-300" />
            <p className="text-xs font-semibold text-white">Arrastra tu logo aquí</p>
            <p className="text-[10px] text-slate-400 mt-1">O haz clic para buscar un archivo PNG, JPG o SVG</p>
            <div className="mt-2.5 inline-block text-[9.5px] font-mono px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
              Se adaptará a la animación elegida
            </div>
          </div>
        )}
      </div>

      {/* 3. PALETA DE COLORES ACCENT */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sliders size={13} className="text-yellow-500" />
          Color del Arco Eléctrico
        </label>
        
        <div className="flex flex-wrap gap-2.5">
          {(Object.keys(ACCENT_COLORS) as AccentColor[]).map((colKey) => {
            const col = ACCENT_COLORS[colKey];
            const isSelected = config.accentColor === colKey;
            return (
              <button
                key={colKey}
                onClick={() => setField('accentColor', colKey)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold tracking-wide transition ${isSelected ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'}`}
              >
                <span 
                  className="w-3.5 h-3.5 rounded-full inline-block border border-black/10 shrink-0" 
                  style={{ backgroundColor: col.hex, boxShadow: isSelected ? `0 0 8px ${col.hex}` : '' }}
                />
                <span className="capitalize">{colKey === 'yellow' ? 'Paine Gold' : colKey === 'cyan' ? 'Tensión Plasma' : colKey}</span>
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow-500 border border-slate-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. SELECCIÓN DE FONDO */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers size={13} className="text-yellow-500" />
          Ambiente de Fondo (Lienzo)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: 'dark-space', label: 'Slate Oscuro', desc: 'Github Dark' },
            { id: 'light-slate', label: 'Gris Claro', desc: 'Minimal e incisivo' },
            { id: 'electric-navy', label: 'Azul Eléctrico', desc: 'Profundo y técnico' },
            { id: 'industrial-grid', label: 'Malla Industrial', desc: 'Glow en rejilla' },
          ] as const).map((bgOpt) => (
            <button
              key={bgOpt.id}
              onClick={() => setField('backgroundStyle', bgOpt.id)}
              className={`p-2.5 rounded-xl text-left border text-xs transition ${config.backgroundStyle === bgOpt.id ? 'bg-slate-800 border-yellow-500 text-white' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'}`}
            >
              <div className="font-bold mb-0.5">{bgOpt.label}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{bgOpt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. VELOCIDAD Y CONTROLES NUMÉRICOS */}
      <div className="grid grid-cols-2 gap-4">
        {/* Velocidad */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock size={13} className="text-yellow-500" />
            Flujo / Velocidad
          </label>
          <select
            value={config.speed}
            onChange={(e) => setField('speed', e.target.value as AnimationSpeed)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-yellow-500 transition cursor-pointer"
          >
            <option value="slow">Lento (Frecuencia Baja)</option>
            <option value="medium">Normal (50 Hz)</option>
            <option value="fast">Rápido (Alta Tensión)</option>
            <option value="turbo">¡Turbo! (Sobrecarga de Red)</option>
          </select>
        </div>

        {/* Modo de Progreso */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Gauge size={13} className="text-yellow-500" />
            Lectura Técnica
          </label>
          <select
            value={config.progressMode}
            onChange={(e) => setField('progressMode', e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-yellow-500 transition cursor-pointer"
          >
            <option value="infinite">Bucle Infinito</option>
            <option value="percentage">Porcentaje (0 - 100%)</option>
            <option value="voltage">Voltímetro Eléctrico (0-220V)</option>
          </select>
        </div>
      </div>

      {/* 6. SWITCHES EXTRA DE COMPONENTES */}
      <div className="flex flex-col gap-3 bg-slate-950/80 p-4 border border-slate-800/80 rounded-xl">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
          <Activity size={13} className="text-yellow-500 shrink-0" />
          Componentes Internos del Logo
        </label>

        <div className="flex flex-col gap-2.5">
          {/* Herramientas Radiales - Ocultar para logos limpios */}
          {!config.logoSrc && (
            <label className="flex items-center gap-2.5 cursor-pointer group text-xs text-slate-200">
              <input
                type="checkbox"
                checked={config.showTools}
                onChange={(e) => setField('showTools', e.target.checked)}
                className="w-4 h-4 text-yellow-500 bg-slate-900 border-slate-800 rounded focus:ring-yellow-500 accent-yellow-500 shrink-0"
              />
              <span className="font-semibold group-hover:text-white transition">Mostrar herramientas radiales</span>
            </label>
          )}

          {/* Giro de Órbita de Puntos */}
          <label className="flex items-center gap-2.5 cursor-pointer group text-xs text-slate-200">
            <input
              type="checkbox"
              checked={config.spinningOuterCircle}
              onChange={(e) => setField('spinningOuterCircle', e.target.checked)}
              className="w-4 h-4 text-yellow-500 bg-slate-900 border-slate-800 rounded focus:ring-yellow-500 accent-yellow-500 shrink-0"
            />
            <span className="font-semibold group-hover:text-white transition">Estrellas/Chispas orbitantes en giro</span>
          </label>

          {/* Rayos pulsantes */}
          <label className="flex items-center gap-2.5 cursor-pointer group text-xs text-slate-200">
            <input
              type="checkbox"
              checked={config.pulsingLightning}
              onChange={(e) => setField('pulsingLightning', e.target.checked)}
              className="w-4 h-4 text-yellow-500 bg-slate-900 border-slate-800 rounded focus:ring-yellow-500 accent-yellow-500 shrink-0"
            />
            <span className="font-semibold group-hover:text-white transition">Rayos de fase con latido</span>
          </label>

          {/* Nivel de brillo de descarga */}
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-slate-800/80 pt-2.5 text-xs">
            <span className="font-bold text-slate-400">Glow de Descarga:</span>
            <div className="flex bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
              {(['low', 'medium', 'high'] as const).map((strength) => (
                <button
                  key={strength}
                  onClick={() => setField('glowStrength', strength)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded capitalize transition ${config.glowStrength === strength ? 'bg-yellow-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {strength === 'low' ? 'Bajo' : strength === 'medium' ? 'Medio' : 'Fuerte'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800 flex gap-2 leading-relaxed">
        <Info size={14} className="text-yellow-500 shrink-0 mt-0.5" />
        <p>
          Las opciones se reflejan instantáneamente en la pantalla de simulación a la izquierda. Arrastra tu logo corporativo para ver cómo fluye por las fases eléctricas.
        </p>
      </div>

    </div>
  );
}
