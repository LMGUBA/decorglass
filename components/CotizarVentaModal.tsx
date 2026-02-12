import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, Download, Send, Plus, Trash2, FileText } from 'lucide-react';
import { Product } from '../types';
import { Logo } from './Logo';
import jsPDF from 'jspdf';

interface CotizarVentaModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

interface ProformaItem {
    id: number;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
}

const EMPRESA_WHATSAPP = '51945092299'; // Número de WhatsApp de la empresa

export const CotizarVentaModal: React.FC<CotizarVentaModalProps> = ({ product, isOpen, onClose }) => {
    const proformaRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    const fechaEmision = today.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const [nombreCliente, setNombreCliente] = useState('');
    const [dniRuc, setDniRuc] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [items, setItems] = useState<ProformaItem[]>([
        { id: 1, descripcion: product.name, cantidad: 1, precioUnitario: product.price }
    ]);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const addItem = () => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([...items, { id: newId, descripcion: '', cantidad: 1, precioUnitario: 0 }]);
    };

    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const updateItem = (id: number, field: keyof ProformaItem, value: string | number) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    const impuestos = subtotal * 0.18; // IGV 18%
    const total = subtotal + impuestos;

    const generatePDF = async (): Promise<jsPDF | null> => {
        setIsGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageW = pdf.internal.pageSize.getWidth(); // ~210
            const margin = 15;
            const contentW = pageW - margin * 2;
            let y = 20;

            // Colores
            const green800: [number, number, number] = [22, 101, 52];
            const slate800: [number, number, number] = [30, 41, 59];
            const slate600: [number, number, number] = [71, 85, 105];
            const slate400: [number, number, number] = [148, 163, 184];
            const greenBg: [number, number, number] = [240, 253, 244];

            // ── HEADER ──
            try {
                const logoUrl = '/images/logo-decorglass.svg';
                const img = new Image();
                img.src = logoUrl;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    // Mantener aspect ratio. Original es ~2560x751 (aprox 3.4:1)
                    // Haremos el canvas suficientemente grande para buena calidad
                    canvas.width = 1000;
                    canvas.height = 1000 * (img.height / img.width);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const logoData = canvas.toDataURL('image/png');

                    // Dimensiones en el PDF (mm)
                    const logoWidthMm = 60;
                    const logoHeightMm = logoWidthMm * (img.height / img.width);

                    pdf.addImage(logoData, 'PNG', margin, y, logoWidthMm, logoHeightMm);

                    // Ajustamos Y para que el título quede alineado o debajo si es necesario
                    // En este caso, pondremos el título a la derecha del logo

                    pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(14);
                    pdf.setTextColor(...slate800);
                    // Alinear título verticalmente con el logo
                    const titleY = y + (logoHeightMm / 2) + 2;
                    pdf.text('PROFORMA DE VENTA', margin + logoWidthMm + 10, titleY);

                    // Avanzamos Y para la siguiente sección
                    // Usamos el maximo entre altura de logo y un minimo
                    y += Math.max(logoHeightMm, 15) + 5;
                } else {
                    throw new Error('Canvas context not available');
                }
            } catch (error) {
                console.warn('Error cargando logo, usando fallback de texto', error);
                // Fallback a texto
                pdf.setFont('times', 'bold');
                pdf.setFontSize(24);
                pdf.setTextColor(...green800);
                pdf.text('DG', margin, y);
                const dgW = pdf.getTextWidth('DG');
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(13);
                pdf.text('DecorGlass.', margin + dgW + 2, y);
                const logoW = dgW + 2 + pdf.getTextWidth('DecorGlass.');

                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(14);
                pdf.setTextColor(...slate800);
                pdf.text('PROFORMA DE VENTA', margin + logoW + 6, y);

                y += 10;
            }

            // Fecha (Ajustada posición Y base inicial que era 20, ahora depende del bloque anterior)
            // Como 'y' ha sido incrementado, la fecha debe dibujarse relativa a la cabecera original
            // pero jsPDF no tiene un cursor automático que retroceda.
            // Reposicionamos la fecha alineada con el top del header (aprox 25mm)
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(...slate600);
            pdf.text(`Fecha de Emisión: ${fechaEmision}`, pageW - margin, 25, { align: 'right' });

            pdf.setDrawColor(...slate400);
            pdf.setLineWidth(0.3);
            pdf.line(margin, y, pageW - margin, y);

            // ── INFO CLIENTE ──
            y += 8;
            const col2X = pageW - margin - 55;

            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(7);
            pdf.setTextColor(...slate600);
            pdf.text('NOMBRE DEL CLIENTE', margin, y);
            pdf.text('DNI / RUC', col2X, y);

            y += 5;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(...slate800);
            pdf.text(nombreCliente || '—', margin, y);
            pdf.text(dniRuc || '—', col2X, y);

            y += 3;
            pdf.setDrawColor(...slate400);
            pdf.line(margin, y, col2X - 5, y);
            pdf.line(col2X, y, pageW - margin, y);

            y += 7;
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(7);
            pdf.setTextColor(...slate600);
            pdf.text('TELÉFONO', margin, y);
            pdf.text('DIRECCIÓN', margin + 55, y);

            y += 5;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(...slate800);
            pdf.text(telefono || '—', margin, y);
            pdf.text(direccion || '—', margin + 55, y);

            y += 3;
            pdf.setDrawColor(...slate400);
            pdf.line(margin, y, margin + 50, y);
            pdf.line(margin + 55, y, pageW - margin, y);

            // ── VALIDEZ ──
            y += 8;
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(...slate800);
            pdf.text('Válido por 10 días', margin, y);

            // ── TABLA ──
            y += 6;
            const tableX = margin;
            const tableW = contentW;
            const colWidths = [12, tableW - 12 - 22 - 28 - 30, 22, 28, 30]; // Ítem, Desc, Cant, P.U., Total
            const colX = [tableX];
            for (let i = 1; i < colWidths.length; i++) {
                colX.push(colX[i - 1] + colWidths[i - 1]);
            }

            const headerH = 10;
            // Header bg
            pdf.setFillColor(241, 245, 249); // slate-100
            pdf.rect(tableX, y, tableW, headerH, 'F');
            // Header borders
            pdf.setDrawColor(...slate400);
            pdf.setLineWidth(0.3);
            pdf.rect(tableX, y, tableW, headerH, 'S');
            // Vertical lines
            for (let i = 1; i < colWidths.length; i++) {
                pdf.line(colX[i], y, colX[i], y + headerH);
            }

            // Header text
            const headers = ['Ítem', 'Descripción del Mueble y Materiales', 'Cant.', 'P. Unit.', 'Total'];
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(8);
            pdf.setTextColor(...slate800);
            headers.forEach((h, i) => {
                const cx = colX[i] + colWidths[i] / 2;
                if (i === 1) {
                    pdf.text(h, colX[i] + 2, y + headerH / 2 + 1);
                } else {
                    pdf.text(h, cx, y + headerH / 2 + 1, { align: 'center' });
                }
            });

            y += headerH;

            // Data rows
            items.forEach((item, idx) => {
                const rowH = 8;
                pdf.setDrawColor(203, 213, 225); // slate-300
                pdf.rect(tableX, y, tableW, rowH, 'S');
                for (let i = 1; i < colWidths.length; i++) {
                    pdf.line(colX[i], y, colX[i], y + rowH);
                }

                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.setTextColor(...slate800);

                // Ítem
                pdf.text(String(idx + 1), colX[0] + colWidths[0] / 2, y + rowH / 2 + 1, { align: 'center' });
                // Descripción
                pdf.text(item.descripcion || '', colX[1] + 2, y + rowH / 2 + 1);
                // Cantidad
                pdf.text(String(item.cantidad), colX[2] + colWidths[2] / 2, y + rowH / 2 + 1, { align: 'center' });
                // Precio Unitario
                pdf.text(`S/.${item.precioUnitario.toFixed(2)}`, colX[3] + colWidths[3] / 2, y + rowH / 2 + 1, { align: 'center' });
                // Total
                pdf.setFont('helvetica', 'bold');
                pdf.text(`S/.${(item.cantidad * item.precioUnitario).toFixed(2)}`, colX[4] + colWidths[4] / 2, y + rowH / 2 + 1, { align: 'center' });

                y += rowH;
            });

            // ── TOTALES ──
            y += 6;
            const totW = 65;
            const totX = pageW - margin - totW;

            // Subtotal
            pdf.setDrawColor(...slate400);
            pdf.rect(totX, y, totW, 8, 'S');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(...slate800);
            pdf.text('Subtotal', totX + 3, y + 5.5);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`S/.${subtotal.toFixed(2)}`, totX + totW - 3, y + 5.5, { align: 'right' });
            y += 8;

            // IGV
            pdf.rect(totX, y, totW, 8, 'S');
            pdf.setFont('helvetica', 'bold');
            pdf.text('IGV (18%)', totX + 3, y + 5.5);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`S/.${impuestos.toFixed(2)}`, totX + totW - 3, y + 5.5, { align: 'right' });
            y += 8;

            // Total
            pdf.setFillColor(...greenBg);
            pdf.rect(totX, y, totW, 9, 'FD');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(...green800);
            pdf.text('TOTAL', totX + 3, y + 6);
            pdf.text(`S/.${total.toFixed(2)}`, totX + totW - 3, y + 6, { align: 'right' });
            y += 15;

            // ── OBSERVACIONES ──
            if (observaciones) {
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(9);
                pdf.setTextColor(...slate800);
                pdf.text('Observaciones:', margin, y);
                y += 5;
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.setTextColor(...slate600);
                const obsLines = pdf.splitTextToSize(observaciones, contentW);
                pdf.text(obsLines, margin, y);
                y += obsLines.length * 4 + 5;
            }

            // ── PIE ──
            y += 5;
            pdf.setDrawColor(...slate400);
            pdf.line(margin, y, pageW - margin, y);
            y += 5;
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(8);
            pdf.setTextColor(...slate400);
            pdf.text('Documento generado por DecorGlass - Diseños & Proyectos', pageW / 2, y, { align: 'center' });

            return pdf;
        } catch (error) {
            console.error('Error generando PDF:', error);
            return null;
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const pdfFileName = `Proforma_Venta_${nombreCliente || 'Cliente'}_${fechaEmision.replace(/\//g, '-')}.pdf`;

    const handleDownloadPDF = async () => {
        const pdf = await generatePDF();
        if (pdf) {
            pdf.save(pdfFileName);
        }
    };

    const generateWhatsAppText = (): string => {
        let text = '';

        // Encabezado
        text += '═══════════════════\n';
        text += '*PROFORMA DE VENTA*\n';
        text += '*DecorGlass - Diseños & Proyectos*\n';
        text += '═══════════════════\n\n';

        // Fecha
        text += `*Fecha de Emisión:* ${fechaEmision}\n`;
        text += `*Válido por:* 10 días\n\n`;

        // Datos del cliente
        text += '*DATOS DEL CLIENTE*\n';
        text += '───────────────────\n';
        text += `• *Nombre:* ${nombreCliente || '—'}\n`;
        text += `• *DNI/RUC:* ${dniRuc || '—'}\n`;
        text += `• *Teléfono:* ${telefono || '—'}\n`;
        text += `• *Dirección:* ${direccion || '—'}\n\n`;

        // Detalle de productos
        text += '*DETALLE DE PRODUCTOS*\n';
        text += '───────────────────\n';
        items.forEach((item, index) => {
            const itemTotal = item.cantidad * item.precioUnitario;
            text += `\n*${index + 1}.* ${item.descripcion || '—'}\n`;
            text += `   • Cantidad: ${item.cantidad}\n`;
            text += `   • Precio Unit.: S/.${item.precioUnitario.toFixed(2)}\n`;
            text += `   • *Total: S/.${itemTotal.toFixed(2)}*\n`;
        });

        // Totales
        text += '\n *RESUMEN DE TOTALES*\n';
        text += '═══════════════════\n';
        text += `   Subtotal:    S/.${subtotal.toFixed(2)}\n`;
        text += `   IGV (18%):   S/.${impuestos.toFixed(2)}\n`;
        text += `   ─────────────────\n`;
        text += `   *TOTAL:      S/.${total.toFixed(2)}*\n`;
        text += '═══════════════════\n';

        // Observaciones
        if (observaciones) {
            text += `\n *OBSERVACIONES:*\n`;
            text += `${observaciones}\n`;
        }

        // Pie
        text += '\n───────────────────\n';
        text += '_Documento generado por DecorGlass_\n';
        text += '_Diseños & Proyectos_';

        return text;
    };

    const sendWhatsAppText = (phoneNumber: string) => {
        const text = generateWhatsAppText();
        const message = encodeURIComponent(text);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handleSendWhatsAppEmpresa = () => {
        sendWhatsAppText(EMPRESA_WHATSAPP);
    };

    const handleSendWhatsAppCliente = () => {
        if (!telefono) {
            alert('Por favor ingrese el número de teléfono del cliente.');
            return;
        }
        const cleanPhone = telefono.replace(/[\s\-\(\)]/g, '');
        const phoneNumber = cleanPhone.startsWith('+') ? cleanPhone.substring(1) : (cleanPhone.startsWith('51') ? cleanPhone : `51${cleanPhone}`);
        sendWhatsAppText(phoneNumber);
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-fade-in">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-gradient-to-r from-green-700 to-green-800 shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        <h2 className="text-base sm:text-xl font-bold text-white">Proforma de Venta</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-3 sm:p-6">
                    {/* ===== PROFORMA PREVIEW ===== */}
                    <div
                        ref={proformaRef}
                        className="bg-white border border-slate-300 rounded-xl p-4 sm:p-8 shadow-sm mx-auto"
                        style={{ fontFamily: 'Arial, sans-serif', maxWidth: '794px', width: '100%' }}
                    >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-2">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                    src="/images/logo-decorglass.svg"
                                    alt="DecorGlass Logo"
                                    className="h-8 sm:h-12 w-auto object-contain"
                                />
                                <span className="text-sm sm:text-lg font-bold text-slate-800">PROFORMA DE VENTA</span>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                    Fecha de Emisión: <span className="text-slate-900">{fechaEmision}</span>
                                </p>
                            </div>
                        </div>

                        {/* Client Info */}
                        <div className="space-y-3 mb-5">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Nombre del Cliente</label>
                                    <input
                                        type="text"
                                        value={nombreCliente}
                                        onChange={(e) => setNombreCliente(e.target.value)}
                                        placeholder="Ingrese nombre completo"
                                        className="w-full border-b-2 border-slate-300 focus:border-green-600 outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="sm:w-48">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">DNI / RUC</label>
                                    <input
                                        type="text"
                                        value={dniRuc}
                                        onChange={(e) => setDniRuc(e.target.value)}
                                        placeholder="Nº documento"
                                        className="w-full border-b-2 border-slate-300 focus:border-green-600 outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <div className="sm:w-48">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Teléfono</label>
                                    <input
                                        type="text"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="Nº teléfono"
                                        className="w-full border-b-2 border-slate-300 focus:border-green-600 outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Dirección</label>
                                    <input
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        placeholder="Dirección del cliente"
                                        className="w-full border-b-2 border-slate-300 focus:border-green-600 outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Validity */}
                        <p className="text-sm font-semibold text-slate-700 mb-4">Válido por 10 días</p>

                        {/* Items Table */}
                        <div className="border border-slate-400 rounded-lg overflow-hidden mb-5">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm" style={{ minWidth: '480px' }}>
                                    <thead>
                                        <tr className="bg-slate-100">
                                            <th className="border-r border-b border-slate-400 px-2 sm:px-3 py-2 text-left font-bold text-slate-700 w-10 sm:w-12">Ítem</th>
                                            <th className="border-r border-b border-slate-400 px-2 sm:px-3 py-2 text-left font-bold text-slate-700">Descripción</th>
                                            <th className="border-r border-b border-slate-400 px-2 sm:px-3 py-2 text-center font-bold text-slate-700 w-16 sm:w-24">Cant.</th>
                                            <th className="border-r border-b border-slate-400 px-2 sm:px-3 py-2 text-center font-bold text-slate-700 w-20 sm:w-28">P. Unit.</th>
                                            <th className="border-b border-slate-400 px-2 sm:px-3 py-2 text-center font-bold text-slate-700 w-20 sm:w-28">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-green-50/50 transition-colors group">
                                                <td className="border-r border-b border-slate-300 px-2 sm:px-3 py-2 text-center text-slate-600 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-2 py-1">
                                                    <input
                                                        type="text"
                                                        value={item.descripcion}
                                                        onChange={(e) => updateItem(item.id, 'descripcion', e.target.value)}
                                                        placeholder="Descripción del producto..."
                                                        className="w-full outline-none py-1 px-1 text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
                                                    />
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-1 py-1">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.cantidad}
                                                        onChange={(e) => updateItem(item.id, 'cantidad', parseInt(e.target.value) || 0)}
                                                        className="w-full outline-none text-center py-1 text-sm text-slate-800 bg-transparent"
                                                    />
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-1 py-1">
                                                    <div className="flex items-center justify-center">
                                                        <span className="text-slate-500 mr-0.5 text-xs">S/.</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={item.precioUnitario}
                                                            onChange={(e) => updateItem(item.id, 'precioUnitario', parseFloat(e.target.value) || 0)}
                                                            className="w-16 sm:w-20 outline-none text-center py-1 text-sm text-slate-800 bg-transparent"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="border-b border-slate-300 px-2 sm:px-3 py-2 text-center font-semibold text-slate-800 relative text-xs sm:text-sm">
                                                    S/.{(item.cantidad * item.precioUnitario).toFixed(2)}
                                                    {items.length > 1 && (
                                                        <button
                                                            data-pdf-hide
                                                            onClick={() => removeItem(item.id)}
                                                            className="absolute right-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all p-0.5"
                                                            title="Eliminar ítem"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Add Item Button */}
                            <div data-pdf-hide className="bg-slate-50 px-3 py-2 border-t border-slate-300">
                                <button
                                    onClick={addItem}
                                    className="flex items-center text-xs font-semibold text-green-700 hover:text-green-900 transition-colors gap-1"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Agregar ítem
                                </button>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-6">
                            <div className="w-full sm:w-64 border border-slate-400 rounded-lg overflow-hidden">
                                <div className="flex justify-between px-4 py-2 border-b border-slate-300 bg-white">
                                    <span className="font-bold text-sm text-slate-700">Subtotal</span>
                                    <span className="text-sm text-slate-800">S/.{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between px-4 py-2 border-b border-slate-300 bg-white">
                                    <span className="font-bold text-sm text-slate-700">IGV (18%)</span>
                                    <span className="text-sm text-slate-800">S/.{impuestos.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between px-4 py-3 bg-green-50">
                                    <span className="font-extrabold text-sm text-green-900">TOTAL</span>
                                    <span className="font-extrabold text-sm text-green-900">S/.{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Observaciones */}
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-2 block">Observaciones:</label>
                            <textarea
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                placeholder="Escriba observaciones adicionales..."
                                rows={3}
                                className="w-full border-2 border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-green-600 transition-colors resize-none bg-transparent placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons (sticky footer) */}
                <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-3 sm:py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                        {/* Download PDF */}
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPdf}
                            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl shadow-md transition-all active:scale-[0.98] text-sm sm:text-base"
                        >
                            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                            {isGeneratingPdf ? 'Generando...' : 'Descargar PDF'}
                        </button>

                        {/* Send to Company WhatsApp */}
                        <button
                            onClick={handleSendWhatsAppEmpresa}
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl shadow-md transition-all active:scale-[0.98] text-sm sm:text-base"
                        >
                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                            Enviar a Empresa
                        </button>

                        {/* Send to Client WhatsApp */}
                        <button
                            onClick={handleSendWhatsAppCliente}
                            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl shadow-md transition-all active:scale-[0.98] text-sm sm:text-base"
                        >
                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                            Enviar a Cliente
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
