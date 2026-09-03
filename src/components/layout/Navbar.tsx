import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { 
  Building2, 
  Globe, 
  Bell, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  Zap, 
  CheckCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('sahakari_language', nextLang);
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'worker') return '/worker/dashboard';
    return '/customer/dashboard';
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-[33px] z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-700 to-coop-500 flex items-center justify-center text-white shadow-md shadow-coop-600/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                  {t('app_name')}
                </span>
                <span className="bg-saffron-100 dark:bg-saffron-950/80 text-saffron-800 dark:text-saffron-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-saffron-300 dark:border-saffron-800">
                  CO-OP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none">
                {i18n.language === 'hi' ? 'श्रम सहकारी गिग सेवा मंच' : 'Cooperative Gig Marketplace'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-coop-600 dark:hover:text-coop-400 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/services" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-coop-600 dark:hover:text-coop-400 transition-colors">
              {t('nav.services')}
            </Link>
            <Link to="/why-cooperative" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-coop-600 dark:hover:text-coop-400 transition-colors">
              {t('nav.why_coop')}
            </Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-coop-600 dark:hover:text-coop-400 transition-colors">
              {t('nav.about')}
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Animated Dark/Light Mode Toggle */}
            <ThemeToggle size="sm" />

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" />
              <span>{i18n.language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Notifications Dropdown (If Logged In) */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-fadeIn">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-100 font-display">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] font-medium text-coop-600 dark:text-coop-400 hover:text-coop-700 dark:hover:text-coop-300 flex items-center gap-1"
                        >
                          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">No notifications yet.</p>
                      ) : (
                        notifications.slice(0, 6).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markAsRead(n.id);
                              setNotifDropdownOpen(false);
                            }}
                            className={`p-3 text-left transition-colors cursor-pointer ${
                              !n.read 
                                ? 'bg-coop-50/50 dark:bg-coop-950/30 hover:bg-coop-50 dark:hover:bg-coop-950/50' 
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-coop-600 dark:bg-coop-400" />}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                              {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile / Dashboard Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=16a34a&color=fff`}
                    alt={user.full_name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[100px]">
                      {user.full_name}
                    </p>
                    <p className="text-[10px] font-medium text-coop-600 dark:text-coop-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{user.full_name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-coop-600 dark:text-coop-400" /> Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-medium border-t border-slate-100 dark:border-slate-800"
                    >
                      <LogOut className="w-4 h-4" /> {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-coop-600 dark:hover:text-coop-400"
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-coop-600 dark:hover:text-coop-400"
          >
            {t('nav.services')}
          </Link>
          <Link
            to="/why-cooperative"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-coop-600 dark:hover:text-coop-400"
          >
            {t('nav.why_coop')}
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-coop-600 dark:hover:text-coop-400"
          >
            {t('nav.about')}
          </Link>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle size="sm" />
          </div>

          {user && (
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-coop-600 dark:text-coop-400 py-2 border-t border-slate-100 dark:border-slate-800"
            >
              Go to {user.role.toUpperCase()} Dashboard →
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
