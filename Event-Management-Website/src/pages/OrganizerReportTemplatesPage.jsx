import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const templates = [
  {
    id: 1,
    icon: 'bar_chart',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    title: 'Báo cáo Doanh thu',
    desc: 'Phân tích chi tiết về vé bán, doanh thu theo hạng và dòng tiền thời gian thực.',
    badge: 'Phổ biến nhất',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    cta: 'Sử dụng mẫu',
    wide: false,
  },
  {
    id: 2,
    icon: 'groups',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    title: 'Thống kê Tham dự',
    desc: 'Theo dõi tỷ lệ check-in, khách mời VIP và mật độ tham gia theo từng khung giờ.',
    badge: 'Dữ liệu thực',
    badgeColor: 'bg-amber-50 text-amber-600',
    cta: 'Sử dụng mẫu',
    wide: false,
  },
  {
    id: 3,
    icon: 'forum',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    title: 'Tổng hợp Phản hồi',
    desc: 'Phân tích mức độ hài lòng (CSAT), đánh giá điểm giá và ý kiến đóng góp từ khách hàng sau sự kiện.',
    badge: '+12 NEW',
    badgeColor: 'bg-red-50 text-red-500',
    cta: 'Cấu hình báo cáo',
    wide: true,
  },
];

const recentReports = [
  {
    id: 1,
    name: 'Báo cáo Q3 – Tech Conference 2024',
    creator: 'Admin',
    time: '3 giờ trước',
    status: 'done',
  },
  {
    id: 2,
    name: 'Danh sách khách mời Gala Dinner',
    creator: 'Minh Anh',
    time: 'Hôm qua',
    status: 'processing',
  },
  {
    id: 3,
    name: 'Doanh thu sự kiện Music Fest Q2',
    creator: 'Admin',
    time: '3 ngày trước',
    status: 'done',
  },
];

const formats = ['PDF', 'EXCEL', 'CSV'];
const formatIcons = { PDF: 'picture_as_pdf', EXCEL: 'table_chart', CSV: 'description' };
const formatColors = {
  PDF:   { active: 'bg-rose-600   text-white border-rose-600',   icon: 'text-rose-500'   },
  EXCEL: { active: 'bg-emerald-600 text-white border-emerald-600', icon: 'text-emerald-500' },
  CSV:   { active: 'bg-indigo-600 text-white border-indigo-600', icon: 'text-indigo-500'  },
};

