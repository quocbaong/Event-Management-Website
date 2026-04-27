import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, Mail, ChevronRight, Settings, User as UserIcon } from 'lucide-react';
import UserProfileModal from '../../modals/UserProfileModal';
import NotificationDropdown from '../../common/NotificationDropdown';

const Header = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumbs = () => {
    switch (location.pathname) {
      case '/admin/broadcast':
        return (
          <>
            <span className="text-slate-400 font-medium">Hệ thống</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-primary font-black uppercase tracking-wider text-sm">Phát tin toàn cầu</span>
          </>
        );
      case '/admin/feedback':
        return (
          <>
            <span className="text-slate-400 font-medium">Hệ thống</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-primary font-black uppercase tracking-wider text-sm">Kiểm duyệt phản hồi</span>
          </>
        );
      case '/admin/settings':
        return (
          <>
            <span className="text-slate-400 font-medium">Hệ thống</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-primary font-black uppercase tracking-wider text-sm">Cấu hình hệ thống</span>
          </>
        );
      case '/admin/events':
        return (
          <>
            <span className="text-slate-400 font-medium">Hệ thống</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-primary font-black uppercase tracking-wider text-sm">Quản lý Sự kiện</span>
          </>
        );
      case '/dashboard':
        return (
          <>
            <span className="text-slate-400 font-medium">Bảng điều khiển</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-primary font-black uppercase tracking-wider text-sm">Tổng quan</span>
          </>
        );
      default:
        return (
          <>
            <span className="text-slate-400 font-medium">Quản trị</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-primary font-black uppercase tracking-wider text-sm">Chi tiết</span>
          </>
        );
    }
  };

  return (
    <>
      <header className="h-[var(--topbar-height)] border-b border-border-color bg-white sticky top-0 z-[100] px-8 flex items-center justify-between">
        {/* Title / Breadcrumbs */}
        <div className="flex items-center gap-2">
          {getBreadcrumbs()}
        </div>

        {/* Center Nav removed for synchronization */}

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - hidden for broadcast and settings */}
          {!['/admin/broadcast', '/admin/settings'].includes(location.pathname) && (
            <div className="relative w-[320px] mr-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder={location.pathname === '/admin/feedback' ? "Tìm kiếm phản hồi..." : "Tìm kiếm nhanh..."}
                className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`relative p-2 rounded-xl transition-all ${isNotifOpen ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-slate-600'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

            <Link to="/admin/settings" className="p-2 rounded-xl hover:bg-gray-50 text-slate-600 transition-all">
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

          {/* User Profile */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsProfileModalOpen(true)}
          >
            {location.pathname !== '/admin/settings' && <span className="text-sm font-medium text-slate-600">Hệ thống</span>}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${location.pathname === '/admin/settings'
                ? 'bg-primary text-white border border-primary/20'
                : 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:border-primary'
              }`}>
              {location.pathname === '/admin/settings' ? 'AD' : <UserIcon className="w-4 h-4" />}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={{
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
        }}
      />
    </>
  );
};

export default Header;

