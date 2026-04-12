import React from 'react';

const DashboardMockupSection = () => {
  return (
    <section className="py-24 bg-surface-dim relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Floating Demo Button (Image 2 style) */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] hidden xl:block">
           <div className="bg-[#0052cc] text-white px-3 py-10 rounded-l-xl flex flex-col items-center gap-4 shadow-xl cursor-pointer hover:bg-[#0747a6] transition-all group">
             <span className="material-symbols-outlined text-2xl group-hover:scale-110">smart_display</span>
             <span className="[writing-mode:vertical-lr] font-headline font-bold text-xs tracking-widest uppercase">Yêu cầu bản demo</span>
           </div>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 animate-fade-in">
           {/* UI Header */}
           <div className="h-14 bg-[#0a0b2e] flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">event</span>
                 </div>
                 <div className="text-white">
                    <p className="text-[10px] opacity-70 font-bold leading-none">Zylker Summit 2025</p>
                    <p className="text-[8px] opacity-40">Aug 19, 2025 - 09:00 AM • Hybrid</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex gap-1">
                    <div className="px-3 py-1 bg-white/10 rounded-md text-[8px] text-white font-bold">Edit Website</div>
                    <div className="px-3 py-1 bg-white/10 rounded-md text-[8px] text-white font-bold">View Website</div>
                 </div>
                 <div className="bg-indigo-600 px-4 py-1.5 rounded-md text-[10px] text-white font-bold">Republish</div>
              </div>
           </div>

           <div className="flex min-h-[600px]">
              {/* Sidebar Mockup */}
              <div className="w-48 bg-slate-50 border-r border-slate-100 p-4 space-y-6 hidden md:block">
                 {['Overview', 'Websites', 'Registrations', 'Exhibitors', 'Sponsors', 'Communication', 'Reports'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${i === 0 ? 'bg-indigo-50 text-indigo-700' : 'text-slate-400 hover:bg-slate-100'}`}>
                       <span className="material-symbols-outlined text-lg">{['dashboard', 'language', 'person_add', 'storefront', 'handshake', 'mail', 'analytics'][i]}</span>
                       <span className="text-[11px] font-bold">{item}</span>
                    </div>
                 ))}
              </div>

              {/* Main Content Mockup */}
              <div className="flex-1 p-8 bg-slate-50/30">
                 {/* Top Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      { label: 'Total Sales', value: '$58,760.41', icon: 'payments', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
                      { label: 'Registrations', value: '11,480', icon: 'person_add', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
                      { label: 'Days to Event', value: '15', icon: 'calendar_today', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500' }
                    ].map((stat) => (
                       <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
                             <span className="material-symbols-outlined">{stat.icon}</span>
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                             <p className="text-2xl font-headline font-black text-slate-900">{stat.value}</p>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Charts Simulator */}
                    <div className="md:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                       <p className="text-xs font-bold text-slate-900 mb-6">Registration Trend</p>
                       <div className="h-48 flex items-end gap-3 px-2">
                          {[40, 60, 45, 90, 65, 80, 55, 100, 70].map((h, i) => (
                             <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-md relative group">
                                <div className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-md transition-all duration-1000" style={{ height: `${h}%` }}></div>
                             </div>
                          ))}
                       </div>
                       <div className="flex justify-between mt-4 px-2 text-[8px] text-slate-400 font-bold">
                          <span>Mar 19</span>
                          <span>Mar 22</span>
                          <span>Mar 25</span>
                          <span>Mar 28</span>
                          <span>Mar 30</span>
                       </div>
                    </div>

                    <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                       <p className="text-xs font-bold text-slate-900 mb-6">Registrations</p>
                       <div className="relative w-32 h-32 mx-auto">
                          <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                             <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4"></circle>
                             <circle cx="18" cy="18" r="16" fill="none" className="stroke-indigo-500" strokeWidth="4" strokeDasharray="82 100"></circle>
                             <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-400" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-82"></circle>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-lg font-black">82%</span>
                             <span className="text-[8px] text-slate-400">Target</span>
                          </div>
                       </div>
                       <div className="mt-6 space-y-2">
                          <div className="flex justify-between text-[10px]">
                             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Sold</span>
                             <span className="font-bold">11,480</span>
                          </div>
                          <div className="flex justify-between text-[10px]">
                             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Available</span>
                             <span className="font-bold">2,520</span>
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

export default DashboardMockupSection;
