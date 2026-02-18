import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, Download, Send, Plus, Trash2, ClipboardList } from 'lucide-react';
import { Product } from '../types';
import { Logo } from './Logo';
import jsPDF from 'jspdf';

interface CotizarPedidoModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

interface PedidoItem {
    id: number;
    componente: string;
    medidas: string;
    colorAcabado: string;
    herrajes: string;
    notasTaller: string;
}

const EMPRESA_WHATSAPP = '51945092299'; // Número de WhatsApp de la empresa

export const CotizarPedidoModal: React.FC<CotizarPedidoModalProps> = ({ product, isOpen, onClose }) => {
    const proformaRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    const fechaPedido = today.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const [nombreCliente, setNombreCliente] = useState('');
    const [dniRuc, setDniRuc] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [observacionesTecnicas, setObservacionesTecnicas] = useState('');
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const [items, setItems] = useState<PedidoItem[]>([
        { id: 1, componente: product.name, medidas: '', colorAcabado: '', herrajes: '', notasTaller: '' },
        { id: 2, componente: '', medidas: '', colorAcabado: '', herrajes: '', notasTaller: '' },
        { id: 3, componente: '', medidas: '', colorAcabado: '', herrajes: '', notasTaller: '' },
    ]);

    const addItem = () => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([...items, { id: newId, componente: '', medidas: '', colorAcabado: '', herrajes: '', notasTaller: '' }]);
    };

    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const updateItem = (id: number, field: keyof PedidoItem, value: string) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const generatePDF = async (): Promise<jsPDF | null> => {
        setIsGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageW = pdf.internal.pageSize.getWidth();
            const margin = 15;
            const contentW = pageW - margin * 2;
            let y = 20;

            // Colores
            const green800: [number, number, number] = [22, 101, 52];
            const slate800: [number, number, number] = [30, 41, 59];
            const slate600: [number, number, number] = [71, 85, 105];
            const slate400: [number, number, number] = [148, 163, 184];

            // ── HEADER ──
            try {
                const logoUrl = '/images/logo.svg';
                const img = new Image();
                img.src = logoUrl;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.width = 1000;
                    canvas.height = 1000 * (img.height / img.width);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const logoData = canvas.toDataURL('image/png');

                    const logoWidthMm = 60;
                    const logoHeightMm = logoWidthMm * (img.height / img.width);

                    pdf.addImage(logoData, 'PNG', margin, y, logoWidthMm, logoHeightMm);

                    pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(14);
                    pdf.setTextColor(...slate800);
                    const titleY = y + (logoHeightMm / 2) + 2;
                    pdf.text('PROFORMA DE PEDIDO', margin + logoWidthMm + 10, titleY);

                    y += Math.max(logoHeightMm, 15) + 5;
                } else {
                    throw new Error('Canvas context not available');
                }
            } catch (error) {
                console.warn('Error cargando logo', error);
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
                pdf.text('PROFORMA DE PEDIDO', margin + logoW + 6, y);
                y += 10;
            }

            // Fecha
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(...slate600);
            pdf.text(`Fecha de Pedido: ${fechaPedido}`, pageW - margin, 25, { align: 'right' });

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
            const midX = margin + contentW / 3;
            const thirdX = margin + (contentW * 2) / 3;

            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(7);
            pdf.setTextColor(...slate600);
            pdf.text('TELÉFONO', margin, y);
            pdf.text('DIRECCIÓN', midX, y);
            pdf.text('FECHA DE ENTREGA', thirdX, y);

            y += 5;
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
            pdf.setTextColor(...slate800);
            pdf.text(telefono || '—', margin, y);
            pdf.text(direccion || '—', midX, y);
            pdf.text(fechaEntrega || 'Por definir', thirdX, y);

            y += 3;
            pdf.setDrawColor(...slate400);
            pdf.line(margin, y, midX - 3, y);
            pdf.line(midX, y, thirdX - 3, y);
            pdf.line(thirdX, y, pageW - margin, y);

            // ── PRODUCTO ──
            y += 8;
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(...slate800);
            pdf.text(`Producto: ${product.name}`, margin, y);

            // ── TABLA ──
            y += 7;
            const tableX = margin;
            const tableW = contentW;
            // N°, Componente, Medidas, Color/Acabado, Herrajes, Notas Taller
            const colWidths = [10, tableW - 10 - 30 - 30 - 28 - 36, 30, 30, 28, 36];
            const colX = [tableX];
            for (let i = 1; i < colWidths.length; i++) {
                colX.push(colX[i - 1] + colWidths[i - 1]);
            }

            const headerH = 10;
            pdf.setFillColor(241, 245, 249);
            pdf.rect(tableX, y, tableW, headerH, 'F');
            pdf.setDrawColor(...slate400);
            pdf.setLineWidth(0.3);
            pdf.rect(tableX, y, tableW, headerH, 'S');
            for (let i = 1; i < colWidths.length; i++) {
                pdf.line(colX[i], y, colX[i], y + headerH);
            }

            const headers = ['N°', 'Componente', 'Medidas', 'Color/Acab.', 'Herrajes', 'Notas Taller'];
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(7);
            pdf.setTextColor(...slate800);
            headers.forEach((h, i) => {
                const cx = colX[i] + colWidths[i] / 2;
                pdf.text(h, cx, y + headerH / 2 + 1, { align: 'center' });
            });

            y += headerH;

            // Data rows
            items.forEach((item, idx) => {
                const rowH = 8;
                const pageH = pdf.internal.pageSize.getHeight();
                if (y + rowH > pageH - 20) {
                    pdf.addPage();
                    y = 20;
                }

                pdf.setDrawColor(203, 213, 225);
                pdf.rect(tableX, y, tableW, rowH, 'S');
                for (let i = 1; i < colWidths.length; i++) {
                    pdf.line(colX[i], y, colX[i], y + rowH);
                }

                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(7.5);
                pdf.setTextColor(...slate800);

                const cy = y + rowH / 2 + 1;
                pdf.text(String(idx + 1), colX[0] + colWidths[0] / 2, cy, { align: 'center' });
                pdf.text((item.componente || '').substring(0, 30), colX[1] + 2, cy);
                pdf.text(item.medidas || '', colX[2] + colWidths[2] / 2, cy, { align: 'center' });
                pdf.text(item.colorAcabado || '', colX[3] + colWidths[3] / 2, cy, { align: 'center' });
                pdf.text(item.herrajes || '', colX[4] + colWidths[4] / 2, cy, { align: 'center' });
                pdf.text((item.notasTaller || '').substring(0, 20), colX[5] + 2, cy);

                y += rowH;
            });

            // ── OBSERVACIONES TECNICAS ──
            y += 8;
            if (observacionesTecnicas) {
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(9);
                pdf.setTextColor(...slate800);
                pdf.text('Observaciones Técnicas:', margin, y);
                y += 5;
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.setTextColor(...slate600);
                const obsLines = pdf.splitTextToSize(observacionesTecnicas, contentW);
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

    const pdfFileName = `Proforma_Pedido_${nombreCliente || 'Cliente'}_${fechaPedido.replace(/\//g, '-')}.pdf`;

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
        text += ' *PROFORMA DE PEDIDO*\n';
        text += '*DecorGlass - Diseños & Proyectos*\n';
        text += '═══════════════════\n\n';

        // Fechas
        text += ` *Fecha de Pedido:* ${fechaPedido}\n`;
        text += ` *Fecha de Entrega:* ${fechaEntrega || 'Por definir'}\n\n`;

        // Datos del cliente
        text += ' *DATOS DEL CLIENTE*\n';
        text += '───────────────────\n';
        text += `• *Nombre:* ${nombreCliente || '—'}\n`;
        text += `• *DNI/RUC:* ${dniRuc || '—'}\n`;
        text += `• *Teléfono:* ${telefono || '—'}\n`;
        text += `• *Dirección:* ${direccion || '—'}\n\n`;

        // Producto
        text += ` *Producto:* ${product.name}\n\n`;

        // Detalle de componentes
        text += ' *DETALLE DE COMPONENTES*\n';
        text += '───────────────────\n';
        items.forEach((item, index) => {
            if (item.componente || item.medidas || item.colorAcabado || item.herrajes || item.notasTaller) {
                text += `\n*${index + 1}. ${item.componente || '—'}*\n`;
                if (item.medidas) text += `    Medidas: ${item.medidas}\n`;
                if (item.colorAcabado) text += `    Color/Acabado: ${item.colorAcabado}\n`;
                if (item.herrajes) text += `    Herrajes: ${item.herrajes}\n`;
                if (item.notasTaller) text += `    Notas Taller: ${item.notasTaller}\n`;
            }
        });

        // Observaciones técnicas
        if (observacionesTecnicas) {
            text += `\n\n *OBSERVACIONES TÉCNICAS:*\n`;
            text += '───────────────────\n';
            text += `${observacionesTecnicas}\n`;
        }

        // Pie
        text += '\n═══════════════════\n';
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
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-fade-in">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-gradient-to-r from-[#1F5E3B] to-[#0E3A27] shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        <h2 className="text-base sm:text-xl font-bold text-white">Proforma de Pedido</h2>
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
                                    src="/images/logo.svg"
                                    alt="DecorGlass Logo"
                                    className="h-8 sm:h-12 w-auto object-contain"
                                />
                                <span className="text-sm sm:text-lg font-bold text-slate-800">PROFORMA DE PEDIDO</span>
                            </div>
                            <div className="sm:text-right space-y-1">
                                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                    Fecha de Pedido: <span className="text-slate-900">{fechaPedido}</span>
                                </p>
                                <div className="flex items-center sm:justify-end gap-2">
                                    <label className="text-xs sm:text-sm font-semibold text-slate-700">Entrega:</label>
                                    <input
                                        type="date"
                                        value={fechaEntrega}
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        className="border-b-2 border-slate-300 focus:border-[#4CAF7D] outline-none py-0.5 px-1 text-xs sm:text-sm text-slate-900 bg-transparent transition-colors"
                                    />
                                </div>
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
                                        className="w-full border-b-2 border-slate-300 focus:border-[#4CAF7D] outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="sm:w-48">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">DNI / RUC</label>
                                    <input
                                        type="text"
                                        value={dniRuc}
                                        onChange={(e) => setDniRuc(e.target.value)}
                                        placeholder="Nº documento"
                                        className="w-full border-b-2 border-slate-300 focus:border-[#4CAF7D] outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
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
                                        className="w-full border-b-2 border-slate-300 focus:border-[#4CAF7D] outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Dirección</label>
                                    <input
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        placeholder="Dirección del cliente"
                                        className="w-full border-b-2 border-slate-300 focus:border-[#4CAF7D] outline-none py-1.5 text-sm text-slate-900 bg-transparent transition-colors placeholder:text-slate-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pedido Items Table */}
                        <div className="border border-slate-400 rounded-lg overflow-hidden mb-5">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm" style={{ minWidth: '600px' }}>
                                    <thead>
                                        <tr className="bg-slate-100">
                                            <th className="border-r border-b border-slate-400 px-2 py-2 text-center font-bold text-slate-700 w-10 sm:w-12">Ítem</th>
                                            <th className="border-r border-b border-slate-400 px-2 py-2 text-left font-bold text-slate-700 w-[22%]">Componente</th>
                                            <th className="border-r border-b border-slate-400 px-2 py-2 text-center font-bold text-slate-700 w-[20%]">Medidas</th>
                                            <th className="border-r border-b border-slate-400 px-2 py-2 text-center font-bold text-slate-700 w-[16%]">Color</th>
                                            <th className="border-r border-b border-slate-400 px-2 py-2 text-center font-bold text-slate-700 w-[16%]">Herrajes</th>
                                            <th className="border-b border-slate-400 px-2 py-2 text-center font-bold text-slate-700 w-[16%]">Notas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-[#4CAF7D]/5 transition-colors group">
                                                <td className="border-r border-b border-slate-300 px-2 py-2 text-center text-slate-600 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-1 py-1">
                                                    <input
                                                        type="text"
                                                        value={item.componente}
                                                        onChange={(e) => updateItem(item.id, 'componente', e.target.value)}
                                                        placeholder="Ej: Cuerpo de estantería"
                                                        className="w-full outline-none py-1 px-1 text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
                                                    />
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-1 py-1">
                                                    <input
                                                        type="text"
                                                        value={item.medidas}
                                                        onChange={(e) => updateItem(item.id, 'medidas', e.target.value)}
                                                        placeholder="Ej: 120 x 200 x 30 cm"
                                                        className="w-full outline-none text-center py-1 text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
                                                    />
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-1 py-1">
                                                    <input
                                                        type="text"
                                                        value={item.colorAcabado}
                                                        onChange={(e) => updateItem(item.id, 'colorAcabado', e.target.value)}
                                                        placeholder="Ej: Roble Natural"
                                                        className="w-full outline-none text-center py-1 text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
                                                    />
                                                </td>
                                                <td className="border-r border-b border-slate-300 px-1 py-1">
                                                    <input
                                                        type="text"
                                                        value={item.herrajes}
                                                        onChange={(e) => updateItem(item.id, 'herrajes', e.target.value)}
                                                        placeholder="Ej: Telescópicos"
                                                        className="w-full outline-none text-center py-1 text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
                                                    />
                                                </td>
                                                <td className="border-b border-slate-300 px-1 py-1 relative">
                                                    <input
                                                        type="text"
                                                        value={item.notasTaller}
                                                        onChange={(e) => updateItem(item.id, 'notasTaller', e.target.value)}
                                                        placeholder="Ej: Reforzar base"
                                                        className="w-full outline-none text-center py-1 text-sm text-slate-800 bg-transparent placeholder:text-slate-400"
                                                    />
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
                                    className="flex items-center text-xs font-semibold text-[#1F5E3B] hover:text-[#4CAF7D] transition-colors gap-1"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Agregar componente
                                </button>
                            </div>
                        </div>

                        {/* Observaciones Técnicas */}
                        <div className="mb-8">
                            <label className="text-sm font-bold text-slate-700 mb-2 block">Observaciones Técnicas:</label>
                            <textarea
                                value={observacionesTecnicas}
                                onChange={(e) => setObservacionesTecnicas(e.target.value)}
                                placeholder="Escriba observaciones técnicas adicionales..."
                                rows={4}
                                className="w-full border-2 border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#4CAF7D] transition-colors resize-none bg-transparent placeholder:text-slate-400"
                            />
                        </div>

                        {/* Signatures */}
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-10 pt-4 gap-6">
                            <div className="text-center">
                                <div className="w-40 sm:w-56 border-b-2 border-slate-800 mb-2"></div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-700">Firma de Conformidad Cliente</p>
                            </div>
                            <div className="text-center">
                                <div className="w-40 sm:w-56 border-b-2 border-slate-800 mb-2"></div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-700">Firma Responsable Taller</p>
                            </div>
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
                            className="flex items-center justify-center gap-2 bg-[#1F5E3B] hover:bg-[#0E3A27] text-white font-bold py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl shadow-md transition-all active:scale-[0.98] text-sm sm:text-base"
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

