import React, { useState } from 'react';
import { Star, Heart, Lightbulb, Users } from 'lucide-react';

const AttendeeReviewPage = () => {
  const [rating, setRating] = useState(4);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Banner */}
      <div className="relative w-full h-[220px] rounded-[48px] overflow-hidden mb-6 shadow-xl group">
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600" 
          alt="Event Background" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Bạn thấy sự kiện thế nào?
          </h1>
        </div>
      </div>

      <div className="mb-12">
        <p className="text-slate-500 text-xl font-medium max-w-3xl leading-relaxed">
          Chia sẻ trải nghiệm của bạn tại <span className="text-indigo-600 font-bold">"Hội thảo Tương lai Kỹ thuật số 2024"</span> để chúng tôi có thể phục vụ bạn tốt hơn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-8 bg-white rounded-[48px] p-12 shadow-sm border border-slate-50">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Đánh giá chung</h2>
            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-all duration-300 transform hover:scale-110 ${
                    star <= rating ? 'text-indigo-500' : 'text-slate-200'
                  }`}
                >
                  <Star className={`w-12 h-12 ${star <= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
            <p className="text-indigo-600 font-black text-lg">
              {rating === 5 ? 'Tuyệt vời nhất! (5/5)' : rating === 4 ? 'Tuyệt vời (4/5)' : rating === 3 ? 'Khá tốt (3/5)' : rating === 2 ? 'Cần cải thiện (2/5)' : 'Chưa tốt (1/5)'}
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Điều bạn thích nhất</label>
              <textarea
                placeholder="Kể cho chúng tôi về khoảnh khắc ấn tượng nhất của bạn..."
                className="w-full bg-slate-50 border-none rounded-3xl p-6 min-h-[160px] text-slate-700 font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Góp ý cải thiện</label>
              <textarea
                placeholder="Điều gì có thể làm tốt hơn trong lần tới?"
                className="w-full bg-slate-50 border-none rounded-3xl p-6 min-h-[160px] text-slate-700 font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
              Gửi đánh giá của tôi
            </button>
          </div>
        </div>

        {/* Right Column: Info Cards */}
        <div className="lg:col-span-4 space-y-8">
          {/* Gratitude Card */}
          <div className="bg-indigo-50/50 rounded-[40px] p-8 border border-indigo-100/50 space-y-6">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Heart className="w-7 h-7 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-4 tracking-tight">Lời cảm ơn từ Ban Tổ Chức</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Ý kiến của bạn là chìa khóa để chúng tôi kiến tạo những trải nghiệm đẳng cấp hơn. Mỗi phản hồi đều được ban tổ chức <span className="text-indigo-600 font-bold">EventArchitect</span> lắng nghe và trân trọng.
              </p>
            </div>
            <div className="pt-6 border-t border-indigo-100/50 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?u=user${i+10}`} 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
                    alt="User"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-indigo-600">
                  +12
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Cùng 1,240 người đã phản hồi</span>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100 space-y-6">
            <div className="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Lightbulb className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-4 tracking-tight">Bạn có biết?</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Sau khi gửi đánh giá, bạn sẽ nhận được một <span className="text-indigo-600 font-bold">**voucher giảm giá 15%**</span> cho các sự kiện tiếp theo được tổ chức bởi EventArchitect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeReviewPage;
