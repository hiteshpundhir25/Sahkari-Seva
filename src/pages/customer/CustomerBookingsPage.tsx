import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BookingStatusBadge } from '../../components/ui/BookingStatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Calendar, 
  Search, 
  CreditCard, 
  ArrowRight, 
  ShieldCheck, 
  MapPin,
  FileText
} from 'lucide-react';
import { BookingStatus } from '../../types';

export const CustomerBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!user) return null;

  const allBookings = dataService.getBookingsByCustomer(user.id);

  const filteredBookings = allBookings.filter((b) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return b.status === 'pending' || b.status === 'accepted' || b.status === 'in_progress';
    if (statusFilter === 'completed') return b.status === 'completed';
    return b.status === statusFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="coop" size="sm">ORDERS & HISTORY</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            My Service Bookings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track live requests, check completed invoices, and rate your cooperative technicians.
          </p>
        </div>

        <Button
          size="md"
          onClick={() => navigate('/customer/workers')}
          leftIcon={<Search className="w-4 h-4" />}
        >
          Book New Service
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: `All Orders (${allBookings.length})` },
          { key: 'active', label: 'Active / In Progress' },
          { key: 'completed', label: 'Completed' },
          { key: 'pending', label: 'Pending Acceptance' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              statusFilter === tab.key
                ? 'bg-coop-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-6 h-6" />}
          title="No bookings match your filter"
          description="Browse certified electricians, plumbers, and caregivers in your area."
          actionText="Find a Professional"
          onAction={() => navigate('/customer/workers')}
        />
      ) : (
        <div className="space-y-3.5">
          {filteredBookings.map((b) => (
            <Card key={b.id} hoverEffect className="p-5 bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left info */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={b.worker?.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(b.worker?.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
                    alt={b.worker?.profile?.full_name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">{b.booking_code}</span>
                      <BookingStatusBadge status={b.status} isEmergency={b.is_emergency} />
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display mt-0.5">
                      {b.service_category?.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Professional: <strong>{b.worker?.profile?.full_name}</strong> • {b.cooperative?.name}
                    </p>

                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {b.booking_date} at {b.booking_time} • <MapPin className="w-3.5 h-3.5" /> {b.city} ({b.pincode})
                    </p>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Total Tariff</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                      ₹{b.final_amount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.payment_status === 'paid' && (
                      <Link to={`/customer/invoices/${b.id}`}>
                        <Button size="sm" variant="outline" leftIcon={<FileText className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" />}>
                          Invoice
                        </Button>
                      </Link>
                    )}
                    <Button
                      size="sm"
                      onClick={() => navigate(`/customer/bookings/${b.id}`)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
