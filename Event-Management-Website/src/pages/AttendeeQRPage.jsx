import React from 'react';
import { Sun, QrCode, ArrowLeft } from 'lucide-react';

const AttendeeQRPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Info */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Check-in sự kiện</h1>
        <p className="text-lg font-bold text-slate-500 mb-6">Hội thảo Công nghệ Tương lai 2024</p>
        
        <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
          <span className="text-sm font-black text-indigo-600 tracking-tight">Trạng thái: Sẵn sàng check-in</span>
        </div>
      </div>

      {/* QR Code Container */}
      <div className="flex justify-center mb-10">
        <div className="relative group">
          {/* Decorative Corner Borders */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-indigo-600 rounded-tl-3xl"></div>
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-indigo-600 rounded-tr-3xl"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-indigo-600 rounded-bl-3xl"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-indigo-600 rounded-br-3xl"></div>

          {/* Main QR Card */}
          <div className="w-[380px] h-[380px] bg-white rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 flex items-center justify-center p-12 transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="w-full h-full relative flex items-center justify-center">
                {/* Stylized QR placeholder */}
                <div className="w-32 h-40 border-4 border-slate-900 rounded-lg relative flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-900 rounded-full absolute top-4"></div>
                    <div className="w-10 h-10 border-4 border-slate-900 rounded-full flex items-center justify-center">
                        <div className="w-2 h-6 bg-slate-900 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-4 flex flex-col items-center">
                        <div className="w-8 h-1 bg-slate-900 rounded-full mb-1"></div>
                        <div className="w-6 h-1 bg-slate-900 rounded-full"></div>
                    </div>
                </div>
                {/* Scanning line animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 h-1 w-full animate-scan-line"></div>
                
                <p className="absolute bottom-[-20px] text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">SMI-MXO Check-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction Text */}
      <div className="text-center mb-10 p-8 bg-slate-50/50 rounded-[32px] border border-slate-100/50">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Vui lòng đưa mã này cho nhân viên tại quầy đón tiếp</h3>
        <p className="text-sm font-medium text-slate-400">Mã QR này duy nhất cho tài khoản của bạn</p>
      </div>

      {/* Tip Box */}
      <div className="mb-10 p-6 bg-indigo-50/30 rounded-[32px] border border-indigo-100/30 flex items-start gap-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-500">
          <Sun className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-800 mb-1">Mẹo check-in nhanh</h4>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            Vui lòng tăng độ sáng màn hình lên mức tối đa để máy quét hoạt động tốt nhất.
          </p>
        </div>
      </div>

      {/* Ticket Details */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="space-y-4">
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CHI TIẾT VÉ</p>
              <div className="flex items-center gap-4">
                 <p className="text-sm font-bold text-slate-500">Họ và tên</p>
                 <p className="text-base font-black text-slate-900">Nguyễn Văn Khách</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-slate-500">Vị trí ghế</p>
              <p className="text-base font-black text-slate-900">Khu vực A - Hàng 12</p>
           </div>
        </div>
        <div className="bg-indigo-50 px-5 py-2 rounded-xl border border-indigo-100">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-tight">Standard Pass</span>
        </div>
      </div>
    </div>
  );
};

export default AttendeeQRPage;
