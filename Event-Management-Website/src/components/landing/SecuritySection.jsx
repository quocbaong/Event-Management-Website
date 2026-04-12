import React from 'react';

const SecuritySection = () => {
  return (
    <section className="py-24 bg-[#0033cc] relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full scale-110"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/10 rounded-full scale-125"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-white mb-8 tracking-tight">
          Thiết kế an toàn. Mặc định bảo mật.
        </h2>
        
        <p className="text-white/80 text-lg max-w-3xl mx-auto mb-16 font-body leading-relaxed">
          Tự tin lên kế hoạch sự kiện với Prestige Planner mà không cần các công cụ theo dõi quảng cáo, cookie của bên thứ ba hay quá trình khai phá dữ liệu. Chúng tôi tuân thủ tuyệt đối các tiêu chuẩn bảo mật quốc tế và sở hữu toàn bộ hệ thống công nghệ và trung tâm dữ liệu của riêng mình, điều này có nghĩa là tất cả thông tin của bạn luôn được an toàn.
        </p>

        {/* Security Mockup with Shield */}
        <div className="relative max-w-5xl mx-auto pt-10">
           {/* Mockup Image/Div */}
           <div className="relative bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 p-4 md:p-8 shadow-2xl overflow-hidden opacity-40">
              <div className="bg-white rounded-2xl h-[400px] w-full p-6 flex flex-col gap-8">
                 <div className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    <div className="h-8 w-24 bg-indigo-600 rounded"></div>
                 </div>
                 <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-20 bg-slate-50 rounded-xl"></div>)}
                 </div>
                 <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl"></div>
                    <div className="bg-slate-50 rounded-xl"></div>
                 </div>
              </div>
           </div>

           {/* Floating Shield & Lock Overlay */}
           <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center">
              <div className="relative animate-fade-in">
                 {/* Shield Outline */}
                 <svg className="w-64 h-64 md:w-80 md:h-80 text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
                 {/* Lock Icon */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-2">
                    <span className="material-symbols-outlined text-7xl md:text-8xl">lock</span>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded border border-white/30 text-[10px] tracking-[0.2em] font-bold uppercase">SECURED</div>
                 </div>
                 {/* Dot Connector */}
                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-0.5 h-16 bg-white/40"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
