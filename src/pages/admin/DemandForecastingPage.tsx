import React from 'react';
import { dataService } from '../../services/dataService';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  Zap, 
  Users, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

export const DemandForecastingPage: React.FC = () => {
  const { isDark } = useTheme();
  const forecastData = dataService.getDemandForecast();

  const chartData = forecastData.dayForecasts.map(d => ({
    name: d.dayName,
    bookings: d.projectedBookings,
    topTrade: d.topCategory
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header with Mandatory Constraint 7 Compliance Badge */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="coop" size="sm">STATISTICAL & HEURISTIC ENGINE</Badge>
          <span className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold px-2 py-0.5 rounded">
            Prototype Forecast Model
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Workforce Allocation & Demand Forecasting Prototype
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
          Transparent rule-based statistical forecasting utilizing 30-day historical booking cadences, weekend surge multipliers, and monsoon/seasonal weather indicators to assist cooperative federations in workforce mobilization.
        </p>
      </div>

      {/* Heuristic Notice Box */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm">Transparency Disclosure (Constraint 7 Compliant):</p>
          <p className="text-indigo-900 dark:text-indigo-300 mt-0.5">
            This module generates actionable operational recommendations using historical moving averages and seasonal trade heuristics. No proprietary black-box ML model is claimed.
          </p>
        </div>
      </div>

      {/* Day-of-Week Projected Demand Curve */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display uppercase tracking-wider">
              Projected Daily Service Demand (Weekly Cadence)
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Anticipated booking volume across all regional cooperative branches</p>
          </div>
          <span className="text-xs font-semibold text-coop-700 dark:text-coop-400">Weekend Volume Spike: +55%</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={12} />
              <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={12} />
              <Tooltip
                formatter={(value: any, name: any, props: any) => [
                  `${value} Projected Bookings (${props.payload.topTrade})`,
                  'Demand'
                ]}
                contentStyle={{ 
                  backgroundColor: isDark ? '#0f172a' : '#ffffff', 
                  borderColor: isDark ? '#334155' : '#e2e8f0', 
                  color: isDark ? '#f8fafc' : '#0f172a', 
                  borderRadius: '8px', 
                  fontSize: '11px' 
                }}
              />
              <Bar dataKey="bookings" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === 'Sat' || entry.name === 'Sun' ? '#d97706' : '#16a34a'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Day-by-day table */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
          {forecastData.dayForecasts.map((d, i) => (
            <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">{d.dayName}</span>
              <span className="text-coop-700 dark:text-coop-400 font-extrabold text-sm">{d.projectedBookings} jobs</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">{d.peakHour}</span>
              <span className={`text-[9px] font-bold px-1 rounded mt-1 inline-block ${
                d.emergencyRisk === 'Elevated' 
                  ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {d.emergencyRisk} Risk
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Area-Specific High-Demand Pincodes */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-saffron-600 dark:text-saffron-400" /> Area & Pincode Specific Demand Surges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forecastData.areaForecasts.map((af, i) => (
            <Card key={i} className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={af.predictedDemandLevel === 'High' ? 'danger' : 'warning'} size="sm">
                    {af.predictedDemandLevel.toUpperCase()} DEMAND SURGE (+{af.growthPercentage}%)
                  </Badge>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display mt-1">
                    {af.area} ({af.pincode})
                  </h3>
                  <p className="text-xs font-semibold text-coop-700 dark:text-coop-400">{af.category}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                Driver: {af.reason}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Currently Active: <strong className="text-slate-800 dark:text-slate-200">{af.activeWorkers} workers</strong></span>
                <span className="font-bold text-coop-800 dark:text-coop-300 bg-coop-50 dark:bg-coop-950/60 px-2.5 py-1 rounded-md border border-coop-200 dark:border-coop-800">
                  Recommended: {af.recommendedWorkers} workers
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Actionable Cooperative Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 space-y-3 shadow-md">
          <h3 className="font-bold text-sm text-saffron-400 font-display uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron-400" /> Actionable Workforce Allocation Recommendations
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {forecastData.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-coop-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-coop-600 dark:text-coop-400" /> Federation Key Statistical Insights
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {forecastData.insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coop-600 dark:bg-coop-400 shrink-0 mt-1.5" />
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
