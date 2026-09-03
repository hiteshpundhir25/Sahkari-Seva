import React from 'react';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const AdminWelfarePage: React.FC = () => {
  const cooperatives = dataService.getCooperatives();
  const allWelfare = dataService.getAllWelfare();
  const workers = dataService.getWorkers();

  const totalPool = cooperatives.reduce((sum, c) => sum + c.welfare_pool_balance, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">SOCIAL SECURITY OVERSIGHT</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Cooperative Welfare & Group Insurance Shield
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Managing the statutory 10% welfare corpus, health insurance enrollments (Ayushman Bharat / PM-JAY), and accidental coverage policies.
        </p>
      </div>

      {/* Aggregate Welfare Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-coop-800 to-emerald-950 text-white space-y-1 border border-coop-700/40 dark:border-slate-800 shadow-md">
          <span className="text-xs text-coop-200 font-semibold flex items-center gap-1">
            <HeartHandshake className="w-4 h-4" /> Aggregate Welfare Pool Balance
          </span>
          <p className="text-3xl font-extrabold font-display text-white">
            ₹{totalPool.toFixed(2)}
          </p>
          <p className="text-[11px] text-coop-200">Across 3 regional cooperative societies</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1">
            <Users className="w-4 h-4 text-coop-600 dark:text-coop-400" /> Insured Worker Members
          </span>
          <p className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            {workers.filter(w => w.verification_status === 'verified').length} / {workers.length}
          </p>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">100% verified workers covered</p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-saffron-600 dark:text-saffron-400" /> Active Policy Schemes
          </span>
          <p className="text-3xl font-extrabold font-display text-saffron-700 dark:text-saffron-400">
            3 Schemes
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">PM-JAY, PMJJBY, PMSBY Group Shield</p>
        </Card>
      </div>

      {/* Cooperative Societies Welfare Balances */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Regional Society Welfare Allocations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cooperatives.map((c) => (
            <Card key={c.id} className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-display truncate">{c.name}</h3>
                <Badge variant="coop" size="sm">Reg: {c.registration_number}</Badge>
              </div>

              <div className="p-3 rounded-xl bg-coop-50 dark:bg-coop-950/60 border border-coop-200 dark:border-coop-800">
                <span className="text-[11px] text-coop-800 dark:text-coop-300 block">Current Welfare Reserve</span>
                <span className="text-xl font-extrabold text-coop-900 dark:text-coop-300 font-display">
                  ₹{c.welfare_pool_balance.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Location: {c.city}, {c.state} ({c.pincode})
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Enrolled Workers Welfare Ledger */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
          Enrolled Worker Social Security Policies
        </h2>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3.5 font-bold font-display">Worker Name</th>
                <th className="p-3.5 font-bold font-display">Enrolled Scheme</th>
                <th className="p-3.5 font-bold font-display">Policy Number</th>
                <th className="p-3.5 font-bold font-display">Insurance Provider</th>
                <th className="p-3.5 font-bold font-display text-right">Individual Welfare Balance</th>
                <th className="p-3.5 font-bold font-display">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allWelfare.map((w) => {
                const workerObj = workers.find(wrk => wrk.id === w.worker_id);
                return (
                  <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{workerObj?.profile?.full_name || 'Worker'}</td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{w.welfare_scheme}</td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">{w.policy_reference || 'POL-COOP-8812'}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{w.insurance_provider}</td>
                    <td className="p-3.5 text-right font-bold text-emerald-700 dark:text-emerald-400">₹{w.contribution_balance.toFixed(2)}</td>
                    <td className="p-3.5">
                      <Badge variant="success" size="sm" dot>{w.enrollment_status}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
