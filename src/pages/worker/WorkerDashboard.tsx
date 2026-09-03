import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BookingStatusBadge } from '../../components/ui/BookingStatusBadge';
import { RatingStars } from '../../components/ui/RatingStars';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  HeartHandshake, 
  DollarSign,
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { AvailabilityStatus } from '../../types';

export const WorkerDashboard: React.FC = () => {
  const { user, workerProfile, refreshUserData } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const currentWorker = workerProfile || dataService.getWorkerByProfileId(user.id);
  const bookings = currentWorker ? dataService.getBookingsByWorker(currentWorker.id) : [];

  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const activeJobs = bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress');
  const completedJobs = bookings.filter(b => b.status === 'completed');

  const [availability, setAvailability] = useState<AvailabilityStatus>(
    currentWorker?.availability_status || 'available'
  );

  const handleDutyToggle = (newStatus: AvailabilityStatus) => {
    if (!currentWorker) return;
    setAvailability(newStatus);
    dataService.updateWorkerAvailability(currentWorker.id, newStatus);
    refreshUserData();
  };

  const handleAcceptBooking = (bookingId: string) => {
    dataService.updateBookingStatus(bookingId, 'accepted');
    refreshUserData();
  };

  const handleRejectBooking = (bookingId: string) => {
    dataService.updateBookingStatus(bookingId, 'rejected');
    refreshUserData();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Worker Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-coop-800 via-coop-900 to-emerald-950 dark:from-coop-950 dark:via-slate-900 dark:to-slate-950 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-coop-700/40 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-start gap-4">
          <img
            src={user.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=16a34a&color=fff`}
            alt={user.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-coop-400 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Namaste, {user.full_name}
              </h1>
              {currentWorker?.verification_status === 'verified' ? (
                <Badge variant="success" size="sm" dot>Verified Member</Badge>
              ) : (
                <Badge variant="warning" size="sm" dot>Application Under Review</Badge>
              )}
            </div>
            <p className="text-xs text-coop-200">
              {currentWorker?.skill_category} Professional • {currentWorker?.cooperative?.name} (Worker ID: {currentWorker?.worker_code})
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
              <RatingStars rating={currentWorker?.average_rating || 5} size="sm" showText />
              <span>•</span>
              <span>{currentWorker?.total_jobs || 0} Jobs Done</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">₹{currentWorker?.total_earnings || 0} Net Earned</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle Bar */}
        <div className="p-3 rounded-2xl bg-slate-900/90 dark:bg-slate-800/80 border border-slate-700 w-full lg:w-auto shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Duty & Availability Control
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => handleDutyToggle('available')}
              className={`px-3 py-2 rounded-xl font-bold transition-all ${
                availability === 'available'
                  ? 'bg-coop-600 text-white shadow-sm'
                  : 'bg-slate-800 dark:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Online
            </button>
            <button
              onClick={() => handleDutyToggle('emergency_only')}
              className={`px-3 py-2 rounded-xl font-bold transition-all ${
                availability === 'emergency_only'
                  ? 'bg-red-600 text-white shadow-sm pulse-emergency'
                  : 'bg-slate-800 dark:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Emergency
            </button>
            <button
              onClick={() => handleDutyToggle('offline')}
              className={`px-3 py-2 rounded-xl font-bold transition-all ${
                availability === 'offline'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-800 dark:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Off Duty
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status Warning if Pending */}
      {currentWorker?.verification_status === 'pending' && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-start gap-3 text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm">Application Status: Pending Cooperative Verification</p>
            <p className="text-amber-800 dark:text-amber-300">
              Your trade documents and profile are currently under review by the Cooperative Secretariat. You can switch to the <strong>Admin Role</strong> in the demo switcher above to approve this account.
            </p>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Incoming Requests</span>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-display mt-1">
            {pendingRequests.length}
          </p>
        </Card>
        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Active Jobs</span>
          <p className="text-2xl font-extrabold text-coop-600 dark:text-coop-400 font-display mt-1">
            {activeJobs.length}
          </p>
        </Card>
        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Completed Jobs</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-display mt-1">
            {completedJobs.length}
          </p>
        </Card>
        <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Social Security Fund</span>
          <p className="text-2xl font-extrabold text-saffron-600 dark:text-saffron-400 font-display mt-1">
            ₹{((currentWorker?.total_earnings || 0) * 0.12).toFixed(0)}
          </p>
        </Card>
      </div>

      {/* Incoming Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> Incoming Booking Requests ({pendingRequests.length})
          </h2>
        </div>

        {pendingRequests.length === 0 ? (
          <EmptyState
            icon={<Clock className="w-6 h-6" />}
            title="No pending booking requests"
            description="You're all caught up! Make sure your duty status is set to 'Online' to receive new household service requests."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((b) => (
              <Card key={b.id} className="p-5 bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-900/60 ring-1 ring-amber-300/50 dark:ring-amber-500/20 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">{b.booking_code}</span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display mt-0.5">
                      {b.service_category?.name}
                    </h3>
                  </div>
                  <BookingStatusBadge status={b.status} isEmergency={b.is_emergency} />
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  "{b.service_description}"
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Customer:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{b.customer?.full_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Schedule:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{b.booking_date} at {b.booking_time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Location:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{b.city} ({b.pincode})</span>
                  </div>
                  <div className="flex items-center justify-between text-coop-700 dark:text-coop-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Your Direct Payout (85%):</span>
                    <span>₹{(b.final_amount * 0.85).toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    onClick={() => handleRejectBooking(b.id)}
                    leftIcon={<XCircle className="w-4 h-4" />}
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAcceptBooking(b.id)}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Accept Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Active Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Active Jobs in Progress ({activeJobs.length})
          </h2>
          <Link to="/worker/jobs" className="text-xs font-semibold text-coop-700 dark:text-coop-400 hover:text-coop-800 dark:hover:text-coop-300">
            Open Job Action Center →
          </Link>
        </div>

        {activeJobs.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">No jobs currently in progress.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeJobs.map((b) => (
              <Card key={b.id} className="p-5 bg-white dark:bg-slate-900 border-coop-200 dark:border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{b.booking_code}</span>
                    <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display">{b.service_category?.name}</h4>
                  </div>
                  <BookingStatusBadge status={b.status} isEmergency={b.is_emergency} />
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p>Customer: <strong>{b.customer?.full_name}</strong> ({b.customer?.phone})</p>
                  <p>Address: {b.address}, {b.city}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-coop-700 dark:text-coop-400">₹{(b.final_amount * 0.85).toFixed(2)} Payout</span>
                  <Link to="/worker/jobs">
                    <Button size="sm">Update Status →</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
