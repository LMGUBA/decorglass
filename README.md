# 🪟 DecorGlass - Diseños & Proyectos

Aplicación web para **DecorGlass**, empresa especializada en diseños y proyectos en vidrio y aluminio. Permite visualizar el catálogo de productos, generar proformas de venta y pedido, y enviarlas directamente por WhatsApp.

## ✨ Características

- 📦 **Catálogo de productos** con carrusel interactivo
- 💰 **Proforma de Venta** con cálculo automático de IGV
- 📋 **Proforma de Pedido** con detalles técnicos (medidas, colores, herrajes)
- 📲 **Envío por WhatsApp** en texto formateado (legible sin archivos adjuntos)
- 📥 **Descarga de PDF** para respaldo documental
- 🤖 **Integración con Gemini AI** para asistencia inteligente
- 📱 **Diseño responsive** optimizado para móvil y escritorio

## 🛠️ Tecnologías

- **React 19** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS v4**
- **jsPDF** para generación de documentos
- **Lucide Icons**
- **Google Gemini AI**

## 🚀 Instalación local

### Prerrequisitos
- Node.js 18+
- npm

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/decorglass.git
   cd decorglass
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   Editar `.env` y agregar tu clave de API de Gemini:
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

4. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

## 📦 Build de producción

```bash
npm run build
```

Los archivos se generan en la carpeta `dist/`.

## 🌐 Deploy en Vercel

1. Sube el repositorio a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Configura la variable de entorno `GEMINI_API_KEY` en el panel de Vercel
4. Vercel detecta automáticamente Vite y hace el deploy

## 📁 Estructura del proyecto

```
decorglass/
├── components/          # Componentes React
│   ├── CotizarVentaModal.tsx
│   ├── CotizarPedidoModal.tsx
│   ├── ProductCard.tsx
│   ├── ProductCarousel.tsx
│   ├── ProductDetail.tsx
│   ├── ServiceCarousel.tsx
│   ├── Navbar.tsx
│   └── Logo.tsx
├── services/            # Servicios externos
│   └── geminiService.ts
├── utils/               # Utilidades
│   └── imageUtils.ts
├── public/              # Archivos estáticos
│   └── images/
├── App.tsx              # Componente raíz
├── index.tsx            # Punto de entrada
├── index.css            # Estilos globales
├── constants.ts         # Constantes del catálogo
├── types.ts             # Tipos TypeScript
├── vite.config.ts       # Configuración de Vite
└── index.html           # HTML principal
```

## 📄 Licencia

Proyecto privado de **DecorGlass - Diseños & Proyectos**. Todos los derechos reservados.
