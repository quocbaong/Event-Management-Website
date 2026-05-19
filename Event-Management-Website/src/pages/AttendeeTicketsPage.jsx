import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Share2, 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Monitor,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  AlertCircle,
  Tag,
  Search,
  ChevronRight,
  Printer
} from 'lucide-react';
import { registrationService } from '../services/registrationService';

const categoryMap = {
  MUSIC: { label: 'ÂM NHẠC', icon: 'music_note', color: 'from-pink-500 to-rose-600', text: 'text-rose-500', bg: 'bg-rose-50' },
  TECH: { label: 'CÔNG NGHỆ', icon: 'lan', color: 'from-blue-500 to-indigo-600', text: 'text-indigo-500', bg: 'bg-indigo-50' },
  FOOD: { label: 'ẨM THỰC', icon: 'restaurant', color: 'from-amber-500 to-orange-600', text: 'text-orange-500', bg: 'bg-orange-50' },
  ART: { label: 'NGHỆ THUẬT', icon: 'palette', color: 'from-purple-500 to-violet-600', text: 'text-violet-500', bg: 'bg-violet-50' },
  BUSINESS: { label: 'DOANH NGHIỆP', icon: 'rocket_launch', color: 'from-emerald-500 to-teal-600', text: 'text-emerald-500', bg: 'bg-emerald-50' },
  SPORTS: { label: 'THỂ THAO', icon: 'sports_soccer', color: 'from-sky-500 to-blue-600', text: 'text-sky-500', bg: 'bg-sky-50' },
  EDUCATION: { label: 'GIÁO DỤC', icon: 'school', color: 'from-cyan-500 to-blue-500', text: 'text-cyan-600', bg: 'bg-cyan-50' },
  ENTERTAINMENT: { label: 'GIẢI TRÍ', icon: 'celebration', color: 'from-fuchsia-500 to-pink-600', text: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
  OTHER: { label: 'KHÁC', icon: 'event', color: 'from-slate-500 to-slate-700', text: 'text-slate-600', bg: 'bg-slate-50' }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatPrice = (price) => {
  if (price === undefined || price === null || price === 0) return 'Miễn phí';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const AttendeeTicketsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await registrationService.getMyRegistrations();
        const data = response.data || [];
        setRegistrations(data);
        
        const selectedId = location.state?.selectedRegId;
        if (selectedId) {
          const matched = data.find(r => r.id === selectedId);
          if (matched) {
            setSelectedReg(matched);
            return;
          }
        }
        
        if (data.length > 0) {
          setSelectedReg(data[0]);
        }
      } catch (err) {
        console.error('Error fetching registrations:', err);
        setError('Không thể tải danh sách vé. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, [location.state]);

  if (loading) {
    return (
      <div className="p-8 lg:p-12 flex flex-col items-center justify-center min-h-[500px] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Đang tải vé của bạn...</p>
      </div>
    );
  }

  const filteredRegistrations = registrations.filter(reg => 
    reg.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (registrations.length === 0) {
    return (
      <div className="p-8 lg:p-12 flex flex-col items-center justify-center min-h-[600px] text-center bg-gradient-to-b from-white to-slate-50/50">
        <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-200 animate-bounce">
          <span className="material-symbols-outlined text-5xl">confirmation_number</span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-3">Chưa có vé nào được đăng ký</h2>
        <p className="text-slate-500 text-sm max-w-[440px] mb-8 leading-relaxed font-medium">
          Bạn chưa sở hữu chiếc vé nào. Hãy tham gia ngay các sự kiện âm nhạc, công nghệ và nghệ thuật đỉnh cao để nhận vé điện tử của bạn!
        </p>
        <button 
          onClick={() => navigate('/attendee/explore')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4.5 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <span>Khám phá sự kiện ngay</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const activeReg = selectedReg || registrations[0];
  const catInfo = categoryMap[activeReg.eventCategory] || categoryMap.OTHER;

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in duration-500 bg-[#fbfcff] min-h-screen">
      
      {/* 1. Modern Page Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 pb-6 border-b border-slate-100">
        <div className="max-w-[700px] space-y-2">
          <span className="text-indigo-600 text-xs font-black uppercase tracking-[0.2em] bg-indigo-50 px-3.5 py-1.5 rounded-full">
            Vé của tôi
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight pt-1">
            Quản lý Vé
          </h1>
          <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-[620px]">
            Toàn bộ vé điện tử và lịch sử giao dịch của bạn được lưu trữ tại đây. Vui lòng xuất trình mã QR tương ứng để Check-in tại quầy đón tiếp.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
          <button 
            onClick={() => window.print()}
            className="flex-1 xl:flex-none flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-4 rounded-2xl font-bold text-xs transition-all active:scale-95 shadow-sm"
          >
            <Printer className="w-4.5 h-4.5 text-slate-500" />
            <span>In hóa đơn / Vé</span>
          </button>
          <button 
            onClick={() => navigate('/attendee/explore')}
            className="flex-1 xl:flex-none flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-lg shadow-indigo-100"
          >
            <span>Mua thêm vé</span>
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Column: Orders list with Search */}
        <div className="xl:col-span-4 space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Hóa đơn của bạn</h3>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm sự kiện bằng tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2 no-scrollbar">
            {filteredRegistrations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
                <p className="text-slate-400 text-xs font-bold">Không tìm thấy sự kiện nào khớp</p>
              </div>
            ) : (
              filteredRegistrations.map((reg) => {
                const isActive = activeReg.id === reg.id;
                const dateStr = reg.confirmedAt || reg.createdAt;
                return (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedReg(reg)}
                    className={`p-6 rounded-[28px] border transition-all duration-300 relative group cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-tr from-indigo-50/50 to-purple-50/20 border-indigo-600 shadow-md'
                        : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                        reg.status === 'CONFIRMED'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {reg.status === 'CONFIRMED' ? 'Đã xác thực' : 'Đang xử lý'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {formatDate(dateStr).split(',')[1]}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-800 text-[14px] line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {reg.eventTitle || 'Sự kiện'}
                    </h4>

                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-50">
                      <span className="text-slate-400 text-xs font-bold">
                        {reg.tickets?.length || 0} vé
                      </span>
                      <span className="text-slate-900 font-extrabold text-xs">
                        {formatPrice(reg.finalAmount)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Middle Column: Active Ticket designed as a premium Physical Ticket Card */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-100 border border-slate-100 flex flex-col relative">
            
            {/* 1. Banner Image Header */}
            <div className="relative w-full h-[220px] overflow-hidden shrink-0 bg-slate-950 flex flex-col justify-end p-8">
              {activeReg.eventBannerUrl ? (
                <img 
                  src={activeReg.eventBannerUrl} 
                  alt={activeReg.eventTitle} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 to-purple-950 opacity-80" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              
              <div className="relative z-20 space-y-2">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest bg-gradient-to-r ${catInfo.color} shadow-sm inline-block`}>
                  {catInfo.label}
                </span>
                <h3 className="text-2xl font-black text-white leading-tight tracking-tight line-clamp-2">
                  {activeReg.eventTitle}
                </h3>
                <p className="text-white/50 font-bold text-[11px] uppercase tracking-wider">
                  Mã đăng ký: #{activeReg.id.toString().substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* 2. Sleek Ticket Notch Separator */}
            <div className="relative flex items-center justify-between shrink-0 bg-white">
              {/* Left Cutout */}
              <div className="w-4 h-8 bg-[#fbfcff] rounded-r-full border-y border-r border-slate-100 -ml-0.5" />
              {/* Dashed Line */}
              <div className="flex-1 border-t-2 border-dashed border-slate-100 mx-3" />
              {/* Right Cutout */}
              <div className="w-4 h-8 bg-[#fbfcff] rounded-l-full border-y border-l border-slate-100 -mr-0.5" />
            </div>

            {/* 3. QR Codes / Tickets Listing inside */}
            <div className="p-8 pt-4 flex-1 flex flex-col justify-center gap-6 bg-white">
              
              {activeReg.status !== 'CONFIRMED' && (
                <div className="p-6 bg-amber-50/75 border border-amber-100 rounded-3xl flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h5 className="font-black text-slate-800 text-[14px]">Giao dịch chưa hoàn tất</h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Đăng ký của bạn chưa được thanh toán thành công. Hãy hoàn tất thanh toán để nhận vé tham gia.
                    </p>
                    <button 
                      onClick={() => navigate(`/events/${activeReg.eventId}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-md shadow-indigo-100"
                    >
                      Thanh toán ngay
                    </button>
                  </div>
                </div>
              )}

              {activeReg.status === 'CONFIRMED' && activeReg.tickets && activeReg.tickets.map((t, idx) => (
                <div 
                  key={t.id || idx} 
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 relative group overflow-hidden"
                >
                  {/* Subtle scan line animation */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500/20 group-hover:animate-ping"></div>

                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0 relative">
                    <img 
                      src={t.qrImageUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${t.qrCodeToken || t.ticketCode}`} 
                      alt="QR Code" 
                      className="w-24 h-24 object-contain" 
                    />
                  </div>
                  
                  <div className="text-center sm:text-left space-y-2.5 flex-1">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Mã vé của bạn</span>
                      <p className="text-lg font-black text-indigo-600 tracking-tight">#{t.ticketCode}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase">
                        {t.ticketTypeName}
                      </span>
                      <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-wider">Hợp lệ</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ticket Footer details */}
            <div className="px-8 pb-8 bg-white flex justify-between items-center text-[11px] font-bold text-slate-400 border-t border-slate-50 pt-6">
              <span>Hệ thống Prestige Planner</span>
              <span>Hỗ trợ check-in 24/7</span>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule Details & Smart Wallets */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Detailed Schedule info */}
          <div className="bg-white p-8 rounded-[36px] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Chi tiết lịch trình</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Thời gian bắt đầu</p>
                  <p className="text-[14px] font-black text-slate-800 leading-snug">
                    {formatDate(activeReg.eventStartDate) || 'Đang cập nhật'}
                  </p>
                  <p className="text-xs text-slate-500 font-bold">
                    {formatTime(activeReg.eventStartDate)} - {formatTime(activeReg.eventEndDate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Địa điểm tổ chức</p>
                  <p className="text-[14px] font-black text-slate-800 leading-snug">
                    {activeReg.eventVenue || 'Đang cập nhật'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Smart Wallet Integrations */}
          <div className="space-y-3 pt-2">
            <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 py-4.5 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all active:scale-95 shadow-sm text-xs">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <span>Thêm vào Google Wallet</span>
            </button>
            <button className="w-full bg-black hover:bg-zinc-900 text-white py-4.5 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all active:scale-95 shadow-lg text-xs">
              <Monitor className="w-5 h-5 text-white/90" />
              <span>Thêm vào Apple Wallet</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AttendeeTicketsPage;
