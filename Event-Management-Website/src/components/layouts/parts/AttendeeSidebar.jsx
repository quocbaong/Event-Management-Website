import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  QrCode,
  Star,
  Heart
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-300 rounded-2xl group ${
      active
        ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
    }`}
  >
    <Icon
      className={`w-5 h-5 shrink-0 transition-colors ${
        active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
      }`}
    />
    <span className={`text-[15px] ${active ? 'font-extrabold' : 'font-semibold opacity-80'}`}>
      {label}
    </span>
  </div>
);

const AttendeeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-[var(--sidebar-width)] h-screen bg-white border-r border-slate-100 flex flex-col pt-10 pb-6 px-4">
      {/* Brand & Greeting Section matched to Image 1 */}
      <div className="px-5 mb-10">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.05em] mb-1">
          Chào mừng quay lại
        </p>
        <p className="text-[22px] font-black text-indigo-700 tracking-tight leading-tight">
          Người tham dự
        </p>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
        <SidebarItem
          icon={LayoutDashboard}
          label="Tổng quan"
          active={isActive('/attendee/dashboard')}
          onClick={() => navigate('/attendee/dashboard')}
        />
        <SidebarItem
          icon={Calendar}
          label="Sự kiện của tôi"
          active={isActive('/attendee/events')}
          onClick={() => navigate('/attendee/events')}
        />
        <SidebarItem
          icon={Ticket}
          label="Vé & Đăng ký"
          active={isActive('/attendee/tickets')}
          onClick={() => navigate('/attendee/tickets')}
        />
        <SidebarItem
          icon={QrCode}
          label="Check-in QR"
          active={isActive('/attendee/qr')}
          onClick={() => navigate('/attendee/qr')}
        />
        <SidebarItem
          icon={Star}
          label="Đánh giá"
          active={isActive('/attendee/reviews')}
          onClick={() => navigate('/attendee/reviews')}
        />
        <SidebarItem
          icon={Heart}
          label="Sự kiện yêu thích"
          active={isActive('/attendee/favorites')}
          onClick={() => navigate('/attendee/favorites')}
        />
      </nav>

      {/* Bottom info or contact could go here in future */}
    </aside>
  );
};

export default AttendeeSidebar;
