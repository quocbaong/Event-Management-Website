import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OrganizerSchedulePage = () => {
  const [viewMode, setViewMode] = useState('month');

  const days = [
    { date: '25', isPrevMonth: true },
    { date: '26', isPrevMonth: true },
    { date: '27', isPrevMonth: true },
    { date: '28', isPrevMonth: true },
    { date: '29', isPrevMonth: true },
    { date: '30', isPrevMonth: true },
    { date: '1', isPrevMonth: false },
  
    { date: '2', isPrevMonth: false, events: [{ title: 'Họp chiến lược', time: '09:00 - 10:30', style: 'bg-indigo-50 text-indigo-700 border border-indigo-100' }] },
    { date: '3', isPrevMonth: false },
    { date: '4', isPrevMonth: false, hasDot: true, events: [
      { title: 'Gala Dinner 2023', location: 'GEM Center', style: 'bg-primary text-white shadow-md shadow-indigo-200', icon: 'location_on' },
      { title: 'Kiểm duyệt âm tha...', style: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100' }
    ] },
    { date: '5', isPrevMonth: false },
    { date: '6', isPrevMonth: false },
    { date: '7', isPrevMonth: false },
    { date: '8', isPrevMonth: false },
  
    { date: '9', isPrevMonth: false },
    { date: '10', isPrevMonth: false, isToday: true, events: [
      { title: 'Workshop Design', avatars: true, style: 'bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-slate-800' }
    ] },
    { date: '11', isPrevMonth: false },
    { date: '12', isPrevMonth: false },
    { date: '13', isPrevMonth: false },
    { date: '14', isPrevMonth: false },
    { date: '15', isPrevMonth: false },
  
    { date: '16', isPrevMonth: false },
    { date: '17', isPrevMonth: false, events: [{ title: 'Lễ ký kết HĐ', style: 'bg-[#8b5cf6] text-white shadow-md shadow-purple-200' }] },
    { date: '18', isPrevMonth: false },
    { date: '19', isPrevMonth: false },
    { date: '20', isPrevMonth: false },
    { date: '21', isPrevMonth: false },
    { date: '22', isPrevMonth: false },
  
    { date: '23', isPrevMonth: false },
    { date: '24', isPrevMonth: false, events: [{ title: 'Khảo sát địa điểm', style: 'bg-indigo-50 text-indigo-700 border border-indigo-100' }] },
    { date: '25', isPrevMonth: false },
    { date: '26', isPrevMonth: false },
    { date: '27', isPrevMonth: false, events: [{ title: 'Tech Conf 2023', subtitle: 'Sự kiện kéo dài 3 ngày', style: 'bg-white border border-indigo-100 text-indigo-700 shadow-sm' }] },
    { date: '28', isPrevMonth: false },
    { date: '29', isPrevMonth: false },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-700 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 font-headline mb-2 tracking-tight">Tháng 10, 2023</h2>
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-primary shadow-sm"></span>
            Bạn có 12 sự kiện trong tháng này
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
           <button className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${viewMode === 'month' ? 'bg-white text-primary shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`} onClick={() => setViewMode('month')}>Tháng</button>
           <button className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${viewMode === 'week' ? 'bg-white text-primary shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`} onClick={() => setViewMode('week')}>Tuần</button>
           <button className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${viewMode === 'day' ? 'bg-white text-primary shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`} onClick={() => setViewMode('day')}>Ngày</button>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-11 h-11 flex items-center justify-center bg-white rounded-full border border-slate-200/60 hover:bg-slate-50 hover:shadow-md transition-all shadow-sm">
            <span className="material-symbols-outlined text-slate-600">chevron_left</span>
          </button>
          <button className="px-6 py-2.5 bg-white rounded-full border border-slate-200/60 hover:bg-slate-50 hover:shadow-md font-bold text-slate-700 transition-all shadow-sm">
            Hôm nay
          </button>
          <button className="w-11 h-11 flex items-center justify-center bg-white rounded-full border border-slate-200/60 hover:bg-slate-50 hover:shadow-md transition-all shadow-sm">
            <span className="material-symbols-outlined text-slate-600">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-10">
        
        {/* Days Header */}
        {viewMode !== 'day' && (
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
            {['THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7', 'CHỦ NHẬT'].map((day, i) => (
              <div key={i} className={`py-5 text-center text-[11px] font-black uppercase tracking-widest ${i === 6 ? 'text-primary' : 'text-slate-400'}`}>
                {day}
              </div>
            ))}
          </div>
        )}

        {/* Days Grid - Month View */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 auto-rows-[160px] divide-x divide-y divide-slate-100/60">
             {days.map((dayObj, i) => (
               <div key={i} className={`p-3 relative group transition-colors hover:bg-slate-50/50 ${dayObj.isPrevMonth ? 'bg-slate-50/30' : 'bg-white'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {dayObj.isToday ? (
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-200">
                            {dayObj.date}
                          </span>
                          <span className="text-[9px] font-black text-primary uppercase tracking-widest hidden xl:block">Hôm nay</span>
                        </div>
                      ) : (
                        <span className={`font-bold text-sm ml-1 ${dayObj.isPrevMonth ? 'text-slate-300' : 'text-slate-700'}`}>
                          {dayObj.date}
                        </span>
                      )}
                    </div>
                    {dayObj.hasDot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-1"></span>
                    )}
                  </div>

                  {/* Events */}
                  <div className="space-y-1.5 mt-2 overflow-y-auto max-h-[100px] pr-1">
                    {dayObj.events && dayObj.events.map((event, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.02 }}
                        className={`px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${event.style}`}
                      >
                        <div className="font-bold mb-0.5 truncate">{event.title}</div>
                        {event.time && <div className="text-[10px] opacity-80 font-medium">{event.time}</div>}
                        {event.location && (
                          <div className="flex items-center gap-1 mt-1 opacity-90">
                            <span className="material-symbols-outlined text-[12px]">{event.icon || 'location_on'}</span>
                            <span className="text-[10px] font-medium truncate">{event.location}</span>
                          </div>
                        )}
                        {event.subtitle && <div className="text-[10px] opacity-70 font-medium mt-0.5">{event.subtitle}</div>}
                        {event.avatars && (
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex -space-x-1.5">
                              <img src="https://i.pravatar.cc/100?u=1" className="w-5 h-5 rounded-full border border-white" alt="avatar"/>
                              <img src="https://i.pravatar.cc/100?u=2" className="w-5 h-5 rounded-full border border-white" alt="avatar"/>
                            </div>
                            <span className="text-[10px] font-bold text-primary ml-1 bg-indigo-50 px-1.5 py-0.5 rounded-md">+2</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* Days Grid - Week View */}
        {viewMode === 'week' && (
          <div className="grid grid-cols-7 min-h-[400px] divide-x divide-slate-100/60 bg-white">
             {days.slice(14, 21).map((dayObj, i) => (
               <div key={i} className="p-4 relative group transition-colors hover:bg-slate-50/50">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                      {dayObj.isToday ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-200">
                            {dayObj.date}
                          </span>
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest hidden lg:block">Hôm nay</span>
                        </div>
                      ) : (
                        <span className="font-black text-xl text-slate-700 ml-1">
                          {dayObj.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Events */}
                  <div className="space-y-3 mt-2">
                    {dayObj.events && dayObj.events.map((event, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.02 }}
                        className={`px-4 py-3 rounded-2xl text-sm cursor-pointer transition-all ${event.style}`}
                      >
                        <div className="font-bold mb-1">{event.title}</div>
                        {event.time && <div className="text-xs opacity-80 font-medium">{event.time}</div>}
                        {event.location && (
                          <div className="flex items-center gap-1 mt-2 opacity-90">
                            <span className="material-symbols-outlined text-[14px]">{event.icon || 'location_on'}</span>
                            <span className="text-xs font-medium truncate">{event.location}</span>
                          </div>
                        )}
                        {event.subtitle && <div className="text-xs opacity-70 font-medium mt-1">{event.subtitle}</div>}
                        {event.avatars && (
                          <div className="flex items-center gap-1 mt-3">
                            <div className="flex -space-x-2">
                              <img src="https://i.pravatar.cc/100?u=1" className="w-6 h-6 rounded-full border-2 border-white" alt="avatar"/>
                              <img src="https://i.pravatar.cc/100?u=2" className="w-6 h-6 rounded-full border-2 border-white" alt="avatar"/>
                            </div>
                            <span className="text-xs font-bold text-primary ml-1 bg-indigo-50 px-2 py-0.5 rounded-md">+2</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div className="flex divide-x divide-slate-100/60 min-h-[600px] bg-white">
            {/* Time sidebar */}
            <div className="w-24 shrink-0 bg-slate-50/30 flex flex-col py-6">
              {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                <div key={time} className="h-20 text-right pr-4 text-[10px] font-black text-slate-400">{time}</div>
              ))}
            </div>
            {/* Day content */}
            <div className="flex-1 p-6 relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-3xl shadow-md shadow-indigo-200">
                  {days.find(d => d.isToday)?.date || '10'}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 font-headline tracking-tight">Thứ 3</h3>
                  <p className="text-slate-500 font-medium text-sm">Tháng 10, 2023</p>
                </div>
              </div>

              {/* Simulated Timeline Grid */}
              <div className="absolute top-[120px] left-6 right-6 bottom-6 flex flex-col">
                {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                  <div key={time} className="h-20 border-t border-slate-100 w-full relative">
                     {time === '09:00' && (
                       <motion.div 
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         className="absolute top-3 left-0 right-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-slate-800 z-10 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group"
                       >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-black text-lg mb-1 font-headline group-hover:text-primary transition-colors">Workshop Design</div>
                              <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                09:00 - 11:30
                              </div>
                            </div>
                            <div className="flex -space-x-2">
                              <img src="https://i.pravatar.cc/100?u=1" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="avatar"/>
                              <img src="https://i.pravatar.cc/100?u=2" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="avatar"/>
                              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-indigo-50 flex items-center justify-center font-bold text-xs text-primary">+2</div>
                            </div>
                          </div>
                       </motion.div>
                     )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Highlight Card */}
        <div className="lg:col-span-2 bg-[#f8fafc] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative shadow-sm border border-slate-100 group">
           <div className="p-8 md:p-10 flex-1 z-10 bg-white md:bg-transparent">
              <span className="inline-block bg-[#5c46e5] text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-sm">Điểm nhấn tuần tới</span>
              <h3 className="text-3xl font-black text-slate-900 mb-4 font-headline tracking-tight leading-tight">Đại nhạc hội Indigo Summer 2023</h3>
              <p className="text-slate-600 font-medium mb-8 max-w-md leading-relaxed">Sự kiện âm nhạc lớn nhất năm với sự góp mặt của hơn 20 nghệ sĩ nổi tiếng toàn quốc.</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100 font-bold text-slate-700 text-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                  15 - 17 Tháng 10
                </div>
                <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-slate-100 font-bold text-slate-700 text-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">group</span>
                  2,500 Khách
                </div>
              </div>
           </div>
           {/* Image Background for right side */}
           <div className="md:w-2/5 md:absolute right-0 top-0 bottom-0 overflow-hidden relative min-h-[250px]">
             {/* Gradient fade to blend image with left side */}
             <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 hidden md:block"></div>
             <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800" alt="Concert" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"/>
           </div>
        </div>

        {/* Stats Card */}
        <div className="bg-[#5c46e5] rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group cursor-pointer flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all duration-500"></div>
           
           <div>
             <p className="text-[10px] font-black opacity-80 uppercase tracking-widest mb-2">Thống kê nhanh</p>
             <h3 className="text-2xl font-black mb-8 font-headline">Dự án hoạt động</h3>

             <div className="grid grid-cols-2 gap-6 mb-8">
               <div>
                 <p className="text-4xl font-black mb-1">24</p>
                 <p className="text-xs font-medium opacity-80">Tổng sự kiện</p>
               </div>
               <div>
                 <p className="text-xl font-bold mb-1 pt-3">12</p>
                 <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Đã hoàn thành</p>
               </div>
             </div>
           </div>

           <div className="flex items-center justify-between border-t border-white/20 pt-6">
             <div>
               <p className="text-3xl font-black mb-1">08</p>
               <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Đang chờ</p>
             </div>
             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-inner">
               <span className="material-symbols-outlined">trending_up</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSchedulePage;
