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
  AlertCircle
} from 'lucide-react';
import { registrationService } from '../services/registrationService';

const categoryMap = {
  MUSIC: { label: 'ÂM NHẠC', icon: 'music_note' },
  TECH: { label: 'CÔNG NGHỆ', icon: 'lan' },
  FOOD: { label: 'ẨM THỰC', icon: 'restaurant' },
  ART: { label: 'NGHỆ THUẬT', icon: 'palette' },
  BUSINESS: { label: 'DOANH NGHIỆP', icon: 'rocket_launch' },
  SPORTS: { label: 'THỂ THAO', icon: 'sports_soccer' },
  EDUCATION: { label: 'GIÁO DỤC', icon: 'school' },
  ENTERTAINMENT: { label: 'GIẢI TRÍ', icon: 'celebration' },
  OTHER: { label: 'KHÁC', icon: 'event' }
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

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await registrationService.getMyRegistrations();
        const data = response.data || [];
        setRegistrations(data);
        
        // Auto-select based on location state, otherwise default to first
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
      <div className="p-8 lg:p-12 flex items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="p-8 lg:p-12 flex flex-col items-center justify-center min-h-[500px] text-center bg-[#fbfcff]">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-[#5c46e5] mb-6">
          <span className="material-symbols-outlined text-4xl">confirmation_number</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Bạn chưa mua vé nào</h2>
        <p className="text-slate-500 text-sm max-w-[400px] mb-8 leading-relaxed">
          Khám phá ngay các sự kiện âm nhạc, công nghệ và nghệ thuật hấp dẫn để đăng ký chiếc vé đầu tiên!
        </p>
        <button 
          onClick={() => navigate('/events')}
          className="bg-[#5c46e5] hover:bg-[#4d38da] text-white px-8 py-4 rounded-[22px] font-black text-[15px] shadow-xl shadow-indigo-100 transition-all active:scale-95"
        >
          Khám phá sự kiện
        </button>
      </div>
    );
  }

  const activeReg = selectedReg || registrations[0];
  const catInfo = categoryMap[activeReg.eventCategory] || categoryMap.OTHER;

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#fbfcff] min-h-screen">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-[700px]">
          <h1 className="text-[48px] font-black text-slate-900 leading-tight mb-4 tracking-tighter">
            Vé của tôi
          </h1>
          <p className="text-[15px] font-bold text-slate-400 leading-relaxed max-w-[600px]">
            Thông tin vé điện tử chính thức của bạn. Vui lòng xuất trình mã QR này tại quầy check-in để bắt đầu trải nghiệm.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[22px] font-black text-[15px] shadow-xl shadow-indigo-100 transition-all active:scale-95"
          >
            <Download className="w-5 h-5" />
            In / Tải xuống vé
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left Column: Tickets list */}
        <div className="xl:col-span-4 space-y-4">
          <h3 className="text-lg font-black text-slate-800 tracking-tight mb-4">Danh sách đơn hàng</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {registrations.map((reg) => {
              const isActive = activeReg.id === reg.id;
              const dateStr = reg.confirmedAt || reg.createdAt;
              return (
                <div
                  key={reg.id}
                  onClick={() => setSelectedReg(reg)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-indigo-50/50 border-[#5c46e5] shadow-md shadow-indigo-100'
                      : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      reg.status === 'CONFIRMED'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {reg.status === 'CONFIRMED' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">
                      {formatDate(dateStr).split(',')[1]}
                    </span>
                  </div>
                  <h4 className="font-black text-slate-800 text-[15px] line-clamp-2 leading-snug">
                    {reg.eventTitle || 'Sự kiện'}
                  </h4>
                  <p className="text-xs text-slate-400 font-bold mt-2">
                    {reg.tickets?.length || 0} vé • {formatPrice(reg.finalAmount)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Active Ticket Details */}
        <div className="xl:col-span-5 space-y-8">
          <div className="bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-slate-100 border border-slate-50 flex flex-col h-full min-h-[480px]">
            {/* Visual Header */}
            <div className="relative w-full h-[240px] overflow-hidden shrink-0 bg-indigo-950 flex flex-col justify-end p-8">
              {activeReg.eventBannerUrl ? (
                <img 
                  src={activeReg.eventBannerUrl} 
                  alt={activeReg.eventTitle} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40" 
                />
              ) : (
                <div className="absolute inset-0 bg-[#5c46e5]/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/20 to-transparent z-10" />
              <div className="relative z-20">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest w-fit mb-4 inline-block">
                  {catInfo.label}
                </span>
                <h3 className="text-2xl font-black text-white leading-tight mb-2 tracking-tight line-clamp-2">
                  {activeReg.eventTitle}
                </h3>
                <p className="text-white/60 font-bold text-xs">Mã ĐK: #{activeReg.id.toString().substring(0, 8).toUpperCase()}</p>
              </div>
            </div>

            {/* QR Code Items List */}
            <div className="p-8 flex-1 flex flex-col justify-center gap-6">
              {activeReg.status !== 'CONFIRMED' && (
                <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-black text-slate-800 text-[15px] mb-1">Giao dịch đang chờ thanh toán</h5>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">
                      Vui lòng hoàn tất thanh toán để nhận mã QR tham gia sự kiện.
                    </p>
                    <button 
                      onClick={() => navigate(`/attendee/events/${activeReg.eventId}`)}
                      className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md shadow-indigo-100"
                    >
                      Đi đến trang thanh toán
                    </button>
                  </div>
                </div>
              )}

              {activeReg.status === 'CONFIRMED' && activeReg.tickets && activeReg.tickets.map((t, idx) => (
                <div key={t.id || idx} className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-slate-50 rounded-[32px] border border-slate-100">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                    <img 
                      src={t.qrImageUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${t.qrCodeToken || t.ticketCode}`} 
                      alt="QR Code" 
                      className="w-28 h-28" 
                    />
                  </div>
                  
                  <div className="text-center sm:text-left space-y-3 flex-1">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Mã vé</p>
                      <p className="text-lg font-black text-indigo-600 tracking-tight">#{t.ticketCode}</p>
                    </div>
                    
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Hạng vé</p>
                      <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase">
                        {t.ticketTypeName}
                      </span>
                    </div>

                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center justify-center gap-1.5 w-fit mx-auto sm:mx-0 border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">Hợp lệ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & Venue info */}
        <div className="xl:col-span-3 space-y-6">
          {/* Schedule Detail Card */}
          <div className="bg-white p-8 rounded-[36px] shadow-sm border border-slate-50 space-y-6">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Chi tiết lịch trình</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Ngày diễn ra</p>
                  <p className="text-[15px] font-black text-slate-800 tracking-tight leading-snug">
                    {formatDate(activeReg.eventStartDate) || 'Đang cập nhật'}
                  </p>
                  <p className="text-[12px] font-bold text-slate-500 mt-0.5">
                    {formatTime(activeReg.eventStartDate)} - {formatTime(activeReg.eventEndDate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-100">
                <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Địa điểm</p>
                  <p className="text-[15px] font-black text-slate-800 tracking-tight leading-snug">
                    {activeReg.eventVenue || 'Đang cập nhật'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Buttons */}
          <div className="space-y-3 pt-2">
            <button className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-800 py-4 rounded-2xl flex items-center justify-center gap-3 font-black transition-all active:scale-95 shadow-sm text-sm">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <span>Lưu vào Google Wallet</span>
            </button>
            <button className="w-full bg-black hover:bg-zinc-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black transition-all active:scale-95 shadow-lg shadow-slate-100 text-sm">
              <Monitor className="w-5 h-5 text-white/90" />
              <span>Apple Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeTicketsPage;
