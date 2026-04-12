import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingNavbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tính năng', hasDropdown: true },
    { name: 'Giải pháp', hasDropdown: true },
    { name: 'Customers', hasDropdown: false },
    { name: 'Giá', hasDropdown: false },
    { name: 'Resources', hasDropdown: false },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white border-b border-gray-50 py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-white border-2 border-[#1a0a5e] rounded-xl flex items-center justify-center rotate-3">
             <span className="material-symbols-outlined text-[#1a0a5e] font-bold">event</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">PRESTIGE</span>
            <span className="text-xl font-headline font-black text-slate-900 tracking-tight">Planner</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-center gap-1 group cursor-pointer">
              <span className="text-[15px] font-body font-medium text-slate-700 hover:text-black transition-colors">{link.name}</span>
              {link.hasDropdown && (
                <span className="material-symbols-outlined text-sm text-slate-400 group-hover:rotate-180 transition-transform">expand_more</span>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
           <button 
             onClick={() => navigate('/login')}
             className="text-[15px] font-body font-bold text-slate-700 hover:text-black transition-colors px-4 py-2"
           >
             Đăng nhập
           </button>
           <button 
             onClick={() => navigate('/signup')}
             className="bg-[#e4322a] hover:bg-[#cc2d26] text-white px-6 py-2.5 rounded-md text-[15px] font-headline font-bold transition-all shadow-sm active:scale-95"
           >
             Bắt đầu
           </button>
        </div>

      </div>
    </nav>
  );
};

export default LandingNavbar;
