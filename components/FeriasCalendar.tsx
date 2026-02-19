import React, { useState } from 'react';
import { MapPin, Calendar, Star, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface FeriaEvent {
    fecha: string;
    lugar: string;
    festividad: string;
}

interface MonthData {
    mes: string;
    shortMes: string;
    color: string;
    eventos: FeriaEvent[];
}

const feriaData: MonthData[] = [
    {
        mes: 'ENERO',
        shortMes: 'Ene',
        color: '#1F5E3B',
        eventos: [
            { fecha: '01-02', lugar: 'Huancayo', festividad: 'San Sebastián.' },
            { fecha: '01-05', lugar: 'Jauja', festividad: 'Fiesta Patronal de San Fabián.' },
            { fecha: '20-29', lugar: 'Jauja', festividad: 'Festival de la Tunantada.' },
            { fecha: '30', lugar: 'Huancayo', festividad: 'Taita Niño' },
        ],
    },
    {
        mes: 'FEBRERO',
        shortMes: 'Feb',
        color: '#1F5E3B',
        eventos: [
            { fecha: '2', lugar: 'Concepción', festividad: 'Fiesta de la Virgen de la Candelaria' },
            { fecha: '7', lugar: 'Concepción', festividad: 'Virgen de la Candelaria.' },
            { fecha: '10', lugar: 'Jauja', festividad: 'Compadres y Comadres' },
            { fecha: '20-28', lugar: 'Jauja', festividad: 'Señor de las Ánimas y peregrinación' },
        ],
    },
    {
        mes: 'MARZO',
        shortMes: 'Mar',
        color: '#1F5E3B',
        eventos: [
            { fecha: '1', lugar: 'Jauja', festividad: 'Señor de las Ánimas' },
            { fecha: '3', lugar: 'Jauja', festividad: 'Fiesta de san José' },
            { fecha: '22-30', lugar: 'Tarma', festividad: 'Fiesta del Señor de Muruhuay' },
        ],
    },
    {
        mes: 'ABRIL',
        shortMes: 'Abr',
        color: '#1F5E3B',
        eventos: [
            { fecha: '1-30', lugar: 'Huancayo', festividad: 'Huaylarsh' },
            { fecha: '18-20', lugar: 'Huancayo', festividad: 'Aniversario de la batalla de Carato.' },
            { fecha: '22', lugar: 'Huancayo', festividad: 'Aniversario héroes de Sicaya' },
            { fecha: '22-30', lugar: 'Tarma', festividad: 'Señor de Muruhuay' },
        ],
    },
    {
        mes: 'MAYO',
        shortMes: 'May',
        color: '#0E3A27',
        eventos: [
            { fecha: '1-4', lugar: 'Junín', festividad: 'Festividad del Señor de Mayo.' },
            { fecha: '1-31', lugar: 'Tarma', festividad: 'Peregrinación del Señor de Muruhuay.' },
            { fecha: '1', lugar: 'Jauja', festividad: 'Danza de la Jija.' },
            { fecha: '4', lugar: 'Huancayo', festividad: 'San Cristobal y Taita Mayo.' },
        ],
    },
    {
        mes: 'JUNIO',
        shortMes: 'Jun',
        color: '#0E3A27',
        eventos: [
            { fecha: '2', lugar: 'Jauja', festividad: 'Las Cruces Barrios' },
            { fecha: '8', lugar: 'Huancayo', festividad: 'San Pedro y San Pablo' },
            { fecha: '16-20', lugar: 'Jauja', festividad: 'Festividad del Señor de Paca' },
            { fecha: '26', lugar: 'Huancayo', festividad: 'Huanconada' },
        ],
    },
    {
        mes: 'JULIO',
        shortMes: 'Jul',
        color: '#1F5E3B',
        eventos: [
            { fecha: '2', lugar: 'Tarma', festividad: 'Fiesta patronal de San Pedro de Cajas' },
            { fecha: '2-30', lugar: 'Concepción', festividad: 'La Virgen de Ocopa' },
            { fecha: '5-30', lugar: 'Huancayo', festividad: 'Fiesta Patronal Central' },
            { fecha: '25', lugar: 'Jauja', festividad: 'Fiesta Patronal de San Cristóbal.' },
        ],
    },
    {
        mes: 'AGOSTO',
        shortMes: 'Ago',
        color: '#1F5E3B',
        eventos: [
            { fecha: '4', lugar: 'Jauja', festividad: 'Fiesta Patronal de la Virgen de las Nieves' },
            { fecha: '6', lugar: 'Todo Junín', festividad: 'Aniversario de la Batalla de Junín' },
            { fecha: '10', lugar: 'Concepción', festividad: 'Fiesta de San Isidro.' },
            { fecha: '24', lugar: 'Huancayo', festividad: 'San Bartolome. Santo Cristo.' },
        ],
    },
    {
        mes: 'SEPTIEMBRE',
        shortMes: 'Sep',
        color: '#0E3A27',
        eventos: [
            { fecha: '6', lugar: 'Jauja', festividad: 'Fiesta Patronal' },
            { fecha: '8', lugar: 'Huancayo', festividad: 'Fiesta Patronal de San Isidro.' },
            { fecha: '12', lugar: 'Jauja', festividad: 'El Señor de la Agonía Marco' },
            { fecha: '18', lugar: 'Huancayo', festividad: 'La Virgen de la Merced.' },
        ],
    },
    {
        mes: 'OCTUBRE',
        shortMes: 'Oct',
        color: '#0E3A27',
        eventos: [
            { fecha: '3-5', lugar: 'Huancayo', festividad: 'Concurso Regional Folclórico.' },
            { fecha: '4', lugar: 'Concepción', festividad: 'San Francisco de Asís.' },
            { fecha: '11', lugar: 'Huancayo', festividad: 'La Virgen del Pilar.' },
            { fecha: '20', lugar: 'Jauja', festividad: 'La Virgen del Rosario.' },
        ],
    },
    {
        mes: 'NOVIEMBRE',
        shortMes: 'Nov',
        color: '#1F5E3B',
        eventos: [
            { fecha: '1', lugar: 'Huancayo', festividad: 'Danza de la Negrería.' },
            { fecha: '3', lugar: 'Concepción', festividad: 'Festividad de San Martín de Porres.' },
        ],
    },
    {
        mes: 'DICIEMBRE',
        shortMes: 'Dic',
        color: '#1F5E3B',
        eventos: [
            { fecha: '8', lugar: 'Concepción', festividad: 'La Purísima Concepción.' },
            { fecha: '24', lugar: 'Concepción', festividad: 'Danza de los auquis o viejitos.' },
            { fecha: '24-31', lugar: 'Jauja', festividad: 'Danza de la Pachahuara o Negrería.' },
            { fecha: '25', lugar: 'Todo Junín', festividad: 'Pascua de Navidad' },
        ],
    },
];

const lugarColors: Record<string, string> = {
    'Huancayo': '#1F5E3B',
    'Jauja': '#2D8A5E',
    'Concepción': '#7BC5A3',
    'Tarma': '#4CAF7D',
    'Junín': '#B8D8C7',
    'Todo Junín': '#0E3A27',
};

const getLugarColor = (lugar: string) => lugarColors[lugar] || '#1F5E3B';

export const FeriasCalendar: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedLugar, setSelectedLugar] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const lugares = Array.from(new Set(feriaData.flatMap(m => m.eventos.map(e => e.lugar)))).sort();

    const filteredData = feriaData.map(month => ({
        ...month,
        eventos: month.eventos.filter(e => !selectedLugar || e.lugar === selectedLugar),
    })).filter(month =>
        (!selectedMonth || month.mes === selectedMonth) && month.eventos.length > 0
    );

    const totalEvents = feriaData.reduce((acc, m) => acc + m.eventos.length, 0);

    return (
        <div className="min-h-screen bg-[#F7FAF8]">
            {/* Hero Header */}
            <div
                className="relative overflow-hidden py-20 px-4"
                style={{
                    background: 'linear-gradient(160deg, #0E3A27 0%, #1F5E3B 50%, #2D8A5E 100%)',
                }}
            >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
                    style={{ background: '#7BC5A3', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
                    style={{ background: '#B8D8C7', transform: 'translate(-30%, 30%)' }} />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{ background: 'rgba(123, 197, 163, 0.15)', border: '1px solid rgba(123, 197, 163, 0.3)' }}>
                        <Calendar className="w-4 h-4 text-[#7BC5A3]" />
                        <span className="text-[#7BC5A3] text-sm font-semibold uppercase tracking-wider">Calendario Anual</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Ferias Itinerantes
                    </h1>
                    <p className="text-xl text-[#B8D8C7] max-w-2xl mx-auto mb-8 leading-relaxed">
                        Calendario de fechas para publicidad en ferias y festividades de la región Junín.
                        ¡Lleva DecorGlass a más clientes potenciales!
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="glass-dark rounded-2xl px-6 py-4 text-center">
                            <div className="text-3xl font-bold text-white">{totalEvents}</div>
                            <div className="text-[#7BC5A3] text-sm">Festividades</div>
                        </div>
                        <div className="glass-dark rounded-2xl px-6 py-4 text-center">
                            <div className="text-3xl font-bold text-white">12</div>
                            <div className="text-[#7BC5A3] text-sm">Meses</div>
                        </div>
                        <div className="glass-dark rounded-2xl px-6 py-4 text-center">
                            <div className="text-3xl font-bold text-white">{lugares.length}</div>
                            <div className="text-[#7BC5A3] text-sm">Destinos</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-[#EEF5F1] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-[#1F5E3B] font-semibold text-sm">
                            <Filter className="w-4 h-4" />
                            <span>Filtrar:</span>
                        </div>

                        {/* Location filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedLugar(null)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${!selectedLugar
                                        ? 'bg-[#1F5E3B] text-white shadow-md'
                                        : 'bg-[#EEF5F1] text-[#5A5A5E] hover:bg-[#D4EDE0]'
                                    }`}
                            >
                                Todos
                            </button>
                            {lugares.map(lugar => (
                                <button
                                    key={lugar}
                                    onClick={() => setSelectedLugar(selectedLugar === lugar ? null : lugar)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedLugar === lugar
                                            ? 'text-white shadow-md'
                                            : 'bg-[#EEF5F1] text-[#5A5A5E] hover:bg-[#D4EDE0]'
                                        }`}
                                    style={selectedLugar === lugar ? { background: getLugarColor(lugar) } : {}}
                                >
                                    {lugar}
                                </button>
                            ))}
                        </div>

                        {/* View toggle */}
                        <div className="ml-auto flex gap-1 bg-[#EEF5F1] rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1 rounded text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-[#1F5E3B] text-white' : 'text-[#5A5A5E]'
                                    }`}
                            >
                                Cuadrícula
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1 rounded text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-[#1F5E3B] text-white' : 'text-[#5A5A5E]'
                                    }`}
                            >
                                Lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Month Quick Nav */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-wrap gap-2 justify-center">
                    {feriaData.map(month => (
                        <button
                            key={month.mes}
                            onClick={() => setSelectedMonth(selectedMonth === month.mes ? null : month.mes)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover-lift ${selectedMonth === month.mes
                                    ? 'text-white shadow-lg'
                                    : 'bg-white border border-[#EEF5F1] text-[#5A5A5E] hover:border-[#1F5E3B]/30'
                                }`}
                            style={selectedMonth === month.mes ? { background: 'linear-gradient(135deg, #1F5E3B, #2D8A5E)' } : {}}
                        >
                            {month.shortMes}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {filteredData.map((month, idx) => (
                            <MonthCard
                                key={month.mes}
                                month={month}
                                delay={idx * 50}
                                selectedLugar={selectedLugar}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredData.map((month, idx) => (
                            <MonthListItem
                                key={month.mes}
                                month={month}
                                delay={idx * 30}
                                selectedLugar={selectedLugar}
                            />
                        ))}
                    </div>
                )}

                {filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <Calendar className="w-16 h-16 text-[#B8D8C7] mx-auto mb-4" />
                        <p className="text-[#5A5A5E] text-lg">No hay eventos para el filtro seleccionado.</p>
                        <button
                            onClick={() => { setSelectedLugar(null); setSelectedMonth(null); }}
                            className="mt-4 btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Legend */}
            <div className="bg-white border-t border-[#EEF5F1] py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h3 className="font-semibold text-[#1F5E3B] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Destinos por color
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(lugarColors).map(([lugar, color]) => (
                            <div key={lugar} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                                <span className="text-sm text-[#5A5A5E]">{lugar}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-xs text-[#9CA3AF] max-w-xl mx-auto">
                        Este calendario fue elaborado para planificar actividades de publicidad y promoción de productos DecorGlass
                        en ferias itinerantes de la región Junín.
                    </p>
                </div>
            </div>
        </div>
    );
};

/* ─── Sub-components ─── */

interface MonthCardProps {
    month: MonthData;
    delay: number;
    selectedLugar: string | null;
}

const MonthCard: React.FC<MonthCardProps> = ({ month, delay, selectedLugar }) => {
    return (
        <div
            className="bg-white rounded-2xl overflow-hidden border border-[#EEF5F1] shadow-sm animate-fade-in-up card-hover"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Month Header */}
            <div
                className="px-5 py-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1F5E3B 0%, #2D8A5E 60%, #4CAF7D 100%)' }}
            >
                <div className="absolute right-0 top-0 w-20 h-20 rounded-full opacity-10"
                    style={{ background: '#7BC5A3', transform: 'translate(30%, -30%)' }} />
                <h2 className="text-white font-bold text-lg relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {month.mes}
                </h2>
                <p className="text-[#B8D8C7] text-xs">{month.eventos.length} festividades</p>

                {/* Sub-header row */}
                <div className="flex gap-2 mt-3 text-xs font-semibold text-[#D4EDE0] uppercase tracking-wider">
                    <span className="w-14">Fecha</span>
                    <span className="w-24">Lugar</span>
                    <span className="flex-1">Festividad</span>
                </div>
            </div>

            {/* Events */}
            <div className="divide-y divide-[#EEF5F1]">
                {month.eventos.map((event, i) => (
                    <EventRow key={i} event={event} highlight={selectedLugar === event.lugar} />
                ))}
            </div>
        </div>
    );
};

interface EventRowProps {
    event: FeriaEvent;
    highlight: boolean;
}

const EventRow: React.FC<EventRowProps> = ({ event, highlight }) => {
    const lugarColor = getLugarColor(event.lugar);
    return (
        <div
            className={`flex gap-3 px-4 py-3 text-sm transition-all ${highlight ? 'bg-[#D4EDE0]' : 'hover:bg-[#F7FAF8]'
                }`}
        >
            {/* Date */}
            <div className="w-14 flex-shrink-0">
                <span
                    className="inline-block px-2 py-0.5 rounded-md text-xs font-bold text-white"
                    style={{ background: lugarColor }}
                >
                    {event.fecha}
                </span>
            </div>

            {/* Location */}
            <div className="w-24 flex-shrink-0">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: lugarColor }} />
                    <span className="font-medium text-xs truncate" style={{ color: lugarColor }}>
                        {event.lugar}
                    </span>
                </div>
            </div>

            {/* Event name */}
            <div className="flex-1 min-w-0">
                <p className="text-[#1C1C1E] text-xs leading-tight">{event.festividad}</p>
            </div>
        </div>
    );
};

interface MonthListItemProps {
    month: MonthData;
    delay: number;
    selectedLugar: string | null;
}

const MonthListItem: React.FC<MonthListItemProps> = ({ month, delay, selectedLugar }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div
            className="bg-white rounded-2xl overflow-hidden border border-[#EEF5F1] shadow-sm animate-fade-in"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Clickable header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-all hover:bg-[#F7FAF8]"
                style={{ background: expanded ? 'linear-gradient(135deg, #1F5E3B, #2D8A5E)' : undefined }}
            >
                <div className="flex items-center gap-3">
                    <Star className="w-5 h-5" style={{ color: expanded ? '#7BC5A3' : '#1F5E3B' }} />
                    <span
                        className="font-bold text-lg"
                        style={{ fontFamily: 'Poppins, sans-serif', color: expanded ? 'white' : '#1C1C1E' }}
                    >
                        {month.mes}
                    </span>
                    <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                            background: expanded ? 'rgba(123,197,163,0.25)' : '#EEF5F1',
                            color: expanded ? '#B8D8C7' : '#5A5A5E',
                        }}
                    >
                        {month.eventos.length} eventos
                    </span>
                </div>
                {expanded
                    ? <ChevronUp className="w-5 h-5 text-[#7BC5A3]" />
                    : <ChevronDown className="w-5 h-5 text-[#1F5E3B]" />}
            </button>

            {/* Events table */}
            {expanded && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: '#EEF5F1' }}>
                                <th className="text-left px-6 py-2 text-xs font-semibold text-[#1F5E3B] uppercase tracking-wider w-24">Fecha</th>
                                <th className="text-left px-4 py-2 text-xs font-semibold text-[#1F5E3B] uppercase tracking-wider w-36">Lugar</th>
                                <th className="text-left px-4 py-2 text-xs font-semibold text-[#1F5E3B] uppercase tracking-wider">Festividad</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EEF5F1]">
                            {month.eventos.map((event, i) => {
                                const lugarColor = getLugarColor(event.lugar);
                                const isHighlighted = selectedLugar === event.lugar;
                                return (
                                    <tr
                                        key={i}
                                        className="transition-all"
                                        style={{ background: isHighlighted ? '#D4EDE0' : i % 2 === 0 ? 'white' : '#F7FAF8' }}
                                    >
                                        <td className="px-6 py-3">
                                            <span
                                                className="font-bold text-xs px-2 py-1 rounded-lg text-white"
                                                style={{ background: lugarColor }}
                                            >
                                                {event.fecha}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: lugarColor }} />
                                                <span className="font-medium text-[#1C1C1E] text-xs">{event.lugar}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[#5A5A5E] text-xs">{event.festividad}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
