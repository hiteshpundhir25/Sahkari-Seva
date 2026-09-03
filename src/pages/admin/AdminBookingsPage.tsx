import React, { useState } from 'react';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BookingStatusBadge } from '../../components/ui/BookingStatusBadge';
import { 
  CalendarCheck, 
  Search, 
  MapPin, 
  Phone, 
  FileText, 
  DollarSign, 
  Zap,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const allBookings = dataService.getBookings();

  const filteredBookings = allBookings.filter((b) => {
    const matchSearch = 
      b.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customer?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.worker?.profile?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service_category?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'all' ? true : b.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">MASTER LEDGER</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Federation Booking Master Ledger
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Complete transparent tracking of all service orders across Delhi NCR, Jaipur, and Mumbai.
        </p>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Booking code, Customer, or Worker..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
            >
              <option value="all" className="dark:bg-slate-900">All Statuses ({allBookings.length})</option>
              <option value="pending" className="dark:bg-slate-900">Pending</option>
              <option value="accepted" className="dark:bg-slate-900">Accepted</option>
              <option value="in_progress" className="dark:bg-slate-900">In Progress</option>
              <option value="completed" className="dark:bg-slate-900">Completed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3.5 font-bold font-display">Booking Code</th>
                <th className="p-3.5 font-bold font-display">Service Trade</th>
                <th className="p-3.5 font-bold font-display">Customer</th>
                <th className="p-3.5 font-bold font-display">Assigned Worker</th>
                <th className="p-3.5 font-bold font-display">Schedule</th>
                <th className="p-3.5 font-bold font-display">Status</th>
                <th className="p-3.5 font-bold font-display text-right">Tariff</th>
                <th className="p-3.5 font-bold font-display text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-1">
                      {b.booking_code}
                      {b.is_emergency && <span className="text-[9px] bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold px-1 rounded">EMG</span>}
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{b.service_category?.name}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{b.customer?.full_name}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{b.city} ({b.pincode})</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{b.worker?.profile?.full_name}</p>
                    <p className="text-[10px] text-coop-700 dark:text-coop-400 font-mono">{b.worker?.worker_code}</p>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    {b.booking_date} ({b.booking_time})
                  </td>
                  <td className="p-3.5">
                    <BookingStatusBadge status={b.status} />
                  </td>
                  <td className="p-3.5 text-right font-bold text-slate-900 dark:text-slate-100">
                    ₹{b.final_amount}
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to={`/customer/bookings/${b.id}`}
                      className="text-[11px] font-semibold text-coop-600 dark:text-coop-400 hover:text-coop-800 dark:hover:text-coop-300"
                    >
                      Inspect →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
