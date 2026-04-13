import React from 'react';
import { Search, Bell, Mail, ChevronRight } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-[var(--topbar-height)] border-b border-border-color bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
        <span>Bảng điều khiển</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-primary">Chi tiết quản trị</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-[320px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhanh..." 
            className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-text-secondary hover:text-primary transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 rounded-xl hover:bg-gray-100 text-text-secondary hover:text-primary transition-all">
            <Mail className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-border-color">
          <div className="text-right">
            <h4 className="text-sm font-bold text-text-primary leading-tight">Minh Phan</h4>
            <p className="text-[11px] text-text-secondary font-medium">Quản trị viên</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img 
              src="https://avatar.vercel.sh/minh.png?size=40" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
