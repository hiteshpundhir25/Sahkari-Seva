import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { RatingStars } from '../../components/ui/RatingStars';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building2, 
  ArrowLeft,
  FileCheck,
  Star,
  Zap
} from 'lucide-react';

export const WorkerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return null;

  const worker = dataService.getWorkerById(id);
  if (!worker) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300">Worker profile not found.</p>
        <Link to="/customer/workers">
          <Button size="sm">Back to Directory</Button>
        </Link>
      </div>
    );
  }

  const ratings = dataService.getRatingsByWorker(worker.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Search Results
      </button>

      {/* Main Profile Header Card */}
      <Card className="p-6 sm:p-8 bg-white dark:bg-slate-900 border-coop-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={worker.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
              alt={worker.profile?.full_name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-coop-500 shrink-0 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
                  {worker.profile?.full_name}
                </h1>
                <Badge variant="success" size="md" dot>
                  Cooperative Certified
                </Badge>
              </div>

              <p className="text-sm font-bold text-coop-700 dark:text-coop-400">
                {worker.skill_category} Professional
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> Member of {worker.cooperative?.name} (Worker ID: {worker.worker_code})
              </p>

              <div className="flex items-center gap-3 text-xs pt-1">
                <RatingStars rating={worker.average_rating} size="sm" showText />
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">{worker.total_jobs} Completed Jobs</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">{worker.experience_years} Years Exp</span>
              </div>
            </div>
          </div>

          <div className="sm:text-right shrink-0 w-full sm:w-auto p-4 sm:p-0 bg-slate-50 dark:bg-slate-800/80 sm:bg-transparent sm:dark:bg-transparent rounded-2xl">
            <span className="text-xs text-slate-400 dark:text-slate-500 block">Standard Service Tariff</span>
            <span className="text-2xl font-extrabold text-coop-700 dark:text-coop-400 font-display">
              ₹{worker.hourly_or_base_rate}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-3">per standard job</span>

            <Button
              size="md"
              className="w-full sm:w-auto"
              onClick={() => navigate(`/customer/book/${worker.id}`)}
            >
              Book This Worker Now
            </Button>
          </div>
        </div>

        {/* Bio */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 font-display">
            About the Professional
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {worker.bio}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 font-display">
            Verified Skill Capabilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((s, idx) => (
              <span key={idx} className="text-xs bg-coop-50 dark:bg-coop-950/60 text-coop-900 dark:text-coop-200 border border-coop-200 dark:border-coop-800 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> {s}
              </span>
            ))}
          </div>
        </div>

        {/* Verification Credentials Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Trade Certification:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <FileCheck className="w-4 h-4 text-coop-600 dark:text-coop-400" /> {worker.certification_name || 'Govt ITI Qualified'}
            </p>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Social Security & Insurance:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {worker.insurance_status}
            </p>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Service Area Coverage:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-4 h-4 text-saffron-600 dark:text-saffron-400" /> {worker.service_area} ({worker.pincode})
            </p>
          </div>
        </div>
      </Card>

      {/* Customer Ratings & Reviews */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Customer Ratings & Reviews ({ratings.length})
          </h3>
          <div className="flex items-center gap-2">
            <RatingStars rating={worker.average_rating} size="sm" showText />
          </div>
        </div>

        {ratings.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 py-4">No reviews yet for this worker.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
            {ratings.map((r) => (
              <div key={r.id} className="pt-3 first:pt-0 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{r.customer_name || 'Verified Customer'}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
                <RatingStars rating={r.rating} size="sm" />
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{r.feedback}"
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
