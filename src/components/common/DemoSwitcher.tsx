import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Clock, Users, RotateCcw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { dataService } from '../../services/dataService';

export const DemoSwitcher: React.FC = () => {
  const { user, login, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const demoAccounts = [
    {
      role: 'admin',
      label: 'Cooperative Admin',
      name: 'Vikram Malhotra',
      email: 'admin@delhicoop.in',
      org: 'Delhi Shramik Sahakari Sangh',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      targetPath: '/admin/dashboard',
      bgClass: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      role: 'worker',
      label: 'Verified Worker (4.9⭐)',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@worker.in',
      org: 'Electrician • 142 Jobs Done',
      icon: <UserCheck className="w-4 h-4 text-coop-600" />,
      targetPath: '/worker/dashboard',
      bgClass: 'bg-coop-50 text-coop-900 border-coop-200'
    },
    {
      role: 'worker',
      label: 'Pending Worker (Demo Approval)',
      name: 'Arjun Meena',
      email: 'arjun.meena@worker.in',
      org: 'Plumber • Under Review',
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      targetPath: '/worker/dashboard',
      bgClass: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      role: 'customer',
      label: 'Customer (Household)',
      name: 'Priya Singh',
      email: 'priya.singh@customer.in',
      org: 'Connaught Place • 110001',
      icon: <Users className="w-4 h-4 text-blue-600" />,
      targetPath: '/customer/dashboard',
      bgClass: 'bg-blue-50 text-blue-900 border-blue-200'
    }
  ];

  const handleSelectAccount = (email: string, targetPath: string) => {
    login(email);
    navigate(targetPath);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo bookings, payments, and worker approvals to initial clean state?')) {
      dataService.resetToDefaultSeed();
      refreshUserData();
      window.location.reload();
    }
  };

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 text-xs sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-saffron-500/20 text-saffron-300 font-semibold px-2 py-0.5 rounded border border-saffron-500/30">
            <Sparkles className="w-3 h-3 text-saffron-400" /> SIH EVALUATION DEMO SWITCHER
          </span>
          <span className="hidden sm:inline text-slate-400">
            Current: <strong className="text-slate-100">{user?.full_name}</strong> ({user?.role?.toUpperCase()})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700 font-medium transition-colors"
          >
            Switch Role {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleResetData}
            title="Reset to fresh seed data"
            className="flex items-center gap-1 text-slate-400 hover:text-amber-300 px-2 py-1 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-slate-950/95 border-t border-slate-800 px-4 py-3 animate-fadeIn">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {demoAccounts.map((acc, i) => {
              const isCurrent = user?.email === acc.email;
              return (
                <button
                  key={i}
                  onClick={() => {
                    handleSelectAccount(acc.email, acc.targetPath);
                    setIsOpen(false);
                  }}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                    isCurrent
                      ? 'bg-coop-950/80 border-coop-500 ring-1 ring-coop-500/50'
                      : 'bg-slate-900/90 border-slate-800 hover:bg-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="p-1.5 rounded-md bg-white/10 shrink-0">
                    {acc.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-100 text-xs truncate">{acc.label}</p>
                      {isCurrent && (
                        <span className="text-[10px] bg-coop-500 text-white font-bold px-1.5 py-0.2 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 font-medium text-[11px] truncate">{acc.name}</p>
                    <p className="text-slate-400 text-[10px] truncate">{acc.org}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
