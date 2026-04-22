import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Search,
  User as UserIcon,
  Layout,
  TrendingUp,
  Filter
} from 'lucide-react';

const FeaturedEvents = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Sự kiện nổi bật</h2>
          <p className="text-slate-400 font-bold">Những trải nghiệm độc đáo được đề xuất riêng cho bạn.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-indigo-600 font-black hover:text-indigo-800 transition group text-[15px]">
          Xem tất cả
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 group relative rounded-[40px] overflow-hidden cursor-pointer h-[480px]">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200" alt="tech" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-10">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-xl w-fit mb-4 uppercase tracking-widest">Hội thảo công nghệ</span>
            <h3 className="text-4xl font-black text-white mb-6 leading-tight tracking-tight">TechSummit 2024: Tương lai của AI</h3>
            <div className="flex items-center gap-8 text-white/70 text-sm font-bold">
              <div className="flex items-center gap-2.5"><Calendar className="w-5 h-5" /> 15 Thg 12, 2024</div>
              <div className="flex items-center gap-2.5"><MapPin className="w-5 h-5" /> Trung tâm Hội nghị Quốc gia</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {[
            { id: 2, title: "Gala Networking", desc: "20 Thg 11, 2024 • Khách sạn Pullman", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" },
            { id: 3, title: "Đêm nhạc Indie", desc: "02 Thg 12, 2024 • Nhà hát Thành phố", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600" }
          ].map(c => (
            <div key={c.id} className="flex-1 group relative rounded-[32px] overflow-hidden cursor-pointer h-[224px]">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-[19px] font-black text-white mb-2 leading-snug tracking-tight">{c.title}</h3>
                <p className="text-white/50 text-[12px] font-bold tracking-wide uppercase">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DiscoverEvents = () => {
  const tabs = ['Tất cả', 'Âm nhạc', 'Công nghệ', 'Ẩm thực', 'Nghệ thuật', 'Doanh nghiệp'];
  const [activeTab, setActiveTab] = useState('Tất cả');
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-slate-50 pt-14">
        <div>
           <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Khám phá mọi sự kiện</h2>
           <p className="text-slate-400 font-bold">Tìm kiếm niềm đam mê từ hàng trăm sự kiện sắp tới.</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2.5 rounded-full text-[13px] font-black tracking-wide whitespace-nowrap transition-all ${activeTab === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-50 hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
            <div className="relative h-[240px] overflow-hidden"><img src={`https://picsum.photos/600/400?random=${i+10}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" /></div>
            <div className="p-8 flex flex-col flex-1">
               <div className="flex items-center gap-2 text-indigo-600 text-[11px] font-black uppercase mb-4"><Layout className="w-4 h-4" /> TRỰC TIẾP</div>
               <h3 className="text-[19px] font-black text-slate-900 mb-4 tracking-tight leading-tight">Sự kiện trải nghiệm công nghệ năm 2024</h3>
               <p className="text-slate-400 text-[14px] font-medium leading-relaxed mb-6 flex-1 line-clamp-2">Khám phá xu hướng công nghệ mới nhất.</p>
               <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="text-slate-500 text-[12px] font-bold">200+ tham gia</div>
                  <div className="text-[17px] font-black text-slate-900">Miễn phí</div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AttendeeExplorePage = () => {
  return (
    <div className="p-8 lg:p-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#fbfcff] min-h-screen pb-32">
       {/* Filter Context */}
       <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          <div className="flex-1 flex items-center bg-white border border-slate-100 rounded-[24px] px-6 py-4 w-full shadow-sm">
             <Search className="w-5 h-5 text-slate-400 mr-4" />
             <input type="text" placeholder="Tìm kiếm sự kiện, hội thảo..." className="bg-transparent border-none outline-none text-slate-700 w-full placeholder:text-slate-400 font-bold text-[15px]" />
          </div>
          <div className="flex items-center gap-3">
             <button className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] font-bold text-[14px] text-slate-600 flex items-center gap-2 shadow-sm"><Calendar className="w-5 h-5" /> Ngày</button>
             <button className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] font-bold text-[14px] text-slate-600 flex items-center gap-2 shadow-sm"><MapPin className="w-5 h-5" /> Vị trí</button>
             <button className="bg-indigo-600 w-[58px] h-[58px] rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-100"><Filter className="w-6 h-6" /></button>
          </div>
       </div>
       <FeaturedEvents />
       <DiscoverEvents />
    </div>
  );
};

export default AttendeeExplorePage;
