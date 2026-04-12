import React from 'react';

const FeatureBlocksSection = () => {
  const blocks = [
    {
      id: 1,
      title: 'Theo dõi nhanh toàn bộ quá trình',
      desc: 'Tập trung vào những phần quan trọng trong khi vẫn đảm bảo mọi thứ vận hành suôn sẻ và dễ dàng. Tạo quy trình công việc, sắp xếp thông báo, phân loại và chuyển khách hàng tiềm năng vào CRM cũng như tích hợp ứng dụng thông qua webhook mà không tốn công sức.',
      bg: 'bg-white',
      textColor: 'text-slate-900',
      mutedColor: 'text-slate-500',
      imageAlign: 'right',
      mockup: 'hub'
    },
    {
      id: 2,
      title: 'Lồng ghép yếu tố nhận diện thương hiệu vào sự kiện theo cách của bạn',
      desc: 'Điều chỉnh trải nghiệm sự kiện phù hợp với phong cách của bạn. Tùy chỉnh mọi thứ ngay lập tức, bao gồm biểu mẫu, thẻ sự kiện, trang web hay thậm chí là ứng dụng di động để thể hiện bản sắc của thương hiệu.',
      bg: 'bg-[#0a0b2e]',
      textColor: 'text-white',
      mutedColor: 'text-slate-400',
      imageAlign: 'left',
      mockup: 'branding_watermark'
    },
    {
      id: 3,
      title: 'Tạo điều kiện kết nối',
      desc: 'Thúc đẩy sự gắn kết với tính năng tìm đối tác dựa trên AI để tạo nên các kết nối phù hợp. Thu hút khán giả của bạn thông qua các cuộc trò chuyện 1:1, kênh thảo luận và hoạt động tương tác.',
      bg: 'bg-black',
      textColor: 'text-white',
      mutedColor: 'text-slate-400',
      imageAlign: 'right',
      mockup: 'psychology'
    },
    {
      id: 4,
      title: 'Tiếp thị đúng cách',
      desc: 'Quảng bá sự kiện theo nhiều cách khác nhau. Tự động hóa email ở mỗi giai đoạn, tạo biểu ngữ hay thậm chí là khai thác tiếp thị liên kết để lan truyền thông điệp.',
      bg: 'bg-[#fff9f6]',
      textColor: 'text-slate-900',
      mutedColor: 'text-slate-500',
      imageAlign: 'left',
      mockup: 'campaign'
    }
  ];

  return (
    <section className="bg-white">
      {/* Section Global Header */}
      <div className="py-24 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-headline font-black text-slate-900 tracking-tight leading-tight">
          Được thiết kế để giúp <br /> tổ chức sự kiện suôn sẻ hơn
        </h2>
      </div>

      {blocks.map((block) => (
        <div key={block.id} className={`${block.bg} py-24 px-6 md:px-10 overflow-hidden`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Order Logic */}
            <div className={`space-y-8 ${block.imageAlign === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
               <h3 className={`text-3xl md:text-5xl font-headline font-extrabold leading-tight ${block.textColor}`}>
                 {block.title}
               </h3>
               <p className={`text-lg leading-relaxed font-body ${block.mutedColor}`}>
                 {block.desc}
               </p>
               <button className={`flex items-center gap-2 font-headline font-bold text-sm ${block.id % 2 === 0 ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}>
                 Tìm hiểu thêm
                 <span className="material-symbols-outlined">arrow_right_alt</span>
               </button>
            </div>

            {/* Mockup Visualization */}
            <div className={`${block.imageAlign === 'left' ? 'lg:order-1' : 'lg:order-2'} relative`}>
               <div className={`aspect-[4/3] rounded-[2.5rem] ${block.id % 2 === 0 ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} border flex items-center justify-center p-8 transition-transform duration-700 hover:scale-[1.02]`}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 w-full h-full border border-slate-100 flex flex-col items-center justify-center space-y-4">
                     <span className="material-symbols-outlined text-[100px] text-indigo-500 opacity-20">{block.mockup}</span>
                     <div className="w-full space-y-2 px-6">
                        <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                        <div className="h-2 w-2/3 bg-slate-50 rounded-full"></div>
                     </div>
                  </div>
                  {/* Floating floating element */}
                  <div className="absolute -bottom-6 -right-6 bg-indigo-600 rounded-3xl p-6 shadow-2xl text-white transform rotate-3">
                     <span className="material-symbols-outlined text-4xl">verified</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureBlocksSection;
