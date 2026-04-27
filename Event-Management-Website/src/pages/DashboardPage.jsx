import React from 'react';
import StatCard from '../components/ui/StatCard';
import {
  Ticket,
  CalendarCheck,
  Users2,
  Smile,
  ChevronRight,
  Download,
  Calendar as CalendarIcon,
  CircleDot
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ActivityItem = ({ icon: Icon, color, title, time }) => (
  <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
    <div className={`p-2.5 rounded-xl ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-xs text-text-secondary mt-1">{time}</p>
    </div>
  </div>
);

const DeadlineItem = ({ title, event, time, progress, color, date }) => (
  <div className="p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-border-color transition-all">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h4 className="text-sm font-bold text-text-primary">{title}</h4>
        <p className="text-[11px] text-text-secondary">Sự kiện: {event}</p>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-bold text-text-primary">{time}</p>
        <p className="text-[10px] text-text-secondary">{date}</p>
      </div>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-1000`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

const DashboardPage = () => {
  // Chart Data
  const barData = {
    labels: ['Th.5', 'Th.6', 'Th.7', 'Th.8', 'Th.9', 'Th.10'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [35, 45, 30, 55, 40, 65],
        backgroundColor: '#1e40af',
        borderRadius: 8,
        barThickness: 20,
      },
      {
        label: 'Mục tiêu',
        data: [50, 50, 50, 50, 50, 50],
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        barThickness: 20,
      }
    ],
  };

  const doughnutData = {
    labels: ['Hội thảo & Workshop', 'Lễ ra mắt sản phẩm', 'Tiệc công ty'],
    datasets: [
      {
        data: [45, 25, 20],
        backgroundColor: ['#1e40af', '#1d4ed8', '#7dd3fc'],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: '75%',
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Chào buổi sáng, Minh!
          </h2>
          <p className="text-text-secondary font-medium mt-1">
            Dưới đây là tóm tắt hoạt động của các sự kiện trong tháng này.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-border-color font-bold text-sm text-text-primary hover:bg-gray-50 transition-all">
            <CalendarIcon className="w-4 h-4" />
            Tháng 10, 2023
          </button>
          <button className="flex items-center gap-2 bg-primary px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng doanh thu"
          value="428.500.000đ"
          subtext="so với tháng trước"
          trend="up"
          trendValue="+12.5%"
          icon={Ticket}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          title="Sự kiện đang chạy"
          value="24"
          subtext="mới tuần này"
          trend="up"
          trendValue="+2"
          icon={CalendarCheck}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
        />
        <StatCard
          title="Người tham dự"
          value="12.480"
          subtext="Tỉ lệ lấp đầy: 84%"
          icon={Users2}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-500"
        />
        <StatCard
          title="Độ hài lòng"
          value="4.8/5"
          subtext=""
          rating={4.8}
          icon={Smile}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-border-color">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Doanh thu theo tháng</h3>
              <p className="text-xs text-text-secondary mt-0.5">Biểu đồ so sánh doanh thu 6 tháng gần nhất</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs font-semibold text-text-secondary">Doanh thu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-xs font-semibold text-text-secondary">Mục tiêu</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { display: false },
                  x: { grid: { display: false }, border: { display: false } }
                }
              }}
            />
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-8 rounded-[32px] border border-border-color flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-1">Phân loại sự kiện</h3>
          <p className="text-xs text-text-secondary mb-8">Phân bổ theo loại hình tổ chức</p>

          <div className="flex-1 relative flex items-center justify-center min-h-[220px]">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-text-primary leading-none">124</span>
              <span className="text-[10px] text-text-secondary font-bold uppercase mt-1">Sự kiện</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e40af]"></div>
                <span className="text-sm font-medium text-text-secondary">Hội thảo & Workshop</span>
              </div>
              <span className="text-sm font-bold text-text-primary">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]"></div>
                <span className="text-sm font-medium text-text-secondary">Lễ ra mắt sản phẩm</span>
              </div>
              <span className="text-sm font-bold text-text-primary">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7dd3fc]"></div>
                <span className="text-sm font-medium text-text-secondary">Tiệc công ty</span>
              </div>
              <span className="text-sm font-bold text-text-primary">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-[32px] border border-border-color">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary">Hoạt động gần đây</h3>
            <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
              Xem tất cả <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <ActivityItem
              icon={Ticket}
              color="bg-blue-50 text-blue-500"
              title='Vé sự kiện "Tech Summit 2023" vừa được bán cho Nguyễn Văn A.'
              time="2 phút trước"
            />
            <ActivityItem
              icon={CircleDot}
              color="bg-green-50 text-green-500"
              title="Thủ tục thanh toán cho Hotel Majestic đã hoàn tất."
              time="1 giờ trước"
            />
            <ActivityItem
              icon={CalendarIcon}
              color="bg-orange-50 text-orange-500"
              title="Yêu cầu thay đổi menu từ Lễ cưới Tuấn & Lan cần được duyệt."
              time="4 giờ trước"
            />
            <ActivityItem
              icon={Users2}
              color="bg-indigo-50 text-indigo-500"
              title="Hoàng Linh đã tham gia vào đội ngũ quản lý sự kiện."
              time="Hôm qua"
            />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white p-8 rounded-[32px] border border-primary/20 bg-gradient-to-br from-white to-primary/5 shadow-inner">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-100 rounded-lg text-red-500">
                <CalendarIcon className="w-4 h-4 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Thời hạn sắp tới</h3>
            </div>
            <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
              Cần xử lý ngay
            </span>
          </div>
          <div className="space-y-4">
            <DeadlineItem
              title="Chốt danh sách báo chí"
              event="Digital Marketing Expo"
              time="Hôm nay"
              date="17:00"
              progress={90}
              color="bg-red-500"
            />
            <DeadlineItem
              title="Thanh toán đợt 2 cho đơn vị âm thanh"
              event="Festival Âm Nhạc Mùa Thu"
              time="Ngày mai"
              date="09:00"
              progress={65}
              color="bg-blue-500"
            />
            <DeadlineItem
              title="Gửi thiệp mời VIP"
              event="Gala Dinner Cuối Năm"
              time="Còn 3 ngày"
              date="12/10/2023"
              progress={30}
              color="bg-gray-300"
            />
          </div>
          <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-text-secondary text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/50 hover:border-primary/30 hover:text-primary transition-all group">
            <CircleDot className="w-4 h-4 opacity-50 group-hover:opacity-100" />
            Thêm thời hạn mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
