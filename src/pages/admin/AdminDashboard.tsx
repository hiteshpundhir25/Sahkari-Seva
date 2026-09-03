import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Clock, 
  CalendarCheck, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (!user) return null;

  const stats = dataService.getAdminStats();
  const pendingWorkers = dataService.getPendingWorkers();
  const recentBookings = dataService.getBookings().slice(0, 5);
  const forecastData = dataService.getDemandForecast();

  // Chart data
  const weeklyTrends = forecastData.dayForecasts.map(d => ({
    day: d.dayName,
    bookings: d.projectedBookings,
    category: d.topCategory
  }));

  const revenueSplitData = [
    { name: 'Direct Worker Payout (85%)', value: 85, color: '#16a34a' },
    { name: 'Welfare & Health Pool (10%)', value: 10, color: '#d97706' },
    { name: 'Platform Operations (5%)', value: 5, color: isDark ? '#475569' : '#334155' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-coop-800 via-coop-900 to-slate-900 dark:from-slate-950 dark:via-coop-950 dark:to-slate-950 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-coop-700/40 dark:border-slate-800 transition-colors duration-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-saffron-500/20 text-saffron-300 text-xs font-bold px-2.5 py-0.5 rounded border border-saffron-500/30">
              FEDERATION GOVERNANCE
            </span>
            <span className="text-xs text-coop-200 dark:text-slate-400">Reg No: DL/COOP/2021/8842</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Delhi Shramik Sahakari Sangh Portal
          </h1>
          <p className="text-xs text-coop-100 dark:text-slate-300">
            Real-time oversight of worker verification, fair compensation distribution, and community services.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="md"
            variant="secondary"
            onClick={() => navigate('/admin/verification')}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          >
            Verification Queue ({pendingWorkers.length})
          </Button>
        </div>
      </div>

      {/* Top 8 Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-[11px] font-bold uppercase">Total Workers</span>
            <Users className="w-4 h-4 text-coop-600 dark:text-coop-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
            {stats.totalWorkers}
          </p>
          <p className="text-[11px] text-coop-700 dark:text-coop-400 font-medium mt-0.5">
            {stats.verifiedWorkers} Verified Members
          </p>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-[11px] font-bold uppercase">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-display mt-1">
            {stats.pendingWorkers}
          </p>
          <Link to="/admin/verification" className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold hover:underline">
            Review Queue →
          </Link>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-[11px] font-bold uppercase">Completed Jobs</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
            {stats.completedJobs}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {stats.totalBookings} Total Dispatched
          </p>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
            <span className="text-[11px] font-bold uppercase">Welfare Pool</span>
            <HeartHandshake className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
          </div>
          <p className="text-2xl font-extrabold text-saffron-600 dark:text-saffron-400 font-display mt-1">
            ₹{stats.totalWelfarePool.toFixed(0)}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            10% Social Security Pool
          </p>
        </Card>
      </div>

      {/* Two Main Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Demand Forecast Area Chart */}
        <Card className="p-5 lg:col-span-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-coop-600 dark:text-coop-400" /> 7-Day Cooperative Demand Forecast
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Predictive booking volume across affiliated municipal zones
              </p>
            </div>
            <Badge variant="coop" size="sm">AI PREDICTIVE</Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrends}>
                <defs>
                  <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    borderRadius: '8px',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#16a34a" strokeWidth={2.5} fillOpacity={1} fill="url(#bookingGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 85/10/5 Revenue Split Donut Chart */}
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
              Cooperative Revenue Split
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Statutory 85/10/5 Distribution</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {revenueSplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    borderRadius: '8px',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-coop-600" /> Worker Take-Home
              </span>
              <strong className="text-coop-700 dark:text-coop-400">85%</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-saffron-500" /> Welfare & Health
              </span>
              <strong className="text-saffron-700 dark:text-saffron-400">10%</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Federation Ops
              </span>
              <strong className="text-slate-700 dark:text-slate-300">5%</strong>
            </div>
          </div>
        </Card>
      </div>

      {/* Verification Queue & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" /> Worker Applications Requiring Approval
            </h3>
            <Link to="/admin/verification" className="text-xs font-semibold text-coop-700 dark:text-coop-400 hover:underline">
              View All ({pendingWorkers.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {pendingWorkers.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={w.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(w.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
                    alt={w.profile?.full_name}
                    className="w-10 h-10 rounded-xl object-cover border shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{w.profile?.full_name}</p>
                    <p className="text-[11px] text-coop-700 dark:text-coop-400">{w.skill_category} • {w.experience_years} yrs exp</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{w.certification_name}</p>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => navigate('/admin/verification')}
                >
                  Review
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Dispatched Bookings */}
        <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
              Recent Cooperative Dispatches
            </h3>
            <Link to="/admin/bookings" className="text-xs font-semibold text-coop-700 dark:text-coop-400 hover:underline">
              Master Ledger →
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentBookings.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white">{b.service_category?.name}</span>
                    {b.is_emergency && <Badge variant="emergency" size="sm">Emergency</Badge>}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Customer: {b.customer?.full_name} ➔ Worker: {b.worker?.profile?.full_name}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white">₹{b.final_amount}</span>
                  <Badge variant={b.status === 'completed' ? 'success' : 'warning'} size="sm" className="block mt-0.5">
                    {b.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
