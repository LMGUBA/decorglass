import React from 'react';
import { Phone, Mail, MapPin, Send, Clock, Facebook } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBF9]">
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A2E1E 0%, #1F5E3B 50%, #174D30 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#7BC5A3]/[0.08] blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-bold text-[#7BC5A3] tracking-[0.15em] uppercase mb-6">
            Contáctanos
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            ¿Listo para transformar<br />tu espacio?
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Cuéntanos sobre tu proyecto y recibe una cotización personalizada sin compromiso.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT CONTENT
          ═══════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#111] mb-8">Información de contacto</h2>

              <div className="space-y-6">
                {/* Teléfonos */}
                <a href="tel:+51926023088" className="flex items-start gap-4 p-4 rounded-xl bg-[#F7FAF8] hover:bg-[#EEF5F1] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Teléfonos</h3>
                    <p className="text-[#6B7280]">926 023 088</p>
                    <p className="text-[#6B7280]">980 500 326</p>
                  </div>
                </a>

                {/* Correo */}
                <a href="mailto:decorglass2023@gmail.com" className="flex items-start gap-4 p-4 rounded-xl bg-[#F7FAF8] hover:bg-[#EEF5F1] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Correo electrónico</h3>
                    <p className="text-[#6B7280]">decorglass2023@gmail.com</p>
                  </div>
                </a>

                {/* Dirección */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jr.+Antonio+Lobato+N+1037+Huancayo+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#F7FAF8] hover:bg-[#EEF5F1] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Dirección</h3>
                    <p className="text-[#6B7280]">Jr. Antonio Lobato N° 1037</p>
                    <p className="text-[#6B7280]">Esq. con Av. Huancavelica</p>
                    <p className="text-[#6B7280]">El Tambo, Huancayo</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-[#1F5E3B] text-sm font-medium">
                      Ver en Google Maps
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </a>

                {/* Horario */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F7FAF8]">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1F5E3B] to-[#2D8A5E] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] mb-1">Horario de atención</h3>
                    <p className="text-[#6B7280]">Lunes a Sábado: 8:00 - 18:00</p>
                    <p className="text-[#6B7280]">Domingo: Cerrado</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-[#111] mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/DecorGlassDisenosProyectos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                  </a>
                  <a
                    href="https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Map & Form */}
            <div className="space-y-8">
              {/* Google Maps */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#111] mb-6">Ubicación</h2>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                  <div className="relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.7341688853846!2d-75.2073089!3d-12.0634064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e9aa7b7c7c7c7%3A0x7c7c7c7c7c7c7c7c!2sJr.%20Antonio%20Lobato%2C%20Huancayo!5e0!3m2!1ses!2spe!4v1699999999999!5m2!1ses!2spe"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title="Ubicación DecorGlass"
                    />
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Jr.+Antonio+Lobato+N+1037+Huancayo+Peru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
                    >
                      <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 text-[#1F5E3B] font-semibold shadow-lg group-hover:scale-105 transition-transform">
                        <MapPin className="w-5 h-5" />
                        Ver en Google Maps
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-extrabold text-[#111] mb-6">Envíanos un mensaje</h2>
                <form className="space-y-4 bg-[#F7FAF8] rounded-2xl p-6 border border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Nombre completo</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1F5E3B] focus:ring-2 focus:ring-[#1F5E3B]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="Tu número de teléfono"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1F5E3B] focus:ring-2 focus:ring-[#1F5E3B]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1F5E3B] focus:ring-2 focus:ring-[#1F5E3B]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Mensaje</label>
                    <textarea
                      placeholder="Cuéntanos sobre tu proyecto..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1F5E3B] focus:ring-2 focus:ring-[#1F5E3B]/20 outline-none transition-all resize-none"
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-[15px] text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(31,94,59,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #1F5E3B 0%, #2D8A5E 100%)' }}
                  >
                    Enviar Mensaje
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};