import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Bell, 
  Settings, 
  MoreVertical, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Flag,
  EyeOff,
  History,
  Send,
  User,
  ShieldCheck,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';

const FeedbackPage = () => {
  const [filter, setFilter] = useState('pending');

  return (
    <div className="p-8 bg-[#f8fafc] min-h-full font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Top Analysis Section */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Sentiment Analysis Card */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                 <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-extrabold text-slate-800">Phân tích Cảm xúc</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-500">Tích cực</span>
                  <span className="text-lg font-black text-primary">68%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[68%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-500">Trung lập</span>
                  <span className="text-lg font-black text-slate-400">22%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full w-[22%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-500">Tiêu cực</span>
                  <span className="text-lg font-black text-red-500">10%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Issue Trends Chart Card */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                   <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-extrabold text-slate-800">Xu hướng Báo cáo Sự cố</h2>
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                 <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white shadow-sm text-primary transition-all">Tháng này</button>
                 <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-600 transition-all">Tháng trước</button>
              </div>
            </div>

            <div className="h-[200px] flex items-end justify-between px-4 pb-8 relative">
                {/* Horizontal grid lines simulation */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                   <div className="border-t border-slate-900 w-full h-[1px]"></div>
                   <div className="border-t border-slate-900 w-full h-[1px]"></div>
                   <div className="border-t border-slate-900 w-full h-[1px]"></div>
                </div>

                <div className="flex flex-col items-center gap-3 w-full">
                   <div className="w-16 bg-indigo-100 rounded-t-2xl h-[40px] transition-all hover:bg-indigo-200"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">SPAM</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                   <div className="w-16 bg-indigo-200 rounded-t-2xl h-[80px] transition-all hover:bg-indigo-300"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">NỘI DUNG</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                   <div className="w-16 bg-indigo-100/50 rounded-t-2xl h-[30px] transition-all hover:bg-indigo-200"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">GIẢ MẠO</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                   <div className="w-20 bg-indigo-400 rounded-t-3xl h-[120px] transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-200"></div>
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">KỸ THUẬT</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                   <div className="w-16 bg-indigo-300 rounded-t-2xl h-[60px] transition-all hover:bg-indigo-400"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">THANH TOÁN</span>
                </div>
                <div className="flex flex-col items-center gap-3 w-full">
                   <div className="w-16 bg-indigo-100 rounded-t-2xl h-[45px] transition-all hover:bg-indigo-200"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">KHÁC</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Stream Section */}
        <div className="grid grid-cols-12 gap-8 pt-4">
          
          {/* Feedback Stream (8/12) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-black text-slate-800">Luồng Phản hồi Mới</h2>
               <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
                  <button 
                    onClick={() => setFilter('all')}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'all' ? 'bg-white shadow-md text-primary' : 'text-slate-500 hover:text-slate-800'}`}
                  >Tất cả</button>
                  <button 
                    onClick={() => setFilter('pending')}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'pending' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'text-slate-500 hover:text-slate-800'}`}
                  >Cần xử lý</button>
               </div>
            </div>

            <div className="space-y-4">
               {/* Item 1 */}
               <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 transition-all hover:border-primary/20 group">
                  <div className="flex items-start justify-between mb-6">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10">
                           <img src="https://avatar.vercel.sh/leminhtuan.png" alt="Le Minh Tuan" />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-800">Lê Minh Tuấn</h4>
                           <p className="text-xs text-slate-400 font-medium flex items-center gap-1">@minhtuan <span className="opacity-30">•</span> 12 phút trước</p>
                        </div>
                     </div>
                     <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100">BÁO CÁO NỘI DUNG</span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 text-md font-medium">
                     "Tôi phát hiện sự kiện 'Hội thảo Blockchain 2024' có dấu hiệu lừa đảo. Người tổ chức yêu cầu chuyển khoản phí đặt chỗ qua ví cá nhân thay vì qua hệ thống thanh toán của app."
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                     <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-primary/10 hover:text-primary transition-all">
                           <CheckCircle2 className="w-4 h-4" /> Phê duyệt
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all">
                           <Flag className="w-4 h-4" /> Gắn cờ
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all">
                           <EyeOff className="w-4 h-4" /> Ẩn nội dung
                        </button>
                     </div>
                     <button className="text-xs font-black text-primary hover:underline flex items-center gap-1">
                        Chi tiết báo cáo <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               {/* Item 2 */}
               <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 transition-all hover:border-primary/20 group">
                  <div className="flex items-start justify-between mb-6">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10">
                           <img src="https://avatar.vercel.sh/thuy.png" alt="Thuy" />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-800">Nguyễn Thu Thùy</h4>
                           <p className="text-xs text-slate-400 font-medium flex items-center gap-1">@thuynguyen <span className="opacity-30">•</span> 45 phút trước</p>
                        </div>
                     </div>
                     <span className="px-4 py-1.5 rounded-full bg-blue-50 text-primary text-[10px] font-black uppercase tracking-widest border border-blue-100">ĐÓNG GÓP Ý KIẾN</span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 text-md font-medium">
                     "Giao diện mới rất đẹp và mượt mà! Tuy nhiên phần lọc sự kiện theo địa điểm đôi khi phản hồi chậm. Hy vọng team sớm cải thiện."
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                     <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-primary/10 hover:text-primary transition-all">
                           <Send className="w-4 h-4" /> Phản hồi
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all">
                           <History className="w-4 h-4" /> Lưu trữ
                        </button>
                     </div>
                     <p className="text-xs font-bold italic text-slate-400">
                        Cảm xúc: <span className="text-primary font-black">Tích cực</span>
                     </p>
                  </div>
               </div>

               {/* Item 3 */}
               <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 transition-all hover:border-primary/20 group">
                  <div className="flex items-start justify-between mb-6">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10">
                           <img src="https://avatar.vercel.sh/nam.png" alt="Nam" />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-800">Trần Hoàng Nam</h4>
                           <p className="text-xs text-slate-400 font-medium flex items-center gap-1">@namtran <span className="opacity-30">•</span> 2 giờ trước</p>
                        </div>
                     </div>
                     <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">LỖI KỸ THUẬT</span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 text-md font-medium">
                     "Không thể tải lên tệp vé PDF từ thiết bị Android. Hệ thống báo lỗi 403 mặc dù tôi đã đăng nhập."
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                     <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
                           <ShieldCheck className="w-4 h-4" /> Chuyển Tech-Team
                        </button>
                        <span className="inline-flex items-center gap-1 px-4 py-2 bg-amber-50 text-amber-600 text-[11px] font-bold rounded-xl">
                           Đang xử lý
                        </span>
                     </div>
                     <p className="text-xs font-bold text-slate-400">
                        Mức độ: <span className="text-red-500 font-black">Cao</span>
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Panel (4/12) */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Communication Log */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
               <h3 className="text-lg font-extrabold text-slate-800 mb-8 flex items-center gap-2">
                  Nhật ký Giao tiếp
               </h3>

               <div className="space-y-6">
                  {/* Log 1 */}
                  <div className="flex gap-4 group">
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-primary border border-indigo-100 shrink-0">
                           <User className="w-5 h-5" />
                        </div>
                        <div className="w-[2px] h-full bg-slate-50 my-2"></div>
                     </div>
                     <div className="bg-slate-50/80 rounded-3xl p-5 hover:bg-slate-50 transition-all flex-1">
                        <p className="text-xs font-black text-primary mb-2 uppercase tracking-wider">Admin → @minhtuan</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                           "Chào Tuấn, chúng tôi đã nhận báo cáo của bạn và đang tiến hành xác thực tài khoản tổ chức này. Cảm ơn bạn!"
                        </p>
                        <p className="text-[10px] text-slate-400 mt-3 font-bold">Gửi lúc 12:45 • Đã xem</p>
                     </div>
                  </div>

                  {/* Log 2 */}
                  <div className="flex gap-4 group">
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 border border-slate-200 shrink-0">
                           <Info className="w-5 h-5" />
                        </div>
                        <div className="w-[2px] h-full bg-slate-50 my-2"></div>
                     </div>
                     <div className="bg-slate-50/80 rounded-3xl p-5 hover:bg-slate-50 transition-all flex-1">
                        <p className="text-xs font-black text-slate-800 mb-2 uppercase tracking-wider">Hệ thống → Tất cả Users</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                           "Thông báo: Cập nhật điều khoản cộng đồng về việc tổ chức sự kiện..."
                        </p>
                        <p className="text-[10px] text-slate-400 mt-3 font-bold">Hôm qua lúc 18:00</p>
                     </div>
                  </div>

                  {/* Log 3 */}
                  <div className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 border border-red-100 shrink-0">
                           <AlertTriangle className="w-5 h-5" />
                        </div>
                     </div>
                     <div className="bg-slate-50/80 rounded-3xl p-5 hover:bg-slate-50 transition-all flex-1">
                        <p className="text-xs font-black text-red-600 mb-2 uppercase tracking-wider">Admin → @scam_user</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                           "Cảnh báo: Tài khoản của bạn bị tạm khóa 48h để điều tra hành vi gian lận."
                        </p>
                        <p className="text-[10px] text-slate-400 mt-3 font-bold">2 giờ trước</p>
                     </div>
                  </div>
               </div>

               <button className="w-full mt-8 py-4 px-6 border-2 border-slate-100 rounded-3xl text-sm font-black text-slate-500 hover:bg-slate-50 hover:text-primary transition-all flex items-center justify-center gap-2 group">
                  Xem toàn bộ lịch sử <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>

            {/* Help Center CTA */}
            <div className="bg-primary rounded-[40px] p-8 shadow-2xl shadow-primary/20 relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
               <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-black text-white leading-tight">Trung tâm Trợ giúp</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-medium">
                     Bạn cần hỗ trợ xử lý các báo cáo phức tạp? Liên hệ trực tiếp với bộ phận Pháp lý.
                  </p>
                  <button className="w-full py-4 bg-white/20 backdrop-blur-md rounded-2xl text-white font-black hover:bg-white text-primary transition-all duration-300">
                     Kết nối Pháp lý
                  </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
