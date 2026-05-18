import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
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
  ChevronRight,
  Sparkles,
  Bell,
  Volume2
} from 'lucide-react';

const BroadcastPage = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Bảo trì hệ thống');
  const [target, setTarget] = useState('Tất cả người dùng');
  const [body, setBody] = useState('');
  const [schedule, setSchedule] = useState('now');
  const [scheduleTime, setScheduleTime] = useState('');

  // Loaded Data State
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalReach: "128.4k",
    avgOpenRate: "62.8%",
    negativeFeedback: "0.02%",
    totalReachPercent: 85,
    avgOpenRatePercent: 62,
    negativeFeedbackPercent: 5
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/broadcast');
      setHistory(response.data.history || []);
      if (response.data.stats) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Lỗi khi tải lịch sử phát tin', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendBroadcast = async () => {
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề bản tin!');
      return;
    }
    if (!body.trim()) {
      alert('Vui lòng nhập nội dung bản tin!');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('/admin/broadcast', {
        title,
        type,
        target,
        body,
        scheduleOption: schedule,
        scheduleTime
      });

      alert(schedule === 'now' ? 'Bản tin đã được phát đi thành công!' : 'Đã lên lịch phát bản tin thành công!');
      
      // Reset Form
      setTitle('');
      setBody('');
      setSchedule('now');
      setScheduleTime('');
      
      // Refresh History
      fetchData();
    } catch (error) {
      console.error('Lỗi khi phát bản tin', error);
      alert('Có lỗi xảy ra khi phát bản tin. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-full font-sans animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Title Section */}
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            Phát Tin Toàn Cầu
          </h1>
          <p className="text-slate-500 font-medium">
            Gửi thông báo tức thời hoặc lên lịch gửi tin đến các nhóm đối tượng người dùng cụ thể trên toàn hệ thống.
          </p>
        </div>

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề để thông báo..." 
                    className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-slate-400 font-bold"
                  />
                </div>

                {/* Selectors Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Loại tin</label>
                    <div className="relative">
                      <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer font-bold pr-10"
                      >
                        <option>Bảo trì hệ thống</option>
                        <option>Tin tức mới</option>
                        <option>Khuyến mãi</option>
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Đối tượng nhận</label>
                    <div className="relative">
                      <select 
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer font-bold pr-10"
                      >
                        <option>Tất cả người dùng</option>
                        <option>Chỉ ban tổ chức</option>
                        <option>Người dùng mới</option>
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Nội dung thông báo</label>
                  <textarea 
                    rows={6}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Soạn thảo nội dung chi tiết tại đây..." 
                    className="w-full bg-slate-100 border-none rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none placeholder:text-slate-400 font-medium leading-relaxed"
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
                          type="datetime-local" 
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-sm text-slate-600 outline-none font-bold cursor-pointer"
                          disabled={schedule === 'now'}
                        />
                     </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setTitle('Nâng cấp định kỳ');
                      setBody('Chào mọi người, hệ thống sẽ bảo trì nâng cấp trong vòng 15 phút tới.');
                    }}
                    className="px-8 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Mẫu thử nhanh
                  </button>
                  <button 
                    disabled={submitting}
                    onClick={handleSendBroadcast}
                    className="px-8 py-3 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 transition-all active:scale-95"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4 fill-current" />
                    )}
                    {schedule === 'now' ? 'Phát tin ngay' : 'Lập lịch gửi'}
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
              </div>

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-slate-400">Đang tải lịch sử...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-3xl p-6 border border-transparent hover:border-primary/10 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${
                            item.type === 'Bảo trì' ? 'bg-primary/10 text-primary' :
                            item.type === 'Khuyến mãi' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {item.type}
                          </span>
                          <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Gửi lúc: {item.sentAt}
                          </p>
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-black text-primary">{item.viewRate}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tỷ lệ xem</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/50">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Reach</p>
                          <p className="font-bold text-slate-700">{item.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Clicks</p>
                          <p className="font-bold text-slate-700">{item.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Bounce</p>
                          <p className="font-bold text-slate-700">{item.bounce}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Side Panel: Right Column (4/12) */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Live Preview Mockup */}
            <div className="bg-[#1e1b4b] rounded-[40px] p-8 shadow-2xl relative overflow-hidden h-[600px] flex flex-col items-center">
               <div className="flex items-center gap-1 mb-8 w-full justify-end">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </div>

               <div className="w-full flex items-center gap-2 text-white/90 mb-12">
                  <Smartphone className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Bản xem trước trực tiếp</span>
               </div>

               {/* Mobile Notification Card */}
               <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-2xl transition-all duration-300">
                  <div className={`p-6 py-8 flex flex-col items-center text-center text-white relative transition-colors duration-500 ${
                    type === 'Bảo trì hệ thống' ? 'bg-primary' :
                    type === 'Khuyến mãi' ? 'bg-emerald-600' : 'bg-orange-500'
                  }`}>
                     <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                        {type === 'Bảo trì hệ thống' ? (
                          <AlertCircle className="w-6 h-6 text-white" />
                        ) : type === 'Khuyến mãi' ? (
                          <Sparkles className="w-6 h-6 text-white" />
                        ) : (
                          <Bell className="w-6 h-6 text-white" />
                        )}
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">
                       {type === 'Bảo trì hệ thống' ? 'Thông báo hệ thống' :
                        type === 'Khuyến mãi' ? 'Ưu đãi đặc biệt' : 'Tin tức cập nhật'}
                     </p>
                     <h4 className="text-xl font-bold line-clamp-1">{title || 'Hệ thống bảo trì'}</h4>
                  </div>
                  <div className="p-6 space-y-4">
                     <div>
                        <h5 className="font-bold text-slate-800 mb-2">Chào quản trị viên,</h5>
                        <p className="text-sm text-slate-500 leading-relaxed min-h-[100px] max-h-[140px] overflow-y-auto">
                           {body || 'Hệ thống EventArchitect sẽ tiến hành bảo trì nâng cấp định kỳ vào lúc 02:00 AM ngày 20/10/2023. Một số dịch vụ có thể bị gián đoạn tạm thời trong khoảng 30 phút.'}
                        </p>
                     </div>
                     <div className="flex items-center justify-between pt-2">
                        <button className="text-[11px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600 transition-colors">
                           Xem chi tiết <ChevronRight className="w-3 h-3" />
                        </button>
                        <button className={`text-white text-[11px] font-black px-6 py-2 rounded-xl transition-colors duration-500 ${
                          type === 'Bảo trì hệ thống' ? 'bg-primary' :
                          type === 'Khuyến mãi' ? 'bg-emerald-600' : 'bg-orange-500'
                        }`}>
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
                    <span className="text-xl font-black text-primary">{stats.totalReach}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${stats.totalReachPercent}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500 font-medium">Tỷ lệ mở trung bình</span>
                    <span className="text-xl font-black text-primary">{stats.avgOpenRate}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000 opacity-60" style={{ width: `${stats.avgOpenRatePercent}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-500 font-medium">Phản hồi tiêu cực</span>
                    <span className="text-xl font-black text-primary">{stats.negativeFeedback}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full transition-all duration-1000" style={{ width: `${stats.negativeFeedbackPercent}%` }}></div>
                  </div>
                </div>
               </div>

               {/* Tip Box */}
               <div className="bg-blue-50/50 border border-blue-100 rounded-[24px] p-6 flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                     <Info className="w-5 h-5 text-primary animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
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
