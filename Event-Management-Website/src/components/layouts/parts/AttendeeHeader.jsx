import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, ChevronRight, Settings, User as UserIcon } from 'lucide-react';
import NotificationDropdown from '../../common/NotificationDropdown';

const AttendeeHeader = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumbs = () => {
    switch(location.pathname) {
      case '/attendee/dashboard':
        return (
          <>
            <span className="text-slate-400 font-medium">Bảng điều khiển</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Tổng quan</span>
          </>
        );
      case '/attendee/events':
        return (
          <>
            <span className="text-slate-400 font-medium">Sự kiện</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Sự kiện của tôi</span>
          </>
        );
      case '/attendee/tickets':
        return (
          <>
            <span className="text-slate-400 font-medium">Cá nhân</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Vé & Đăng ký</span>
          </>
        );
      case '/attendee/qr':
        return (
          <>
            <span className="text-slate-400 font-medium">Công cụ</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Check-in QR</span>
          </>
        );
      case '/attendee/reviews':
        return (
          <>
            <span className="text-slate-400 font-medium">Cá nhân</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Đánh giá</span>
          </>
        );
      case '/attendee/favorites':
        return (
          <>
            <span className="text-slate-400 font-medium">Khám phá</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Yêu thích</span>
          </>
        );
      default:
        return (
          <>
            <span className="text-slate-400 font-medium">Hành trình</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600 font-black uppercase tracking-wider text-sm">Chi tiết</span>
          </>
        );
    }
  };

  return (
    <header className="h-[var(--topbar-height)] border-b border-slate-100 bg-white sticky top-0 z-[100] px-8 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        {getBreadcrumbs()}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-[320px] mr-2 hidden lg:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-all" />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-full bg-slate-50 border-none rounded-full py-2.5 pl-11 pr-4 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
          />
        </div>
        
        {/* Icons */}
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative p-2 rounded-xl transition-all ${isNotifOpen ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-500'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

          <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-black text-slate-800 leading-tight">Minh Phan</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Người tham dự</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:border-indigo-300 transition-all">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AttendeeHeader;
