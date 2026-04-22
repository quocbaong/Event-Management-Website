import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  ChevronRight, 
  Search,
  CheckCircle2,
  Clock,
  QrCode,
  ArrowRight,
  TrendingUp,
  Layout
} from 'lucide-react';

const AttendeeEventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const events = [
    {
      id: 1,
      title: "Hội nghị Đổi mới Sáng tạo 2024",
      date: "20 Tháng 12, 2024",
      location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
      category: "TECH SUMMIT",
      status: "ĐÃ XÁC NHẬN",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
      attendees: ["https://avatar.vercel.sh/user1.png", "https://avatar.vercel.sh/user2.png"],
      count: 120
    },
    {
      id: 2,
      title: "Triển lãm Nghệ thuật Số \"Sắc Màu\"",
      date: "15 Tháng 01, 2025",
      location: "Bảo tàng Mỹ thuật TP.HCM",
      category: "EXHIBITION",
      status: "ĐÃ XÁC NHẬN",
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=600",
      attendees: ["https://avatar.vercel.sh/user3.png", "https://avatar.vercel.sh/user4.png"],
      count: 45
    },
    {
      id: 3,
      title: "Workshop: Nghệ thuật Pha Cà phê",
      date: "05 Tháng 02, 2025",
      location: "The Lab Coffee Studio, Đà Nẵng",
      category: "WORKSHOP",
      status: "CHỜ DUYỆT",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
      attendees: ["https://avatar.vercel.sh/user5.png"],
      count: 8
    }
  ];

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
        
        <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[22px] font-black text-[15px] shadow-xl shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
            <div className="relative h-[240px] overflow-hidden">
               <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                 {event.category}
               </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
               <div className="flex justify-between items-start gap-4 mb-6">
                  <h3 className="text-[20px] font-black text-slate-800 leading-tight tracking-tight">
                    {event.title}
                  </h3>
                  <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black whitespace-nowrap ${
                    event.status === 'ĐÃ XÁC NHẬN' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {event.status}
                  </span>
               </div>

               <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-[13px] font-bold text-slate-500">
                    <Calendar className="w-4.5 h-4.5 text-indigo-500" /> {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-[13px] font-bold text-slate-400 leading-tight">
                    <MapPin className="w-4.5 h-4.5 text-slate-300" /> {event.location}
                  </div>
               </div>

               <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center -space-x-3">
                    {event.attendees.map((avatar, i) => (
                      <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                        <img src={avatar} alt="User" />
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
                      +{event.count}
                    </div>
                  </div>
                  <button className="text-[13px] font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5 group">
                    {event.status === 'CHỜ DUYỆT' ? 'Kiểm tra trạng thái' : 'Chi tiết vé'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

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
                 <div className="bg-white p-6 rounded-[32px] border border-indigo-100/50 shadow-sm flex items-center gap-6 flex-1 min-w-[200px] hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                       <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[13px] font-black text-slate-800">AI Mastery Tour</p>
                       <p className="text-[11px] font-bold text-slate-400">25 Tháng 01</p>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-[32px] border border-indigo-100/50 shadow-sm flex items-center gap-6 flex-1 min-w-[200px] hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                       <Layout className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[13px] font-black text-slate-800">UI/UX Meetup</p>
                       <p className="text-[11px] font-bold text-slate-400">12 Tháng 02</p>
                    </div>
                 </div>
              </div>
           </div>
           {/* Abstract Design Element */}
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
           <button className="text-[14px] font-black text-indigo-600 hover:underline underline-offset-4">
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
