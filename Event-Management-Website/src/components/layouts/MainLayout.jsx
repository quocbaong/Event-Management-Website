import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Add Main Navbar here */}
      <main>
        <Outlet />
      </main>
      {/* Add Main Footer here */}
    </div>
  );
};

export default MainLayout;
