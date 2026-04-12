import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const phases = [
  {
    id: '01',
    name: 'Lập kế hoạch sự kiện',
    title: 'Lập kế hoạch sự kiện ở mọi giai đoạn',
    features: [
      'Thiết lập lịch trình cho các hoạt động sự kiện',
      'Điều phối hoạt động tài trợ cho sự kiện',
      'Quản lý đăng ký phiên chính thức và tăng cường',
      'Xử lý thủ tục vào cửa cho các khu vực sự kiện đặc biệt'
    ],
    mockup: 'calendar_month'
  },
  {
    id: '02',
    name: 'Bán vé',
    title: '0% hoa hồng bán vé. Sự thật 100%.',
    features: [
      'Đơn giản hóa việc bán vé với ngày hết hạn và ngày kích hoạt có thể cài đặt trước',
      'Phê duyệt trước người tham dự trước khi mua vé',
      'Tự động tạo mã giảm giá đặc biệt'
    ],
    mockup: 'confirmation_number'
  },
  {
    id: '03',
    name: 'Giải pháp tại chỗ',
    title: 'Quy trình vào cửa thiết lập sẵn',
    features: [
      'Quét mã QR để làm thủ tục vào cửa dễ dàng',
      'Đón khách nhanh chóng hơn thông qua các ki-ốt tự làm thủ tục',
      'Kiểm soát khách vào cửa khu vực VIP và các phiên giới hạn',
      'In thẻ sự kiện tùy chỉnh, mang lại cảm giác thích thú cho người tham dự'
    ],
    mockup: 'qr_code_scanner'
  },
  {
    id: '04',
    name: 'Triển lãm',
    title: 'Tổ chức triển lãm chuyên nghiệp',
    features: [
      'Thiết kế sơ đồ mặt bằng triển lãm tương tác thuận tiện cho việc đặt chỗ gian hàng',
      'Cập nhật thông tin cho các đơn vị triển lãm qua email tự động',
      'Tăng cường khả năng tiếp cận cho các đơn vị triển lãm thông qua trang thương hiệu',
      'Thu thập và phân loại khách hàng tiềm năng một cách dễ dàng'
    ],
    mockup: 'map'
  },
  {
    id: '05',
    name: 'Phân tích',
    title: 'Quyết định thông thái hơn. Tác động mạnh mẽ hơn.',
    features: [
      'Theo dõi doanh thu và vé bán ra',
      'Giám sát khách vào cửa, phân tích phiên, thăm dò ý kiến và nhiều tính năng khác',
      'Kiểm tra số người tham dự theo loại sự kiện và địa điểm',
      'Theo dõi số người tham dự thường xuyên và lặp lại'
    ],
    mockup: 'analytics'
  }
];

const FeatureStickyScroll = () => {
  const [activePhase, setActivePhase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll('.phase-card');
      let current = 0;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= 200) current = i;
      });
      setActivePhase(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPhase = (index) => {
    const cards = sectionRef.current.querySelectorAll('.phase-card');
    if (cards[index]) {
      const top = cards[index].getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-8">
          <h2 className="text-4xl md:text-6xl font-headline font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Lập kế hoạch, tổ chức và phân tích sự kiện của bạn, tất cả từ một nơi
          </h2>
          
          {/* Navigation Tabs */}
          <div className="sticky top-20 z-40 py-4 bg-white/80 backdrop-blur-md">
            <div className="flex flex-wrap justify-center gap-2 no-scrollbar overflow-x-auto pb-2">
              {phases.map((phase, i) => (
                <button 
                  key={phase.id}
                  onClick={() => scrollToPhase(i)}
                  className={`px-5 py-2.5 rounded-full font-headline font-bold text-sm transition-all whitespace-nowrap ${activePhase === i ? 'bg-[#1a1a1b] text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <span className="opacity-40 mr-2">•</span> {phase.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stacked Cards Container */}
        <div className="space-y-[10vh] pb-[20vh]">
          {phases.map((phase, i) => (
            <div 
              key={phase.id} 
              className="phase-card sticky top-32 pt-10"
              style={{ zIndex: 10 + i }}
            >
              <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
                 
                 {/* Left Text */}
                 <div className="space-y-8">
                    <div className="text-4xl font-headline font-black text-slate-100 italic">{phase.id}</div>
                    <h3 className="text-3xl md:text-4xl font-headline font-extrabold text-slate-900 tracking-tight">{phase.title}</h3>
                    <ul className="space-y-5">
                       {phase.features.map((feature, j) => (
                         <li key={j} className="flex items-start gap-4">
                           <div className="mt-1 w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
                             <span className="material-symbols-outlined text-xs text-indigo-600 font-bold">check</span>
                           </div>
                           <p className="text-slate-600 font-body font-medium leading-relaxed">{feature}</p>
                         </li>
                       ))}
                    </ul>
                 </div>

                 {/* Right Mockup Visualization */}
                 <div className="relative group">
                    {/* Orange Background Block (Zoho Style) */}
                    <div className="absolute -inset-4 bg-[#e67e22] rounded-[2rem] rotate-2 scale-95 opacity-90 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700"></div>
                    
                    {/* White Mockup Card */}
                    <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 min-h-[300px] flex items-center justify-center overflow-hidden">
                       <span className="material-symbols-outlined text-[120px] text-slate-100 group-hover:text-indigo-500/20 transition-all duration-700">{phase.mockup}</span>
                       <div className="absolute inset-x-6 bottom-6 space-y-3">
                          <div className="h-2 w-2/3 bg-slate-50 rounded-full"></div>
                          <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                       </div>
                    </div>
                 </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureStickyScroll;
