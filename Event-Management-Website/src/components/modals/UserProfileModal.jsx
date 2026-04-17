import React from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Phone, ShieldCheck, Check } from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  // Data from screenshot
  const userData = user || {
    name: 'Nguyễn Văn An',
    id: '#EA-10293',
    role: 'Ban tổ chức',
    email: 'an.nguyen@email.com',
    phone: '+84 90 123 4567',
    address: 'Quận 7, TP. Hồ Chí Minh, Việt Nam',
    events: 12,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'Đã định danh (eKYC)'
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[620px] bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 font-body">
        
        {/* Header - Purple Gradient */}
        <div className="h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Row (Touching the purple line) */}
        <div className="px-10 pb-8">
          <div className="flex items-end gap-6 mb-8 mt-4">
            <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-xl overflow-hidden shrink-0 bg-white">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-[#1e293b] font-headline tracking-tight">
                {userData.name}
              </h2>
              <p className="text-[#3b82f6] text-sm font-bold mt-1">
                {userData.role} · ID: {userData.id}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Thông tin liên lạc</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                    <Mail className="w-4 h-4 text-slate-800" />
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                    <Phone className="w-4 h-4 text-slate-800" />
                    {userData.phone}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Địa chỉ</p>
                <div className="text-[13px] font-bold text-slate-700">
                  {userData.address}
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Thống kê hoạt động</p>
                <div className="space-y-2 text-[13px] font-bold text-slate-700">
                  <div>{userData.events} Sự kiện đã tổ chức</div>
                  <div>{userData.rating}/5.0 Đánh giá uy tín</div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Trạng thái xác thực</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f0fdf4] text-[#16a34a] text-[11px] font-bold rounded-full border border-[#dcfce7]">
                  <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                  {userData.status}
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Bubble */}
          <div className="mt-8 p-6 bg-slate-50/80 rounded-[32px]">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Phân quyền & vai trò</p>
            <div className="flex flex-wrap gap-3">
              {/* Active Pill */}
              <label className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full border-2 border-[#3b82f6] shadow-sm cursor-pointer transition-all">
                <input type="radio" name="role" defaultChecked className="hidden" />
                <div className="w-5 h-5 rounded-full bg-[#3b82f6] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                </div>
                <span className="text-sm font-bold text-[#3b82f6]">Ban tổ chức</span>
              </label>

              {/* Inactive Pill 1 */}
              <label className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full border border-slate-200 cursor-pointer hover:border-slate-300 transition-all">
                <input type="radio" name="role" className="hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                <span className="text-sm font-bold text-slate-600">Kiểm duyệt nội dung</span>
              </label>

              {/* Inactive Pill 2 */}
              <label className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full border border-slate-200 cursor-pointer hover:border-slate-300 transition-all">
                <input type="radio" name="role" className="hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                <span className="text-sm font-bold text-slate-600">Hỗ trợ kỹ thuật</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center justify-between px-2">
            <button className="text-red-500 font-extrabold text-sm hover:underline transition-all group">
              Khóa tài khoản
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-full transition-all"
              >
                Đóng
              </button>
              <button className="px-8 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-sm rounded-full shadow-lg shadow-blue-600/20 transition-all">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UserProfileModal;
