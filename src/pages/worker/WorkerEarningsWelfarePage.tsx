import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { 
  HeartHandshake, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  FileText,
  Calendar,
  Building2,
  Lock
} from 'lucide-react';

export const WorkerEarningsWelfarePage: React.FC = () => {
  const { user, workerProfile } = useAuth();
  if (!user) return null;

  const currentWorker = workerProfile || dataService.getWorkerByProfileId(user.id);
  const bookings = currentWorker ? dataService.getBookingsByWorker(currentWorker.id).filter(b => b.status === 'completed') : [];
  const welfare = currentWorker ? dataService.getWelfareByWorker(currentWorker.id) : undefined;

  const totalEarnings = currentWorker?.total_earnings || 0;
  const accumulatedWelfare = welfare ? welfare.contribution_balance : Number((totalEarnings * 0.12).toFixed(2));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">SOCIAL SECURITY & EARNINGS</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Welfare Shield & Earnings Ledger
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The cooperative automatically allocates 10% of every completed job to your health insurance, accidental cover, and pension corpus.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-coop-800 to-emerald-950 text-white space-y-1 border border-coop-700/40 dark:border-slate-800 shadow-md">
          <span className="text-xs text-coop-200 font-semibold flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> Lifetime Take-Home Earnings
          </span>
          <p className="text-3xl font-extrabold font-display text-white">
            ₹{totalEarnings.toFixed(2)}
          </p>
          <p className="text-[11px] text-coop-200">
            85% direct wage payout with zero middleman commissions
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-saffron-600 to-amber-900 text-white space-y-1 border border-saffron-500/40 dark:border-slate-800 shadow-md">
          <span className="text-xs text-saffron-200 font-semibold flex items-center gap-1">
            <HeartHandshake className="w-4 h-4" /> Accumulated Welfare Pool
          </span>
          <p className="text-3xl font-extrabold font-display text-white">
            ₹{accumulatedWelfare.toFixed(2)}
          </p>
          <p className="text-[11px] text-saffron-100">
            Dedicated health & accidental reserve
          </p>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Insurance & Protection</span>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400 font-display flex items-center gap-1.5 mt-1">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Active Policy
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Ayushman Bharat PM-JAY + PMSBY Group Policy
          </p>
        </Card>
      </div>

      {/* Active Social Security Policies */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Enrolled Welfare Schemes & Social Cover
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Policy 1 */}
          <Card className="p-5 bg-white dark:bg-slate-900 border-coop-200 dark:border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="success" size="sm" dot>Active Member</Badge>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display mt-1">
                  Ayushman Bharat PM-JAY & Gig Worker Health Shield
                </h3>
              </div>
              <Building2 className="w-6 h-6 text-coop-600 dark:text-coop-400 shrink-0" />
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Sum Insured:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹5,00,000 / Year (Family)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Policy Reference:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{welfare?.policy_reference || 'POL-PMJJBY-DEL-8921'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Underwriting Partner:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">National Insurance Co-op Ltd.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Renewal Status:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Auto-renewed via 10% Welfare Pool</span>
              </div>
            </div>
          </Card>

          {/* Policy 2 */}
          <Card className="p-5 bg-white dark:bg-slate-900 border-saffron-200 dark:border-slate-800 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="warning" size="sm" dot>Active Cover</Badge>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display mt-1">
                  PMSBY & Group Accidental Disability Shield
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-saffron-600 dark:text-saffron-400 shrink-0" />
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Accidental Coverage:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹2,00,000 (24/7 on-duty & off-duty)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Cooperative Society:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{currentWorker?.cooperative?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Emergency Assistance:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Direct 24-hr hospitalization claim</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Valid Until:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">31 May 2027</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Completed Bookings Ledger */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">
          Job Wage & Welfare Contribution Ledger ({bookings.length})
        </h2>

        {bookings.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">No completed job payouts recorded yet.</p>
        ) : (
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-3 font-bold">Booking Code</th>
                  <th className="p-3 font-bold">Date</th>
                  <th className="p-3 font-bold">Service</th>
                  <th className="p-3 font-bold text-right">Job Total</th>
                  <th className="p-3 font-bold text-right text-coop-700 dark:text-coop-400">Your Take-Home (85%)</th>
                  <th className="p-3 font-bold text-right text-saffron-700 dark:text-saffron-400">Welfare Pool (10%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{b.booking_code}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{b.booking_date}</td>
                    <td className="p-3 text-slate-800 dark:text-slate-200 font-semibold">{b.service_category?.name}</td>
                    <td className="p-3 text-right font-bold text-slate-900 dark:text-slate-100">₹{b.final_amount}</td>
                    <td className="p-3 text-right font-bold text-coop-700 dark:text-coop-400">₹{(b.final_amount * 0.85).toFixed(2)}</td>
                    <td className="p-3 text-right font-bold text-saffron-700 dark:text-saffron-400">₹{(b.final_amount * 0.10).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
};
