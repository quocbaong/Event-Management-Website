import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import TransactionHistoryModal from '../components/modals/TransactionHistoryModal';
import WithdrawalModal from '../components/modals/WithdrawalModal';

const mockRevenueData = [
  { month: 'T1', revenue: 4000, expenses: 2400 },
  { month: 'T2', revenue: 3000, expenses: 1398 },
  { month: 'T3', revenue: 2000, expenses: 9800 },
  { month: 'T4', revenue: 2780, expenses: 3908 },
  { month: 'T5', revenue: 1890, expenses: 4800 },
  { month: 'T6', revenue: 2390, expenses: 3800 },
  { month: 'T7', revenue: 3490, expenses: 4300 },
];

const mockEventsSummary = [
  { id: 1, name: 'Lễ hội Âm nhạc Mùa Hè', date: '2026-06-15', revenue: 150000000, tickets: 1200, status: 'Hoàn thành' },
  { id: 2, name: 'Hội thảo Công nghệ Tech Summit', date: '2026-07-20', revenue: 85000000, tickets: 500, status: 'Đang mở bán' },
  { id: 3, name: 'Triển lãm Nghệ thuật Đương đại', date: '2026-08-10', revenue: 32000000, tickets: 300, status: 'Đang mở bán' },
  { id: 4, name: 'Giải chạy Marathon City', date: '2026-09-05', revenue: 0, tickets: 0, status: 'Sắp diễn ra' }
];

const mockRecentTransactions = [
  { id: 'TRX-101', type: 'Thu nhập', amount: 500000, date: '2026-05-03 10:30', description: 'Bán vé VIP (Tech Summit)' },
  { id: 'TRX-102', type: 'Rút tiền', amount: -20000000, date: '2026-05-02 15:45', description: 'Rút tiền về ngân hàng' },
  { id: 'TRX-103', type: 'Hoàn tiền', amount: -250000, date: '2026-05-01 09:12', description: 'Hoàn vé (Lễ hội Âm nhạc)' },
  { id: 'TRX-104', type: 'Thu nhập', amount: 1200000, date: '2026-04-30 14:20', description: 'Bán vé nhóm (Lễ hội Âm nhạc)' },
  { id: 'TRX-105', type: 'Thu nhập', amount: 750000, date: '2026-04-29 11:10', description: 'Bán vé Regular (Tech Summit)' },
  { id: 'TRX-106', type: 'Thu nhập', amount: 3000000, date: '2026-04-28 16:45', description: 'Tài trợ kim cương (Marathon)' },
  { id: 'TRX-107', type: 'Rút tiền', amount: -5000000, date: '2026-04-27 08:30', description: 'Phí quảng cáo Facebook' },
  { id: 'TRX-108', type: 'Thu nhập', amount: 450000, date: '2026-04-26 13:20', description: 'Bán vé Early Bird (Art Expo)' },
];

