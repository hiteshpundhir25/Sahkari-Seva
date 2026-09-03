import React from 'react';
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
  Calendar, 
  Search, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  CreditCard,
  Sparkles
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const bookings = dataService.getBookingsByCustomer(user.id);
  const activeBookings = bookings.filter(b => b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const categories = dataService.getCategories().slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-coop-700 via-coop-800 to-emerald-800 dark:from-coop-950 dark:via-slate-900 dark:to-slate-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-coop-600/30 dark:border-slate-800 transition-colors duration-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 dark:bg-coop-500/20 text-white dark:text-coop-300 text-xs font-semibold border border-white/20">
            HOUSEHOLD MEMBER PORTAL
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Welcome back, {user.full_name}!
          </h1>
          <p className="text-xs text-coop-100 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-coop-300 dark:text-coop-400" /> Service Area: {user.city} ({user.pincode})
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="md"
            variant="secondary"
            onClick={() => navigate('/customer/workers')}
            leftIcon={<Search className="w-4 h-4" />}
          >
            Find Verified Workers
          </Button>
        </div>
      </div>

      {/* Active Bookings Progress Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Active Service Orders ({activeBookings.length})
          </h2>
          <Link to="/customer/bookings" className="text-xs font-semibold text-coop-700 dark:text-coop-400 hover:text-coop-800 dark:hover:text-coop-300">
            View All Bookings →
          </Link>
        </div>

        {activeBookings.length === 0 ? (
          <EmptyState
            icon={<Calendar className="w-6 h-6" />}
            title="No active bookings right now"
            description="Looking for an electrician, plumber, or technician? Browse cooperative verified professionals."
            actionText="Find a Worker"
            onAction={() => navigate('/customer/workers')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBookings.map((b) => (
              <Card key={b.id} hoverEffect className="p-5 border-coop-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold">{b.booking_code}</span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display mt-0.5">
                      {b.service_category?.name}
                    </h3>
                  </div>
                  <BookingStatusBadge status={b.status} isEmergency={b.is_emergency} />
                </div>

                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Assigned Professional:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> {b.worker?.profile?.full_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Scheduled Time:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{b.booking_date} at {b.booking_time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Cooperative Tariff:</span>
                    <span className="font-extrabold text-coop-700 dark:text-coop-400">₹{b.final_amount}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {b.status === 'in_progress' ? '⚡ Worker is currently servicing your request' : 'Cooperative guaranteed dispatch'}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/customer/bookings/${b.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Instant Book Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Book a Certified Service
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Card
              key={c.id}
              hoverEffect
              onClick={() => navigate(`/customer/workers?category=${encodeURIComponent(c.name)}`)}
              className="p-3.5 text-center cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-coop-50 dark:bg-coop-950/60 text-coop-700 dark:text-coop-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-coop-600 dark:text-coop-400" />
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{c.name}</p>
                <p className="text-[10px] text-coop-700 dark:text-coop-400 font-semibold mt-0.5">From ₹{c.base_price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Bookings History */}
      {completedBookings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Completed Jobs & Invoices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedBookings.map((b) => (
              <Card key={b.id} className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{b.booking_code}</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{b.service_category?.name}</h4>
                  </div>
                  <Badge variant="success" size="sm" dot>Completed</Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Served by: <strong>{b.worker?.profile?.full_name}</strong></span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">₹{b.final_amount}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Paid via UPI • 10% added to Welfare
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/customer/invoices/${b.id}`)}
                  >
                    View Invoice
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
