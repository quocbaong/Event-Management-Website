import React from 'react';
import { motion } from 'framer-motion';
import LandingNavbar from '../components/common/LandingNavbar';
import LandingFooter from '../components/common/LandingFooter';

const EventDetailPage = () => {
  const schedule = [
    { time: '08:00 - 09:00', event: 'Đón khách & Check-in kỹ thuật số', description: 'Trải nghiệm quy trình nhận diện khuôn mặt và nhận bộ kit sự kiện điện tử.', icon: 'person_check' },
    { time: '09:00 - 10:30', event: 'Khai mạc & Keynote: Tương lai của AI tại VN', description: 'Phần trình bày đặc biệt từ các đại diện bộ ngành và tập đoàn công nghệ lớn.', icon: 'star' },
    { time: '10:30 - 10:45', event: 'Giải lao & Tea-break', description: 'Giao lưu tự do và thưởng thức trà chiều.', icon: 'coffee' },
    { time: '10:45 - 12:00', event: 'Tọa đàm: Chuyển đổi số trong Doanh nghiệp', description: 'Chiến lược thực thi và những bài học từ thực tế.', icon: 'groups' },
  ];

  const speakers = [
    {
      name: 'Nguyễn Phi Vân',
      role: 'Chủ tịch Hiệp hội Angel Investors',
      desc: 'Chuyên gia hàng đầu về nhượng quyền và đổi mới sáng tạo toàn cầu.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Lê Diệp Kiều Trang',
      role: 'Co-founder Harrison.ai',
      desc: 'Người dẫn dắt các startup công nghệ đột phá tại thị trường quốc tế.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-[#5c46e5]/20 flex flex-col">
      <LandingNavbar />
      
      <main className="pt-24 lg:pt-[100px] flex-1">
        {/* Hero Section */}
        <div className="max-w-[1400px] mx-auto px-6 mb-12">
          <div className="relative rounded-[40px] overflow-hidden h-[400px] lg:h-[500px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600" 
              alt="Hội nghị" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 lg:p-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
              >
                <span className="bg-[#5c46e5] text-white text-[11px] lg:text-[13px] font-bold px-4 py-1.5 rounded-full w-fit mb-6 tracking-widest uppercase inline-block">
                  CÔNG NGHỆ & SÁNG TẠO
                </span>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
                  Hội nghị Kiến tạo Tương lai Kỹ thuật số 2024
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#5c46e5] text-3xl">calendar_today</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Thời gian</p>
                <h3 className="font-bold text-slate-900 text-lg">15 Tháng 12, 2024</h3>
                <p className="text-slate-500 text-sm">08:00 - 17:30</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#5c46e5] text-3xl">location_on</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Địa điểm</p>
                <h3 className="font-bold text-slate-900 text-lg">Vinpearl Convention Center</h3>
                <p className="text-slate-500 text-sm">Phú Quốc, Việt Nam</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-orange-500 text-3xl">confirmation_number</span>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">Giá vé</p>
                <h3 className="font-bold text-slate-900 text-lg">Từ 2.500.000 VNĐ</h3>
                <p className="text-slate-500 text-sm">Bao gồm teabreak & tài liệu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-16">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6 font-headline">Giới thiệu sự kiện</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-[17px]">
                  <p>
                    Hội nghị Kiến tạo Tương lai Kỹ thuật số là diễn đàn hàng đầu quy tụ các chuyên gia, nhà lãnh đạo tư tưởng và những người tiên phong trong lĩnh vực công nghệ tại Việt Nam. Trong bối cảnh kỷ nguyên số đang thay đổi đối chóng mặt, chúng tôi mang đến những góc nhìn đa chiều về Trí tuệ nhân tạo (AI), Chuyển đổi số và Kinh tế bền vững.
                  </p>
                  <p>
                    Sự kiện không chỉ là nơi chia sẻ kiến thức mà còn là cầu nối networking, mở ra cơ hội hợp tác chiến lược cho các doanh nghiệp và cá nhân đam mê đổi mới sáng tạo.
                  </p>
                </div>
              </section>

              {/* Speakers */}
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-8 font-headline">Diễn giả nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {speakers.map((speaker, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-6">
                        <img src={speaker.image} alt={speaker.name} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-50" />
                        <div>
                          <h4 className="font-black text-slate-900 text-lg">{speaker.name}</h4>
                          <p className="text-indigo-600 font-bold text-sm mb-1">{speaker.role}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-slate-500 text-sm leading-relaxed">{speaker.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schedule */}
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-8 font-headline">Lịch trình sự kiện</h2>
                <div className="space-y-4">
                  {schedule.map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white shadow-lg ${idx === 1 ? 'bg-indigo-600 scale-110' : 'bg-slate-200'}`}>
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>
                        {idx !== schedule.length - 1 && <div className="w-[2px] flex-1 bg-slate-100 my-2"></div>}
                      </div>
                      <div className={`flex-1 pb-8 ${idx === 1 ? 'bg-white p-6 rounded-3xl shadow-sm border border-slate-100' : 'pt-2'}`}>
                        <span className="text-slate-400 text-sm font-black mb-1 block uppercase tracking-wider">{item.time}</span>
                        <h4 className="font-black text-slate-900 text-lg mb-2">{item.event}</h4>
                        <p className="text-slate-500 text-[15px]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:w-[420px] w-full relative">
              <div 
                className="lg:sticky lg:top-[120px] space-y-8 z-40"
                style={{ alignSelf: 'flex-start', height: 'fit-content' }}
              >



                {/* Registration Card */}
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Đăng ký tham gia</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">Vé Tiêu chuẩn</span>
                      <span className="text-slate-900 font-bold">2.500.000đ</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600 font-medium">Vé VIP</span>
                      <span className="text-slate-900 font-bold">5.000.000đ</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <span className="text-slate-500 font-medium">Còn trống</span>
                    <span className="text-red-500 font-black">Chỉ còn 15 chỗ</span>
                  </div>

                  <button className="w-full bg-[#5c46e5] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#4d38da] transition shadow-lg shadow-indigo-200 active:scale-[0.98]">
                    Đăng nhập để đăng ký
                  </button>
                  <p className="text-center mt-4 text-xs text-slate-400">
                    Bạn chưa có tài khoản? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Đăng ký ngay</span>
                  </p>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-[40px] overflow-hidden shadow-md border border-slate-100">
                  <div className="h-48 bg-slate-200 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400" 
                      alt="Map" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-slate-900 font-bold text-sm shadow-xl flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">map</span>
                        Mở trong Google Maps
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-black text-slate-900 mb-2">Vinpearl Convention Center</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">Bãi Dài, Gành Dầu, Phú Quốc, Kiên Giang, Việt Nam</p>
                  </div>
                </div>

                {/* Sponsor Card */}
                <div className="bg-orange-50 p-6 rounded-[32px] border border-orange-100 flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-orange-500">verified</span>
                  </div>
                  <p className="text-[13px] text-orange-900 font-medium leading-relaxed">
                    Sự kiện chính thức được bảo trợ bởi <span className="font-black">Hiệp hội Công nghệ số Việt Nam (VINASA)</span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};

export default EventDetailPage;

