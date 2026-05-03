import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

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
  { id: 'TRX-104', type: 'Thu nhập', amount: 1200000, date: '2026-04-30 14:20', description: 'Bán vé nhóm (Lễ hội Âm nhạc)' }
];

const OrganizerFinancePage = () => {
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
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
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">account_balance</span>
          Rút tiền
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider">Tổng Doanh Thu</span>
            <span className="material-symbols-outlined text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">account_balance_wallet</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(267000000)}
          </div>
          <div className="text-emerald-500 text-sm font-medium mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">trending_up</span>
            +15.3% so với tháng trước
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider">Số Dư Khả Dụng</span>
            <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg">payments</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(85000000)}
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">
            Sẵn sàng để rút
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider">Tổng Vé Bán Ra</span>
            <span className="material-symbols-outlined text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg">local_activity</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            2,000
          </div>
          <div className="text-emerald-500 text-sm font-medium mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">trending_up</span>
            +5% so với tháng trước
          </div>
        </div>
      </div>

      {/* Chart & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Biểu đồ doanh thu</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} width={80} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [formatCurrency(value * 10000), 'Doanh thu']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Giao dịch gần đây</h2>
            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            {mockRecentTransactions.map((trx, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    trx.amount > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    <span className="material-symbols-outlined text-sm">
                      {trx.amount > 0 ? 'arrow_downward' : 'arrow_upward'}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{trx.description}</div>
                    <div className="text-xs text-slate-500">{trx.date}</div>
                  </div>
                </div>
                <div className={`font-bold text-sm ${trx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {trx.amount > 0 ? '+' : ''}{formatCurrency(trx.amount)}
                </div>
              </div>
            ))}
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
              {mockEventsSummary.map((event) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizerFinancePage;
