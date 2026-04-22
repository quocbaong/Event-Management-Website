import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User as UserIcon } from 'lucide-react';
import NotificationDropdown from '../../common/NotificationDropdown';

const AttendeeHeader = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Sự kiện của tôi', path: '/attendee/events' },
    { label: 'Khám phá sự kiện', path: '/attendee/explore' }
  ];

  return (
    <header className="h-[var(--topbar-height)] border-b border-slate-50 bg-white sticky top-0 z-[100] px-8 flex items-center justify-between">
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-[400px]">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-600 transition-all" />
          <input 
            type="text" 
            placeholder="Tìm kiếm sự kiện..." 
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-[14px] font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
          />
        </div>
      </div>

      {/* Middle: Custom Navigation Links for Attendee Header */}
      <nav className="hidden xl:flex items-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => navigate(link.path)}
            className={`text-[14px] font-black tracking-tight transition-all pb-1 border-b-2 ${
              location.pathname === link.path 
              ? 'text-indigo-600 border-indigo-600' 
              : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`p-2 rounded-xl transition-all ${isNotifOpen ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-50 shadow-sm cursor-pointer hover:border-indigo-200 transition-all">
           <img src="https://avatar.vercel.sh/minhphan.png?size=36" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default AttendeeHeader;
