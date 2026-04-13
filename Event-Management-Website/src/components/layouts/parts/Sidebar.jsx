import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Wallet, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

import logo from '../../../assets/logo.png';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 rounded-xl group ${
    active 
      ? 'bg-primary/10 text-primary border-r-4 border-primary' 
      : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
  }`}>
    <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}`} />
    <span className="font-semibold text-[15px]">{label}</span>
  </div>
);

const Sidebar = () => {
  return (
    <aside className="w-[var(--sidebar-width)] h-screen bg-white border-r border-border-color flex flex-col pt-4 pb-6">
      {/* Logo */}
      <div className="px-6 mb-8">
        <img src={logo} alt="Prestige Planner" className="h-14 w-auto object-contain" />
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Tổng quan" active />
        <SidebarItem icon={Calendar} label="Sự kiện" />
        <SidebarItem icon={Users} label="Khách mời" />
        <SidebarItem icon={BarChart3} label="Báo cáo" />
        <SidebarItem icon={Wallet} label="Tài chính" />
        <SidebarItem icon={Settings} label="Cài đặt" />
      </nav>

      {/* Bottom Section */}
      <div className="px-4 space-y-4">
        {/* Create Event Button */}
        <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1">
          <Plus className="w-5 h-5" />
          <span>Tạo sự kiện mới</span>
        </button>

        <div className="pt-4 space-y-1 border-t border-border-color">
          <SidebarItem icon={HelpCircle} label="Hỗ trợ" />
          <SidebarItem icon={LogOut} label="Đăng xuất" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
