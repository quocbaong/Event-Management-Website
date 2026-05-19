import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  Layout as LayoutIcon,
  QrCode
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
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const AttendeeEventsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await registrationService.getMyRegistrations();
        setRegistrations(response.data || []);
      } catch (err) {
        console.error('Error fetching registered events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const filterEvents = () => {
    const now = new Date();
    return registrations.filter((reg) => {
      const eventDate = reg.eventStartDate ? new Date(reg.eventStartDate) : new Date(reg.createdAt);
      if (activeTab === 'upcoming') {
        return eventDate >= now;
      } else {
        return eventDate < now;
      }
    });
  };

  const displayedEvents = filterEvents();

  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#fbfcff] min-h-screen pb-20">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-50 pb-10">
        <div>
          <h1 className="text-[40px] font-black text-slate-900 leading-tight mb-2 tracking-tighter">
            Sự kiện của tôi
          </h1>
          <p className="text-[15px] font-bold text-slate-400 max-w-[600px]">
            Quản lý và theo dõi tất cả các sự kiện bạn đã đăng ký hoặc sắp tham gia.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/events')}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[22px] font-black text-[15px] shadow-xl shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Khám phá thêm sự kiện
        </button>
      </div>

      {/* 2. Tabs Section */}
      <div className="flex gap-4">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-8 py-3.5 rounded-[20px] font-black text-[14px] transition-all ${
            activeTab === 'upcoming' 
            ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100 border border-indigo-50' 
            : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Sắp diễn ra
        </button>
        <button 
          onClick={() => setActiveTab('joined')}
          className={`px-8 py-3.5 rounded-[20px] font-black text-[14px] transition-all ${
            activeTab === 'joined' 
            ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100 border border-indigo-50' 
            : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Đã tham gia
        </button>
      </div>

      {/* 3. Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-[40px] border border-slate-100 h-[380px] animate-pulse flex flex-col">
              <div className="h-[240px] bg-slate-200"></div>
              <div className="p-8 flex-1 space-y-4">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : displayedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedEvents.map((reg) => {
            const catInfo = categoryMap[reg.eventCategory] || categoryMap.OTHER;
            const statusLabel = reg.status === 'CONFIRMED' ? 'ĐÃ XÁC NHẬN' : 'CHỜ THANH TOÁN';
            return (
              <div key={reg.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="relative h-[240px] overflow-hidden bg-slate-100">
                  {reg.eventBannerUrl ? (
                    <img 
                      src={reg.eventBannerUrl} 
                      alt={reg.eventTitle} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-[#5c46e5]/10 flex items-center justify-center text-slate-300">
                      <span className="material-symbols-outlined text-5xl">event</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    {catInfo.label}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <h3 className="text-[20px] font-black text-slate-800 leading-tight tracking-tight line-clamp-2">
                      {reg.eventTitle}
                    </h3>
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black whitespace-nowrap uppercase tracking-wider ${
                      reg.status === 'CONFIRMED' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {statusLabel}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-[13px] font-bold text-slate-500">
                      <Calendar className="w-4.5 h-4.5 text-indigo-500" /> {formatDate(reg.eventStartDate)}
                    </div>
                    <div className="flex items-center gap-3 text-[13px] font-bold text-slate-400 leading-tight">
                      <MapPin className="w-4.5 h-4.5 text-slate-300" /> {reg.eventVenue || 'Đang cập nhật'}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">
                      {reg.tickets?.length || 0} vé
                    </span>
                    <button 
                      onClick={() => navigate('/attendee/tickets', { state: { selectedRegId: reg.id } })}
                      className="text-[13px] font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5 group"
                    >
                      Chi tiết vé
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[32px]">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">event_busy</span>
          <h3 className="text-lg font-black text-slate-700 mb-1">Không có sự kiện</h3>
          <p className="text-slate-500 text-sm">Bạn chưa có sự kiện nào trong danh mục này.</p>
        </div>
      )}

      {/* 4. Bottom Sections Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Suggestion Section */}
        <div className="xl:col-span-8 bg-indigo-50/50 rounded-[48px] p-10 border border-indigo-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-black text-indigo-900 tracking-tight">Gợi ý riêng cho bạn</h3>
            <p className="text-[14px] font-bold text-indigo-700/60 leading-relaxed">
              Dựa trên các sự kiện trước đây, chúng tôi nghĩ bạn sẽ thích những chương trình này.
            </p>
            <div className="flex gap-4">
              <div className="bg-white p-6 rounded-[32px] border border-indigo-100/50 shadow-sm flex items-center gap-6 flex-1 min-w-[200px] hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/events')}>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[13px] font-black text-slate-800">Khám phá Hot</p>
                  <p className="text-[11px] font-bold text-slate-400">Xem ngay các xu hướng</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-indigo-100/50 shadow-sm flex items-center gap-6 flex-1 min-w-[200px] hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/events')}>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                  <LayoutIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[13px] font-black text-slate-800">Mục ưa thích</p>
                  <p className="text-[11px] font-bold text-slate-400">Được đề xuất nhiều</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex w-40 h-40 items-center justify-center opacity-10">
            <span className="text-[140px] font-black text-indigo-900 leading-none select-none">Q</span>
          </div>
        </div>

        {/* Check-in Widget */}
        <div className="xl:col-span-4 bg-slate-50 p-10 rounded-[48px] border border-slate-100 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-16 h-16 bg-white rounded-[24px] shadow-sm flex items-center justify-center">
            <QrCode className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-xl font-black text-slate-800 tracking-tight mb-3">Check-in nhanh chóng</h4>
            <p className="text-[13px] font-bold text-slate-400 leading-relaxed">
              Tất cả mã QR sự kiện của bạn đều được lưu trữ tại một nơi duy nhất.
            </p>
          </div>
          <button onClick={() => navigate('/attendee/tickets')} className="text-[14px] font-black text-indigo-600 hover:underline underline-offset-4">
            Xem tất cả vé
          </button>
        </div>
      </div>

      <footer className="pt-10 flex justify-center text-slate-400 font-bold text-[12px] opacity-60">
        <p>© 2024 EventArchitect. Nền tảng quản lý sự kiện thông minh.</p>
      </footer>
    </div>
  );
};

export default AttendeeEventsPage;
