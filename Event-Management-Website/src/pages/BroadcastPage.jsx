import React, { useState } from 'react';
import { 
  Send, 
  Save, 
  Calendar, 
  History, 
  TrendingUp, 
  Users, 
  MousePointer2, 
  AlertCircle,
  Smartphone,
  Info,
  Clock,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const BroadcastPage = () => {
  const [schedule, setSchedule] = useState('now');

  return (
    <div className="p-8 bg-[#f8fafc] min-h-full font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Content: Left Column (8/12) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Create New Broadcast Form */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                Tạo bản tin mới
              </h2>

              <div className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Tiêu đề bản tin</label>
                  <input 
                    type="text" 
                    placeholder="Nhập tiêu đề để thông báo..." 
                    className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-slate-400"
                  />
                </div>

                {/* Selectors Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Loại tin</label>
                    <select className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer">
                      <option>Bảo trì hệ thống</option>
                      <option>Tin tức mới</option>
                      <option>Khuyến mãi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Đối tượng nhận</label>
                    <select className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer">
                      <option>Tất cả người dùng</option>
                      <option>Chỉ ban tổ chức</option>
                      <option>Người dùng mới</option>
                    </select>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nội dung thông báo</label>
                  <textarea 
                    rows={6}
                    placeholder="Soạn thảo nội dung chi tiết tại đây..." 
                    className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none placeholder:text-slate-400"
                  ></textarea>
                </div>

                {/* Scheduling */}
                <div className="bg-slate-50 rounded-[24px] p-6 space-y-4">
                  <h3 className="text-sm font-bold text-primary">Tùy chọn lập lịch</h3>
                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="schedule" 
                        className="hidden" 
                        checked={schedule === 'now'} 
                        onChange={() => setSchedule('now')}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${schedule === 'now' ? 'border-primary' : 'border-slate-300'}`}>
                        {schedule === 'now' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${schedule === 'now' ? 'text-primary' : 'text-slate-500'}`}>Gửi ngay lập tức</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="schedule" 
                        className="hidden" 
                        checked={schedule === 'later'} 
                        onChange={() => setSchedule('later')}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${schedule === 'later' ? 'border-primary' : 'border-slate-300'}`}>
                        {schedule === 'later' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${schedule === 'later' ? 'text-primary' : 'text-slate-500'}`}>Lên lịch gửi sau</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                     <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="mm/dd/yyyy, --:-- --" 
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm text-slate-600 outline-none"
                          disabled={schedule === 'now'}
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                  <button className="px-8 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    Lưu nháp
                  </button>
                  <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 transition-all">
                    Phát tin ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Broadcast History */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  Lịch sử phát tin
                </h2>
                <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Item 1 */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-transparent hover:border-primary/10 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider mb-2">
                        Bảo trì
                      </span>
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">Nâng cấp hệ thống định kỳ tháng 10</h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Gửi lúc: 14:30 - 15/10/2023
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-primary">98.2%</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tỷ lệ xem</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reach</p>
                      <p className="font-bold text-slate-700">12,450</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Clicks</p>
                      <p className="font-bold text-slate-700">8,920</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Bounce</p>
                      <p className="font-bold text-slate-700">1.2%</p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-transparent hover:border-primary/10 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-wider mb-2">
                        Tin tức
                      </span>
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">Ra mắt tính năng bản đồ nhiệt trực tiếp</h3>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Gửi lúc: 09:00 - 12/10/2023
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-black text-primary">85.4%</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tỷ lệ xem</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reach</p>
                      <p className="font-bold text-slate-700">45,100</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Clicks</p>
                      <p className="font-bold text-slate-700">32,540</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Bounce</p>
                      <p className="font-bold text-slate-700">2.8%</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Side Panel: Right Column (4/12) */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Live Preview Mockup */}
            <div className="bg-[#1e1b4b] rounded-[40px] p-8 shadow-2xl relative overflow-hidden h-[600px] flex flex-col items-center">
               <div className="flex items-center gap-1 mb-8 w-full justify-end">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </div>

               <div className="w-full flex items-center gap-2 text-white/90 mb-12">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Bản xem trước trực tiếp</span>
               </div>

               {/* Mobile Notification Card */}
               <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-2xl animate-fade-in">
                  <div className="bg-primary p-6 py-8 flex flex-col items-center text-center text-white relative">
                     <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6 text-white" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Thông báo hệ thống</p>
                     <h4 className="text-xl font-bold">Hệ thống bảo trì</h4>
                  </div>
                  <div className="p-6 space-y-4">
                     <div>
                        <h5 className="font-bold text-slate-800 mb-2">Chào quản trị viên,</h5>
                        <p className="text-sm text-slate-500 leading-relaxed">
                           Hệ thống EventArchitect sẽ tiến hành bảo trì nâng cấp định kỳ vào lúc 02:00 AM ngày 20/10/2023. Một số dịch vụ có thể bị gián đoạn tạm thời trong khoảng 30 phút.
                        </p>
                     </div>
                     <div className="flex items-center justify-between pt-2">
                        <button className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                           Xem chi tiết <ChevronRight className="w-3 h-3" />
                        </button>
                        <button className="bg-primary text-white text-[11px] font-bold px-6 py-2 rounded-xl">
                           ĐÃ HIỂU
                        </button>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-6 w-full text-center">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Giao diện di động mô phỏng</p>
               </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-8">
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Tổng quan hiệu quả tuần
               </h2>

               <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500 font-medium">Tổng lượt tiếp cận</span>
                    <span className="text-xl font-black text-primary">128.4k</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[85%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500 font-medium">Tỷ lệ mở trung bình</span>
                    <span className="text-xl font-black text-primary">62.8%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[62%] opacity-60"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500 font-medium">Phản hồi tiêu cực</span>
                    <span className="text-xl font-black text-primary">0.02%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full w-[5%]"></div>
                  </div>
                </div>
               </div>

               {/* Tip Box */}
               <div className="bg-blue-50/50 border border-blue-100 rounded-[24px] p-6 flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                     "Mẹo: Gửi thông báo vào khoảng 9-10h sáng thứ Ba thường có tỷ lệ xem cao hơn 25%."
                  </p>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BroadcastPage;
