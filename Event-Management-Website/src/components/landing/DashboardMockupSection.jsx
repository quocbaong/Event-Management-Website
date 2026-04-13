import React from 'react';

const DashboardMockupSection = () => {
  return (
    <section className="py-24 bg-surface-dim relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        


        {/* Dashboard Image Wrapper */}
        <div className="relative rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 animate-fade-in group mb-20">
           <img 
             src="/src/assets/dashboard-mockup.png" 
             alt="Prestige Planner Dashboard Mockup" 
             className="w-full h-auto object-contain bg-white"
             onError={(e) => {
               e.target.src = 'https://placehold.co/1200x800/0a0b2e/white?text=Prestige+Planner+Dashboard+Mockup';
             }}
           />
           <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>



      </div>
    </section>
  );
};

export default DashboardMockupSection;
