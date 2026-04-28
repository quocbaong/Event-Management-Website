import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell, AreaChart, Area, PieChart, Pie, Sector
} from 'recharts';

// ─── API Config (thay URL khi có backend) ─────────────────────────────────────
// const API_BASE = 'http://localhost:8080/api/organizer';

// ─── Helper: tạo query params từ period / customRange ─────────────────────────
const buildDateParams = (period, customRange) => {
  if (period === 'custom' && customRange.start && customRange.end) {
    return `from=${customRange.start}&to=${customRange.end}`;
  }
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - Number(period));
  const fmt = d => d.toISOString().split('T')[0];
  return `from=${fmt(from)}&to=${fmt(to)}&period=${period}`;
};

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-100 rounded-xl ${className}`} />
);

// ─── Mock Data ────────────────────────────────────────────────────────────────
// ─── Base Data (for scaling) ──────────────────────────────────────────────────
const baseKpiData = [
  { icon: 'confirmation_number', label: 'Tổng vé đã bán', value: 819.4, trend: '+12%', up: true, color: 'indigo', unit: '' },
  { icon: 'payments', label: 'Doanh thu dự kiến', value: 42.6, trend: '+8.4%', up: true, color: 'violet', unit: ' triệu ₫' },
  { icon: 'how_to_reg', label: 'Tỷ lệ tham dự', value: 86.4, trend: '-2%', up: false, color: 'blue', unit: '%' },
  { icon: 'star', label: 'Điểm hài lòng', value: 4.8, trend: '+15%', up: true, color: 'amber', unit: '/5.0' },
];

const attendanceData = [
  { day: 'T2', week1: 45, week2: 78, week3: 30, week4: 90 },
  { day: 'T3', week1: 60, week2: 55, week3: 85, week4: 40 },
  { day: 'T4', week1: 80, week2: 90, week3: 60, week4: 70 },
  { day: 'T5', week1: 95, week2: 40, week3: 75, week4: 85 },
  { day: 'T6', week1: 70, week2: 65, week3: 95, week4: 55 },
  { day: 'T7', week1: 55, week2: 80, week3: 50, week4: 100 },
  { day: 'CN', week1: 35, week2: 45, week3: 40, week4: 60 },
];

const densityData = [
  { time: '08:00', value: 120 }, { time: '10:00', value: 450 }, { time: '12:00', value: 800 },
  { time: '14:00', value: 650 }, { time: '16:00', value: 1100 }, { time: '18:00', value: 1600 },
  { time: '20:00', value: 2100 }, { time: '22:00', value: 900 }, { time: '00:00', value: 150 },
];

const barChartData = [
  { name: 'T1', value: 820 }, { name: 'T2', value: 1200 }, { name: 'T3', value: 950 },
  { name: 'T4', value: 1580 }, { name: 'T5', value: 1100 }, { name: 'T6', value: 1750 },
  { name: 'T7', value: 2100 }, { name: 'T8', value: 1420 }, { name: 'T9', value: 1890 },
  { name: 'T10', value: 980 }, { name: 'T11', value: 2250 }, { name: 'T12', value: 1650 },
];

const audienceSegments = [
  { label: 'Độ tuổi 18 – 25', pct: 32, color: '#6366f1' },
  { label: 'Độ tuổi 26 – 35', pct: 45, color: '#8b5cf6' },
  { label: 'Độ tuổi 36 – 50', pct: 18, color: '#3b82f6' },
  { label: 'Khác', pct: 5, color: '#94a3b8' },
];

const funnelSteps = [
  { label: 'Tiếp cận', sub: 'Lượt xem trang', value: '152K', color: 'from-indigo-500 to-indigo-600', width: '100%' },
  { label: 'Quan tâm', sub: 'Nhấn vào vé', value: '48K', color: 'from-violet-500 to-violet-600', width: '80%' },
  { label: 'Giỏ hàng', sub: 'Thanh toán', value: '12.5K', color: 'from-purple-500 to-purple-700', width: '58%' },
  { label: 'Hoàn tất', sub: 'Vé đã bán', value: '8.2K', color: 'from-indigo-800 to-slate-900', width: '40%' },
];

const events = [
  { name: 'Tech Summit 2024', type: 'Hội thảo', tickets: '1,200', checkin: 92, revenue: '420.5M', status: 'done' },
  { name: 'Gala Dinner FinTech', type: 'Tiệc tối', tickets: '350', checkin: 88, revenue: '180.2M', status: 'done' },
  { name: 'Music Fest – Summer Heat', type: 'Âm nhạc', tickets: '5,000', checkin: 65, revenue: '1.2B', status: 'live' },
  { name: 'Startup Pitching Day', type: 'Cuộc thi', tickets: '800', checkin: 42, revenue: '95M', status: 'live' },
  { name: 'Food & Wine Festival', type: 'Ẩm thực', tickets: '2,100', checkin: 78, revenue: '340M', status: 'done' },
];

const thuLineData = [
  { label: 'T.2', w1: 35, w2: 70, w3: 25, w4: 85 },
  { label: 'T.3', w1: 50, w2: 50, w3: 80, w4: 35 },
  { label: 'T.4', w1: 65, w2: 85, w3: 55, w4: 65 },
  { label: 'T.5', w1: 80, w2: 35, w3: 70, w4: 80 },
  { label: 'T.6', w1: 60, w2: 60, w3: 90, w4: 50 },
  { label: 'T.7', w1: 45, w2: 75, w3: 45, w4: 95 },
  { label: 'CN',  w1: 30, w2: 40, w3: 35, w4: 55 },
];

const gioLineData = [
  { label: '8h',  w1: 20, w2: 30, w3: 15, w4: 25 },
  { label: '10h', w1: 45, w2: 50, w3: 40, w4: 55 },
  { label: '12h', w1: 70, w2: 65, w3: 80, w4: 75 },
  { label: '14h', w1: 55, w2: 60, w3: 50, w4: 65 },
  { label: '16h', w1: 80, w2: 75, w3: 70, w4: 85 },
  { label: '18h', w1: 90, w2: 95, w3: 88, w4: 78 },
  { label: '20h', w1: 75, w2: 85, w3: 92, w4: 80 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const colorMap = {
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', ring: 'ring-indigo-100' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-100' },
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   ring: 'ring-blue-100'   },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-500',  ring: 'ring-amber-100'  },
};

const KpiCard = ({ card, index }) => {
  const c = colorMap[card.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(99,102,241,0.12)' }}
      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm cursor-default"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center shrink-0`}>
            <span className={`material-symbols-outlined text-[20px] ${c.icon}`}>{card.icon}</span>
          </div>
          <p className="text-xs font-bold text-slate-500 leading-tight uppercase tracking-wide">{card.label}</p>
        </div>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${card.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
          {card.trend}
        </span>
      </div>
      <p className="text-2xl font-black text-slate-900 tracking-tight">{card.displayValue}</p>
    </motion.div>
  );
};

