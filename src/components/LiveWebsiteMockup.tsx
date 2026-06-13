import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Home, 
  Check, 
  Sparkles,
  Users,
  Briefcase,
  HelpCircle,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

interface LiveWebsiteMockupProps {
  onRestartLoading: () => void;
  accentColorHex: string;
}

const SERVICES_CATALOG = [
  { id: 'te1', name: 'Certificación de Declaración TE1 SEC Chile', desc: 'Trámite oficial para municipalidades y Enel/CGE.', price: 120000, icon: FileText },
  { id: 'fuga', name: 'Detección de Fugas de Corriente y Cortocircuitos', desc: 'Uso de instrumental de precisión en sitio.', price: 45000, icon: Zap },
  { id: 'tablero', name: 'Instalación y Reconstrucción de Tablero Eléctrico', desc: 'Disyuntores y diferencial de protección premium.', price: 95000, icon: ShieldCheck },
  { id: 'empalme', name: 'Trámite y Aumento de Capacidad Eléctrica', desc: 'Gestión técnica y diseño de planos eléctricos.', price: 180000, icon: Home },
];

export default function LiveWebsiteMockup({ onRestartLoading, accentColorHex }: LiveWebsiteMockupProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['te1']);
  const [customerName, setCustomerName] = useState('');
  const [commune, setCommune] = useState('Paine');

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? prev.filter(sId => sId !== id) 
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, id) => {
      const service = SERVICES_CATALOG.find(s => s.id === id);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const getWhatsAppLink = () => {
    const listNames = selectedServices.map(id => SERVICES_CATALOG.find(s => s.id === id)?.name).join(', ');
    const text = `Hola Electricidad Paine, soy ${customerName || 'un cliente'} de ${commune}. Requiero cotización para: ${listNames || 'Servicios Eléctricos'}. Vi su simulador de carga de red.`;
    return `https://wa.me/56912345678?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full text-slate-800 bg-slate-50 rounded-2xl overflow-hidden shadow-2xl relative border border-slate-200">
      
      {/* 1. TOP STATS BAR */}
      <div className="bg-[#2A1B60] text-amber-400 py-1.5 px-4 text-[10px] sm:text-xs font-semibold tracking-wider flex flex-wrap justify-between items-center border-b border-amber-400/20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-amber-400" />
            AUTORIZADO SEC CLASE A - SANTIAGO METROPOLITANO
          </span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline">PAINE • BUIN • CHADA • HOSPITAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-white">
            <Phone size={12} className="text-emerald-400" />
            +56 9 8412 1211
          </span>
          <span className="bg-[#F1C40F]/10 text-white rounded px-1 text-[9px] font-mono">24/7 Fugas</span>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="bg-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#2A1B60] flex items-center justify-center text-[#F1C40F] shadow-md">
            <Zap size={18} className="fill-current" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-[#2A1B60] tracking-widest block leading-tight font-mono">ELECTRICISTA SEC</span>
            <span className="font-extrabold text-sm tracking-tight text-[#2A1B60] uppercase">Electricidad Paine</span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <span className="text-[#2A1B60] border-b-2 border-[#F1C40F] pb-1 cursor-pointer">Inicio</span>
          <span className="hover:text-[#2A1B60] transition cursor-pointer">Servicios</span>
          <span className="hover:text-[#2A1B60] transition cursor-pointer">Certificado TE1</span>
          <span className="hover:text-[#2A1B60] transition cursor-pointer">Cobertura</span>
          <span className="hover:text-[#2A1B60] transition cursor-pointer">Blog</span>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onRestartLoading}
            className="text-[10px] bg-slate-100 hover:bg-amber-400 hover:text-slate-900 text-slate-700 font-bold px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 border border-slate-200"
          >
            <Sparkles size={11} className="text-amber-500 animate-spin" />
            Ver Pantalla Carga
          </button>
          <a
            href="https://www.electricidadpaine.cl"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] bg-[#2A1B60] text-white hover:bg-[#342475] font-bold px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-0.5"
          >
            SITIO REAL <ExternalLink size={10} className="ml-1" />
          </a>
        </div>
      </header>

      {/* 3. HERO UNIT with Brand Colors */}
      <section className="bg-gradient-to-r from-[#2A1B60] to-[#3a2880] text-white py-10 px-5 sm:px-8 relative overflow-hidden">
        {/* Abstract electric wire overlays */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-amber-400 rotate-3 transform" />
          <div className="absolute top-2/4 left-0 w-full h-[2px] bg-amber-400 -rotate-2 transform" />
          <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white rotate-6 transform" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#F1C40F] text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md">
            <Check size={11} className="stroke-[3px]" />
            Sello SEC Certificado de Seguridad Eléctrica
          </span>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-tight mb-3">
            Instalaciones Eléctricas de Alto Suministro en <span className="text-[#F1C40F]">Paine y Alrededores</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-light max-w-xl mx-auto leading-relaxed mb-6">
            Garantizamos la seguridad de tu hogar, local o empresa. Diseñamos tableros de transferencia, declaramos planos en formato TE1 ante el SEC, y corregimos fugas a tierra con certificación express.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-black/25 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
            <div className="text-center p-1 border-r border-white/10">
              <span className="block text-[#F1C40F] text-sm sm:text-base font-black">SEC Clase A</span>
              <span className="text-[9px] text-slate-300 block">Máxima Jerarquía SEC</span>
            </div>
            <div className="text-center p-1 border-r border-white/10">
              <span className="block text-[#F1C40F] text-sm sm:text-base font-black">15+ Años</span>
              <span className="text-[9px] text-slate-300 block">Atención en Paine</span>
            </div>
            <div className="text-center p-1">
              <span className="block text-emerald-400 text-sm sm:text-base font-black">100% OK</span>
              <span className="text-[9px] text-slate-300 block">Proyectos Aprobados</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL INTERACTIVE CALCULATOR (The Premium Experience!) */}
      <section className="p-5 sm:p-7 bg-white max-w-4xl mx-auto my-6 rounded-2xl border border-slate-200 shadow-lg relative">
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-white font-bold font-mono text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          CALCULADOR EXPRESS Activo
        </div>

        <div className="mb-5">
          <h2 className="text-md sm:text-lg font-black text-slate-900 border-l-4 border-[#2A1B60] pl-2.5 uppercase">
            Arma tu Presupuesto Estimado de Suministro
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Selecciona los servicios eléctricos que requieres para tu propiedad y obtén una aproximación del arancel promedio en Paine/Buin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Services left column selection */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Servicios Certificados</span>
            {SERVICES_CATALOG.map((serv) => {
              const representsIcon = serv.icon;
              const isSelected = selectedServices.includes(serv.id);
              return (
                <button
                  key={serv.id}
                  onClick={() => toggleService(serv.id)}
                  className={`p-3 rounded-xl border text-left transition flex items-start gap-3 relative ${isSelected ? 'bg-amber-50/70 border-[#F1C40F] ring-1 ring-[#F1C40F]/30' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'}`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-[#2A1B60] text-amber-300' : 'bg-slate-200 text-slate-600'}`}>
                    <serv.icon size={15} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-800 flex items-center justify-between">
                      <span>{serv.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 pr-4 mt-0.5 leading-tight">{serv.desc}</p>
                    <span className="text-[11px] font-semibold text-[#2A1B60] inline-block mt-1">
                      ${serv.price.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                  <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#2A1B60] border-transparent text-white' : 'border-slate-300'}`}>
                    {isSelected && <Check size={10} className="stroke-[3px]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Form and quote summary right column */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Detalle del Solicitante</span>
              
              <div className="flex flex-col gap-3">
                {/* Name */}
                <div>
                  <label className="text-[10px] bold text-slate-600 block mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Carlos Rivera"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2A1B60] transition"
                  />
                </div>

                {/* Commune */}
                <div>
                  <label className="text-[10px] bold text-slate-600 block mb-1">Comuna / Sector</label>
                  <select 
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 focus:outline-none focus:border-[#2A1B60] transition cursor-pointer"
                  >
                    <option value="Paine Centro">Paine Centro</option>
                    <option value="Chada">Chada</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Buin">Buin</option>
                    <option value="Alto Jahuel">Alto Jahuel</option>
                    <option value="San Miguel">San Miguel de Tango</option>
                    <option value="Santiago Poniente">Santiago Poniente (SEC Express)</option>
                  </select>
                </div>
              </div>

              {/* Price summary box */}
              <div className="mt-5 bg-[#2A1B60]/5 rounded-xl p-3 border border-[#2A1B60]/10 flex flex-col gap-1.5 font-mono text-xs text-slate-700">
                <div className="flex justify-between items-center text-[11px]">
                  <span>Servicios Seleccionados:</span>
                  <span className="font-bold text-slate-900">{selectedServices.length}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-b border-slate-200 pb-1.5">
                  <span>Cargo de Desplazamiento:</span>
                  <span className="text-emerald-600 font-bold">¡GRATIS en Paine!</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-1">
                  <span>TOTAL ESTIMADO:</span>
                  <span className="text-lg text-[#2A1B60] font-black">${calculateTotal().toLocaleString('es-CL')} CLP</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp quote button */}
            <div className="mt-5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-xs shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                <MessageCircle size={16} className="fill-current" />
                Solicitar Cotización por WhatsApp
              </a>
              <span className="text-[10px] text-center text-slate-400 block mt-2">
                Recibe respuesta en menos de 10 minutos con tu código de Suministro SEC
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND SERVICES IN DETAIL */}
      <section className="bg-slate-100/50 py-10 px-5 sm:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-7">
            <h2 className="text-sm sm:text-base font-black text-[#2A1B60] tracking-wider uppercase mb-1">
              Servicios Eléctricos Autorizados SEC Chile
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Realizamos la mantención de tus instalaciones conforme al Reglamento de Seguridad de Instalaciones de Consumo de Energía Eléctrica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1 */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-2 relative group overflow-hidden">
              <div className="w-1.5 h-full bg-[#F1C40F] absolute left-0 top-0" />
              <h3 className="font-black text-xs text-slate-900 uppercase">Aumento de Potencia</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Si tus interruptores termomagnéticos saltan al encender el hervidor o termo, gestionamos el cambio de empalme monofásico a trifásico ante CGE o Enel.
              </p>
            </div>
            {/* Box 2 */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-2 relative group overflow-hidden">
              <div className="w-1.5 h-full bg-[#2A1B60] absolute left-0 top-0" />
              <h3 className="font-black text-xs text-slate-900 uppercase">Tableros de Fuerza SEC</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Reparación y montaje de gabinetes metálicos con diferenciales superinmunizados para garantizar que ninguna fuga represente peligro humano.
              </p>
            </div>
            {/* Box 3 */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-2 relative group overflow-hidden">
              <div className="w-1.5 h-full bg-emerald-500 absolute left-0 top-0" />
              <h3 className="font-black text-xs text-slate-900 uppercase">Mallas de Tierra</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Excavación, adición de compuesto mejorador de conductividad (bentonita) y medición con telurómetro con entrega de protocolo de puesta a tierra SEC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORNER FLOATING WHATSAPP FOR MAX FIDELITY */}
      <div className="absolute bottom-6 right-6 z-10 hidden sm:flex items-center gap-2.5">
        <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xl text-[10px] font-bold text-slate-700 animate-bounce relative">
          ¿En qué puedo ayudarte hoy?
          {/* subtle arrow */}
          <div className="w-2 h-2 bg-white border-r border-b border-slate-200 rotate-45 absolute -right-1 top-2.5" />
        </div>
        <a
          href="https://wa.me/56912345678"
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition duration-300 relative group cursor-pointer"
        >
          <MessageCircle size={22} className="fill-current" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
        </a>
      </div>

    </div>
  );
}
