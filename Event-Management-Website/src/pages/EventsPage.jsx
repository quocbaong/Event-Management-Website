import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


const EventsNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] py-2.5 sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="cursor-pointer group flex items-center"
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            alt="EventArchitect"
            className="h-9 md:h-15 w-auto object-contain transition-all duration-300 group-hover:scale-[1.05]"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="text-[#e4322a] font-medium border-b-2 border-[#e4322a] pb-1 cursor-pointer">
            Sự kiện
          </div>
          <div className="text-slate-500 font-medium hover:text-[#e4322a] transition-colors cursor-pointer pb-1">
            Khám phá
          </div>
          <div className="text-slate-500 font-medium hover:text-[#e4322a] transition-colors cursor-pointer pb-1">
            Về chúng tôi
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="text-[15px] font-body font-bold text-slate-700 hover:text-[#e4322a] transition-all duration-300 px-4 py-2 hover:bg-slate-50 rounded-lg"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </button>
          <button 
            className="bg-[#e4322a] hover:bg-[#cc2d26] text-white px-7 py-2.5 rounded-lg text-[15px] font-headline font-bold transition-all duration-300 shadow-sm active:scale-95"
            onClick={() => navigate('/signup')}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </nav>
  );
};

const FilterSection = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 mt-8 mb-12">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="flex-1 flex items-center bg-slate-100 rounded-full px-5 py-3.5 w-full">
          <span className="material-symbols-outlined text-slate-400 mr-3">search</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm sự kiện, hội thảo, buổi hòa nhạc..." 
            className="bg-transparent border-none outline-none text-slate-700 w-full placeholder:text-slate-400 font-medium text-[15px]" 
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-slate-100 rounded-full px-5 py-3.5 cursor-pointer hover:bg-slate-200 transition">
            <span className="material-symbols-outlined text-slate-600 mr-2 text-[20px]">calendar_today</span>
            <span className="text-slate-700 font-medium text-[15px]">Ngày</span>
          </div>
          <div className="flex items-center bg-slate-100 rounded-full px-5 py-3.5 cursor-pointer hover:bg-slate-200 transition">
            <span className="material-symbols-outlined text-slate-600 mr-2 text-[20px]">location_on</span>
            <span className="text-slate-700 font-medium text-[15px]">Vị trí</span>
          </div>
          <div className="flex items-center justify-center bg-[#5c46e5] rounded-full w-12 h-12 min-w-[3rem] cursor-pointer hover:bg-[#4d38da] transition shadow-md shadow-[#5c46e5]/20">
            <span className="material-symbols-outlined text-white text-[20px]">tune</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedEvents = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 font-headline">Sự kiện nổi bật</h2>
          <p className="text-slate-500 font-medium">Những trải nghiệm độc đáo được đề xuất riêng cho bạn.</p>
        </div>
        <div className="hidden sm:flex items-center text-[#5c46e5] font-semibold cursor-pointer hover:text-[#4d38da] transition group">
          Xem tất cả 
          <span className="material-symbols-outlined ml-1 text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[480px]">
        {/* Big Card */}
        <div className="lg:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer h-[400px] lg:h-full">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200&h=800" 
            alt="AI Summit" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
            <span className="bg-[#5c46e5] text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-4 tracking-wide uppercase">Hội thảo công nghệ</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">TechSummit 2024: Tương lai của AI</h3>
            <div className="flex items-center gap-6 text-slate-200 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                15 Thg 12, 2024
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                Trung tâm Hội nghị Quốc gia
              </div>
            </div>
          </div>
        </div>

        {/* Small Cards Stack */}
        <div className="flex flex-col gap-6 h-[480px] lg:h-full">
          {/* Card 1 */}
          <div className="flex-1 group relative rounded-3xl overflow-hidden cursor-pointer">
            <img 
               src="https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&q=80&w=600&h=400"  
              alt="Networking" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white mb-2 leading-snug">Gala Networking: Kết nối Doanh nghiệp</h3>
              <p className="text-slate-300 text-xs font-medium">20 Thg 11, 2024 • Khách sạn Pullman</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex-1 group relative rounded-3xl overflow-hidden cursor-pointer">
            <img 
               src="https://images.unsplash.com/photo-1516280440502-61138240ae7c?auto=format&fit=crop&q=80&w=600&h=400" 
              alt="Indie Music" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white mb-2 leading-snug">Đêm nhạc Indie: Những Giai điệu Mới</h3>
              <p className="text-slate-300 text-xs font-medium">02 Thg 12, 2024 • Nhà hát Thành phố</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DiscoverEvents = () => {
  const tabs = ['Tất cả', 'Âm nhạc', 'Công nghệ', 'Ẩm thực', 'Nghệ thuật', 'Doanh nghiệp'];
  const [activeTab, setActiveTab] = useState('Tất cả');

  const events = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=400",
      category: 'LỄ HỘI',
      title: 'Lễ hội Ánh sáng Hà Nội 2024',
      description: 'Khám phá những màn trình diễn ánh sáng 3D mapping ngoạn mục tại trung tâm thủ đô.',
      attendees: '500+ tham gia',
      price: 'Miễn phí',
      badge: 'Phổ biến',
      icon: 'celebration'
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=600&h=400",
      category: 'NGHỆ THUẬT',
      title: 'Triển lãm "Sắc Màu Đương Đại"',
      description: 'Nơi hội tụ các tác phẩm từ những nghệ sĩ trẻ tài năng nhất khu vực Đông Nam Á.',
      attendees: '120+ tham gia',
      price: '150.000đ',
      badge: 'Mới nhất',
      icon: 'palette'
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556761175-5973b0f62e6e?auto=format&fit=crop&q=80&w=600&h=400",
      category: 'KHỞI NGHIỆP',
      title: 'Startup Coffee: Gọi vốn thành công',
      description: 'Lắng nghe chia sẻ thực tế từ các Founder đã thành công trong việc gọi vốn Series A.',
      attendees: '45+ tham gia',
      price: '450.000đ',
      icon: 'rocket_launch'
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600&h=400",
      category: 'ẨM THỰC',
      title: 'Workshop: Nấu ăn chuẩn Fine Dining',
      description: 'Học cách chế biến và trình bày món ăn đẳng cấp từ đầu bếp đạt sao Michelin.',
      attendees: '15 tham gia',
      price: '1.200.000đ',
      icon: 'restaurant'
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=400",
      category: 'CÔNG NGHỆ',
      title: 'Diễn đàn Chuyển đổi số 2024',
      description: 'Thảo luận về các xu hướng công nghệ mới nhất đang thay đổi bộ mặt doanh nghiệp Việt.',
      attendees: '800+ tham gia',
      price: '900.000đ',
      badge: 'Sắp diễn ra',
      icon: 'lan'
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600&h=400",
      category: 'SỨC KHỎE',
      title: 'Ngày hội Yoga & Thiền định',
      description: 'Tìm lại sự cân bằng trong tâm hồn thông qua các bài tập yoga và kỹ thuật hít thở sâu.',
      attendees: '200+ tham gia',
      price: 'Miễn phí',
      icon: 'self_improvement'
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 mb-20 relative">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-8 gap-6 pt-10">
        <h2 className="text-3xl font-bold text-slate-900 font-headline whitespace-nowrap">Khám phá mọi sự kiện</h2>
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 xl:pb-0 w-full xl:w-auto relative pr-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="absolute right-0 top-0 bottom-0 my-auto h-10 w-10 bg-[#5c46e5] text-white rounded-full flex items-center justify-center shadow-md shadow-[#5c46e5]/20 hover:bg-[#4d38da] transition xl:hidden z-10">
             <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full">
            <div className="relative h-[220px] overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {event.badge && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {event.badge}
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 text-[#5c46e5] text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-[16px]">{event.icon}</span>
                {event.category}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#5c46e5] transition-colors leading-snug">
                {event.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  {event.attendees}
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {event.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-2">
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-300 hover:text-slate-600 transition">
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#5c46e5] text-white flex items-center justify-center font-semibold shadow-md shadow-[#5c46e5]/20">1</button>
        <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center font-semibold transition">2</button>
        <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center font-semibold transition">3</button>
        <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 hover:text-slate-800 transition">
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

const EventsFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-8">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-[#5c46e5] font-bold text-xl mb-2">EventArchitect</div>
          <p className="text-slate-500 text-sm font-medium text-center md:text-left">
            © 2026 EventArchitect. Nền tảng quản lý sự kiện chuyên nghiệp.
          </p>
        </div>
        <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-[#5c46e5] transition">Điều khoản</a>
          <a href="#" className="hover:text-[#5c46e5] transition">Bảo mật</a>
          <a href="#" className="hover:text-[#5c46e5] transition">Liên hệ</a>
          <a href="#" className="hover:text-[#5c46e5] transition">Trợ giúp</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#5c46e5] hover:border-[#5c46e5]/30 cursor-pointer transition">
             <span className="material-symbols-outlined text-[20px]">share</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#5c46e5] hover:border-[#5c46e5]/30 cursor-pointer transition">
            <span className="material-symbols-outlined text-[20px]">language</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-[#5c46e5]/20">
      <EventsNavbar />
      <main>
        <FilterSection />
        <FeaturedEvents />
        <DiscoverEvents />
      </main>
      <EventsFooter />
    </div>
  );
};

export default EventsPage;