const OrganizerFinancePage = () => {
  const navigate = useNavigate();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [eventsSummary, setEventsSummary] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [activeChartTab, setActiveChartTab] = useState('revenue');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [timeRange, setTimeRange] = useState('yearly'); // 'yearly' or 'monthly'

  useEffect(() => {
    // Giả lập gọi API lấy dữ liệu
    const fetchFinanceData = async () => {
      setChartLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let generatedData = [];
        
        if (timeRange === 'yearly') {
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;
          const monthsToShow = selectedYear === currentYear ? currentMonth : 12;
          
          generatedData = Array.from({ length: monthsToShow }, (_, i) => ({
            name: `T${i + 1}`,
            revenue: Math.floor(Math.random() * 5000) + 1000,
            expenses: Math.floor(Math.random() * 3000) + 500
          }));
        } else {
          // Monthly view - 30 days
          generatedData = Array.from({ length: 30 }, (_, i) => ({
            name: `${i + 1}`,
            revenue: Math.floor(Math.random() * 1000) + 200,
            expenses: Math.floor(Math.random() * 600) + 100
          }));
        }

        setTransactions(mockRecentTransactions);
        setEventsSummary(mockEventsSummary);
        setRevenueData(generatedData);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      } finally {
        setLoading(false);
        setEventsLoading(false);
        setChartLoading(false);
      }
    };

    fetchFinanceData();
  }, [selectedYear, timeRange]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const renderTrend = (value) => {
    const isPositive = value >= 0;
    return (
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? '+' : ''}{value}%
      </span>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tài chính Tổng quan
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Quản lý và theo dõi doanh thu tất cả các sự kiện
          </p>
        </div>
        <button 
          onClick={() => setIsWithdrawalModalOpen(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">account_balance</span>
          Rút tiền
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Tổng Doanh Thu', value: formatCurrency(267000000), trend: 15.3, icon: 'account_balance_wallet', color: 'indigo', bg: 'bg-indigo-50', text: 'text-indigo-600' },
          { label: 'Số Dư Khả Dụng', value: formatCurrency(85000000), subtitle: 'Sẵn sàng để rút', icon: 'payments', color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-600' },
          { label: 'Tổng Vé Bán Ra', value: '2,000', trend: 5, icon: 'local_activity', color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 group hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.text}`}>
                  <span className="material-symbols-outlined">
                    {stat.icon}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
              {stat.trend !== undefined ? renderTrend(stat.trend) : (
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 rounded-full uppercase">
                  {stat.subtitle}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Chart & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Thống kê tài chính</h2>
              <div className="relative group">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="appearance-none bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-1 pl-3 pr-8 text-xs font-bold text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer outline-none"
                >
                  {[2023, 2024, 2025, 2026].map(year => (
                    <option key={year} value={year}>Năm {year}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-slate-600 dark:text-slate-400 focus:ring-0 cursor-pointer outline-none px-2"
                >
                  <option value="yearly">Xem theo năm</option>
                  <option value="monthly">Tháng này (30 ngày)</option>
                </select>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveChartTab('revenue')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeChartTab === 'revenue' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Doanh thu
              </button>
              <button 
                onClick={() => setActiveChartTab('expenses')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeChartTab === 'expenses' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Chi phí
              </button>
            </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full relative">
            {chartLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px] z-10 rounded-xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đang tải dữ liệu...</p>
                </div>
              </div>
            ) : null}
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeChartTab === 'revenue' ? '#6366f1' : '#f43f5e'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={activeChartTab === 'revenue' ? '#6366f1' : '#f43f5e'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} 
                  dy={10}
                  interval={timeRange === 'monthly' ? 4 : 0}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  width={80}
                  tickFormatter={(val) => `${val >= 1000 ? val/1000 + 'k' : val}`}
                />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-slate-800 p-3 shadow-xl border border-slate-100 dark:border-slate-700 rounded-xl">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                            {timeRange === 'yearly' ? `Tháng ${payload[0].payload.name.substring(1)}` : `Ngày ${payload[0].payload.name}`}
                          </p>
                          <p className={`text-sm font-black ${activeChartTab === 'revenue' ? 'text-indigo-600' : 'text-rose-600'}`}>
                            {formatCurrency(payload[0].value * (timeRange === 'yearly' ? 10000 : 2000))}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeChartTab === 'revenue' ? 'revenue' : 'expenses'} 
                  stroke={activeChartTab === 'revenue' ? '#6366f1' : '#f43f5e'} 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  dot={{ r: 4, fill: activeChartTab === 'revenue' ? '#6366f1' : '#f43f5e', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Giao dịch gần đây</h2>
            <button 
              onClick={() => setIsTransactionModalOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {loading ? (
              // Skeleton Loader
              [...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded"></div>
                      <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
              ))
            ) : (
              transactions.slice(0, 4).map((trx, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">{trx.description}</div>
                      <div className="text-xs text-slate-500">{trx.date}</div>
                    </div>
                  </div>
                  <div className={`font-bold text-sm ${trx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    {trx.amount > 0 ? '+' : ''}{formatCurrency(trx.amount)}
                  </div>
                </div>
              ))
            )}
            {!loading && transactions.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm italic">
                Chưa có giao dịch nào
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Chi tiết theo sự kiện</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Tên Sự kiện</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Trạng thái</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Vé đã bán</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase text-right">Doanh thu</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {eventsLoading ? (
                // Skeleton Rows
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 animate-pulse">
                    <td className="py-4 px-4">
                      <div className="h-4 w-48 bg-slate-100 dark:bg-slate-800 rounded mb-2"></div>
                      <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded ml-auto"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : (
                eventsSummary.map((event) => (
                  <tr key={event.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-900 dark:text-white">{event.name}</div>
                      <div className="text-xs text-slate-500">{event.date}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Hoàn thành' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        : event.status === 'Đang mở bán' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">
                      {event.tickets}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-slate-900 dark:text-white">
                      {formatCurrency(event.revenue)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => navigate(`/organizer/finance/${event.id}`)}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 rounded-lg text-sm font-medium transition-colors"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History Modal */}
      <TransactionHistoryModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transactions={transactions}
      />
      {/* Withdrawal Modal */}
      <WithdrawalModal 
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        availableBalance={85000000}
      />
    </div>
  );
};

export default OrganizerFinancePage;
