import React from 'react';

const MarqueeLogos = () => {
  const logos = [
    { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', h: 'h-6 md:h-8' },
    { name: 'BusinessNZ', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/BusinessNZ_logo.svg', h: 'h-10 md:h-14' },
    { name: 'Levi\'s', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Levi%27s_logo.svg', h: 'h-9 md:h-12' },
    { name: 'ITP Media', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/ITP_Media_Group_logo.svg', h: 'h-6 md:h-9' },
    { name: 'Victoria University', url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Victoria_University_of_Wellington_logo.svg', h: 'h-12 md:h-16' },
    { name: 'Razorpay', url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg', h: 'h-6 md:h-9' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header - Bold Black and Sharp */}
        <div className="flex items-center gap-12 mb-16">
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <h2 className="text-[14px] md:text-[16px] font-headline font-black text-slate-950 uppercase tracking-[0.8em] whitespace-nowrap">
            Được tin dùng bởi
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        {/* Logos Grid - Vibrant Colors and Solid Presence - Fixed to ONE LINE */}
        <div className="flex flex-nowrap md:flex-wrap justify-between md:justify-center items-center gap-8 md:gap-16 lg:gap-20 px-4 overflow-x-auto md:overflow-visible no-scrollbar">
          {logos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <img
                src={logo.url}
                alt={logo.name}
                className={`${logo.h} w-auto object-contain filter-none brightness-100 opacity-100`}
                onError={(e) => {
                  // Fallback for missing images
                  e.target.style.display = 'none';
                  const span = document.createElement('span');
                  span.textContent = logo.name;
                  span.className = 'text-slate-900 font-black text-lg uppercase tracking-tight italic';
                  e.target.parentNode.appendChild(span);
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
