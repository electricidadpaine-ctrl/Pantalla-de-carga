import React from 'react';
import { HelpCircle, Layers, CheckCircle2, AlertTriangle, Cpu, Globe } from 'lucide-react';

export default function TechGuide() {
  return (
    <div id="tech-guide-panel" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 mt-4 text-slate-100">
      
      {/* Title */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
        <div className="p-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-lg">
          <HelpCircle size={18} />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-md">Guía de Instalación para www.electricidadpaine.cl</h3>
          <p className="text-xs text-slate-400">Implementación simple paso a paso</p>
        </div>
      </div>

      {/* Grid Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        
        {/* WordPress instructions (the most common in Chile) */}
        <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/10 text-yellow-500 text-[11px] border border-yellow-500/30">1</span>
            <span>Instalación en WordPress</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11.5px]">
            Para agregar la pantalla de carga a tu sitio de WordPress sigue estos pasos rápidos:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-300 text-[11px]">
            <li>Ve a tu escritorio de WordPress.</li>
            <li>Encuentra e instala el plugin gratuito <strong>"Insert Headers and Footers"</strong> (o similar como WPCode).</li>
            <li>Abre el plugin y pega el código HTML/CSS/JS copiado directamente en la casilla que dice <strong>"Scripts en el Body"</strong>. Descarga los cambios.</li>
            <li>Opcional: Si eres desarrollador, puedes insertarlo editando tu archivo <code>header.php</code> justo después de la etiqueta de apertura <code>&lt;body&gt;</code> de tu tema activo.</li>
          </ul>
        </div>

        {/* HTML / Custom site integration */}
        <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/10 text-yellow-500 text-[11px] border border-yellow-500/30">2</span>
            <span>Instalación en Sitio HTML Estático</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11.5px]">
            Si tu web está construida con archivos de código tradicional (HTML / PHP):
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-300 text-[11px]">
            <li>Abre tu archivo principal (comúnmente <code>index.html</code>, <code>header.php</code> o <code>index.php</code>).</li>
            <li>Pega el bloque completo de código copiado justo debajo de la etiqueta de inicio del cuerpo <code>&lt;body&gt;</code>.</li>
            <li>¡Listo! El script de JavaScript se encargará de medir el progreso de carga y ocultarlo con un elegante efecto de desvanecimiento automático continuo.</li>
          </ul>
        </div>

        {/* Custom logo integration */}
        <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/10 text-yellow-500 text-[11px] border border-yellow-500/30">3</span>
            <span>Cómo cambiar tu Logo oficial</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11.5px]">
            Para usar tu propio logo corporativo de alta calidad en la pantalla de carga:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-300 text-[11px]">
            <li>Si prefieres no usar el SVG generado y quieres tu imagen, asegúrate de que el logo tenga formato <strong>PNG transparente</strong>, recortado al ras de los bordes.</li>
            <li>Sube el archivo a la base de datos de medios de WordPress (obteniendo un enlace como <code>https://www.electricidadpaine.cl/wp-content/uploads/mi_logo.png</code>).</li>
            <li>Busca en el código copiado la etiqueta <code>&lt;img src="...</code> y reemplaza la dirección por el enlace de tu imagen.</li>
          </ul>
        </div>

        {/* Fast performance and security class */}
        <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/10 text-yellow-500 text-[11px] border border-yellow-500/30">4</span>
            <span>Optimización y Frecuencia SEC</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11.5px]">
            Para dar la máxima confianza a tus clientes del área eléctrica en Paine:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-300 text-[11px]">
            <li><strong>Carga ultrarrápida:</strong> Al usar CSS nativo, esta pantalla se muestra instantáneamente antes de que carguen las imágenes pesadas de la web, haciendo que parezca que carga al segundo.</li>
            <li><strong>Garantía SEC:</strong> La animación cumple con los más altos estándares de rendimiento, sin saturar la tarjeta gráfica ni consumir RAM innecesaria en smartphones viejos.</li>
          </ul>
        </div>

      </div>

      {/* Warnings & reassurance */}
      <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
          <div className="text-xs">
            <p className="font-semibold text-white">Código 100% Responsivo y Probado</p>
            <p className="text-slate-400">Totalmente optimizado para pantallas retina, tablets, celulares Android e iOS.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 font-mono text-[10px] bg-sky-500/10 border border-sky-500/20 text-sky-400 px-3 py-1.5 rounded-lg shrink-0">
          <Globe size={13} />
          <span>Soporte: Chile Meridional & Paine</span>
        </div>
      </div>

    </div>
  );
}
