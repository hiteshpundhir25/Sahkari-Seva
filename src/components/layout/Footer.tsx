import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-coop-600 flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {t('app_name')}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              India's first democratic, cooperative-owned gig service marketplace. Fair wages, group health shield, and transparent pricing.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/80 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Multi-Trade Labour Cooperative Federation
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4 font-display">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/services" className="hover:text-coop-700 dark:hover:text-white transition-colors">All Certified Services</Link></li>
              <li><Link to="/customer/workers" className="hover:text-coop-700 dark:hover:text-white transition-colors">Search Verified Workers</Link></li>
              <li><Link to="/why-cooperative" className="hover:text-coop-700 dark:hover:text-white transition-colors">Why Cooperative Owned?</Link></li>
              <li><Link to="/signup" className="hover:text-coop-700 dark:hover:text-white transition-colors">Worker Cooperative Registration</Link></li>
              <li><Link to="/about" className="hover:text-coop-700 dark:hover:text-white transition-colors">About Sahakari Mission</Link></li>
            </ul>
          </div>

          {/* Cooperative Principles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4 font-display">
              Fair Wage Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coop-500" />
                85% direct wage payout to workers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron-500" />
                10% worker health & pension welfare pool
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                No arbitrary algorithmic commissions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Govt trade certification verification
              </li>
            </ul>
          </div>

          {/* Contact Federation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4 font-display">
              Cooperative Secretariat
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-coop-600 dark:text-coop-400 shrink-0" />
                Plot 14, Institutional Area, Rouse Avenue, New Delhi - 110001
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-coop-600 dark:text-coop-400 shrink-0" />
                +91 11 2334 5678 (Helpdesk)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-coop-600 dark:text-coop-400 shrink-0" />
                contact@delhicoop.in
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Sahakari Seva, Dedicated to Labour Cooperative Federations across India.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 text-slate-600 dark:text-slate-400">
            Empowering Gig Workers with Dignity & Social Security <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
