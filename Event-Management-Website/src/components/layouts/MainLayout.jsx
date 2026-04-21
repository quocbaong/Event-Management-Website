import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './parts/Sidebar';
import Header from './parts/Header';
import LandingFooter from '../common/LandingFooter';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-bg-default overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto w-full">
          <Outlet />
          <LandingFooter />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
