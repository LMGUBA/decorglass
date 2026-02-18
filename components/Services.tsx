import React from 'react';
import { ArrowRight, CheckCircle, TreePine, Mountain, PanelTop, Construction } from 'lucide-react';
import { AppView } from '../types';

interface ServicesProps {
  onNavigate: (view: AppView) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const serviceCategories = [
    {
      category: 'Madera',
      icon: TreePine,
      color: 'from-[#2D6A4F] to-[#4CAF7D]',
      services: [
        {
          title: 'Melamine',
          description: 'Mobiliario a medida para cocina, dormitorio, oficina y comercio. Closets, reposteros y escritorios personalizados.',
          image: '/images/services/melamine.png',
          features: ['Alta durabilidad', 'Variedad de colores', 'Acabados modernos']
        },
        {
          title: 'Puertas Talladas',
          description: 'Diseno personalizado con tecnicas artesanales. Trabajamos con maderas selectas para interiores y exteriores.',
          image: '/images/services/puertas-talladas.png',
          features: ['Disenos unicos', 'Madera selecta', 'Acabados finos']
        },
        {
          title: 'Puertas Contraplacadas',
          description: 'Fabricacion a medida con acabados premium. Soluciones funcionales y esteticas para cada espacio.',
          image: '/images/services/puertas-talladas.png',
          features: ['Medidas exactas', 'Materiales premium', 'Instalacion profesional']
        }
      ]
    },
    {
      category: 'Piedra Natural',
      icon: Mountain,
      color: 'from-[#4A5568] to-[#718096]',
      services: [
        {
          title: 'Granito',
          description: 'Superficies elegantes y resistentes para cocinas y banos. Instalacion precisa con piedra natural de primera calidad.',
          image: '/images/services/granito.png',
          features: ['Alta resistencia', 'Facil mantenimiento', 'Elegancia natural']
        },
        {
          title: 'Marmol',
          description: 'Acabados lujosos con vetas unicas. Ideal para countertops, mesas y revestimientos exclusivos.',
          image: '/images/services/marmol.png',
          features: ['Lujo atemporal', 'Vetas unicas', 'Acabado pulido']
        },
        {
          title: 'Cuarzo',
          description: 'Superficies no porosas de alta tecnologia. Resistente a manchas y bacterias, ideal para cocinas modernas.',
          image: '/images/services/cuarzo.png',
          features: ['No poroso', 'Antibacteriano', 'Colores uniformes']
        }
      ]
    },
    {
      category: 'Vidrio y Metal',
      icon: PanelTop,
      color: 'from-[#2D8A5E] to-[#1F5E3B]',
      services: [
        {
          title: 'Vidrios',
          description: 'Soluciones en vidrio templado, espejos y divisiones. Acabados de seguridad y diseno contemporaneo.',
          image: '/images/services/remodelaciones.png',
          features: ['Vidrio templado', 'Espejos', 'Divisiones']
        },
        {
          title: 'Aluminios',
          description: 'Ventanas, puertas y estructuras en aluminio. Perfiles de alta calidad con acabados duraderos.',
          image: '/images/services/remodelaciones.png',
          features: ['Perfiles premium', 'Corrosion resistente', 'Diseno moderno']
        },
        {
          title: 'Barandas y Pasamanos en Acero',
          description: 'Estructuras seguras con diseno moderno para escaleras, balcones y terrazas. Acero inoxidable con acabados premium.',
          image: '/images/services/barandas-acero.png',
          features: ['Acero inoxidable', 'Diseno minimalista', 'Alta seguridad']
        }
      ]
    },
    {
      category: 'Remodelaciones',
      icon: Construction,
      color: 'from-[#1F5E3B] to-[#4CAF7D]',
      services: [
        {
          title: 'Remodelaciones Integrales',
          description: 'Renovamos tus espacios de forma completa con planificacion, ejecucion y entrega profesional. Transformamos tu hogar o negocio.',
          image: '/images/services/remodelaciones.png',
          features: ['Planificacion completa', 'Gestion profesional', 'Entrega garantizada']
        },
        {
          title: 'Puertas Levadizas',
          description: 'Soluciones funcionales y seguras para garajes y accesos vehiculares con sistemas automaticos modernos.',
          image: '/images/services/puertas-levadizas.png',
          features: ['Automatizacion', 'Alta seguridad', 'Motores premium']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 dark-section overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-[#7BC5A3] text-sm font-semibold mb-6 animate-fade-in border border-white/10 uppercase tracking-wider">
            Servicios Profesionales
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in stagger-1">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in stagger-2">
            Disenamos, fabricamos e instalamos proyectos completos para hogar y empresa con acabados premium y atencion personalizada.
          </p>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, catIndex) => (
        <section
          key={catIndex}
          className={`py-16 lg:py-20 ${catIndex % 2 === 0 ? 'bg-[#F7FAF8]' : 'bg-[#EEF5F1]'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="section-title text-2xl sm:text-3xl">{category.category}</h2>
                <p className="text-[#5A5A5E]">{category.services.length} servicios disponibles</p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service, servIndex) => (
                <div
                  key={servIndex}
                  className="service-card group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E3A27]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1C1C1E] mb-3 group-hover:text-[#1F5E3B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#5A5A5E] text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, featIndex) => (
                        <div key={featIndex} className="flex items-center gap-2 text-sm text-[#5A5A5E]">
                          <CheckCircle className="w-4 h-4 text-[#4CAF7D]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="https://wa.me/51926023088?text=Hola,%20me%20interesa%20el%20servicio%20de%20"
                      className="inline-flex items-center gap-2 text-[#1F5E3B] font-semibold text-sm group-hover:gap-3 transition-all group-hover:text-[#4CAF7D]"
                    >
                      Solicitar informacion
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 lg:py-20 dark-section relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tienes un proyecto en mente?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Cuentanos tu idea y te ayudamos a hacerla realidad con los mejores materiales y acabados.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4CAF7D] hover:bg-[#1F5E3B] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Solicitar Cotizacion
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => onNavigate(AppView.CATALOG)}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-[#4CAF7D]/50 transition-all"
            >
              Ver Portafolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
