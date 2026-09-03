import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RatingStars } from '../../components/ui/RatingStars';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Filter, 
  Star, 
  Briefcase, 
  Award,
  CheckCircle2
} from 'lucide-react';

export const WorkerSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCategory = searchParams.get('category') || '';
  const initialPincode = searchParams.get('pincode') || '';
  const initialEmergency = searchParams.get('emergency') === 'true';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [pincode, setPincode] = useState(initialPincode);
  const [emergencyOnly, setEmergencyOnly] = useState(initialEmergency);
  const [minRating, setMinRating] = useState<number>(0);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const categories = dataService.getCategories();
  const allVerifiedWorkers = dataService.getVerifiedWorkers();

  const filteredWorkers = useMemo(() => {
    return allVerifiedWorkers
      .filter((worker) => {
        if (selectedCategory && worker.skill_category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        if (minRating > 0 && worker.average_rating < minRating) {
          return false;
        }
        if (availabilityFilter === 'available' && worker.availability_status !== 'available') {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (pincode) {
          const aMatch = a.pincode === pincode;
          const bMatch = b.pincode === pincode;
          if (aMatch && !bMatch) return -1;
          if (!aMatch && bMatch) return 1;
        }
        return b.average_rating - a.average_rating;
      });
  }, [allVerifiedWorkers, selectedCategory, pincode, minRating, availabilityFilter]);

  const clearFilters = () => {
    setSelectedCategory('');
    setPincode('');
    setEmergencyOnly(false);
    setMinRating(0);
    setAvailabilityFilter('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">FEDERATION DIRECTORY</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
          Find Cooperative Verified Skilled Professionals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Only government-trade certified and cooperative-vetted workers are listed. No fake profiles.
        </p>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
              Trade Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="" className="dark:bg-slate-900">All Trade Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name} className="dark:bg-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pincode Matching */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
              Pincode / Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 110001 (CP)"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
              />
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
              Minimum Rating
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="0" className="dark:bg-slate-900">All Ratings</option>
              <option value="4.8" className="dark:bg-slate-900">4.8+ Stars (Top Rated)</option>
              <option value="4.5" className="dark:bg-slate-900">4.5+ Stars</option>
              <option value="4.0" className="dark:bg-slate-900">4.0+ Stars</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
              Duty Status
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
            >
              <option value="all" className="dark:bg-slate-900">All Statuses</option>
              <option value="available" className="dark:bg-slate-900">Available Now</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                emergencyOnly
                  ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-rose-500" />
              Prioritize Emergency Available
            </button>

            {pincode && (
              <span className="text-[11px] bg-coop-50 dark:bg-coop-950/60 text-coop-800 dark:text-coop-300 border border-coop-200 dark:border-coop-800 px-2 py-1 rounded-md font-medium">
                Showing matching workers in {pincode} first
              </span>
            )}
          </div>

          <button
            onClick={clearFilters}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline font-medium"
          >
            Reset Filters
          </button>
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Showing <strong>{filteredWorkers.length}</strong> verified cooperative professionals</span>
        <span className="text-coop-700 dark:text-coop-400 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Background & ITI Verified
        </span>
      </div>

      {/* Workers Grid */}
      {filteredWorkers.length === 0 ? (
        <EmptyState
          icon={<Search className="w-6 h-6" />}
          title="No verified workers matched your criteria"
          description="Try broadening your category filter or clearing the pincode to see workers in neighboring areas."
          actionText="Clear All Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkers.map((worker) => {
            const isPincodeMatch = pincode && worker.pincode === pincode;

            return (
              <Card key={worker.id} hoverEffect className="p-5 flex flex-col justify-between bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="space-y-4">
                  {/* Worker Header */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={worker.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
                      alt={worker.profile?.full_name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate font-display">
                          {worker.profile?.full_name}
                        </h3>
                        <Badge variant="success" size="sm" dot>
                          Verified
                        </Badge>
                      </div>

                      <p className="text-xs font-bold text-coop-700 dark:text-coop-400 mt-0.5">
                        {worker.skill_category}
                      </p>
                      
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {worker.cooperative?.name}
                      </p>
                    </div>
                  </div>

                  {/* Badges / Distance match */}
                  <div className="flex flex-wrap gap-1.5">
                    {isPincodeMatch && (
                      <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" /> Same Pincode ({worker.pincode})
                      </span>
                    )}
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium">
                      {worker.experience_years} Years Experience
                    </span>
                    <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium">
                      {worker.total_jobs} Jobs Done
                    </span>
                  </div>

                  {/* Bio / Certification Snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {worker.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Insurance Status */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <RatingStars rating={worker.average_rating} size="sm" showText />
                    </div>
                    <span className="text-[11px] text-coop-800 dark:text-coop-300 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> Insured Member
                    </span>
                  </div>
                </div>

                {/* Footer Price & Booking */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Standard Tariff</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 font-display">
                      ₹{worker.hourly_or_base_rate}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/customer/workers/${worker.id}`)}
                    >
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/customer/book/${worker.id}`)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
