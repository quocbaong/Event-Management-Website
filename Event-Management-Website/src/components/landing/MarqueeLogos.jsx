import React from 'react';

const MarqueeLogos = () => {
  const logos = [
    { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Levi\'s', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Levi%27s_logo.svg' },
    { name: 'ITP Media', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-1-2-3-4-5-6-7-8-9-0-a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-brand1' },
    { name: 'BusinessNZ', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-1-2-3-4-5-6-7-8-9-0-a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-brand2' },
    { name: 'Razorpay', src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-8 mb-16">
          <div className="flex-1 h-[1px] bg-slate-100"></div>
          <h2 className="text-sm font-headline font-bold text-slate-400 tracking-[0.4em] uppercase">
            Được tin dùng bởi
          </h2>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {logos.map((logo, i) => (
            <div key={i} className="h-8 md:h-10 flex items-center justify-center min-w-[120px]">
               <img 
                 src={logo.src} 
                 alt={logo.name} 
                 className="h-full object-contain" 
                 onError={(e) => {
                   e.target.style.display = 'none';
                   e.target.parentNode.innerHTML = `<span class="font-black text-xl tracking-tighter text-slate-300 italic">${logo.name}</span>`;
                 }}
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeLogos;
