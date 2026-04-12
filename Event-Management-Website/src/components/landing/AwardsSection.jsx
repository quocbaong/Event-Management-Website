import React from 'react';

const AwardsSection = () => {
  const awards = [
    { title: 'Leader', year: 'Spring 2024', provider: 'G2' },
    { title: 'Momentum Leader', year: 'Spring 2024', provider: 'G2' },
    { title: 'High Performer', year: 'Enterprise 2024', provider: 'G2' },
    { title: 'Easiest To Use', year: 'Small Business 2024', provider: 'G2' }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0033cc] rounded-[2.5rem] p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center shadow-2xl">
           
           {/* Left Content */}
           <div className="space-y-8 text-white">
              <h2 className="text-4xl md:text-5xl font-headline font-black leading-tight tracking-tight">
                Thành công của chúng tôi đo lường qua sự hài lòng của bạn
              </h2>
              <p className="text-white/70 text-lg font-body leading-relaxed max-w-xl">
                Với hơn 10 năm kinh nghiệm trong ngành, Prestige Planner tự hào được vinh danh là một trong những nền tảng quản lý sự kiện tốt nhất thế giới bởi hàng ngàn người dùng chuyên nghiệp.
              </p>
              <div className="pt-4">
                 <button className="flex items-center gap-2 font-headline font-bold text-white hover:translate-x-2 transition-transform">
                   Xem thêm tất cả các giải thưởng
                   <span className="material-symbols-outlined">arrow_forward</span>
                 </button>
              </div>
           </div>

           {/* Right Badges */}
           <div className="grid grid-cols-2 gap-8">
              {awards.map((award, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-transform hover:scale-105">
                   <div className="w-16 h-16 mb-4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-[#0033cc] opacity-20">military_tech</span>
                   </div>
                   <p className="text-[#0033cc] font-headline font-black text-sm uppercase mb-1">{award.title}</p>
                   <p className="text-slate-400 text-[10px] font-bold tracking-widest">{award.year}</p>
                   <div className="mt-4 pt-4 border-t border-slate-50 w-full font-headline font-black text-slate-900 tracking-tighter">
                      {award.provider}
                   </div>
                </div>
              ))}
           </div>

        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
