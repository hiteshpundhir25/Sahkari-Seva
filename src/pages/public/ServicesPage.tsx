import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Search } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmergencyOnly, setFilterEmergencyOnly] = useState(false);

  const categories = dataService.getCategories().filter(cat => {
    const nameMatch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      cat.name_hi.includes(searchTerm);
    const emergencyMatch = filterEmergencyOnly ? cat.emergency_available : true;
    return nameMatch && emergencyMatch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="coop">STANDARD COOPERATIVE TARIFF</Badge>
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          All Certified Household & Community Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Every rate is regulated by the Labour Cooperative Society ensuring fair remuneration for professionals and fixed honest pricing for households.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search service e.g. Electrical, AC Repair..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
          />
        </div>

        <button
          onClick={() => setFilterEmergencyOnly(!filterEmergencyOnly)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
            filterEmergencyOnly
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-rose-500" />
          Show 24/7 Emergency Available Only
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <Card key={cat.id} hoverEffect className="p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-coop-50 dark:bg-coop-950/60 text-coop-700 dark:text-coop-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6 text-coop-600 dark:text-coop-400" />
                </div>
                {cat.emergency_available && (
                  <Badge variant="emergency" dot size="sm">
                    24/7 EMERGENCY
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display">
                  {i18n.language === 'hi' ? cat.name_hi : cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {i18n.language === 'hi' ? cat.description_hi : cat.description}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1 text-coop-800 dark:text-coop-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> Cooperative Assurance
                </div>
                <p>Govt ITI / NSDC certified workers with background verification.</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Base Price</span>
                <span className="text-base font-extrabold text-coop-700 dark:text-coop-400 font-display">
                  ₹{cat.base_price}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => navigate(`/customer/workers?category=${encodeURIComponent(cat.name)}`)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Find Workers
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
