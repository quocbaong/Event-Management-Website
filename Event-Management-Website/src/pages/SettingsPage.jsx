import React, { useState } from 'react';
import { 
  CreditCard, 
  Code2, 
  ShieldCheck, 
  Palette, 
  Database,
  ChevronRight,
  Plus,
  Upload,
  Clock,
  Save
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('finance');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [fontFamily, setFontFamily] = useState('Plus Jakarta Sans');

  const navItems = [
    { id: 'finance', label: 'Cấu hình Tài chính', icon: CreditCard },
    { id: 'api', label: 'Tích hợp API', icon: Code2 },
    { id: 'security', label: 'Bảo mật hệ thống', icon: ShieldCheck },
    { id: 'branding', label: 'Thương hiệu & UI', icon: Palette },
    { id: 'backup', label: 'Sao lưu & Khôi phục', icon: Database },
  ];

  // Function to scroll to section
  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    const scrollContainer = document.getElementById('settings-scroll-container');
    if (element && scrollContainer) {
      const topPos = element.offsetTop - 20; 
      scrollContainer.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  };

  // Intersection Observer to update active tab on scroll
  React.useEffect(() => {
    const scrollContainer = document.getElementById('settings-scroll-container');
    if (!scrollContainer) return;

    const observerOptions = {
      root: scrollContainer,
      rootMargin: '-50px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] font-sans overflow-hidden">
      {/* 1. FIXED HEADER */}
      <div className="bg-[#f8fafc] border-b border-slate-100 px-10 py-6 flex-shrink-0 z-30">
        <div className="max-w-[1400px]">
          <h1 className="text-2xl font-black text-slate-800 mb-1">Cài đặt Hệ thống</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Quản lý cấu hình nền tảng, bảo mật và tích hợp API toàn cầu.</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 2. FIXED SIDEBAR (Within this page) */}
        <div className="w-[320px] flex-shrink-0 px-8 py-8 bg-[#f8fafc] z-20 border-r border-slate-100/50">
           <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-[20px] font-bold transition-all duration-300 ${
                      activeTab === item.id 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20 transform scale-[1.02]' 
                      : 'text-slate-400 hover:bg-white hover:text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                       <Icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : ''}`} />
                       <span className="text-[13px]">{item.label}</span>
                    </div>
                    {activeTab === item.id && <ChevronRight className="w-3 h-3 animate-pulse" />}
                  </button>
                );
              })}
           </div>
        </div>

        {/* 3. SCROLLABLE CONTENT AREA */}
        <div 
          id="settings-scroll-container"
          className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-slate-50/20"
        >
          <div className="max-w-[900px] mx-auto p-10 space-y-10 pb-48">
            
            {/* Financial Config */}
            <section id="finance" className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 space-y-8 transition-all duration-500">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <CreditCard className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Cấu hình Tài chính</h2>
                    <p className="text-xs text-slate-400 font-bold">Thiết lập các mức giá, hoa hồng và tiền tệ mặc định.</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiền tệ mặc định</label>
                    <select className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all">
                       <option>VNĐ - Việt Nam Đồng</option>
                       <option>USD - Đô la Mỹ</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Tỷ lệ hoa hồng (%)</label>
                    <input type="text" defaultValue="15" className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Gói đăng ký nền tảng</label>
                 <div className="grid grid-cols-3 gap-5">
                    {['CƠ BẢN', 'NÂNG CAO', 'DOANH NGHIỆP'].map((plan, i) => (
                      <div key={plan} className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer flex flex-col items-center text-center ${i === 1 ? 'border-primary bg-primary/[0.02] shadow-sm transform scale-105 z-10' : 'border-slate-50 bg-white hover:border-slate-100'}`}>
                         <p className="text-[9px] font-black tracking-widest text-slate-400 mb-2 uppercase">{plan}</p>
                         <p className="text-lg font-black text-slate-800">
                           {i === 0 ? '2.0 triệu' : i === 1 ? '5.0 triệu' : 'Thỏa thuận'}
                         </p>
                         <p className="text-[9px] text-slate-400 font-bold mt-3 leading-relaxed">
                           {i === 0 ? 'Tối đa 500 khách' : i === 1 ? 'Tối đa 5k khách' : 'Tùy chỉnh mở rộng'}
                         </p>
                      </div>
                    ))}
                 </div>
              </div>
            </section>

            {/* API Management */}
            <section id="api" className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 space-y-8 transition-all duration-500">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Code2 className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">API & Tích hợp</h2>
                    <p className="text-xs text-slate-400 font-bold">Kết nối dịch vụ thanh toán, CRM và Email.</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[28px] border border-slate-100 group hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                          <span className="font-black text-slate-400 text-[9px] uppercase">Stripe</span>
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-800">Cổng thanh toán Stripe</h4>
                          <p className="text-[10px] text-emerald-500 font-black uppercase">Sẵn sàng</p>
                       </div>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl text-primary font-black text-[11px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">Cấu hình</button>
                 </div>

                 <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[28px] border border-slate-100 group hover:bg-white transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                          <span className="font-black text-slate-400 text-[9px] uppercase">Email</span>
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-800">SendGrid Service</h4>
                          <p className="text-[10px] text-slate-300 font-bold italic">Chưa kích hoạt</p>
                       </div>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl text-primary font-black text-[11px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">Kích hoạt</button>
                 </div>
              </div>
            </section>

            {/* Security Section */}
            <section id="security" className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 space-y-8 transition-all duration-500">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">An ninh & Bảo mật</h2>
                    <p className="text-xs text-slate-400 font-bold">Kiểm soát truy cập và bảo vệ dữ liệu.</p>
                 </div>
              </div>

              <div className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[28px] border border-slate-100">
                 <div>
                    <h4 className="text-sm font-bold text-slate-800">Xác thực 2 yếu tố (2FA)</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Bắt buộc cho tất cả tài khoản admin.</p>
                 </div>
                 <div 
                   onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                   className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-500 ${is2FAEnabled ? 'bg-primary' : 'bg-slate-300'}`}
                 >
                   <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Thời hạn phiên</label>
                    <div className="relative">
                       <input type="text" defaultValue="30" className="w-full bg-slate-100/50 border border-slate-100 rounded-2xl p-4 text-slate-800 font-black text-sm outline-none pr-16" />
                       <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">PHÚT</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu tối thiểu</label>
                    <select className="w-full bg-slate-100/50 border border-slate-100 rounded-2xl p-4 text-slate-800 font-bold text-sm outline-none">
                       <option>8+ ký tự</option>
                       <option>12+ ký tự</option>
                    </select>
                 </div>
              </div>
            </section>

            {/* Branding Section */}
            <section id="branding" className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 space-y-8 transition-all duration-500">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                    <Palette className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Thương hiệu & UI</h2>
                    <p className="text-xs text-slate-400 font-bold">Tùy chỉnh nhận diện thương hiệu.</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Logo hệ thống</label>
                    <div className="h-44 border-2 border-dashed border-slate-200 rounded-[28px] bg-slate-50/30 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-primary transition-all">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-300 group-hover:text-primary transition-all border border-slate-100">
                          <Upload className="w-6 h-6" />
                       </div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Tải lên Logo</p>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Màu chủ đạo</label>
                       <div className="flex flex-wrap gap-2.5">
                          {['#4f46e5', '#e11d48', '#059669', '#d97706', '#0891b2'].map(color => (
                            <div 
                              key={color}
                              onClick={() => setPrimaryColor(color)}
                              className={`w-9 h-9 rounded-full cursor-pointer transition-all border-4 ${primaryColor === color ? 'border-white ring-4 ring-primary/10' : 'border-transparent shadow-sm scale-90'}`}
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Kiểu chữ</label>
                       <div className="flex gap-1.5 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-50">
                          <button 
                            onClick={() => setFontFamily('Plus Jakarta Sans')}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${fontFamily === 'Plus Jakarta Sans' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}
                          >P. Jakarta</button>
                          <button 
                            onClick={() => setFontFamily('Inter')}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${fontFamily === 'Inter' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}
                          >Inter</button>
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* Backup & Recovery Section */}
            <section id="backup" className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 space-y-8 transition-all duration-500">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                    <Database className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Sao lưu & Khôi phục</h2>
                    <p className="text-xs text-slate-400 font-bold">Bảo vệ dữ liệu hệ thống.</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="p-8 bg-emerald-50/30 rounded-[32px] border border-emerald-100 space-y-6 relative group overflow-hidden">
                    <div className="flex items-center justify-between">
                       <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-full">Tự động</span>
                       <Clock className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-800 text-lg mb-2">Sao lưu hằng ngày</h4>
                       <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Dữ liệu lưu vào S3 lúc 00:00.</p>
                    </div>
                    <button className="w-full py-4 bg-white rounded-2xl font-black text-[11px] text-emerald-700 shadow-sm border border-emerald-50 hover:bg-emerald-50 transition-all">Thiết lập lịch</button>
                 </div>

                 <div className="p-8 bg-primary/[0.02] rounded-[32px] border border-primary/10 space-y-6 relative group overflow-hidden">
                    <div className="flex items-center justify-between">
                       <span className="px-3.5 py-1.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">Tức thời</span>
                       <Save className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-800 text-lg mb-2">Xuất dữ liệu ngay</h4>
                       <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Tạo bản sao lưu ngay bây giờ.</p>
                    </div>
                    <button className="w-full py-4 bg-primary rounded-2xl font-black text-[11px] text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">Sao lưu ngay</button>
                 </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* 4. FIXED FOOTER ACTION BAR */}
      <div className="flex-shrink-0 w-full bg-white border-t border-slate-100 p-6 z-40">
         <div className="max-w-[1400px] mx-auto flex items-center justify-end gap-6 px-10">
            <button className="px-8 py-3 rounded-xl font-black text-slate-400 hover:text-slate-800 transition-all text-[11px] uppercase tracking-widest">Hủy thay đổi</button>
            <button className="px-10 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-black shadow-xl shadow-primary/30 transition-all text-[11px] uppercase tracking-widest">
               Lưu cấu hình
            </button>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
