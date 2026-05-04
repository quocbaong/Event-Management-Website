import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import TransactionHistoryModal from '../components/modals/TransactionHistoryModal';

const mockEventDetails = {
  1: { name: 'Lễ hội Âm nhạc Mùa Hè', date: '2026-06-15', status: 'Hoàn thành' },
  2: { name: 'Hội thảo Công nghệ Tech Summit', date: '2026-07-20', status: 'Đang mở bán' },
  3: { name: 'Triển lãm Nghệ thuật Đương đại', date: '2026-08-10', status: 'Đang mở bán' },
  4: { name: 'Giải chạy Marathon City', date: '2026-09-05', status: 'Sắp diễn ra' },
};

const mockTicketSales = [
  { type: 'Early Bird', sold: 200, revenue: 40000000 },
  { type: 'Regular', sold: 800, revenue: 240000000 },
  { type: 'VIP', sold: 100, revenue: 50000000 },
];

const mockEventTransactions = [
  { id: 'EVT-001', description: 'Bán vé VIP - Nguyen Van A', type: 'Thu nhập', amount: 500000, date: '2026-05-03 10:30', status: 'Thành công' },
  { id: 'EVT-002', description: 'Bán vé Regular - Tran Thi B', type: 'Thu nhập', amount: 300000, date: '2026-05-03 11:15', status: 'Thành công' },
  { id: 'EVT-003', description: 'Hoàn vé Early Bird - Le Van C', type: 'Hoàn tiền', amount: -200000, date: '2026-05-02 09:00', status: 'Hoàn tiền' },
];

const OrganizerEventFinancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const event = mockEventDetails[id] || { name: 'Sự kiện không xác định', date: '---', status: '---' };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/organizer/finance')}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Trở lại Tổng quan
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {event.name}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.status === 'Hoàn thành' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              : event.status === 'Đang mở bán' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {event.status}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            Ngày tổ chức: <span className="font-semibold text-slate-700 dark:text-slate-300">{event.date}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">download</span>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none flex flex-col justify-between text-white">
          <div className="flex items-center justify-between mb-4 opacity-80">
            <span className="font-semibold text-sm uppercase tracking-wider">Doanh thu sự kiện</span>
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div className="text-3xl font-bold">
            {formatCurrency(330000000)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider">Số vé đã bán</span>
            <span className="material-symbols-outlined text-indigo-500">local_activity</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            1,100 <span className="text-sm font-normal text-slate-500">/ 1,500</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider">Lượt xem trang</span>
            <span className="material-symbols-outlined text-emerald-500">visibility</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            12,450
          </div>
          <div className="text-emerald-500 text-sm font-medium mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">trending_up</span>
            Tỷ lệ chuyển đổi 8.8%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-semibold text-sm uppercase tracking-wider">Hoàn tiền</span>
            <span className="material-symbols-outlined text-red-500">currency_exchange</span>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(200000)}
          </div>
          <div className="text-slate-500 text-sm mt-2">
            1 vé đã hoàn
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Sales Breakdown Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Phân bổ doanh thu theo loại vé</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTicketSales} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tickFormatter={(value) => value / 1000000 + 'M'} tick={{fill: '#64748b'}} />
                <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 500}} width={80} />
                <RechartsTooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [formatCurrency(value), 'Doanh thu']}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Ticket Sales Table */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
           <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Thống kê loại vé</h2>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-slate-200 dark:border-slate-800">
                   <th className="pb-3 text-sm font-semibold text-slate-500 uppercase">Loại vé</th>
                   <th className="pb-3 text-sm font-semibold text-slate-500 uppercase text-right">Đã bán</th>
                   <th className="pb-3 text-sm font-semibold text-slate-500 uppercase text-right">Doanh thu</th>
                 </tr>
               </thead>
               <tbody>
                 {mockTicketSales.map((ticket, index) => (
                   <tr key={index} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                     <td className="py-4 font-medium text-slate-900 dark:text-white">{ticket.type}</td>
                     <td className="py-4 text-right text-slate-700 dark:text-slate-300">{ticket.sold}</td>
                     <td className="py-4 text-right font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(ticket.revenue)}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Recent Event Transactions */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lịch sử giao dịch</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsTransactionModalOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
            >
              Xem tất cả
            </button>
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Mã GD</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Người mua</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Loại vé</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase">Thời gian</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase text-right">Số tiền</th>
                <th className="py-4 px-4 font-semibold text-sm text-slate-500 uppercase text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {mockEventTransactions.map((trx, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-900 dark:text-white text-sm">{trx.id}</td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 text-sm">{trx.user}</td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 text-sm">{trx.ticketType}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm">{trx.date}</td>
                  <td className={`py-4 px-4 text-right font-bold text-sm ${trx.status === 'Hoàn tiền' ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                    {trx.status === 'Hoàn tiền' ? '-' : '+'}{formatCurrency(trx.amount)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      trx.status === 'Thành công' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History Modal */}
      <TransactionHistoryModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        transactions={mockEventTransactions}
      />
    </div>
  );
};

export default OrganizerEventFinancePage;
