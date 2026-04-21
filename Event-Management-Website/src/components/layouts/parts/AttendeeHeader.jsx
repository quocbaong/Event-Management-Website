import React from 'react';
import { Search, Bell } from 'lucide-react';
import logo from '../../../assets/logo.png';

const AttendeeHeader = () => {
  return (
    <header className="h-[var(--topbar-height)] border-b border-slate-50 bg-white sticky top-0 z-10 px-8 flex items-center justify-between">
      {/* Restore Logo and Search on Left */}
      <div className="flex items-center gap-8 flex-1">
        <div className="flex items-center gap-3 cursor-pointer group shrink-0">
          <img src={logo} alt="EventArchitect" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          <span className="text-[20px] font-black text-indigo-600 tracking-tight hidden sm:block">
            Nexus Events
          </span>
        </div>

        <div className="hidden lg:flex flex-1 max-w-[400px]">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              className="w-full h-11 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-[14px] font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              placeholder="Tìm kiếm sự kiện, diễn giả..."
            />
          </div>
        </div>
      </div>

      {/* Profile and Notifications on Right */}
      <div className="flex items-center gap-8">
        <button className="relative p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
        </button>

        <div className="flex items-center gap-4 cursor-pointer group px-1 py-1 rounded-full transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-black text-slate-800 leading-tight">Minh Phan</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">Hạng Vàng</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 group-hover:border-indigo-400 transition-all">
            <img
              src="https://avatar.vercel.sh/minhphan.png?size=40"
              alt="Minh Phan"
              className="w-full h-full object-cover shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AttendeeHeader;
