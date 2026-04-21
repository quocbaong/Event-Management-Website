import React from 'react';
import { 
  Calendar, 
  Ticket, 
  Star,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// ---------- Sub-components ----------

const StatCard = ({ icon: Icon, label, value, badge, iconColor, iconBg }) => (
  <div className="bg-white p-7 rounded-[40px] shadow-sm border border-slate-50 flex items-center justify-between flex-1 min-w-[300px] relative overflow-hidden group hover:shadow-md transition-all">
    <div className="flex items-center gap-6">
      <div className={`p-4.5 rounded-[22px] ${iconBg} ${iconColor} transition-transform group-hover:scale-110`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-[13px] font-black text-slate-400 uppercase tracking-tight mb-1">{label}</p>
        <p className="text-4xl font-black text-slate-800 tracking-tighter">{value}</p>
      </div>
    </div>
    {badge && (
      <div className="absolute top-5 right-5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight border border-indigo-100 shadow-sm">
        {badge}
      </div>
    )}
  </div>
);

const HeroBanner = () => (
  <div className="relative h-[440px] rounded-[48px] overflow-hidden bg-slate-900 group shadow-2xl shadow-indigo-100">
    <img 
      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200" 
      alt="Hero" 
      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    
    <div className="absolute inset-0 p-12 flex flex-col justify-end">
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-black uppercase">Trực tiếp</span>
        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest">Tech Summit 2024</span>
      </div>
      
      <h3 className="text-[48px] font-black text-white leading-[1.1] mb-8 max-w-[700px] tracking-tight">
        Sáng tạo tương lai với AI & Blockchain
      </h3>
      
      <div className="flex flex-wrap items-center gap-14">
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-4xl font-black text-white">02</p>
            <p className="text-[11px] font-black text-white/50 uppercase tracking-widest">Ngày</p>
          </div>
          <div className="text-center text-white/30 text-3xl font-light py-1">:</div>
          <div className="text-center">
            <p className="text-4xl font-black text-white">14</p>
            <p className="text-[11px] font-black text-white/50 uppercase tracking-widest">Giờ</p>
          </div>
          <div className="text-center text-white/30 text-3xl font-light py-1">:</div>
          <div className="text-center">
            <p className="text-4xl font-black text-white">55</p>
            <p className="text-[11px] font-black text-white/50 uppercase tracking-widest">Phút</p>
          </div>
        </div>
        
        <div className="flex gap-5">
          <button className="bg-white text-slate-900 px-10 py-5 rounded-[24px] font-black text-[15px] hover:bg-slate-100 transition-all shadow-xl shadow-white/10 active:scale-95">
            Tham gia ngay
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-[24px] font-black text-[15px] transition-all">
            Lưu lịch trình
          </button>
        </div>
      </div>
    </div>
  </div>
);

const WeeklyScheduleWidget = () => (
  <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-50 flex-1">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Lịch trình tuần này</h3>
        <p className="text-[13px] font-bold text-slate-400">Xem các hoạt động đã đăng ký trong tuần của bạn</p>
      </div>
      <button className="text-[14px] font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 group">
        Xem toàn bộ <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <div className="space-y-0">
      <div className="flex gap-8 pb-12 border-l-2 border-slate-100 pl-10 relative ml-6 last:border-transparent">
        <div className="absolute top-1 -left-[11px] w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow-lg shadow-indigo-100 transition-transform hover:scale-125" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Thứ Ba</span>
            <p className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">09:00 - 10:30</p>
          </div>
          <h5 className="font-black text-[18px] text-slate-800 mb-3 leading-tight">Khai mạc & Keynote: Tầm nhìn 2030</h5>
          <div className="flex items-center gap-4 text-[13px] text-slate-400 font-bold">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-300" /> Hội trường A</div>
            <div className="flex items-center gap-1.5 font-black text-slate-500">• Diễn giả: Dr. Sarah Chen</div>
          </div>
        </div>
        <button className="h-12 px-6 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-600 rounded-[20px] text-[12px] font-black uppercase tracking-tight transition-all self-center border border-indigo-100/50 shadow-sm active:scale-95">
          Nhắc nhở
        </button>
      </div>

      <div className="flex gap-8 pb-12 border-l-2 border-slate-100 pl-10 relative ml-6 last:border-transparent">
        <div className="absolute top-1 -left-[11px] w-5 h-5 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 opacity-60">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Thứ Năm</span>
            <p className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">11:00 - 12:30</p>
          </div>
          <h5 className="font-extrabold text-[18px] text-slate-500 mb-3 leading-tight opacity-70">Workshop: Thiết kế hệ thống mở rộng</h5>
          <div className="flex items-center gap-4 text-[13px] text-slate-400 font-bold opacity-70">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Phòng thảo luận 302</div>
            <div className="flex items-center gap-1.5">• Diễn giả: Phan Minh</div>
          </div>
        </div>
        <button className="h-12 px-6 bg-slate-50 text-slate-300 rounded-[20px] text-[12px] font-black uppercase tracking-tight cursor-default self-center opacity-50 border border-slate-100">
          Nhắc nhở
        </button>
      </div>
    </div>
  </div>
);

const SuggestionSmallCard = ({ image, title, category, date, attendees }) => (
  <div className="bg-white rounded-[40px] p-5 border border-slate-50 shadow-sm hover:shadow-lg transition-all duration-500 group flex-1">
    <div className="relative h-40 rounded-[28px] overflow-hidden mb-5">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
        {category}
      </div>
    </div>
    <h4 className="text-[16px] font-black text-slate-800 leading-tight mb-4 line-clamp-2 h-[44px]">{title}</h4>
    <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-50">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" /> {date}
      </div>
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5" /> {attendees}+
      </div>
    </div>
  </div>
);

// ---------- Main Page Component ----------

const AttendeeDashboardPage = () => {
  const chartData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6'],
    datasets: [{
      data: [45, 65, 85, 75, 55],
      backgroundColor: '#6366f1',
      hoverBackgroundColor: '#4f46e5',
      borderRadius: 10,
      barThickness: 20,
    }]
  };

  return (
    <div className="p-12 space-y-14 animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#fbfcff] min-h-screen pb-20">
      
      {/* 1. Refined Greeting & 2 Stats Cards */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
        <div className="max-w-[600px]">
          <h2 className="text-[42px] font-black text-slate-900 tracking-tight leading-[1.1] mb-5">
            Chào mừng quay trở lại, Minh! 👋
          </h2>
          <div className="inline-flex items-center bg-indigo-50 px-5 py-2.5 rounded-2xl border border-indigo-100 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="text-[11px] font-black uppercase tracking-[0.1em] text-indigo-700">
              Tài khoản Premium
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 flex-1 w-full xl:w-auto">
          <StatCard 
            icon={Calendar} iconBg="bg-blue-50" iconColor="text-blue-600"
            label="Sự kiện sắp tới" value="12" badge="+2 mới"
          />
          <StatCard 
            icon={Ticket} iconBg="bg-purple-50" iconColor="text-purple-600"
            label="Vé đã đăng ký" value="05"
          />
        </div>
      </div>

      <HeroBanner />

      {/* 2. Grid Widgets - Refined for Minimalist V8 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-8">
          <WeeklyScheduleWidget />
        </div>

        <div className="xl:col-span-4 space-y-10">
          <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-50 h-full flex flex-col justify-between">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-12 flex justify-between items-center">
              Mức độ tham gia
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </h3>
            <div className="h-48 mb-10">
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 10, weight: '900' }, color: '#94a3b8' } }, y: { display: false } } }} />
            </div>
            <div className="flex justify-between items-end border-t border-slate-50 pt-8">
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Trung bình tuần</p>
                <div className="flex items-center gap-4">
                  <p className="text-[32px] font-black text-slate-800 tracking-tighter">72%</p>
                  <span className="text-[14px] font-black text-emerald-500">+12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Suggestions Section */}
      <div className="space-y-10 pt-6">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Gợi ý dành riêng cho bạn</h3>
          <div className="flex gap-4">
            <button className="p-3.5 rounded-full bg-white border border-slate-100 hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-3.5 rounded-full bg-white border border-slate-100 hover:bg-slate-50 transition-all shadow-sm">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <SuggestionSmallCard 
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600"
            title="UI/UX Trends 2024: Beyond Mobile Optimization" category="Công nghệ" date="28/05" attendees="450"
          />
          <SuggestionSmallCard 
           image="https://images.unsplash.com/photo-1460518451285-cd7ba7fd0d69?auto=format&fit=crop&q=80&w=600"
            title="Digital Art & NFTs Workshop: Master Class" category="Nghệ thuật" date="02/06" attendees="120"
          />
          <SuggestionSmallCard 
           image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
            title="Cybersecurity: New Era of Digital Defense" category="Công nghệ" date="05/06" attendees="800"
          />
          <SuggestionSmallCard 
           image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
            title="Sustainable Fashion Expo 2024 Showcase" category="Lifestyle" date="12/06" attendees="2.1k"
          />
        </div>
      </div>

      <footer className="pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold text-[14px] opacity-80">
        <p>© 2024 Nexus Events. Mọi quyền được bảo lưu.</p>
        <div className="flex gap-10">
          <span className="cursor-pointer hover:text-indigo-600 transition-all">Điều khoản dịch vụ</span>
          <span className="cursor-pointer hover:text-indigo-600 transition-all">Chính sách bảo mật</span>
          <span className="cursor-pointer hover:text-indigo-600 transition-all">Trung tâm hỗ trợ</span>
        </div>
      </footer>

    </div>
  );
};

export default AttendeeDashboardPage;
