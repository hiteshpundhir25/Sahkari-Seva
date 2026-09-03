import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dataService } from '../../services/dataService';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  MapPin, 
  ArrowRight, 
  HeartHandshake, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Clock, 
  Star, 
  Users, 
  BadgePercent,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RatingStars } from '../../components/ui/RatingStars';

export const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [pincode, setPincode] = useState('');

  const categories = dataService.getCategories();
  const verifiedWorkers = dataService.getVerifiedWorkers().slice(0, 4);
  const stats = dataService.getAdminStats();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/customer/workers?category=${encodeURIComponent(selectedCategory)}&pincode=${encodeURIComponent(pincode)}`);
  };

  const handleEmergencySearch = () => {
    navigate('/customer/workers?emergency=true');
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-coop-700 via-coop-800 to-emerald-900 dark:from-coop-950 dark:via-slate-900 dark:to-slate-950 text-white p-6 sm:p-12 lg:p-16 shadow-xl border border-coop-600/30 dark:border-slate-800 transition-colors duration-200">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 dark:bg-coop-500/20 text-white dark:text-coop-300 text-xs font-semibold border border-white/20 dark:border-coop-500/30 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-coop-300 dark:text-coop-400" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-tight text-white">
            {t('hero.title_main')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-saffron-300 dark:from-coop-400 dark:via-emerald-300 dark:to-saffron-400">
              {t('hero.title_highlight')}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-coop-100 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar Container */}
          <form 
            onSubmit={handleSearch}
            className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl mx-auto text-slate-900 dark:text-slate-100 text-left transition-colors duration-200"
          >
            {/* Category Select */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 sm:bg-transparent sm:dark:bg-transparent rounded-xl border sm:border-0 border-slate-200 dark:border-slate-700">
              <Sparkles className="w-5 h-5 text-coop-600 dark:text-coop-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none text-slate-800 dark:text-slate-100"
              >
                <option value="" className="dark:bg-slate-900">{t('hero.search_category_placeholder')}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name} className="dark:bg-slate-900">
                    {i18n.language === 'hi' ? c.name_hi : c.name} (₹{c.base_price})
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

            {/* Pincode Input */}
            <div className="w-full sm:w-44 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 sm:bg-transparent sm:dark:bg-transparent rounded-xl border sm:border-0 border-slate-200 dark:border-slate-700">
              <MapPin className="w-5 h-5 text-saffron-500 shrink-0" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder={t('hero.search_pincode_placeholder')}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            {/* Search Submit */}
            <Button type="submit" size="md" className="shrink-0">
              <Search className="w-4 h-4 mr-1.5" />
              {t('hero.find_workers')}
            </Button>
          </form>

          {/* Quick Emergency Button */}
          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={handleEmergencySearch}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-200 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 dark:bg-amber-950/60 dark:hover:bg-amber-950/80 px-4 py-2 rounded-full border border-amber-400/40 transition-colors shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              {t('hero.emergency_btn')}
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-coop-700 dark:text-coop-400 font-display">
            {stats.verifiedWorkers}+
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{t('stats.verified_workers')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-saffron-600 dark:text-saffron-400 font-display">
            3
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{t('stats.cooperatives')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
            ₹{(stats.totalWelfarePool / 1000).toFixed(0)}k+
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{t('stats.welfare_corpus')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-200 font-display flex items-center justify-center gap-1">
            4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{t('stats.satisfaction')}</p>
        </Card>
      </section>

      {/* 3. PROMINENT "WHY COOPERATIVE-OWNED?" SECTION */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-8 transition-colors duration-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="coop" size="md">COOPERATIVE ADVANTAGE</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            {t('coop_ethos.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {t('coop_ethos.subtitle')}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conventional Platform */}
          <div className="p-6 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <h3 className="font-bold text-base text-rose-950 dark:text-rose-300 font-display">
                {t('coop_ethos.comparison_commercial_title')}
              </h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                {t('coop_ethos.comparison_commercial_point1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                {t('coop_ethos.comparison_commercial_point2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                {t('coop_ethos.comparison_commercial_point3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                {t('coop_ethos.comparison_commercial_point4')}
              </li>
            </ul>
          </div>

          {/* Cooperative Platform */}
          <div className="p-6 rounded-2xl bg-coop-50/70 dark:bg-coop-950/30 border border-coop-300 dark:border-coop-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-coop-700 dark:text-coop-400 shrink-0" />
              <h3 className="font-bold text-base text-coop-950 dark:text-coop-300 font-display">
                {t('coop_ethos.comparison_coop_title')}
              </h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-800 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
                <span className="font-semibold text-coop-900 dark:text-coop-200">{t('coop_ethos.comparison_coop_point1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
                {t('coop_ethos.comparison_coop_point2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
                <span className="font-semibold text-coop-900 dark:text-coop-200">{t('coop_ethos.comparison_coop_point3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coop-600 dark:text-coop-400 font-bold">✓</span>
                {t('coop_ethos.comparison_coop_point4')}
              </li>
            </ul>
          </div>
        </div>

        {/* 85/10/5 Revenue Split Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-coop-50 via-slate-50 to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white border border-coop-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-coop-800 dark:text-saffron-400 uppercase tracking-wider">
              Transparent Fair-Wage Formula
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Zero Hidden Deductions</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-coop-600 dark:bg-coop-700/80 text-white border border-coop-500/50 shadow-xs">
              <p className="text-lg sm:text-xl font-extrabold text-white">85%</p>
              <p className="text-[11px] text-coop-100 mt-0.5">{t('coop_ethos.split_worker')}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-saffron-500 dark:bg-saffron-600/80 text-white border border-saffron-400/50 shadow-xs">
              <p className="text-lg sm:text-xl font-extrabold text-white">10%</p>
              <p className="text-[11px] text-saffron-100 mt-0.5">{t('coop_ethos.split_welfare')}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-700 dark:bg-slate-800 text-white border border-slate-600/50 shadow-xs">
              <p className="text-lg sm:text-xl font-extrabold text-white">5%</p>
              <p className="text-[11px] text-slate-200 mt-0.5">{t('coop_ethos.split_platform')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE CATEGORIES SHOWCASE */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <Badge variant="coop" size="sm">POPULAR TRADES</Badge>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
              {t('services_sec.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('services_sec.subtitle')}</p>
          </div>
          <Link to="/services" className="text-xs font-semibold text-coop-700 dark:text-coop-400 hover:text-coop-800 dark:hover:text-coop-300 flex items-center gap-1">
            View All 12 Services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Card
              key={cat.id}
              hoverEffect
              className="p-4 cursor-pointer flex flex-col justify-between"
              onClick={() => navigate(`/customer/workers?category=${encodeURIComponent(cat.name)}`)}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-10 h-10 rounded-xl bg-coop-50 dark:bg-coop-950/60 text-coop-700 dark:text-coop-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5 text-coop-600 dark:text-coop-400" />
                  </span>
                  {cat.emergency_available && (
                    <Badge variant="emergency" size="sm">24/7</Badge>
                  )}
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 font-display">
                  {i18n.language === 'hi' ? cat.name_hi : cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {i18n.language === 'hi' ? cat.description_hi : cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 text-[11px]">{t('services_sec.starting_from')}</span>
                <span className="font-bold text-coop-700 dark:text-coop-400">₹{cat.base_price}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. VERIFIED WORKER SPOTLIGHT */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <Badge variant="coop" size="sm">VERIFIED TALENT</Badge>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
              {t('worker_spotlight.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t('worker_spotlight.subtitle')}</p>
          </div>
          <Link to="/customer/workers" className="text-xs font-semibold text-coop-700 dark:text-coop-400 hover:text-coop-800 dark:hover:text-coop-300 flex items-center gap-1">
            Browse All Workers <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verifiedWorkers.map((worker) => (
            <Card key={worker.id} hoverEffect className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3">
                  <img
                    src={worker.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
                    alt={worker.profile?.full_name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate font-display">
                        {worker.profile?.full_name}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-coop-600 dark:text-coop-400 shrink-0" />
                    </div>
                    <p className="text-xs font-medium text-coop-700 dark:text-coop-400">{worker.skill_category}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{worker.cooperative?.name}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <RatingStars rating={worker.average_rating} size="sm" showText />
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{worker.experience_years} {t('worker_spotlight.exp_years')}</span>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1">
                  {worker.skills.slice(0, 2).map((s, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Co-op Base Rate</span>
                  <p className="font-bold text-xs text-slate-900 dark:text-slate-100">₹{worker.hourly_or_base_rate}/job</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate(`/customer/book/${worker.id}`)}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION FOR COOPERATIVE WORKERS */}
      <section className="bg-gradient-to-r from-coop-700 via-coop-800 to-emerald-800 dark:from-coop-950 dark:via-slate-900 dark:to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-coop-600/50 dark:border-slate-800 transition-colors duration-200">
        <div className="space-y-2 max-w-xl">
          <Badge variant="warning" size="sm">FOR SKILLED WORKERS</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Are You an Electrician, Plumber or Skilled Artisan?
          </h2>
          <p className="text-xs sm:text-sm text-coop-100 dark:text-slate-300 leading-relaxed">
            Join your registered regional Labour Cooperative Society. Enjoy guaranteed 85% payouts, free group accidental & health insurance, and zero exploitation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link to="/signup">
            <Button variant="secondary" size="lg">
              Register as Worker
            </Button>
          </Link>
          <Link to="/why-cooperative">
            <Button variant="outline" size="lg" className="bg-white/10 dark:bg-white/10 text-white border-white/30 hover:bg-white/20">
              Learn Benefits
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
