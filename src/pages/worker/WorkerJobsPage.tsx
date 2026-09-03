import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BookingStatusBadge } from '../../components/ui/BookingStatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Play, 
  XCircle, 
  CheckSquare, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkerJobsPage: React.FC = () => {
  const { user, workerProfile, refreshUserData } = useAuth();
  const [filterTab, setFilterTab] = useState<string>('all');

  if (!user) return null;

  const currentWorker = workerProfile || dataService.getWorkerByProfileId(user.id);
  const bookings = currentWorker ? dataService.getBookingsByWorker(currentWorker.id) : [];

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'all') return true;
    if (filterTab === 'pending') return b.status === 'pending';
    if (filterTab === 'active') return b.status === 'accepted' || b.status === 'in_progress';
    if (filterTab === 'completed') return b.status === 'completed';
    return true;
  });

  const handleStatusChange = (bookingId: string, newStatus: 'accepted' | 'rejected' | 'in_progress' | 'completed') => {
    dataService.updateBookingStatus(bookingId, newStatus);
    refreshUserData();

    if (newStatus === 'completed') {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">WORKER JOB CENTER</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Job Execution & Status Controls
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Update status in real-time. Marking jobs completed triggers customer invoicing and 85% direct wage credit.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: `All Jobs (${bookings.length})` },
          { key: 'pending', label: 'Pending Requests' },
          { key: 'active', label: 'Accepted & In Progress' },
          { key: 'completed', label: 'Completed History' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterTab(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterTab === tab.key
                ? 'bg-coop-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-6 h-6" />}
          title="No jobs found in this category"
          description="Keep your availability turned 'Online' on the dashboard to receive household requests."
        />
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <Card key={b.id} className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">{b.booking_code}</span>
                    <BookingStatusBadge status={b.status} isEmergency={b.is_emergency} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display mt-0.5">
                    {b.service_category?.name}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Your Direct Payout (85%)</span>
                  <span className="text-lg font-extrabold text-coop-700 dark:text-coop-400 font-display">
                    ₹{(b.final_amount * 0.85).toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Total Tariff: ₹{b.final_amount}</span>
                </div>
              </div>

              {/* Requirement Description */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Job Description:</p>
                <p>{b.service_description}</p>
              </div>

              {/* Customer & Location Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Customer Contact:</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{b.customer?.full_name}</p>
                  <p className="flex items-center gap-1 text-slate-700 dark:text-slate-300 mt-0.5">
                    <Phone className="w-3 h-3 text-coop-600 dark:text-coop-400" /> {b.customer?.phone}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Scheduled Slot:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> {b.booking_date}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> {b.booking_time}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Service Address:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400 shrink-0 mt-0.5" />
                    {b.address}, {b.city} ({b.pincode})
                  </p>
                </div>
              </div>

              {/* Action Buttons Based on Status */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {b.status === 'completed' ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completed & Billed ({b.payment_status === 'paid' ? 'Paid' : 'Payment Pending'})
                    </span>
                  ) : (
                    <span>Follow cooperative safety protocols and wear ID badge.</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* If Pending: Accept or Reject */}
                  {b.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        onClick={() => handleStatusChange(b.id, 'rejected')}
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(b.id, 'accepted')}
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Accept Booking
                      </Button>
                    </>
                  )}

                  {/* If Accepted: Start Job */}
                  {b.status === 'accepted' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleStatusChange(b.id, 'in_progress')}
                      leftIcon={<Play className="w-4 h-4" />}
                    >
                      Start Job (Mark In Progress)
                    </Button>
                  )}

                  {/* If In Progress: Complete Job */}
                  {b.status === 'in_progress' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(b.id, 'completed')}
                      leftIcon={<CheckSquare className="w-4 h-4" />}
                    >
                      Mark Job Completed ✓
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
