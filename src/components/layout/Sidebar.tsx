import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Search, 
  CalendarCheck, 
  User, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  HeartHandshake, 
  Layers, 
  Users, 
  Clock,
  Sparkles
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { dataService } from '../../services/dataService';

interface SidebarLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  tag?: string;
}

export const Sidebar: React.FC = () => {
  const { user, workerProfile } = useAuth();
  if (!user) return null;

  const pendingVerificationCount = dataService.getPendingWorkers().length;

  const customerLinks: SidebarLink[] = [
    { to: '/customer/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/customer/workers', label: 'Find Verified Workers', icon: <Search className="w-4 h-4" /> },
    { to: '/customer/bookings', label: 'My Bookings', icon: <CalendarCheck className="w-4 h-4" /> },
    { to: '/customer/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const workerLinks: SidebarLink[] = [
    { to: '/worker/dashboard', label: 'Duty Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/worker/jobs', label: 'Job Requests & Active', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/worker/welfare', label: 'Earnings & Welfare', icon: <HeartHandshake className="w-4 h-4" /> },
    { to: '/worker/profile', label: 'Trade Profile & Certs', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const adminLinks: SidebarLink[] = [
    { to: '/admin/dashboard', label: 'Federation Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { 
      to: '/admin/verification', 
      label: 'Worker Verification', 
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: pendingVerificationCount > 0 ? pendingVerificationCount : undefined
    },
    { to: '/admin/bookings', label: 'Master Bookings', icon: <CalendarCheck className="w-4 h-4" /> },
    { to: '/admin/workers', label: 'Cooperative Members', icon: <Users className="w-4 h-4" /> },
    { 
      to: '/admin/forecasting', 
      label: 'Demand Forecasting', 
      icon: <TrendingUp className="w-4 h-4" />,
      tag: 'Prototype'
    },
    { to: '/admin/welfare', label: 'Welfare & Social Security', icon: <HeartHandshake className="w-4 h-4" /> },
    { to: '/admin/services', label: 'Service Categories & Rates', icon: <Layers className="w-4 h-4" /> },
  ];

  const links: SidebarLink[] = user.role === 'admin' 
    ? adminLinks 
    : user.role === 'worker' 
    ? workerLinks 
    : customerLinks;

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-6rem)] p-4 transition-colors duration-200">
      {/* Role Banner */}
      <div className="p-3 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center gap-2.5">
          <img
            src={user.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=16a34a&color=fff`}
            alt={user.full_name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate font-display">{user.full_name}</p>
            <p className="text-[11px] text-coop-700 dark:text-coop-400 font-semibold capitalize flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-coop-500" />
              {user.role} Portal
            </p>
          </div>
        </div>

        {user.role === 'worker' && workerProfile && (
          <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Status:</span>
            {workerProfile.verification_status === 'verified' ? (
              <Badge variant="success" size="sm" dot>Verified Member</Badge>
            ) : (
              <Badge variant="warning" size="sm" dot>Under Review</Badge>
            )}
          </div>
        )}
      </div>

      {/* Nav List */}
      <nav className="space-y-1">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-coop-50 dark:bg-coop-950/50 text-coop-800 dark:text-coop-300 font-semibold shadow-xs border border-coop-200 dark:border-coop-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              {link.icon}
              <span>{link.label}</span>
            </div>
            {link.badge !== undefined && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {link.badge}
              </span>
            )}
            {link.tag && (
              <span className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                {link.tag}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Cooperative Ethos Card */}
      <div className="mt-8 p-3.5 rounded-xl bg-gradient-to-br from-coop-50 to-emerald-50 dark:from-coop-950/40 dark:to-emerald-950/30 border border-coop-200 dark:border-coop-900/60">
        <div className="flex items-center gap-1.5 text-coop-800 dark:text-coop-300 font-semibold text-xs mb-1">
          <Sparkles className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> Cooperative Model
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          85% goes to workers, 10% to group health & pension, 5% to operations.
        </p>
      </div>
    </aside>
  );
};