// ─── Generate Report Modal ─────────────────────────────────────────────────────
const GenerateReportModal = ({ template, onClose }) => {
  const [format, setFormat] = useState('PDF');
  const [dateRange, setDateRange] = useState('30');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  // Hàm tạo dữ liệu ảo & tải file
  const generateMockReport = () => {
    let filename = '';
    let content = '';
    let mimeType = '';
    const today = new Date().toISOString().split('T')[0];

    // Tạo nội dung CSV dựa trên template đang chọn
    if (template.id === 1) { // Doanh thu
      filename = `Bao_Cao_Doanh_Thu_${today}`;
      content = `Ngày,Hạng Vé,Số lượng bán,Đơn giá (VND),Tổng Doanh Thu (VND),Trạng thái\n`;
      content += `2024-10-01,VIP,45,2000000,90000000,Đã thanh toán\n`;
      content += `2024-10-01,GA,120,500000,60000000,Đã thanh toán\n`;
      content += `2024-10-02,VIP,30,2000000,60000000,Đã thanh toán\n`;
      content += `2024-10-02,GA,200,500000,100000000,Đã thanh toán\n`;
      content += `2024-10-03,Early Bird,150,350000,52500000,Đã thanh toán\n`;
    } else if (template.id === 2) { // Tham dự
      filename = `Thong_Ke_Tham_Du_${today}`;
      content = `Thời gian check-in,Tên Khách,Hạng Vé,Cổng Check-in,Trạng thái\n`;
      content += `2024-10-15 08:15,Nguyễn Văn A,VIP,Cổng 1,Thành công\n`;
      content += `2024-10-15 08:20,Trần Thị B,GA,Cổng 2,Thành công\n`;
      content += `2024-10-15 08:25,Lê Văn C,GA,Cổng 2,Thành công\n`;
      content += `2024-10-15 08:30,Phạm D,Early Bird,Cổng 3,Thành công\n`;
    } else { // Phản hồi
      filename = `Tong_Hop_Phan_Hoi_${today}`;
      content = `Ngày,Tên Khách,Đánh giá (Sao),Bình luận,CSAT Score\n`;
      content += `2024-10-16,Khách ẩn danh,5,"Sự kiện tổ chức rất tuyệt vời!",100\n`;
      content += `2024-10-16,Nguyễn E,4,"Âm thanh hơi nhỏ nhưng tổng thể tốt",80\n`;
      content += `2024-10-17,Trần F,5,"Các gian hàng rất thú vị, đồ ăn ngon",100\n`;
    }

    if (format === 'CSV' || format === 'EXCEL') {
      // Tải CSV/Excel
      filename += '.csv';
      mimeType = 'text/csv;charset=utf-8;';
      // Thêm chuỗi BOM (\uFEFF) để phần mềm đọc đúng font Tiếng Việt có dấu
      const blob = new Blob(['\uFEFF' + content], { type: mimeType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'PDF') {
      // Mô phỏng PDF bằng cách mở tab mới dạng bảng HTML và gọi hàm in của trình duyệt
      const newWin = window.open('', '_blank');
      if(newWin) {
        newWin.document.write(`
          <html>
            <head>
              <title>${filename}.pdf</title>
              <style>
                body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #334155; }
                .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
                h1 { color: #4f46e5; margin: 0 0 10px 0; font-size: 28px; }
                p { margin: 5px 0; color: #64748b; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #cbd5e1; padding: 12px 16px; text-align: left; font-size: 14px; }
                th { background-color: #f8fafc; color: #0f172a; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
                tr:nth-child(even) { background-color: #f8fafc; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>${template.title}</h1>
                <p><strong>Ngày xuất báo cáo:</strong> ${today}</p>
                <p><strong>Nền tảng:</strong> Hệ thống Quản lý Sự kiện 2.0</p>
                <p><em>Lưu ý: Đây là bản xem trước PDF mô phỏng dựa trên dữ liệu mẫu.</em></p>
              </div>
              <table>
                <thead>
                  <tr>${content.split('\n')[0].split(',').map(h => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
                  ${content.split('\n').slice(1).filter(l => l.trim() !== '').map(row => `<tr>${row.split(',').map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
                </tbody>
              </table>
              <script>
                // Đợi load xong style thì gọi in
                setTimeout(() => window.print(), 500);
              </script>
            </body>
          </html>
        `);
        newWin.document.close();
      }
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
      generateMockReport(); // Gọi hàm tự động tải file sau khi chạy xong loading
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${template.iconBg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-[22px] ${template.iconColor}`}>{template.icon}</span>
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-base leading-tight">{template.title}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Tạo & xuất báo cáo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            /* ── Success State ── */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-emerald-500 text-[44px]">check_circle</span>
              </div>
              <h3 className="font-black text-slate-800 text-lg mb-2">Báo cáo đã được tạo!</h3>
              <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                Tệp <span className="font-bold text-slate-700">{format}</span> sẽ được tải xuống tự động.<br/>Bản sao cũng được gửi về email của bạn.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => setDone(false)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Tải ngay
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── Config State ── */
            <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="px-6 py-5 space-y-6">

                {/* Chọn định dạng */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Định dạng tệp xuất</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {formats.map(fmt => {
                      const isActive = format === fmt;
                      return (
                        <button
                          key={fmt}
                          onClick={() => setFormat(fmt)}
                          className={`flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border-2 transition-all text-[12px] font-black ${
                            isActive
                              ? formatColors[fmt].active + ' shadow-md'
                              : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-slate-50'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[26px] ${isActive ? 'text-white' : formatColors[fmt].icon}`}>
                            {formatIcons[fmt]}
                          </span>
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Khoảng thời gian */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Khoảng thời gian</p>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {[
                      { label: '7 ngày', value: '7' },
                      { label: '30 ngày', value: '30' },
                      { label: '3 tháng', value: '90' },
                      { label: 'Tùy chỉnh', value: 'custom' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setDateRange(opt.value)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          dateRange === opt.value
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600 bg-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {dateRange === 'custom' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Từ ngày</label>
                            <input
                              type="date"
                              value={customFrom}
                              onChange={e => setCustomFrom(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Đến ngày</label>
                            <input
                              type="date"
                              value={customTo}
                              onChange={e => setCustomTo(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Huỷ
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-black shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      Đang tạo báo cáo...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">file_download</span>
                      Tạo & Tải xuống {format}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const OrganizerReportTemplatesPage = () => {
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [dataToggles, setDataToggles] = useState({
    personal: true,
    payment: true,
    activity: false,
  });
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  const toggleData = (key) => setDataToggles(prev => ({ ...prev, [key]: !prev[key] }));

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
              Thư viện Mẫu Báo cáo
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Tối ưu hóa dữ liệu sự kiện của bạn với các mẫu báo cáo thông minh.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
            <span className="material-symbols-outlined text-[18px] text-slate-500">upload_file</span>
            Nhập mẫu mới
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Tạo báo cáo AI
          </button>
        </div>
      </motion.div>

      {/* ── Main Content: 2 columns ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* LEFT: Templates + Recent Reports */}
        <div className="xl:col-span-2 space-y-4">
          {/* Template Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => !t.wide).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(99,102,241,0.1)' }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${t.iconBg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-[22px] ${t.iconColor}`}>{t.icon}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-slate-800 mb-1">{t.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(t)}
                  className="mt-auto flex items-center gap-1 text-indigo-600 text-xs font-black hover:gap-2 transition-all group/btn"
                >
                  {t.cta}
                  <span className="material-symbols-outlined text-[14px] transition-transform group-hover/btn:translate-x-0.5">arrow_forward</span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Wide template card */}
          {templates.filter(t => t.wide).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(139,92,246,0.1)' }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${t.iconBg} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined text-[26px] ${t.iconColor}`}>{t.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-slate-800">{t.title}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${t.badgeColor}`}>{t.badge}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(t)}
                  className="shrink-0 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  {t.cta}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-slate-800 text-sm">Báo cáo gần đây</h2>
              <button className="text-xs font-black text-indigo-600 hover:underline flex items-center gap-1">
                Xem tất cả <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
            <div className="space-y-2">
              {recentReports.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-indigo-600 text-[18px]">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">{r.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Tạo bởi {r.creator} • {r.time}
                    </p>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 ${r.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                    {r.status === 'done' ? 'Hoàn thành' : 'Đang xử lý'}
                  </span>
                  <span className="material-symbols-outlined text-slate-300 text-[18px] group-hover:text-slate-400 transition-colors">more_horiz</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Quick Export Panel */}
        <div className="space-y-4">
          {/* Export Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-xl shadow-indigo-200"
          >
            <h2 className="font-black text-base mb-4">Xuất Dữ liệu Nhanh</h2>

            {/* Format selector */}
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Định dạng tệp</p>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {formats.map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition-all text-[11px] font-black ${selectedFormat === fmt
                      ? 'bg-white text-indigo-700 border-white shadow-lg'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{formatIcons[fmt]}</span>
                  {fmt}
                </button>
              ))}
            </div>

            {/* Data toggles */}
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-3">Dữ liệu bao gồm</p>
            <div className="space-y-3 mb-5">
              {[
                { key: 'personal', label: 'Thông tin cá nhân' },
                { key: 'payment', label: 'Chi tiết thanh toán' },
                { key: 'activity', label: 'Lịch sử hoạt động' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm font-semibold opacity-90">{item.label}</span>
                  <button
                    onClick={() => toggleData(item.key)}
                    className={`relative w-10 h-5.5 h-[22px] rounded-full transition-all ${dataToggles[item.key] ? 'bg-white' : 'bg-white/30'
                      }`}
                  >
                    <span className={`absolute top-0.5 w-[18px] h-[18px] rounded-full shadow transition-all ${dataToggles[item.key] ? 'left-[calc(100%-20px)] bg-indigo-600' : 'left-0.5 bg-white/60'
                      }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Export button */}
            <button
              onClick={handleExport}
              className="w-full py-3 bg-white text-indigo-700 font-black rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <AnimatePresence mode="wait">
                {exporting ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    Đang xuất...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Xuất báo cáo
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <p className="text-[10px] opacity-60 text-center mt-3 leading-relaxed">
              Tệp sẽ được gửi qua email sau khi hoàn tất.
            </p>
          </motion.div>

          {/* Custom report CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">info</span>
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 mb-1">Cần báo cáo tùy chỉnh?</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">
                  Đội ngũ kỹ thuật của chúng tôi có thể thiết kế các mẫu báo cáo riêng theo yêu cầu doanh nghiệp.
                </p>
                <button className="text-xs font-black text-indigo-600 hover:underline flex items-center gap-1">
                  Liên hệ tư vấn <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Render Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <GenerateReportModal
            template={selectedTemplate}
            onClose={() => setSelectedTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizerReportTemplatesPage;
