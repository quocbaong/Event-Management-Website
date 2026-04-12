import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen hero-spotlight flex items-center pt-28 pb-20 overflow-hidden">
      {/* Decorative spotlights */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full animate-spotlight pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 z-10 transition-all duration-700 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[11px] font-bold tracking-[0.1em] text-emerald-400 uppercase font-headline">
              PHẦN MỀM QUẢN LÝ SỰ KIỆN TOÀN DIỆN
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white leading-tight tracking-tight">
            Tạo trải nghiệm sự kiện khiến <br className="hidden md:block" />
            <span className="text-white">khách hàng hài lòng</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-body">
            Tổ chức, quảng bá và triển khai sự kiện độc đáo nhất – tất cả thông qua Prestige Planner.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button className="px-8 py-4 border border-white/20 text-white rounded-lg font-headline font-bold text-base hover:bg-white/5 transition-all active:scale-95">
              YÊU CẦU BẢN DEMO
            </button>
            <button className="flex items-center gap-3 text-white font-headline font-bold text-base group px-4 py-2 hover:text-indigo-400 transition-all">
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">play_circle</span>
              XEM VIDEO TỔNG QUAN
            </button>
          </div>
        </div>

        {/* Right Content - Zoho Style Form */}
        <div className="z-10 flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl p-8 md:p-10 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-headline font-bold text-slate-900 mb-8 border-l-4 border-[#e4322a] pl-4">Bắt đầu ngay hôm nay</h3>
            
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/signup'); }}>
              <div className="space-y-1">
                <input 
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:border-indigo-500 transition-all outline-none" 
                  placeholder="Tên công ty *" 
                  required
                />
              </div>
              <div className="space-y-1">
                <input 
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:border-indigo-500 transition-all outline-none" 
                  placeholder="Thư điện tử *" 
                  type="email"
                  required
                />
              </div>
              <div className="relative space-y-1">
                <input 
                  className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:border-indigo-500 transition-all outline-none pr-10" 
                  placeholder="Mật khẩu *" 
                  type="password"
                  required
                />
                <span className="material-symbols-outlined absolute right-3 top-[10px] text-slate-400 text-lg cursor-pointer">visibility_off</span>
              </div>
              
              <div className="flex gap-2">
                <div className="w-20 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-500 flex items-center justify-between">
                  +84 <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
                <input 
                  className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-sm focus:border-indigo-500 transition-all outline-none" 
                  placeholder="Số điện thoại *" 
                  type="tel"
                  required
                />
              </div>
              
              <p className="text-[10px] text-slate-400 leading-tight">
                Dữ liệu của bạn sẽ được lưu trữ tại trung tâm dữ liệu an toàn. <br />
                Tôi đồng ý với <a href="#" className="underline text-slate-600">Điều khoản dịch vụ</a> và <a href="#" className="underline text-slate-600">Chính sách bảo mật</a>.
              </p>

              <button type="submit" className="w-full py-4 bg-[#e4322a] hover:bg-[#cc2d26] text-white rounded-lg font-headline font-bold text-base shadow-lg shadow-red-200 transition-all active:scale-[0.98] mt-2">
                ĐĂNG KÝ MIỄN PHÍ
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-slate-500">
               <span>hoặc đăng nhập bằng:</span>
               <div className="flex gap-3">
                  {/* Google */}
                  <div className="w-8 h-8 rounded border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-50">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
                  </div>
                  {/* LinkedIn */}
                  <div className="w-8 h-8 rounded border border-slate-100 flex items-center justify-center bg-[#0077b5] cursor-pointer hover:opacity-90">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  {/* Microsoft */}
                  <div className="w-8 h-8 rounded border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-50">
                    <svg className="w-4 h-4" viewBox="0 0 23 23"><rect fill="#f35325" width="11" height="11"/><rect fill="#81bc06" x="12" width="11" height="11"/><rect fill="#05a6f0" y="12" width="11" height="11"/><rect fill="#ffba08" x="12" y="12" width="11" height="11"/></svg>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
