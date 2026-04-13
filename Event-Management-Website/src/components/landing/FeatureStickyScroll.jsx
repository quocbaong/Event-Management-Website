import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: '01',
    name: 'Quản lý sự kiện',
    title: 'Quản lý Sự kiện Toàn diện',
    description: 'Tạo và quản lý mọi chi tiết sự kiện từ địa điểm, thời gian đến nhà cung cấp trong một giao diện duy nhất.',
    details: [
      'Lập kế hoạch đa địa điểm',
      'Phối hợp nhà cung cấp thời gian thực',
      'Dashboard điều phối tổng thể'
    ],
    icon: 'calendar_month',
    color: 'bg-blue-600'
  },
  {
    id: '02',
    name: 'Người tham gia',
    title: 'Quản lý Người tham gia Thông minh',
    description: 'Phân nhóm khách mời, gửi email tự động và theo dõi phản hồi xác nhận tham gia trực tuyến hiệu quả.',
    details: [
      'Phân khúc khách mời AI',
      'Tự động hóa email marketing',
      'Theo dõi phản hồi RSVP 24/7'
    ],
    icon: 'groups',
    color: 'bg-emerald-600'
  },
  {
    id: '03',
    name: 'Lịch trình',
    title: 'Lịch trình Thông minh & Linh hoạt',
    description: 'Sắp xếp các phiên thảo luận, workshop và lịch diễn giả một cách khoa học, chuyên nghiệp.',
    details: [
      'Kéo thả lịch trình dễ dàng',
      'Quản lý diễn giả & Mentor',
      'Cập nhật thay đổi tức thì'
    ],
    icon: 'schedule',
    color: 'bg-amber-600'
  },
  {
    id: '04',
    name: 'Check-in QR',
    title: 'Check-in QR Siêu tốc',
    description: 'Giảm thiểu tối đa thời gian chờ đợi với hệ thống quét mã QR tự động ngay tại cửa vào sự kiện.',
    details: [
      'Quét mã QR tốc độ cao',
      'In thẻ đeo tại chỗ',
      'Báo cáo lượng khách Real-time'
    ],
    icon: 'qr_code_scanner',
    color: 'bg-indigo-600'
  },
  {
    id: '05',
    name: 'Ngân sách',
    title: 'Quản lý Ngân sách Chặt chẽ',
    description: 'Kiểm soát chi phí theo thời gian thực và tự động báo cáo doanh thu vé bán một cách minh bạch.',
    details: [
      'Theo dõi dòng tiền tự động',
      'Báo cáo P&L chi tiết',
      'Cảnh báo vượt hạn mức'
    ],
    icon: 'payments',
    color: 'bg-rose-600'
  },
  {
    id: '06',
    name: 'Báo cáo',
    title: 'Phân tích & Báo cáo Chuyên sâu',
    description: 'Dữ liệu trực quan hóa về hành vi khách hàng và hiệu quả của từng chiến dịch truyền thông.',
    details: [
      'Biểu đồ tăng trưởng trực quan',
      'Phân tích hành vi khách mời',
      'Xuất báo cáo đa định dạng'
    ],
    icon: 'analytics',
    color: 'bg-violet-600'
  }
];

