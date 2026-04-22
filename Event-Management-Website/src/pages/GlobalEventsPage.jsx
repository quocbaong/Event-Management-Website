import React from 'react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Ban, 
  Eye, 
  RotateCcw,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  PieChart
} from 'lucide-react';

const StatCard = ({ title, value, valueColor = "text-text-primary", footer }) => (
  <div className="bg-white p-4 rounded-2xl border border-border-color shadow-sm flex flex-col gap-2 min-w-[150px] flex-1">
    <span className="text-[9px] uppercase tracking-widest font-black text-text-secondary/60">
      {title}
    </span>
    <div className="space-y-2">
      <h3 className={`text-2xl font-black tracking-tighter ${valueColor}`}>{value}</h3>
      {footer}
    </div>
  </div>
);

const FilterDropdown = ({ label, value }) => (
  <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</span>
    <div className="relative group">
      <select className="w-full bg-white border border-border-color rounded-xl py-3 px-4 text-sm font-bold text-text-primary appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
        <option>{value}</option>
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none group-focus:rotate-180 transition-transform">
        <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
      </div>
    </div>
  </div>
);

const GlobalEventsPage = () => {
  const tableData = [
    {
      id: "EVT-88291",
      name: "TechSummit 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=100&h=100",
      organizer: { name: "Nguyễn Văn A", role: "Platinum", avatar: "https://avatar.vercel.sh/user1" },
      status: { text: "Đang diễn ra", color: "bg-green-100 text-green-700 dot-green" },
      joined: { current: "2.5k", total: "3k", percent: 85 },
      date: "24 Th10, 2023",
      time: "08:00 AM"
    },
    {
      id: "EVT-45120",
      name: "Đêm nhạc Indie",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=100&h=100",
      organizer: { name: "Lê Thị B", role: "Verified", avatar: "https://avatar.vercel.sh/user2" },
      status: { text: "Chờ phê duyệt", color: "bg-orange-100 text-orange-700 dot-orange" },
      joined: { current: "--", total: "500", percent: 0 },
      date: "01 Th11, 2023",
      time: "07:30 PM"
    },
    {
      id: "EVT-00921",
      name: "Lễ hội Ẩm thực 2023",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=100&h=100",
      organizer: { name: "Trần Minh C", role: "Standard", avatar: "https://avatar.vercel.sh/user3" },
      status: { text: "Bị đình chỉ", color: "bg-red-100 text-red-700 dot-red" },
      joined: { current: "142", total: "1k", percent: 14 },
      date: "15 Th10, 2023",
      time: "10:00 AM"
    }
  ];

  const categories = [
    { name: "HỘI THẢO", percent: 45, color: "bg-primary" },
    { name: "ÂM NHẠC", percent: 30, color: "bg-purple-500" },
    { name: "THỂ THAO", percent: 15, color: "bg-orange-500" },
    { name: "KHÁC", percent: 10, color: "bg-gray-300" }
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#fbfbfd]">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-2">
            Quản lý Sự kiện Toàn cầu
          </h1>
          <p className="text-text-secondary font-medium">
            Giám sát và kiểm duyệt tất cả các hoạt động trên nền tảng. <br />
            Đảm bảo chất lượng nội dung và an toàn cho cộng đồng.
          </p>
        </div>
        
        {/* Top Summary Stats */}
        <div className="flex gap-3 w-full max-w-3xl">
          <StatCard 
            title="Tổng sự kiện" 
            value="12,842" 
            footer={
              <div className="flex items-center gap-1.5 text-green-500 font-bold text-sm">
                <span className="text-lg">↗</span> +12%
              </div>
            }
          />
          <StatCard 
            title="Đang diễn ra" 
            value="856" 
            valueColor="text-primary"
            footer={
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-primary rounded-full w-[60%]"></div>
              </div>
            }
          />
          <StatCard 
            title="Chờ duyệt" 
            value="42" 
            valueColor="text-orange-700"
            footer={
              <span className="inline-flex px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-black uppercase tracking-tight">
                Khẩn cấp
              </span>
            }
          />
          <StatCard 
            title="Bị báo cáo" 
            value="15" 
            valueColor="text-red-600"
            footer={
              <div className="flex items-center gap-1.5 text-red-600 font-bold text-xs">
                <AlertCircle className="w-3.5 h-3.5 fill-current text-red-600" />
                Cần xử lý
              </div>
            }
          />
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-6 rounded-3xl border border-border-color shadow-sm flex flex-wrap items-end gap-6">
        <FilterDropdown label="Lọc theo hạng mục" value="Tất cả hạng mục" />
        <FilterDropdown label="Hạng người tổ chức" value="Tất cả cấp độ" />
        <FilterDropdown label="Trạng thái báo cáo" value="Tất cả trạng thái" />
        
        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2 shadow-xl shadow-primary/20 active:scale-95">
          <Filter className="w-4 h-4 fill-current" />
          Áp dụng lọc
        </button>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[32px] border border-border-color shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-6 border-b border-border-color flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-black text-text-primary">Danh sách sự kiện</h3>
            <span className="text-sm font-medium text-text-secondary pl-4 border-l border-border-color">
              Đã chọn <span className="font-black text-primary">0</span> mục
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-green-100 transition-all">
              <CheckCircle2 className="w-4 h-4" />
              Phê duyệt hàng loạt
            </button>
            <button className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-red-100 transition-all">
              <Ban className="w-4 h-4" />
              Đình chỉ hàng loạt
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-text-secondary">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-color bg-gray-50/50">
                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded-md" /></th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Sự kiện & ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Người tổ chức</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Trạng thái</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Tham gia</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Ngày diễn ra</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition-all cursor-pointer group">
                  <td className="px-6 py-6"><input type="checkbox" className="rounded-md" /></td>
                  <td className="px-6 py-6 font-bold">
                    <div className="flex items-center gap-4">
                      <img src={row.image} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                      <div>
                        <p className="text-text-primary text-sm font-black tracking-tight">{row.name}</p>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{row.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <img src={row.organizer.avatar} className="w-8 h-8 rounded-full border border-border-color" />
                      <div>
                        <p className="text-sm font-bold text-text-primary">{row.organizer.name}</p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          row.organizer.role === 'Platinum' ? 'bg-blue-100 text-blue-600' : 
                          row.organizer.role === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {row.organizer.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                       <span className={`px-4 py-1.5 rounded-full text-[11px] font-black tracking-tight flex items-center gap-2 shadow-sm ${row.status.color.split(' dot-')[0]}`}>
                         <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${row.status.color.includes('green') ? 'bg-green-500' : row.status.color.includes('orange') ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                         {row.status.text}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                      <span className="text-sm font-black text-text-primary tracking-tight">{row.joined.current} <span className="text-gray-300 font-medium">/ {row.joined.total}</span></span>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: `${row.joined.percent}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-black text-text-primary">{row.date}</p>
                      <p className="text-[11px] text-text-secondary font-medium mt-0.5">{row.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 rounded-xl hover:bg-primary/10 text-text-secondary hover:text-primary transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-xl hover:bg-orange-50 text-text-secondary hover:text-orange-500 transition-all">
                        <AlertCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-xl hover:bg-red-50 text-text-secondary hover:text-red-500 transition-all">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-6 bg-gray-50/50 flex justify-between items-center">
          <p className="text-sm font-medium text-text-secondary">
            Hiển thị <span className="font-black text-text-primary">1 - 10</span> trong số <span className="font-black text-text-primary">1,240</span> sự kiện
          </p>
          <div className="flex items-center gap-1.5">
            <button className="p-2 rounded-lg text-gray-300 hover:text-text-primary transition-colors"><ChevronsLeft className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg text-gray-300 hover:text-text-primary transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex items-center gap-1 mx-2">
              <button className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20">1</button>
              <button className="w-10 h-10 rounded-xl hover:bg-gray-200 text-text-secondary font-bold text-sm transition-all">2</button>
              <button className="w-10 h-10 rounded-xl hover:bg-gray-200 text-text-secondary font-bold text-sm transition-all">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="w-10 h-10 rounded-xl hover:bg-gray-200 text-text-secondary font-bold text-sm transition-all">124</button>
            </div>
            <button className="p-2 rounded-lg text-text-secondary hover:text-primary transition-colors"><ChevronRight className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg text-text-secondary hover:text-primary transition-colors"><ChevronsRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Bottom Area - AI and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* AI Banner */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-primary rounded-[40px] p-10 flex flex-col justify-between text-white shadow-2xl shadow-primary/30 min-h-[300px]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-white/20 backdrop-blur-xl rounded-2xl ring-1 ring-white/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Gợi ý từ AI</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4 leading-tight">
              Tự động phát hiện vi phạm
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed max-w-lg mb-10">
              Hệ thống AI đã phát hiện 4 sự kiện mới có các dấu hiệu vi phạm chuyên môn, sế về nội dung hình ảnh. Hãy kiểm tra ngay các mục được gắn nhãn đỏ trong danh sách chờ duyệt.
            </p>
          </div>

          <div className="relative z-10">
            <button className="bg-white text-primary px-8 py-4 rounded-2xl font-black hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 group/btn">
              Kiểm tra ngay
              <ChevronRight className="w-4 h-4 inline-block ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Distribution Card */}
        <div className="bg-white p-10 rounded-[40px] border border-border-color shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-black text-text-primary tracking-tight">Phân bộ hạng mục</h3>
               <PieChart className="w-5 h-5 text-gray-300" />
            </div>
            
            <div className="space-y-8">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black text-text-secondary uppercase tracking-[0.15em]">{cat.name}</span>
                    <span className="text-sm font-black text-text-primary">{cat.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} rounded-full transition-all duration-1000 shadow-sm`} 
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
              Xem báo cáo chi tiết <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalEventsPage;
