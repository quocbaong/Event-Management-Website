import React from 'react';
import { 
  Share2, 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Monitor,
  CheckCircle2,
  ExternalLink,
  Smartphone
} from 'lucide-react';

const AttendeeTicketsPage = () => {
  return (
    <div className="p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-[#fbfcff] min-h-screen">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-[700px]">
          <h1 className="text-[48px] font-black text-slate-900 leading-tight mb-4 tracking-tighter">
             Vé tham gia
          </h1>
          <p className="text-[15px] font-bold text-slate-400 leading-relaxed max-w-[600px]">
            Thông tin vé điện tử chính thức của bạn. Vui lòng xuất trình mã QR này tại quầy check-in để bắt đầu trải nghiệm.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-4 rounded-[20px] bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all border border-slate-100 shadow-sm">
             <Share2 className="w-6 h-6" />
          </button>
          <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[22px] font-black text-[15px] shadow-xl shadow-indigo-100 transition-all active:scale-95">
             <Download className="w-5 h-5" />
             Tải xuống vé
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* 2. Main Ticket Section */}
        <div className="xl:col-span-8">
          <div className="bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-slate-100 border border-slate-50 flex flex-col md:flex-row h-full">
            {/* Left: Event Visual */}
            <div className="relative w-full md:w-[45%] h-[400px] md:h-auto overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" 
                 alt="Event" 
                 className="w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent" />
               <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest w-fit mb-6">
                    Hội nghị Quốc tế
                  </span>
                  <h3 className="text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                    Hội Thảo Công Nghệ FutureDev 2024
                  </h3>
                  <p className="text-white/60 font-bold text-sm">Hành trình kiến tạo tương lai số</p>
               </div>
            </div>

            {/* Middle Divider Dot-line */}
            <div className="hidden md:flex flex-col justify-center items-center relative w-[1px]">
               <div className="absolute top-0 bottom-0 border-l-[3px] border-dashed border-slate-100 -left-[1px]"></div>
               <div className="absolute -top-6 w-12 h-12 bg-[#fbfcff] rounded-full"></div>
               <div className="absolute -bottom-6 w-12 h-12 bg-[#fbfcff] rounded-full"></div>
            </div>

            {/* Right: QR and Info */}
            <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
               <div className="bg-white p-6 rounded-[40px] shadow-xl shadow-slate-50 border border-slate-50 mb-10 group hover:scale-105 transition-transform duration-500">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-EA-2024-8890" alt="QR Code" className="w-48 h-48 opacity-80" />
               </div>
               
               <div className="space-y-8">
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Mã vé</p>
                    <p className="text-2xl font-black text-indigo-600 tracking-tight">#EA-2024-8890</p>
                  </div>
                  
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Hạng vé</p>
                    <p className="text-xl font-black text-slate-800 tracking-tight">Premium Access</p>
                  </div>

                  <div className="bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-full flex items-center justify-center gap-2 mx-auto w-fit border border-emerald-100">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                    <span className="text-[12px] font-black uppercase tracking-widest">Đã xác thực</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Details & Wallets */}
        <div className="xl:col-span-4 space-y-8">
          {/* Schedule Detail Card */}
          <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-50 space-y-10">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Chi tiết lịch trình</h3>
            
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[22px] flex items-center justify-center shrink-0">
                   <Calendar className="w-7 h-7" />
                </div>
                <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày diễn ra</p>
                   <p className="text-[17px] font-black text-slate-800 tracking-tight">Thứ Bảy, 15 Tháng 10, 2024</p>
                   <p className="text-[13px] font-bold text-slate-500 mt-1">08:00 AM - 05:30 PM</p>
                </div>
              </div>

              <div className="flex gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-[22px] flex items-center justify-center shrink-0">
                   <MapPin className="w-7 h-7" />
                </div>
                <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Địa điểm</p>
                   <p className="text-[17px] font-black text-slate-800 tracking-tight leading-snug">Trung tâm Hội nghị Quốc gia</p>
                   <p className="text-[13px] font-bold text-slate-500 mt-1">Phòng VIP 01, Tầng 3, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Info Card */}
          <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-50 space-y-10">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Thông tin vị trí</h3>
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-slate-50 p-6 rounded-[28px] border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Khu vực</p>
                  <p className="text-3xl font-black text-indigo-600">A1</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-[28px] border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Số ghế</p>
                  <p className="text-2xl font-black text-indigo-600 leading-tight">Row 12, #04</p>
               </div>
            </div>
          </div>

          {/* Wallet Buttons */}
          <div className="space-y-4 pt-4">
             <button className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-800 py-5 rounded-[24px] flex items-center justify-center gap-4 font-black transition-all active:scale-95 shadow-sm">
                <Smartphone className="w-6 h-6 text-indigo-600" />
                <span>Lưu vào Google Wallet</span>
             </button>
             <button className="w-full bg-black hover:bg-zinc-900 text-white py-5 rounded-[24px] flex items-center justify-center gap-4 font-black transition-all active:scale-95 shadow-xl shadow-slate-100">
                <Monitor className="w-6 h-6 text-white/90" />
                <span>Apple Wallet</span>
             </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AttendeeTicketsPage;
