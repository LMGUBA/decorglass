import React from 'react';
import { ArrowRight, Play, CheckCircle, Award, Users, Clock, Construction, Home as HomeIcon, ChevronRight, Sparkles, TreePine, DoorOpen, Mountain, Gem, PanelTop, Wrench } from 'lucide-react';
import { HeroTitle } from './HeroTitle';
import { AppView } from '../types';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const services = [
    { icon: TreePine, title: 'Melamine', category: 'Madera' },
    { icon: DoorOpen, title: 'Puertas Talladas', category: 'Madera' },
    { icon: Mountain, title: 'Granito', category: 'Piedra' },
    { icon: Gem, title: 'Mármol & Cuarzo', category: 'Piedra' },
    { icon: PanelTop, title: 'Vidrios', category: 'Vidrio' },
    { icon: Wrench, title: 'Aluminios', category: 'Metal' },
    { icon: Construction, title: 'Barandas en Acero', category: 'Metal' },
    { icon: HomeIcon, title: 'Remodelaciones', category: 'Integral' },
  ];

  const whyChooseUs = [
    { icon: Award, title: 'Materiales Premium', description: 'Solo materiales certificados de primera calidad' },
    { icon: CheckCircle, title: 'Precisión Milimétrica', description: 'Cada detalle importa en nuestro trabajo' },
    { icon: Users, title: 'Diseño a Medida', description: 'Soluciones únicas para cada espacio' },
    { icon: Clock, title: '+15 Años de Experiencia', description: 'Trayectoria comprobada en el mercado' },
  ];

  return (
    <div className="overflow-hidden">

      {/* ═══════════════════════════════════════════
          HERO SECTION — Premium Editorial Layout
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-[#FAFBF9]">

        {/* Background Layer — Geometric Mesh Pattern */}
        <div className="absolute inset-0 z-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(31,94,59,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31,94,59,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>

          {/* Radial glow accents */}
          <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#1F5E3B]/[0.04] blur-[120px]"></div>
          <div className="absolute bottom-[-30%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#7BC5A3]/[0.06] blur-[100px]"></div>

          {/* Diagonal decorative line */}
          <div className="absolute top-0 right-[40%] w-px h-full bg-gradient-to-b from-transparent via-[#1F5E3B]/10 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-12">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center">

            {/* ─── Left Column ─── */}
            <div className="animate-fade-in">
              {/* Badge — Pill with dot indicator */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1F5E3B]/[0.06] border border-[#1F5E3B]/[0.1] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F5E3B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F5E3B]"></span>
                </span>
                <span className="text-xs font-bold text-[#1F5E3B] tracking-[0.2em] uppercase">
                  Diseños & Proyectos
                </span>
              </div>

              {/* Heading — Editorial Style */}
              {/* Heading — Editorial Style with Typewriter Effect */}
              <div className="animate-fade-in stagger-1">
                <HeroTitle />
              </div>

              {/* Subtitle — Refined */}
              <p className="text-[1.05rem] text-[#6B7280] mb-10 leading-[1.75] max-w-[440px] animate-fade-in stagger-2">
                Especialistas en <span className="text-[#111] font-semibold">vidrio, madera, piedra</span> y remodelaciones
                integrales. Cada proyecto es una obra maestra de
                precisión y diseño.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3.5 mb-14 animate-fade-in stagger-3">
                <a
                  href="https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-7 py-[14px] rounded-full font-semibold text-[15px] text-white flex items-center gap-2.5 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(31,94,59,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #1F5E3B 0%, #2D8A5E 100%)' }}
                >
                  <span className="relative z-10">Solicitar Cotización</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0E3A27] to-[#1F5E3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>

                <button
                  onClick={() => onNavigate(AppView.CATALOG)}
                  className="group px-7 py-[14px] rounded-full font-semibold text-[15px] text-[#1C1C1E] border border-[#D1D5DB] hover:border-[#1F5E3B]/30 hover:bg-[#1F5E3B]/[0.03] transition-all duration-300 flex items-center gap-2.5"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1F5E3B]/10 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-[#1F5E3B] text-[#1F5E3B] ml-0.5" />
                  </div>
                  Ver Proyectos
                </button>
              </div>

              {/* Social Proof — Refined */}
              <div className="flex items-center gap-5 animate-fade-in stagger-4">
                <div className="flex -space-x-2.5">
                  {[
                    'from-[#1F5E3B] to-[#2D8A5E]',
                    'from-[#2D8A5E] to-[#4CAF7D]',
                    'from-[#0E3A27] to-[#1F5E3B]',
                  ].map((gradient, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border-[2.5px] border-[#FAFBF9] flex items-center justify-center shadow-sm`}>
                      <span className="text-white text-[10px] font-bold">
                        {['DG', 'JR', 'ML'][i]}
                      </span>
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full bg-white border-[2.5px] border-[#FAFBF9] flex items-center justify-center shadow-sm text-[10px] font-bold text-[#1F5E3B]">
                    +
                  </div>
                </div>
                <div className="border-l border-gray-200 pl-5">
                  <p className="text-sm font-bold text-[#111] leading-tight">+500 clientes</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">confían en nosotros</p>
                </div>
              </div>
            </div>

            {/* ─── Right Column — Image Composition ─── */}
            <div className="relative animate-fade-in stagger-2 hidden lg:block">

              {/* Decorative ring behind image */}
              <div className="absolute -top-8 -right-8 w-[110%] h-[110%] border border-[#1F5E3B]/[0.06] rounded-[2rem] rotate-3 z-0"></div>
              <div className="absolute -top-4 -right-4 w-[105%] h-[105%] border border-[#1F5E3B]/[0.04] rounded-[2rem] -rotate-1 z-0"></div>

              {/* Main Image Container */}
              <div className="relative z-10 rounded-[1.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-white/60">
                <img
                  src="/images/services/remodelaciones.png"
                  alt="Interior moderno"
                  className="w-full h-[540px] object-cover"
                />

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0E3A27]/70 via-[#0E3A27]/20 to-transparent"></div>

                {/* Project Highlight Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/[0.92] backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-[#1F5E3B] tracking-[0.15em] uppercase mb-0.5">Proyecto Destacado</p>
                      <p className="text-[15px] font-bold text-[#111]">Remodelación Integral</p>
                      <p className="text-[12px] text-[#6B7280] mt-0.5">Cocina moderna con acabados premium</p>
                    </div>
                    <button
                      onClick={() => onNavigate(AppView.CATALOG)}
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1F5E3B] flex items-center justify-center hover:bg-[#0E3A27] transition-colors mt-1"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Stat — 15+ años */}
              <div className="absolute top-6 -left-10 z-20 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 pr-6 animate-float border border-gray-50 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#4CAF7D] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[17px] font-extrabold text-[#111] leading-none">15+ años</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-1">de experiencia</p>
                </div>
              </div>

              {/* Floating Stat — 100% Satisfacción */}
              <div className="absolute top-[45%] -right-8 z-20 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 pr-6 animate-float border border-gray-50 flex items-center gap-3" style={{ animationDelay: '1.2s' }}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#7BC5A3] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[17px] font-extrabold text-[#111] leading-none">100%</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-1">Satisfacción</p>
                </div>
              </div>

              {/* Small decorative dot pattern */}
              <div className="absolute -bottom-6 -left-6 z-0 grid grid-cols-4 gap-2.5 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1F5E3B]"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7FAF8] to-transparent z-10"></div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES SECTION — Refined Grid
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F7FAF8] relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1F5E3B 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F5E3B]/[0.06] border border-[#1F5E3B]/[0.1] text-xs font-bold text-[#1F5E3B] tracking-[0.15em] uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Nuestros Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111] mb-4 tracking-tight">
              Soluciones para cada <span className="gradient-text">espacio</span>
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto leading-relaxed">
              Transformamos tu hogar o negocio con acabados de primera calidad.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-400 hover:-translate-y-2 border border-gray-100 hover:border-[#1F5E3B]/15 hover:shadow-[0_15px_40px_rgba(31,94,59,0.08)]"
                onClick={() => onNavigate(AppView.SERVICES)}
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] flex items-center justify-center shadow-[0_4px_12px_rgba(31,94,59,0.2)] group-hover:shadow-[0_6px_20px_rgba(31,94,59,0.3)] group-hover:scale-105 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[15px] text-[#111] mb-1 group-hover:text-[#1F5E3B] transition-colors">{service.title}</h3>
                <span className="text-[12px] text-[#9CA3AF] font-medium uppercase tracking-wider">{service.category}</span>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#1F5E3B]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ChevronRight className="w-3 h-3 text-[#1F5E3B]" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate(AppView.SERVICES)}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14px] text-[#1F5E3B] border border-[#1F5E3B]/20 hover:bg-[#1F5E3B] hover:text-white hover:border-[#1F5E3B] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(31,94,59,0.2)]"
            >
              Ver Todos los Servicios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY CHOOSE US — Asymmetric Layout
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1F5E3B]/[0.02] blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#7BC5A3]/[0.03] blur-[60px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F5E3B]/[0.06] border border-[#1F5E3B]/[0.1] text-xs font-bold text-[#1F5E3B] tracking-[0.15em] uppercase mb-6">
                Por qué elegirnos
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111] mb-6 tracking-tight leading-tight">
                Excelencia en cada{' '}
                <span className="gradient-text">detalle</span>
              </h2>
              <p className="text-[#6B7280] text-lg mb-10 leading-relaxed max-w-lg">
                Combinamos experiencia artesanal con tecnología moderna para crear espacios únicos que superan expectativas.
              </p>

              <div className="space-y-5">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="group flex gap-4 p-4 -ml-4 rounded-xl hover:bg-[#F7FAF8] transition-all duration-300 cursor-default">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] flex items-center justify-center shadow-[0_4px_12px_rgba(31,94,59,0.15)] group-hover:shadow-[0_6px_20px_rgba(31,94,59,0.25)] group-hover:scale-105 transition-all duration-300">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-[#111] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#6B7280]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 border border-[#1F5E3B]/[0.08] rounded-[2rem] z-0"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.1)] z-10">
                <img
                  src="/images/services/granito-marmol.png"
                  alt="Trabajo de calidad"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0E3A27]/80 to-transparent">
                  <p className="text-white font-bold text-lg">Acabados Premium</p>
                  <p className="text-white/70 text-sm">Cuarzo, mármol y granito de primera calidad</p>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-5 animate-float border border-gray-50 z-20">
                <div className="text-3xl font-extrabold gradient-text leading-none">15+</div>
                <div className="text-[11px] text-[#9CA3AF] mt-1 font-medium">Años de experiencia</div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-5 animate-float border border-gray-50 z-20" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-extrabold gradient-text leading-none">500+</div>
                <div className="text-[11px] text-[#9CA3AF] mt-1 font-medium">Proyectos realizados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTFOLIO PREVIEW — Refined Grid
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F7FAF8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F5E3B]/[0.06] border border-[#1F5E3B]/[0.1] text-xs font-bold text-[#1F5E3B] tracking-[0.15em] uppercase mb-5">
              Portafolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#111] mb-4 tracking-tight">
              Trabajos <span className="gradient-text">destacados</span>
            </h2>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto leading-relaxed">
              Proyectos con acabados modernos y materiales de alta calidad.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: '/images/services/melamine.png', title: 'Melamine' },
              { img: '/images/services/puertas-talladas.png', title: 'Puertas' },
              { img: '/images/services/remodelaciones.png', title: 'Remodelaciones' },
              { img: '/images/services/granito-marmol.png', title: 'Granito' },
              { img: '/images/services/barandas-acero.png', title: 'Barandas' },
              { img: '/images/services/puertas-levadizas.png', title: 'Puertas Levadizas' },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square border border-gray-100"
                onClick={() => onNavigate(AppView.CATALOG)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E3A27]/80 via-[#0E3A27]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Ver proyecto</p>
                  <p className="text-white font-bold text-lg flex items-center gap-2">
                    {item.title}
                    <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate(AppView.CATALOG)}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-[15px] text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(31,94,59,0.3)]"
              style={{ background: 'linear-gradient(135deg, #1F5E3B 0%, #2D8A5E 100%)' }}
            >
              Ver Portafolio Completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
