import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  HeartHandshake, 
  Scale, 
  BadgePercent, 
  Users, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';

export const WhyCooperativePage: React.FC = () => {
  return (
    <div className="space-y-12 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="coop" size="md">COOPERATIVE PRINCIPLES & GOVERNANCE</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
          Transforming Gig Work Through Democratic Cooperatives
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Unlike private venture-backed platforms that extract wealth from local labor, Sahakari Seva is owned and governed by Labour Cooperative Societies registered under the Cooperative Societies Act.
        </p>
      </div>

      {/* Deep-dive Architecture Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Extractive Model */}
        <Card className="p-6 border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
            <XCircle className="w-6 h-6" />
            <h3 className="font-bold text-lg font-display text-rose-950 dark:text-rose-300">Conventional Aggregators</h3>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-rose-900 dark:text-rose-300">Extractive Flow:</p>
            <p>Customer ₹500 ➔ <strong>Platform takes ₹150 (30%)</strong> ➔ Worker receives ₹350</p>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              Workers classified as "independent contractors" with <strong>zero health benefits</strong>.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              Opaque AI rating algorithms arbitrarily deactivate worker accounts.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              Profits siphoned out to private venture investors outside the community.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              Surge pricing increases customer costs with zero extra pay to workers.
            </li>
          </ul>
        </Card>

        {/* Cooperative Model */}
        <Card className="p-6 border-coop-300 dark:border-coop-800 bg-coop-50/40 dark:bg-coop-950/30 space-y-4 shadow-md">
          <div className="flex items-center gap-2 text-coop-700 dark:text-coop-400">
            <CheckCircle2 className="w-6 h-6" />
            <h3 className="font-bold text-lg font-display text-coop-950 dark:text-coop-300">Sahakari Seva Model</h3>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-coop-300 dark:border-coop-800 text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-coop-900 dark:text-coop-300">Cooperative Distribution Formula:</p>
            <p>Customer ₹500 ➔ <strong>Worker ₹425 (85%)</strong> + <strong>Welfare Pool ₹50 (10%)</strong> + Operations ₹25 (5%)</p>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-800 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
              Every verified worker is an enrolled member with <strong>Group Medical (Ayushman Bharat) & Accidental Insurance (PMSBY)</strong>.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
              10% of every transaction flows directly into a collective Welfare & Pension corpus.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
              Transparent, democratic peer-governance: dispute appeals reviewed by human board members.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
              Standardized base tariffs set collectively by trade guilds.
            </li>
          </ul>
        </Card>
      </div>

      {/* 4 Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white text-center">
          The 4 Pillars of Labour Cooperative Digitalization
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-coop-50 dark:bg-coop-950/60 text-coop-700 dark:text-coop-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-display">1. Fair Wage Charter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No middleman taking 30% cuts. 85% goes directly to the technician's bank account via UPI.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-950/60 text-saffron-700 dark:text-saffron-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-display">2. Social Security Fund</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Automated 10% welfare micro-deduction builds accidental cover, health shield, and retirement corpus.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-display">3. Trade Certification</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Govt ITI, NSDC, and Federation skill verification guarantees genuine competence to households.
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-display">4. Democratic Control</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              One member, one vote. Board elections ensure workers decide platform policies collectively.
            </p>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 transition-colors duration-200">
        <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">How are workers verified?</p>
            <p className="text-slate-600 dark:text-slate-400">
              Each worker submits their government ID, trade certificate (e.g. ITI, NSDC), and police verification record. The cooperative admin physically or digitally validates documents before approving their profile.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">What happens if I need emergency repairs?</p>
            <p className="text-slate-600 dark:text-slate-400">
              Cooperative workers can toggle their status to "Emergency Duty". Selecting the 24/7 Emergency toggle dispatches the nearest on-duty verified technician with priority within 30-45 minutes.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">Where does the 10% welfare contribution go?</p>
            <p className="text-slate-600 dark:text-slate-400">
              It is held in the cooperative society's audited Welfare & Medical Pool. It pays for PMJJBY/PMSBY insurance premiums, emergency hospitalization assistance, and tool purchase loans.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link to="/signup">
          <Button size="lg">Join the Movement — Register Today</Button>
        </Link>
      </div>
    </div>
  );
};
