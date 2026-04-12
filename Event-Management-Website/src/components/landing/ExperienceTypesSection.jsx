import React from 'react';

const ExperienceTypesSection = () => {
  const types = [
    { 
      title: 'Trực tiếp', 
      desc: 'Kết nối thật, ngay tại địa điểm tổ chức sự kiện', 
      color: 'bg-[#0033cc]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-1-2-3-4-5-6-7-8-9-0-a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-exp1'
    },
    { 
      title: 'Trực tuyến', 
      desc: 'Sân khấu online của bạn', 
      color: 'bg-[#d35400]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-1-2-3-4-5-6-7-8-9-0-a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-exp2'
    },
    { 
      title: 'Kết hợp', 
      desc: 'Kết hợp sự hiệu quả của những tương tác trực tiếp với trải nghiệm trực tuyến tiện lợi', 
      color: 'bg-[#ccccff] !text-black',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-1-2-3-4-5-6-7-8-9-0-a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-exp3'
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-headline font-black text-slate-900 tracking-tight">
            Linh hoạt tối đa, đáp ứng mọi <br /> nhu cầu tổ chức sự kiện
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((type, i) => (
            <div key={i} className={`group ${type.color.includes('!text-black') ? 'text-black' : 'text-white'} rounded-[2.5rem] p-10 flex flex-col min-h-[550px] transition-all duration-500 hover:scale-[1.02] ${type.color.split(' ')[0]}`}>
               
               <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-headline font-black">{type.title}</h3>
                  <p className="text-lg opacity-80 font-body leading-relaxed">{type.desc}</p>
                  <button className={`flex items-center gap-2 font-headline font-bold text-sm hover:translate-x-2 transition-transform pt-4 ${type.color.includes('!text-black') ? 'text-slate-900' : 'text-white'}`}>
                    Tìm hiểu thêm
                    <span className="material-symbols-outlined">arrow_right_alt</span>
                  </button>
               </div>

               {/* Video/Image Mockup at bottom */}
               <div className="relative mt-12 rounded-[2rem] overflow-hidden aspect-video bg-black shadow-2xl">
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Decorative element for mockup */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl opacity-30">movie</span>
                  </div>
                  
                  {/* Floating Pause Button (Zoho Style) */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">pause</span>
                  </div>
               </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceTypesSection;
