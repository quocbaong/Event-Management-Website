import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, Search, ArrowRight, Sparkles, Smile } from 'lucide-react';

const categoryMap = {
  MUSIC: { label: 'Âm nhạc', color: 'from-pink-500 to-rose-600', text: 'text-rose-500', bg: 'bg-rose-50' },
  TECH: { label: 'Công nghệ', color: 'from-blue-500 to-indigo-600', text: 'text-indigo-500', bg: 'bg-indigo-50' },
  FOOD: { label: 'Ẩm thực', color: 'from-amber-500 to-orange-600', text: 'text-orange-500', bg: 'bg-orange-50' },
  ART: { label: 'Nghệ thuật', color: 'from-purple-500 to-violet-600', text: 'text-violet-500', bg: 'bg-purple-50' },
  BUSINESS: { label: 'Doanh nghiệp', color: 'from-emerald-500 to-teal-600', text: 'text-emerald-500', bg: 'bg-emerald-50' },
  SPORTS: { label: 'Thể thao', color: 'from-sky-500 to-blue-600', text: 'text-sky-500', bg: 'bg-sky-50' },
  EDUCATION: { label: 'Giáo dục', color: 'from-cyan-500 to-blue-500', text: 'text-cyan-600', bg: 'bg-cyan-50' },
  ENTERTAINMENT: { label: 'Giải trí', color: 'from-fuchsia-500 to-pink-600', text: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
  OTHER: { label: 'Khác', color: 'from-slate-500 to-slate-700', text: 'text-slate-655', bg: 'bg-slate-50' }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const AttendeeFavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favs);
    };
    loadFavorites();

    // Listen to changes in localStorage
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  const handleRemoveFavorite = (eventId, e) => {
    e.stopPropagation(); // Avoid navigating to details
    const updated = favorites.filter(item => item.id !== eventId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Categories list derived from favorite events
  const categories = ['Tất cả', ...new Set(favorites.map(item => item.category).filter(Boolean))];

  // Filtering logic
  const filteredFavorites = favorites.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.city?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tất cả' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fbfcff] pb-16">
      <div className="max-w-[1400px] mx-auto px-6 py-10 animate-in fade-in duration-500">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-200/60 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-rose-50 text-rose-500 rounded-lg border border-rose-100 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-current animate-pulse" />
              </span>
              <span className="text-[10px] font-black text-slate-455 uppercase tracking-widest">Không gian của bạn</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sự kiện yêu thích</h1>
            <p className="text-slate-500 text-xs font-semibold mt-1">Lưu trữ các sự kiện bạn quan tâm và muốn tham dự.</p>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-xs font-black text-slate-800">Đang lưu giữ {favorites.length} sự kiện</span>
            </div>
          )}
        </div>

        {favorites.length === 0 ? (
          /* Empty State */
          <div className="max-w-md mx-auto py-16 px-6 text-center flex flex-col items-center justify-center bg-white border border-slate-200 rounded-[32px] shadow-sm">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-[28px] border border-rose-100 flex items-center justify-center mb-6 shadow-sm">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Danh sách yêu thích trống</h2>
            <p className="text-slate-550 text-xs font-semibold leading-relaxed max-w-[320px] mb-8">
              Khám phá hàng loạt sự kiện công nghệ, âm nhạc, nghệ thuật thú vị xung quanh bạn và nhấn nút thả tim để lưu trữ nhé.
            </p>
            <button
              onClick={() => navigate('/attendee/explore')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-md shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Khám phá sự kiện ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
              {/* Search input */}
              <div className="w-full md:w-96 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện yêu thích..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category tabs filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {categoryMap[cat]?.label || cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Events Grid */}
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFavorites.map(event => {
                  const catInfo = categoryMap[event.category] || categoryMap.OTHER;
                  return (
                    <div
                      key={event.id}
                      onClick={() => navigate(`/attendee/events/${event.slug}`)}
                      className="bg-white rounded-[32px] overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
                    >
                      {/* Favorite Button on card top-right */}
                      <button
                        onClick={(e) => handleRemoveFavorite(event.id, e)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 border border-slate-200/60 shadow-sm active:scale-90 hover:bg-rose-50 hover:border-rose-100 transition-all"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>

                      {/* Image header */}
                      <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={event.thumbnailUrl || event.bannerUrl || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600"}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${catInfo.bg} ${catInfo.text}`}>
                            {catInfo.label}
                          </span>
                        </div>

                        <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-650 transition-colors leading-snug line-clamp-2 mb-2">
                          {event.title}
                        </h3>

                        <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2 mb-6">
                          {event.shortDesc || event.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                          <div className="flex items-center gap-2 text-slate-655 text-xs font-bold">
                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>{formatDate(event.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-655 text-xs font-bold">
                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{event.venue || event.city}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No search results empty state */
              <div className="text-center py-20 bg-white border border-slate-200 rounded-[32px] shadow-sm">
                <Smile className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-base font-black text-slate-800 mb-1">Không tìm thấy sự kiện nào</h3>
                <p className="text-slate-500 text-xs font-semibold">Thử thay đổi từ khóa tìm kiếm hoặc danh mục bộ lọc xem nhé.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeFavoritesPage;
