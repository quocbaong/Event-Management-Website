import React from 'react';

const AppShowcaseSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-headline font-black text-slate-900 tracking-tight leading-tight">
            Hai ứng dụng. <br /> Trải nghiệm nhất quán như một.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          
          {/* Column 1: Organizer */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-6 w-1 bg-orange-600"></div>
              <h3 className="text-sm font-headline font-bold text-slate-400 tracking-widest uppercase">DÀNH CHO NGƯỜI TỔ CHỨC</h3>
            </div>
            <h4 className="text-3xl md:text-4xl font-headline font-extrabold text-slate-900 leading-tight">
              Bạn giữ kết nối ở hậu trường
            </h4>
            <p className="text-lg text-slate-500 font-body leading-relaxed">
              Luôn nắm bắt tình hình sự kiện dù bạn đang ngồi tại bàn làm việc hay bất cứ đâu. Theo dõi lượt đăng ký, kiểm tra số người tham dự, ra thông báo và làm nhiều việc khác ngay từ thiết bị di động của bạn.
            </p>
            <button className="flex items-center gap-2 font-headline font-bold text-indigo-600 hover:translate-x-1 transition-transform">
              Khám phá Ứng dụng sự kiện dành cho người tổ chức
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <div className="relative pt-12">
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none"></div>
               <div className="relative mx-auto w-64 aspect-[9/18] bg-slate-950 rounded-[3rem] p-3 shadow-2xl border-x-[8px] border-slate-900">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col p-4">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-bold">9:41</span>
                        <div className="flex gap-1">
                           <div className="w-4 h-2 bg-slate-200 rounded-sm"></div>
                           <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
                        <div className="grid grid-cols-2 gap-2">
                           <div className="h-20 bg-emerald-50 rounded-xl flex flex-col items-center justify-center p-2">
                              <span className="material-symbols-outlined text-emerald-500 text-lg">local_activity</span>
                              <span className="text-[8px] font-bold mt-1">80000</span>
                           </div>
                           <div className="h-20 bg-orange-50 rounded-xl flex flex-col items-center justify-center p-2">
                              <span className="material-symbols-outlined text-orange-500 text-lg">payments</span>
                              <span className="text-[8px] font-bold mt-1">$74000</span>
                           </div>
                        </div>
                        <div className="h-32 bg-slate-50 rounded-xl relative overflow-hidden flex items-center justify-center">
                           <span className="material-symbols-outlined text-4xl text-slate-200">qr_code_scanner</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Column 2: Attendee */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-6 w-1 bg-orange-600"></div>
              <h3 className="text-sm font-headline font-bold text-slate-400 tracking-widest uppercase">DÀNH CHO NGƯỜI THAM DỰ</h3>
            </div>
            <h4 className="text-3xl md:text-4xl font-headline font-extrabold text-slate-900 leading-tight">
              Người tham dự dễ dàng tham gia mọi hoạt động
            </h4>
            <p className="text-lg text-slate-500 font-body leading-relaxed">
              Ứng dụng sự kiện di động của chúng tôi mở ra những cách thức mới để giúp bạn thu hút người tham dự và khuyến khích kết nối trước, trong và thậm chí là sau sự kiện để bạn có thể xây dựng một cộng đồng trực tuyến phát triển mạnh mẽ.
            </p>
            <button className="flex items-center gap-2 font-headline font-bold text-indigo-600 hover:translate-x-1 transition-transform">
              Khám phá Ứng dụng sự kiện dành cho người tham dự
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <div className="relative pt-12">
               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-orange-600/10 blur-[80px] rounded-full pointer-events-none"></div>
               <div className="relative mx-auto w-64 aspect-[9/18] bg-slate-950 rounded-[3rem] p-3 shadow-2xl border-x-[8px] border-slate-900">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                     <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex flex-col justify-end">
                         <div className="h-3 w-2/3 bg-white/20 rounded-full mb-2"></div>
                         <div className="h-5 w-full bg-white/40 rounded-full"></div>
                     </div>
                     <div className="p-4 space-y-4">
                        <div className="flex gap-3">
                           <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                           <div className="flex-1 space-y-2 py-1">
                              <div className="h-2 w-1/2 bg-slate-100 rounded-full"></div>
                              <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                           </div>
                        </div>
                        <div className="h-24 bg-slate-50 rounded-xl p-4 flex gap-4">
                           <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                              <span className="material-symbols-outlined text-indigo-600">event</span>
                           </div>
                           <div className="flex-1 space-y-2 py-1">
                              <div className="h-2 w-full bg-slate-200"></div>
                              <div className="h-2 w-2/3 bg-slate-100"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