const FeatureStickyScroll = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll('.feature-card');
      let current = 0;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= 250) current = i;
      });
      setActiveFeature(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeature = (index) => {
    const cards = sectionRef.current.querySelectorAll('.feature-card');
    if (cards[index]) {
      const top = cards[index].getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#fcfdfe] py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-headline font-black text-slate-900 tracking-tight leading-tight">
              Tính năng vượt trội
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-body max-w-2xl mx-auto">
              Tất cả những gì bạn cần để quản lý một sự kiện thành công
            </p>
          </motion.div>
          
          {/* Navigation Tabs - Refined Glassmorphism */}
          <div className="sticky top-20 z-40 mt-12 py-3">
            <div className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-full p-1.5 shadow-xl shadow-slate-200/20 max-w-fit mx-auto flex flex-wrap justify-center gap-1">
              {features.map((feature, i) => (
                <button 
                  key={feature.id}
                  onClick={() => scrollToFeature(i)}
                  className={`px-6 py-2 rounded-full font-headline font-bold text-xs md:text-sm transition-all duration-500 ${activeFeature === i ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {feature.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stacked Cards Container */}
        <div className="space-y-[15vh] pb-[20vh]">
          {features.map((feature, i) => (
            <div 
              key={feature.id} 
              className="feature-card sticky top-40 pt-4"
              style={{ zIndex: 10 + i }}
            >
              <div className="bg-white rounded-[3rem] p-10 md:p-20 border border-slate-100 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[550px] overflow-hidden relative">
                 
                 {/* Decorative background circle */}
                 <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full ${feature.color} opacity-[0.03] blur-3xl`}></div>
                 
                 {/* Left Content */}
                 <div className="space-y-10 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-white shadow-xl shadow-current/20`}>
                          <span className="material-symbols-outlined">{feature.icon}</span>
                       </div>
                       <div className="text-6xl md:text-7xl font-headline font-black text-slate-100/50 italic tracking-tighter select-none">{feature.id}</div>
                    </div>
                    
                    <div className="space-y-6">
                       <h3 className="text-4xl md:text-5xl font-headline font-black text-slate-900 tracking-tight leading-tight">
                        {feature.title}
                       </h3>
                       <p className="text-lg md:text-xl text-slate-600 font-body leading-relaxed max-w-xl">
                        {feature.description}
                       </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {feature.details.map((detail, j) => (
                         <li key={j} className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                           <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100/50 flex items-center justify-center">
                             <span className="material-symbols-outlined text-[14px] text-indigo-600 font-bold">check</span>
                           </div>
                           <span className="text-sm font-headline font-bold text-slate-700">{detail}</span>
                         </li>
                       ))}
                    </ul>
                 </div>

                 {/* Right Visual Representation - Polished Grid/UI Mockup */}
                 <div className="relative group perspective-1000">
                    <motion.div 
                      className="relative bg-slate-50 rounded-[2.5rem] p-4 border border-slate-200/50 aspect-square flex items-center justify-center overflow-hidden shadow-inner"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                       {/* Abstract Interface Mockup */}
                       <div className="w-full h-full bg-white rounded-[2rem] shadow-xl border border-slate-200/20 p-8 flex flex-col gap-6 relative overflow-hidden">
                          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                             <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                             </div>
                             <div className="h-4 w-24 bg-slate-50 rounded-full"></div>
                          </div>
                          
                          <div className="flex-1 flex flex-col gap-4">
                             <div className="h-10 w-full bg-slate-50 rounded-xl relative overflow-hidden">
                                <motion.div 
                                  className={`absolute inset-y-0 left-0 ${feature.color} opacity-20`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: '70%' }}
                                  transition={{ duration: 1.5, delay: 0.5 }}
                                />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="h-24 bg-slate-50 rounded-2xl flex items-center justify-center">
                                   <span className={`material-symbols-outlined text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ${feature.color.replace('bg-', 'text-')}`}>{feature.icon}</span>
                                </div>
                                <div className="h-24 bg-slate-50 rounded-2xl p-4 space-y-3">
                                   <div className="h-2 w-full bg-slate-200/50 rounded-full"></div>
                                   <div className="h-2 w-2/3 bg-slate-200/50 rounded-full"></div>
                                   <div className="h-2 w-1/2 bg-slate-200/50 rounded-full"></div>
                                </div>
                             </div>
                             <div className="h-32 bg-slate-50 rounded-2xl p-6 flex flex-col justify-center gap-3">
                                <div className="h-3 w-3/4 bg-slate-200/40 rounded-full"></div>
                                <div className="h-3 w-1/2 bg-slate-200/40 rounded-full"></div>
                             </div>
                          </div>

                          {/* Float Card Overlay */}
                          <motion.div 
                            className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                             <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center text-white`}>
                                <span className="material-symbols-outlined text-xl">trending_up</span>
                             </div>
                             <div className="pr-4">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hiệu quả</div>
                                <div className="text-sm font-black text-slate-900">+48%</div>
                             </div>
                          </motion.div>
                       </div>
                    </motion.div>
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
