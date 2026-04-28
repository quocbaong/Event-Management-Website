import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrganizerHeader = ({ onToggleSidebar }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    const path = location.pathname;
    
    // Xử lý tiêu đề cho module Báo cáo với phân cấp
    if (path === '/organizer/reports') return { main: "Báo cáo & Phân tích" };
    if (path === '/organizer/reports/analytics') return { parent: "Báo cáo thống kê", parentPath: "/organizer/reports", child: "Phân tích Chuyên sâu" };
    if (path === '/organizer/reports/templates') return { parent: "Báo cáo thống kê", parentPath: "/organizer/reports", child: "Thư viện Mẫu Báo cáo" };

    // Check for dynamic path /organizer/events/:id/attendees
    if (path.startsWith('/organizer/events/') && path.endsWith('/attendees')) {
      return { main: "Quản lý Sự kiện" };
    }

    const items = [
      { path: "/organizer/dashboard", label: "Tổng quan" },
      { path: "/organizer/events", label: "Quản lý Sự kiện" },
      { path: "/organizer/attendees", label: "Danh sách Khách mời" },
      { path: "/organizer/schedule", label: "Quản lý Lịch trình" },
      { path: "/organizer/timeline", label: "Quản lý Dòng thời gian" },
      { path: "/organizer/finance", label: "Quản lý tài chính" },
      { path: "/organizer/settings", label: "Cài đặt Hệ thống" },
      { path: "/organizer/help", label: "Trung tâm Hỗ trợ" },
    ];
    const current = items.find(item => item.path === path);
    return { main: current ? current.label : "Quản lý Sự kiện" };
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm border-b border-slate-200/50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Page Title / Breadcrumb */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mr-1"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">menu</span>
          </button>
          
          <div className="flex items-center gap-1.5 overflow-hidden">
            {getTitle().parent ? (
              <>
                <button 
                  onClick={() => navigate(getTitle().parentPath)}
                  className="text-[15px] font-medium text-slate-400 whitespace-nowrap hover:text-indigo-500 transition-colors"
                >
                  {getTitle().parent}
                </button>
                <span className="material-symbols-outlined text-[16px] text-slate-300 mt-0.5">chevron_right</span>
                <h2 className="text-[15px] font-bold text-indigo-600 truncate">
                  {getTitle().child}
                </h2>
              </>
            ) : (
              <h2 className="text-[15px] font-bold text-indigo-600 truncate">
                {getTitle().main}
              </h2>
            )}
          </div>
        </div>

        
        <div className="flex items-center gap-6">
          <div className="relative flex items-center bg-surface-container-high rounded-full px-4 py-2 w-64">
            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 outline-none" 
              placeholder="Tìm kiếm..." 
              type="text"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
              <span className="material-symbols-outlined">language</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Hoàng Nam</p>
              <p className="text-xs text-slate-500 font-medium">Nhà tổ chức cấp cao</p>
            </div>
            <img 
              alt="Ảnh đại diện người dùng" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUuiXPJ9oY8F7KDiJelapd9FhqeTcna4hAVQoKeMlFNr6U_E5aoFVaFOXjToY_EtgN-E04v1GdCNcQMMwC5OKjjycVOrkI3FxSPfXskWwx_hQ73Cy22sfBhE2w-0wzuRZ-cfZROmYCSFTA6nYF-gOkDFd9XgFjdUyBaTVcdt0i3iSrsiKSii8RPA1mhtrDh0SKxPjkpvfkM-EQv7kUQi-cR1Th07g9EFCpsWt5hLhlE8zwdo0BaUNHz-08XNiKV3yvEvClzLPL1ZMJ"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrganizerHeader;
