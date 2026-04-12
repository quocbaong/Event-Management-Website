import React from 'react';

const StatisticsSection = () => {
  const stats = [
    { value: '100,000+', label: 'sự kiện', icon: 'stars' },
    { value: '50,000+', label: 'nhà tổ chức sự kiện', icon: 'calendar_today' },
    { value: '165+', label: 'quốc gia', icon: 'public' },
    { value: '1.6M+', label: 'người tham dự', icon: 'groups' }
  ];

  return (
    <section className="py-20 bg-[#fff9f6] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center ${i < stats.length - 1 ? 'md:border-r border-slate-100' : ''} px-4`}>
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6 text-white shadow-lg">
                <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <div className="text-3xl md:text-4xl font-headline font-black text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-body font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
