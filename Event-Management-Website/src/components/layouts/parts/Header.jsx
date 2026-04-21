import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Mail, ChevronRight, Settings, User as UserIcon } from 'lucide-react';
import UserProfileModal from '../../modals/UserProfileModal';

const Header = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumbs = () => {
    switch(location.pathname) {
      case '/admin/broadcast':
        return (
          <h1 className="text-xl font-bold text-[#1e293b]">Trung tâm Phát tin</h1>
        );
      case '/admin/events':
        return (
          <>
            <span className="text-text-secondary">Hệ thống</span>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-primary font-black uppercase tracking-wider">Quản lý Sự kiện Toàn cầu</span>
          </>
        );
      case '/dashboard':
        return (
          <>
            <span className="text-text-secondary">Bảng điều khiển</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-primary font-bold">Tổng quan</span>
          </>
        );
      default:
        return (
          <>
            <span>Bảng điều khiển</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-primary">Chi tiết quản trị</span>
          </>
        );
    }
  };

  return (
    <>
      <header className="h-[var(--topbar-height)] border-b border-border-color bg-white sticky top-0 z-10 px-8 flex items-center justify-between">
        {/* Title / Breadcrumbs */}
        <div className="flex items-center gap-2">
          {getBreadcrumbs()}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - hidden for broadcast to match image */}
          {location.pathname !== '/admin/broadcast' && (
            <div className="relative w-[320px] mr-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Tìm kiếm nhanh..." 
                className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          )}
          
          {/* Icons */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-gray-50 text-slate-600 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-50 text-slate-600 transition-all">
               <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

          {/* User Profile */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <span className="text-sm font-medium text-slate-600">Hệ thống</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 group-hover:border-primary transition-all">
              <UserIcon className="w-4 h-4" />
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

