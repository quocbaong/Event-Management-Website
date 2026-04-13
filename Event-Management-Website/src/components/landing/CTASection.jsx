import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: 'Phần mềm quản lý sự kiện là gì?', a: 'Phần mềm quản lý sự kiện là một nền tảng kỹ thuật số được thiết kế để giúp các tổ chức và cá nhân lập kế hoạch, tổ chức, theo dõi và tham gia vào một sự kiện một cách dễ dàng và hiệu quả.' },
    { q: 'Phần mềm quản lý sự kiện giúp tổ chức sự kiện thành công bằng cách nào?', a: 'Bằng cách tự động hóa các quy trình lập kế hoạch, bán vé, đăng ký và truyền thông, giúp giảm thiểu sai sót và tăng cường trải nghiệm người tham dự.' },
    { q: 'Các tính năng chính của phần mềm quản lý sự kiện là gì?', a: 'Bao gồm bán vé và đăng ký, tạo trang web sự kiện, ứng dụng di động cho người tham dự, hệ thống check-in tại chỗ, và các báo cáo phân tích chi tiết.' },
    { q: 'Prestige Planner khác với các nền tảng quản lý sự kiện khác ở điểm nào?', a: 'Prestige Planner nổi bật với tính bảo mật tuyệt đối, tích hợp AI để kết nối đối tác, và quy trình check-in tự động hóa hoàn toàn.' },
    { q: 'Phần mềm quản lý sự kiện ảo khác với phần mềm hội thảo trực tuyến ở điểm nào?', a: 'Sự kiện ảo cho phép sự tương tác đa chiều, khu vực triển lãm ảo và tính năng networking AI, trong khi hội thảo trực tuyến thường chỉ tập trung vào truyền phát một chiều.' }
  ];

  return (
    <section className="bg-white">
      {/* Part 1: Final CTA Section (Image 2 style) */}
      <div className="py-32 text-center px-6 border-b border-slate-50">
        <h2 className="text-4xl md:text-6xl font-headline font-black text-slate-900 mb-12 tracking-tight">
          Cùng tổ chức sự kiện <br /> thành công vang dội
        </h2>
        <button 
          onClick={() => navigate('/signup')}
          className="bg-[#e4322a] hover:bg-[#cc2d26] text-white px-10 py-5 rounded-md text-lg font-headline font-bold transition-all shadow-xl shadow-red-200 active:scale-95"
        >
          ĐĂNG KÝ MIỄN PHÍ
        </button>
      </div>

      {/* Part 2: FAQ Section (Image 3 style) */}
      <div className="py-24 max-w-4xl mx-auto px-6">
        <h3 className="text-4xl md:text-5xl font-headline font-black text-slate-900 text-center mb-16">
          Câu hỏi thường gặp
        </h3>

        <div className="divide-y divide-slate-200">
          {faqs.map((item, i) => (
            <div key={i} className="py-8 bg-white transition-all">
              <button 
                className="w-full flex justify-between items-center text-left group"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <h4 className={`text-base md:text-lg font-headline font-bold transition-colors ${openFaq === i ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {item.q}
                </h4>
                <span className={`material-symbols-outlined transition-transform duration-300 text-slate-400 ${openFaq === i ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              <div className={`mt-6 text-slate-500 font-body leading-relaxed transition-all duration-500 overflow-hidden ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
