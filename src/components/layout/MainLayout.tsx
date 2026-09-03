import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DemoSwitcher } from '../common/DemoSwitcher';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  // Check if current route is a dashboard route requiring sidebar
  const isDashboardRoute = 
    location.pathname.startsWith('/customer') ||
    location.pathname.startsWith('/worker') ||
    location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Demo Quick-Switcher for Evaluators */}
      <DemoSwitcher />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex w-full">
        {isDashboardRoute && <Sidebar />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