const HeatCell = ({ value }) => {
  const intensity = value / 100;
  const bg = intensity > 0.85 ? 'bg-indigo-700' : intensity > 0.7 ? 'bg-indigo-500' : intensity > 0.5 ? 'bg-indigo-300' : intensity > 0.3 ? 'bg-indigo-200' : 'bg-indigo-100';
  return (
    <div className={`w-8 h-8 rounded-lg ${bg} transition-all hover:scale-110 cursor-pointer`} title={`${value}%`} />
  );
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl shadow-lg px-3 py-2 text-xs">
        <p className="font-black text-slate-700">{label}</p>
        <p className="text-indigo-600 font-bold">{payload[0].value.toLocaleString()} lượt</p>
      </div>
    );
  }
  return null;
};

const CheckinBar = ({ pct }) => {
  const color = pct >= 85 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-black text-slate-600 w-8 text-right">{pct}%</span>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const OrganizerReportAnalyticsPage = () => {
  const [period, setPeriod] = useState(30);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();

  // ─── Chart states ─────────────────────────────────────────────────────────
  const [isLoadingKpi,       setIsLoadingKpi]       = useState(false);
  const [isLoadingDensity,   setIsLoadingDensity]   = useState(false);
  const [isLoadingAudience,  setIsLoadingAudience]  = useState(false);
  const [isLoadingFunnel,    setIsLoadingFunnel]    = useState(false);
  const [isLoadingEvents,    setIsLoadingEvents]    = useState(false);

  // ─── Dynamic chart data (sẽ được cập nhật từ API) ─────────────────────────
  const [apiLineDataThu,    setApiLineDataThu]    = useState(null);
  const [apiLineDataGio,    setApiLineDataGio]    = useState(null);
  const [apiAudienceSegs,   setApiAudienceSegs]   = useState(null);
  const [apiFunnelSteps,    setApiFunnelSteps]    = useState(null);
  const [apiEvents,         setApiEvents]         = useState(null);

  // ─── Fetch density chart (Mật độ tham dự) ────────────────────────────────
  useEffect(() => {
    const params = buildDateParams(period, customRange);
    setIsLoadingDensity(true);

    // TODO: Thay đoạn setTimeout bằng fetch thật khi có BE:
    // fetch(`${API_BASE}/checkin-density?${params}`)
    //   .then(r => r.json())
    //   .then(data => { setApiLineDataThu(data.thu); setApiLineDataGio(data.gio); })
    //   .catch(console.error)
    //   .finally(() => setIsLoadingDensity(false));

    // Mock: giữ nguyên data tĩnh, chỉ simulate loading
    const t = setTimeout(() => {
      setApiLineDataThu(null); // null = dùng thuLineData mặc định
      setApiLineDataGio(null);
      setIsLoadingDensity(false);
    }, 300);
    return () => clearTimeout(t);
  }, [period, customRange]);

  // ─── Fetch audience segments (Phân khúc đối tượng) ────────────────────────
  useEffect(() => {
    const params = buildDateParams(period, customRange);
    setIsLoadingAudience(true);

    // TODO:
    // fetch(`${API_BASE}/audience-segments?${params}`)
    //   .then(r => r.json()).then(setApiAudienceSegs)
    //   .catch(console.error).finally(() => setIsLoadingAudience(false));

    const t = setTimeout(() => {
      setApiAudienceSegs(null); // null = dùng audienceSegments mặc định
      setIsLoadingAudience(false);
    }, 300);
    return () => clearTimeout(t);
  }, [period, customRange]);

  // ─── Fetch conversion funnel (Phễu chuyển đổi) ───────────────────────────
  useEffect(() => {
    const params = buildDateParams(period, customRange);
    setIsLoadingFunnel(true);

    // TODO:
    // fetch(`${API_BASE}/conversion-funnel?${params}`)
    //   .then(r => r.json()).then(setApiFunnelSteps)
    //   .catch(console.error).finally(() => setIsLoadingFunnel(false));

    const t = setTimeout(() => {
      setApiFunnelSteps(null); // null = dùng funnelSteps mặc định
      setIsLoadingFunnel(false);
    }, 300);
    return () => clearTimeout(t);
  }, [period, customRange]);

  // ─── Fetch events table (Bảng sự kiện) ───────────────────────────────────
  useEffect(() => {
    const params = buildDateParams(period, customRange);
    setIsLoadingEvents(true);

    // TODO:
    // fetch(`${API_BASE}/events?${params}`)
    //   .then(r => r.json()).then(setApiEvents)
    //   .catch(console.error).finally(() => setIsLoadingEvents(false));

    const t = setTimeout(() => {
      setApiEvents(null); // null = dùng events mặc định
      setIsLoadingEvents(false);
    }, 300);
    return () => clearTimeout(t);
  }, [period, customRange]);

  // Tính toán dữ liệu động dựa trên thời gian
  const dynamicKpiData = React.useMemo(() => {
    let multiplier = 1;
    if (period === 7) multiplier = 0.25;
    if (period === 30) multiplier = 1;
    if (period === 90) multiplier = 2.8;
    if (period === 'custom') multiplier = 1.5; // Giả lập cho custom

    return baseKpiData.map(item => {
      let finalValue = item.value;
      
      // Chỉ nhân các giá trị số lượng và doanh thu, giữ nguyên tỷ lệ và điểm số
      if (item.icon === 'confirmation_number' || item.icon === 'payments') {
        finalValue = (item.value * multiplier).toFixed(1);
        if (item.icon === 'payments' && finalValue > 1000) {
          finalValue = (finalValue / 1000).toFixed(2) + ' tỷ';
          return { ...item, displayValue: finalValue + ' ₫' };
        }
      }

      if (item.icon === 'confirmation_number') {
        return { ...item, displayValue: Math.floor(finalValue * 10).toLocaleString() };
      }
      
      return { ...item, displayValue: item.value + item.unit };
    });
  }, [period]);

  const [viewMode, setViewMode] = useState('thu');
  const [hoveredWeek, setHoveredWeek] = useState(null);

  // Dữ liệu hiển thị: ưu tiên data từ API, fallback về mock data
  const activeLineDataThu = apiLineDataThu ?? thuLineData;
  const activeLineDataGio = apiLineDataGio ?? gioLineData;
  const activeAudienceSegs = apiAudienceSegs ?? audienceSegments;
  const activeFunnelSteps = apiFunnelSteps ?? funnelSteps;
  const activeEvents = apiEvents ?? events;

  const weekColors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b'];
  const weekLabels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];


  const lineData = viewMode === 'thu' ? activeLineDataThu : activeLineDataGio;

  // Logic AI phân tích dữ liệu thật để tìm đỉnh (Peak)
  const dynamicAiTip = React.useMemo(() => {
    if (!lineData || lineData.length === 0) return '';
    
    // Tìm entry có tổng giá trị w1+w2+w3+w4 cao nhất
    const peakEntry = [...lineData].sort((a, b) => {
      const totalA = (a.w1 || 0) + (a.w2 || 0) + (a.w3 || 0) + (a.w4 || 0);
      const totalB = (b.w1 || 0) + (b.w2 || 0) + (b.w3 || 0) + (b.w4 || 0);
      return totalB - totalA;
    })[0];

    if (viewMode === 'thu') {
      return `Dựa trên dữ liệu, ${peakEntry.label} thường là thời điểm có lưu lượng khách check-in đông nhất. Bạn nên tăng cường nhân sự vào ngày này.`;
    } else {
      return `Cao điểm check-in thường rơi vào khoảng ${peakEntry.label}. Hãy đảm bảo các cổng soát vé sẵn sàng trước khung giờ này.`;
    }
  }, [lineData, viewMode]);

  // Custom Tooltip: chỉ hiện tuần đang được focus (hoặc tất cả nếu không hover)
  const renderLineTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const filtered = hoveredWeek !== null
      ? payload.filter((_, i) => i === hoveredWeek)
      : payload;
    return (
      <div style={{
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
        padding: '10px 14px',
        minWidth: 120,
      }}>
        <p style={{ fontWeight: 900, color: '#1e293b', fontSize: 12, marginBottom: 6 }}>{label}</p>
        {filtered.map((entry, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.stroke || entry.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>{entry.name}:</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: entry.stroke || entry.color, marginLeft: 'auto' }}>{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/organizer/reports')}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all shadow-sm"
            title="Quay lại"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 font-headline tracking-tight mb-1">
              Phân tích Chuyên sâu
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Dữ liệu tổng hợp từ 12 sự kiện gần nhất trong quý này.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Period filter — dropdown gọn */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-4 h-10 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_month</span>
              <span>
                {period === 'custom' && customRange.start && customRange.end
                  ? `${customRange.start.split('-').reverse().slice(0,2).join('/')} – ${customRange.end.split('-').reverse().slice(0,2).join('/')}`
                  : `${period} ngày qua`}
              </span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
            </button>

            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 min-w-[220px] overflow-hidden"
                >
                  {/* Quick picks */}
                  <div className="p-2">
                    {[7, 30, 90].map(d => (
                      <button
                        key={d}
                        onClick={() => { setPeriod(d); setShowDatePicker(false); setCustomRange({ start: '', end: '' }); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${period === d ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {period === d ? 'radio_button_checked' : 'radio_button_unchecked'}
                        </span>
                        {d} ngày qua
                      </button>
                    ))}
                  </div>

                  {/* Divider + Custom range */}
                  <div className="border-t border-slate-100 p-3 space-y-2.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tùy chỉnh</p>
                    <div className="space-y-1.5">
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={customRange.start}
                        onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                      />
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        value={customRange.end}
                        onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                      />
                    </div>
                    <button
                      onClick={() => { setPeriod('custom'); setShowDatePicker(false); }}
                      className="w-full py-2 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 transition-all"
                    >
                      Áp dụng
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Export PDF */}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Xuất báo cáo (PDF)
          </button>
        </div>
      </motion.div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {dynamicKpiData.map((card, i) => <KpiCard key={i} card={card} index={i} />)}
      </div>

      {/* ── Heatmap + Audience Segment ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-4">
        {/* ── Mật độ tham dự ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-black text-slate-800 text-sm">Mật độ tham dự theo thời gian</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Thống kê lưu lượng check-in tại các cổng theo từng tuần</p>
            </div>
            {/* Toggle Thứ / Giờ */}
            <div className="flex bg-slate-100 rounded-lg p-0.5 shrink-0">
              {['thu', 'gio'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-xs font-black rounded-md transition-all ${
                    viewMode === mode ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {mode === 'thu' ? 'Thứ' : 'Giờ'}
                </button>
              ))}
            </div>
          </div>

          {/* Week legend pills — interactive highlight trigger */}
          <div className="flex flex-wrap gap-2 mb-4">
            {weekLabels.map((lbl, i) => (
              <button
                key={i}
                onMouseEnter={() => setHoveredWeek(i)}
                onMouseLeave={() => setHoveredWeek(null)}
                className={`flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1 rounded-full border transition-all duration-150 cursor-pointer ${
                  hoveredWeek === i
                    ? 'shadow-md scale-105'
                    : hoveredWeek !== null
                    ? 'opacity-40'
                    : ''
                }`}
                style={{
                  backgroundColor: weekColors[i] + (hoveredWeek === i ? '25' : '12'),
                  color: weekColors[i],
                  borderColor: hoveredWeek === i ? weekColors[i] : 'transparent',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block transition-all"
                  style={{ backgroundColor: weekColors[i] }}
                />
                {lbl}
              </button>
            ))}
            {hoveredWeek !== null && (
              <span className="text-[10px] text-slate-400 font-medium self-center ml-1 italic">
                Di chuột ra để xem tất cả
              </span>
            )}
          </div>

          {/* Multi-line Chart */}
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {weekColors.map((color, i) => (
                    <linearGradient key={i} id={`lineGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  unit="%"
                />
                <Tooltip
                  content={renderLineTooltip}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                />
                {['w1','w2','w3','w4'].map((key, i) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={weekLabels[i]}
                    stroke={weekColors[i]}
                    strokeWidth={hoveredWeek === i ? 3.5 : hoveredWeek !== null ? 1.5 : 2.5}
                    strokeOpacity={hoveredWeek !== null && hoveredWeek !== i ? 0.12 : 1}
                    dot={false}
                    activeDot={{
                      r: hoveredWeek === i || hoveredWeek === null ? 5 : 0,
                      strokeWidth: 0,
                      fill: weekColors[i],
                    }}
                    style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insight */}
          <div className="mt-3 flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl px-3 py-2.5 border border-indigo-100">
            <span className="material-symbols-outlined text-indigo-500 text-[16px]">auto_awesome</span>
            <p className="text-[11px] text-indigo-600 font-semibold">{dynamicAiTip}</p>
          </div>
        </motion.div>

        {/* Audience Segment — Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col"
        >
          <h2 className="font-black text-slate-800 text-sm mb-4">Phân khúc đối tượng</h2>

          {/* Donut + Legend layout */}
          {(() => {
            const [hoveredSeg, setHoveredSeg] = React.useState(null);
            const activeSeg = hoveredSeg !== null ? audienceSegments[hoveredSeg] : [...audienceSegments].sort((a, b) => b.pct - a.pct)[0];

            const renderActiveShape = (props) => {
              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
              return (
                <g>
                  <sector
                    cx={cx} cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 8}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    opacity={1}
                  />
                </g>
              );
            };

            return (
              <div className="flex items-center gap-4 flex-1">
                {/* Donut Chart */}
                <div className="relative shrink-0" style={{ width: 180, height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceSegments.map(s => ({ name: s.label, value: s.pct }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={58}
                        outerRadius={82}
                        paddingAngle={3}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                        label={false}
                        labelLine={false}
                        activeIndex={hoveredSeg ?? -1}
                        activeShape={(props) => {
                          const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                          return (
                            <g>
                              <path
                                d={`M ${cx},${cy}`}
                                fill="none"
                              />
                              <Sector
                                cx={cx} cy={cy}
                                innerRadius={innerRadius - 2}
                                outerRadius={outerRadius + 9}
                                startAngle={startAngle}
                                endAngle={endAngle}
                                fill={fill}
                              />
                            </g>
                          );
                        }}
                        onMouseEnter={(_, index) => setHoveredSeg(index)}
                        onMouseLeave={() => setHoveredSeg(null)}
                      >
                        {audienceSegments.map((seg, i) => (
                          <Cell
                            key={i}
                            fill={seg.color}
                            opacity={hoveredSeg !== null && hoveredSeg !== i ? 0.35 : 1}
                            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center label — thay đổi theo segment đang hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span
                      className="text-xl font-black transition-all duration-200"
                      style={{ color: activeSeg.color }}
                    >
                      {activeSeg.pct}%
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 text-center leading-tight mt-0.5 max-w-[56px]">
                      {hoveredSeg !== null ? activeSeg.label.replace('Độ tuổi ', '') : 'nhóm\nchủ đạo'}
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2.5">
                  {audienceSegments.map((seg, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1 transition-all duration-150 cursor-default ${
                        hoveredSeg === i ? 'bg-slate-50 scale-[1.02]' : hoveredSeg !== null ? 'opacity-40' : ''
                      }`}
                      onMouseEnter={() => setHoveredSeg(i)}
                      onMouseLeave={() => setHoveredSeg(null)}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0 transition-all duration-150"
                        style={{
                          backgroundColor: seg.color,
                          transform: hoveredSeg === i ? 'scale(1.3)' : 'scale(1)',
                        }}
                      />
                      <span className={`text-[11px] flex-1 truncate transition-all ${hoveredSeg === i ? 'font-black text-slate-800' : 'font-semibold text-slate-600'}`}>
                        {seg.label}
                      </span>
                      <span className="text-[12px] font-black" style={{ color: seg.color }}>{seg.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* AI insight — tự động tìm nhóm chiếm tỷ lệ cao nhất */}
          {(() => {
            const top = [...audienceSegments].sort((a, b) => b.pct - a.pct)[0];
            return (
              <div className="mt-5 bg-[#F6F4FE] rounded-[28px] p-5 px-6">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined text-[#7C3AED] text-[18px]">auto_awesome</span>
                  <span className="text-xs font-black text-[#7C3AED] uppercase tracking-widest">Gợi ý AI</span>
                </div>
                <p className="text-[13px] text-[#7C3AED] font-semibold leading-relaxed">
                  Nhóm {top.label} chiếm tỷ trọng cao nhất ({top.pct}%). Hãy ưu tiên nhắm mục tiêu quảng cáo vào phân khúc này.
                </p>
              </div>
            );
          })()}
        </motion.div>

      </div>

      {/* ── Conversion Funnel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4 overflow-hidden"
      >
        <div className="mb-10">
          <h2 className="font-black text-slate-800 text-sm">Phễu chuyển đổi bán vé</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Phân tích hành trình khách hàng qua từng giai đoạn</p>
        </div>

        {/* Pipeline Layout */}
        <div className="relative flex flex-col lg:flex-row justify-between items-center w-full mb-10 gap-8 lg:gap-0">
          {/* Đường nối background (chạy xuyên qua tất cả) */}
          <div className="absolute top-[40px] left-[12%] right-[12%] h-1.5 bg-slate-100 -translate-y-1/2 rounded-full hidden lg:block" />

          {activeFunnelSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="relative z-10 flex flex-col items-center flex-1 w-full"
            >
              {/* Node */}
              <div 
                className={`relative flex flex-col items-center justify-center w-[140px] h-[80px] rounded-2xl bg-gradient-to-br ${step.color} shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all cursor-default border-[3px] border-white ring-1 ring-slate-100`}
              >
                <span className="text-2xl font-black text-white">{step.value}</span>
                <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">{step.sub}</span>
              </div>
              
              {/* Label */}
              <div className="mt-4 text-center">
                <p className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{step.label}</p>
              </div>

              {/* Transition Icon (nằm giữa các node) */}
              {i < activeFunnelSteps.length - 1 && (
                 <div className="absolute top-[40px] left-[100%] -translate-y-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center cursor-default">
                    <div className="bg-white border-2 border-slate-100 text-slate-400 w-8 h-8 rounded-full shadow-sm flex items-center justify-center hover:text-indigo-500 hover:border-indigo-200 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </div>
                 </div>
              )}

              {/* Mobile connector */}
              {i < activeFunnelSteps.length - 1 && (
                <div className="lg:hidden h-8 w-px bg-slate-200 mt-4 relative flex items-center justify-center">
                   <div className="bg-white border border-slate-200 text-slate-400 w-5 h-5 rounded-full absolute flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] rotate-90">chevron_right</span>
                   </div>
                </div>
              )}

            </motion.div>
          ))}
        </div>

        {/* Funnel sub-metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          {[
            { label: 'Tỷ lệ chuyển đổi giỏ', value: '5.4%', icon: 'show_chart', color: 'text-indigo-600', bg: 'bg-indigo-50', ring: 'ring-indigo-100' },
            { label: 'Bỏ giỏ (Cart Abandonment)', value: '34.2%', icon: 'remove_shopping_cart', color: 'text-rose-500', bg: 'bg-rose-50', ring: 'ring-rose-100' },
            { label: 'Giá trị đơn trung bình', value: '450K ₫', icon: 'payments', color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
          ].map((m, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl ${m.bg} ring-1 ${m.ring} transition-all hover:shadow-md cursor-default`}>
              <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined text-[24px] ${m.color}`}>{m.icon}</span>
              </div>
              <div>
                <p className={`text-xl font-black ${m.color} tracking-tight`}>{m.value}</p>
                <p className="text-[10px] font-black text-slate-500 mt-0.5 uppercase tracking-wide">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Event Comparison Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h2 className="font-black text-slate-800 text-sm">So sánh hiệu suất sự kiện</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Dữ liệu chi tiết cho 5 sự kiện gần nhất</p>
          </div>
          <button className="text-xs font-black text-indigo-600 hover:underline flex items-center gap-1">
            Xem tất cả <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-slate-100 bg-slate-50/50">
                {['Tên sự kiện', 'Loại hình', 'Lượt vé', 'Tỷ lệ Check-in', 'Doanh thu', 'Trạng thái'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((ev, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="hover:bg-indigo-50/40 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{ev.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">{ev.type}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-black text-slate-700">{ev.tickets}</td>
                  <td className="px-5 py-3.5"><CheckinBar pct={ev.checkin} /></td>
                  <td className="px-5 py-3.5 text-sm font-black text-slate-700">{ev.revenue}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${ev.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {ev.status === 'done' ? 'Hoàn tất' : 'Đang diễn'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default OrganizerReportAnalyticsPage;
