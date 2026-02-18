import React from 'react';
import { Award, Target, Heart, Zap, Pencil, Hammer, WrenchIcon, MessageCircle } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    { icon: Award, title: 'Calidad', description: 'Utilizamos solo materiales certificados y técnicas de primera línea.' },
    { icon: Target, title: 'Precisión', description: 'Cada detalle es importante. Medimos y fabricamos con exactitud milimétrica.' },
    { icon: Heart, title: 'Pasión', description: 'Amamos lo que hacemos y eso se refleja en cada proyecto terminado.' },
    { icon: Zap, title: 'Innovación', description: 'Nos mantenemos actualizados con las últimas tendencias y tecnologías.' },
  ];

  const milestones = [
    { year: '2009', title: 'Fundación', description: 'Inicio de operaciones en Huancayo' },
    { year: '2013', title: 'Expansión', description: 'Incorporación de servicios en piedra natural' },
    { year: '2018', title: 'Consolidación', description: 'Más de 200 proyectos completados' },
    { year: '2024', title: 'Actualidad', description: '+500 proyectos y clientes satisfechos' },
  ];

  const team = [
    { name: 'Equipo de Diseño', role: 'Arquitectos y Diseñadores', icon: Pencil },
    { name: 'Taller de Producción', role: 'Carpinteros y Fabricantes', icon: Hammer },
    { name: 'Equipo de Instalación', role: 'Técnicos Especializados', icon: WrenchIcon },
    { name: 'Atención al Cliente', role: 'Asesores Comerciales', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0E3A27 0%, #1F5E3B 50%, #174D30 100%)' }}>
        <div className="absolute inset-0 hero-pattern opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-[#7BC5A3] text-sm font-semibold mb-6 animate-fade-in border border-white/10 uppercase tracking-wider">
            Conócenos
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in stagger-1">
            Sobre <span className="text-[#7BC5A3]">Nosotros</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in stagger-2">
            +15 años transformando espacios con pasión, calidad y compromiso.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-[#F7FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full badge-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                Nuestra Historia
              </span>
              <h2 className="section-title text-3xl sm:text-4xl mb-6">
                De un sueño a <span className="gradient-text">500+ proyectos</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">DecorGlass Diseños & Proyectos</strong> nació en 2009 con una visión clara:
                  transformar espacios hogareños y comerciales en obras de arte funcional.
                </p>
                <p>
                  Comenzamos como un pequeño taller de carpintería en Huancayo, y gracias a la confianza
                  de nuestros clientes y nuestra dedicación incansable, hoy somos referentes en
                  <strong className="text-gray-900"> melamine, granito, mármol, cuarzo, vidrios y aluminios</strong>.
                </p>
                <p>
                  Nuestra filosofía es simple: <em>calidad sin compromisos</em>. Cada proyecto recibe
                  la misma atención al detalle, ya sea una pequeña cocina o una remodelación integral completa.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-gray-100">
                <div>
                  <div className="text-4xl font-bold gradient-text">15+</div>
                  <div className="text-gray-500 text-sm">Años de experiencia</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text">500+</div>
                  <div className="text-gray-500 text-sm">Proyectos completados</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-text">100%</div>
                  <div className="text-gray-500 text-sm">Satisfacción</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/services/remodelaciones.png"
                  alt="Nuestro trabajo"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">Desde 2009</div>
                <div className="text-white/75 text-sm">Transformando espacios</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-[#EEF5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full badge-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Nuestros Valores
            </span>
            <h2 className="section-title text-3xl sm:text-4xl mb-4">
              Lo que nos <span className="gradient-text">define</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Principios que guían cada proyecto y cada relación con nuestros clientes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-shadow border border-[#EEF5F1]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1F5E3B] via-[#2D8A5E] to-[#4CAF7D] flex items-center justify-center mx-auto mb-6 shadow-md">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1E] mb-3">{value.title}</h3>
                <p className="text-[#5A5A5E] text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-[#F7FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full badge-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Trayectoria
            </span>
            <h2 className="section-title text-3xl sm:text-4xl mb-4">
              Nuestro <span className="gradient-text">camino</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#1F5E3B] via-[#2D8A5E] to-[#4CAF7D] rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg inline-block border border-[#EEF5F1]">
                      <span className="text-4xl font-bold gradient-text">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-[#1C1C1E] mt-2">{milestone.title}</h3>
                      <p className="text-[#5A5A5E] mt-1">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="w-6 h-6 bg-gradient-to-br from-[#1F5E3B] to-[#4CAF7D] rounded-full border-4 border-white shadow-lg z-10"></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-[#EEF5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full badge-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Nuestro Equipo
            </span>
            <h2 className="section-title text-3xl sm:text-4xl mb-4">
              Profesionales <span className="gradient-text">comprometidos</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Un equipo multidisciplinario dedicado a hacer realidad tu visión.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all card-hover border border-[#EEF5F1]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1F5E3B] via-[#2D8A5E] to-[#4CAF7D] flex items-center justify-center mx-auto mb-4 shadow-md">
                  <member.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-1">{member.name}</h3>
                <p className="text-[#5A5A5E] text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
