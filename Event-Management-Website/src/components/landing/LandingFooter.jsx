import React from 'react';

const LandingFooter = () => {
  return (
    <footer className="bg-white py-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top: Support & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-indigo-600 font-body text-sm font-medium">
             <span className="material-symbols-outlined text-xl">mail</span>
             support@prestigeplanner.com
          </div>
          <div className="flex items-center gap-6">
             {['facebook', 'twitter', 'linkedin', 'instagram'].map(platform => (
               <div key={platform} className="cursor-pointer hover:opacity-70 transition-opacity">
                  <img src={`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${platform === 'twitter' ? 'x' : platform}.svg`} alt={platform} className="w-5 h-5 opacity-60 grayscale hover:grayscale-0" />
               </div>
             ))}
          </div>
        </div>

        {/* Middle: Compliance Badges */}
        <div className="flex flex-col items-center gap-6">
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Chọn Quyền riêng tư. Chọn Prestige Planner.</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-40 grayscale">
               {[
                 'https://loodibee.com/wp-content/uploads/BSI-Logo.png',
                 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/ISO_9001_Logo.svg/2560px-ISO_9001_Logo.svg.png',
                 'https://www.gdpr.org/wp-content/uploads/2018/05/GDPR_logo.png',
                 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/AICPA_logo.svg/1200px-AICPA_logo.svg.png'
               ].map((src, i) => (
                 <div key={i} className="h-10 w-20 flex items-center justify-center">
                    <img src={src} className="max-h-full max-w-full object-contain" alt="compliance" onError={(e) => e.target.style.display = 'none'} />
                    {i === 0 && <span className="font-black text-xs">ISO 27001</span>}
                    {i === 2 && <span className="font-black text-xs">GDPR Compliant</span>}
                 </div>
               ))}
            </div>
        </div>

        {/* Search & Language */}
        <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 pl-4 text-xs font-body outline-none focus:border-indigo-400" 
                placeholder="Tìm kiếm thông tin về sản phẩm, câu hỏi thường gặp..."
              />
              <button className="absolute right-0 top-0 h-full w-12 bg-slate-100 flex items-center justify-center border-l border-slate-200">
                <span className="material-symbols-outlined text-sm">search</span>
              </button>
           </div>
           <div className="w-full md:w-32 bg-slate-50 border border-slate-200 rounded p-2.5 text-xs flex items-center justify-between cursor-pointer group hover:bg-slate-100 transition-colors">
              <span className="flex items-center gap-2">🇻🇳 Tiếng Việt</span>
              <span className="material-symbols-outlined text-xs group-hover:rotate-180 transition-transform">expand_more</span>
           </div>
        </div>

        {/* Bottom: Links & Copyright */}
        <div className="pt-8 border-t border-slate-50 text-center space-y-6">
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-medium text-slate-500">
              {['Liên hệ với chúng tôi', 'Bảo mật', 'Tuân thủ', 'Khiếu nại về quyền sở hữu trí tuệ', 'Chính sách chống thư rác', 'Điều khoản dịch vụ', 'Chính sách quyền riêng tư', 'Chính sách cookie', 'Tuân thủ theo GDPR', 'Chính sách chống lạm dụng'].map(link => (
                <a key={link} href="#" className="hover:text-indigo-600 transition-colors uppercase tracking-tight">{link}</a>
              ))}
           </div>
           <p className="text-[10px] text-slate-400 font-body">
             © 2026, Prestige Planner. Bảo lưu mọi quyền.
           </p>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;
