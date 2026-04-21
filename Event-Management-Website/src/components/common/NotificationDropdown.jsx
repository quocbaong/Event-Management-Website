import React from 'react';
import { 
  Bell, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  RefreshCcw,
  ChevronRight,
  Settings
} from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'location',
      title: 'Thay đổi địa điểm',
      subtitle: 'Hội thảo AI 2024 đã chuyển sang Park Hyatt.',
      time: '10 phút trước',
      isNew: true,
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Nhắc nhở lịch trình',
      subtitle: 'Lễ ra mắt sản phẩm X sẽ bắt đầu trong 2 giờ tới.',
      time: '2 giờ trước',
      isNew: true,
    },
    {
      id: 3,
      type: 'approval',
      title: 'Xác nhận đăng ký',
      subtitle: 'Vé của bạn đã được phê duyệt thành công.',
      time: '5 giờ trước',
      isNew: false,
    },
    {
      id: 4,
      type: 'update',
      title: 'Cập nhật phiên thảo luận',
      subtitle: 'Phiên thảo luận sẽ bắt đầu muộn hơn 15 phút.',
      time: '8 giờ trước',
      isNew: false,
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'location': return <MapPin className="w-4 h-4 text-indigo-600" />;
      case 'reminder': return <Clock className="w-4 h-4 text-purple-600" />;
      case 'approval': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'update': return <RefreshCcw className="w-4 h-4 text-amber-600" />;
      default: return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  const getBgColor = (type) => {
    switch(type) {
      case 'location': return 'bg-indigo-50';
      case 'reminder': return 'bg-purple-50';
      case 'approval': return 'bg-emerald-50';
      case 'update': return 'bg-amber-50';
      default: return 'bg-primary/5';
    }
  };

  return (
    <div className="absolute top-[calc(100%+12px)] -right-12 w-[400px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-[101]">
      {/* Arrow */}
      <div className="absolute -top-2 right-16 w-4 h-4 bg-white border-l border-t border-slate-100 rotate-45"></div>
      
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Thông báo</h3>
           <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">3 MỚI</span>
        </div>
        <button className="text-slate-400 hover:text-primary transition-colors">
           <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-[480px] overflow-y-auto no-scrollbar">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className="p-6 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group relative flex items-start gap-4"
          >
            {notif.isNew && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            )}
            
            <div className={`w-10 h-10 ${getBgColor(notif.type)} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                {getIcon(notif.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[13px] font-black text-slate-800 group-hover:text-primary transition-colors line-clamp-1">{notif.title}</h4>
                <span className="text-[10px] text-slate-400 font-bold">{notif.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                {notif.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white">
        <button className="w-full py-4 bg-slate-50 hover:bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-2">
           Xem tất cả thông báo
           <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
