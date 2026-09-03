import React, { useState } from 'react';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RatingStars } from '../../components/ui/RatingStars';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Phone, 
  Award,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminWorkersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');

  const allWorkers = dataService.getWorkers();
  const categories = dataService.getCategories();

  const filteredWorkers = allWorkers.filter((w) => {
    const matchSearch = 
      (w.profile?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      w.worker_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.pincode.includes(searchTerm);

    const matchCategory = categoryFilter === 'all' ? true : w.skill_category === categoryFilter;
    const matchVerification = verificationFilter === 'all' ? true : w.verification_status === verificationFilter;

    return matchSearch && matchCategory && matchVerification;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">MEMBERSHIP DIRECTORY</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Cooperative Worker Member Roster
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Directory of registered artisans, technicians, and service professionals across all member societies.
        </p>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name, Worker Code, or Pincode..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
            >
              <option value="all" className="dark:bg-slate-900">All Trade Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name} className="dark:bg-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
            >
              <option value="all" className="dark:bg-slate-900">All Verification Statuses</option>
              <option value="verified" className="dark:bg-slate-900">Verified Active Members</option>
              <option value="pending" className="dark:bg-slate-900">Pending Approval</option>
              <option value="rejected" className="dark:bg-slate-900">Rejected Applications</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Workers Roster Table */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3.5 font-bold font-display">Worker & ID</th>
                <th className="p-3.5 font-bold font-display">Trade Category</th>
                <th className="p-3.5 font-bold font-display">Affiliated Cooperative</th>
                <th className="p-3.5 font-bold font-display">Service Area</th>
                <th className="p-3.5 font-bold font-display">Rating & Jobs</th>
                <th className="p-3.5 font-bold font-display">Social Security</th>
                <th className="p-3.5 font-bold font-display">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={w.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(w.profile?.full_name || 'Worker')}`}
                        alt={w.profile?.full_name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{w.profile?.full_name}</p>
                        <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{w.worker_code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">{w.skill_category}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400 truncate max-w-[160px]">{w.cooperative?.name}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">{w.pincode} ({w.service_area})</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                      <span>{w.average_rating} ⭐</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">({w.total_jobs} jobs)</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {w.insurance_status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {w.verification_status === 'verified' ? (
                      <Badge variant="success" size="sm" dot>Verified</Badge>
                    ) : w.verification_status === 'pending' ? (
                      <Badge variant="warning" size="sm" dot>Pending</Badge>
                    ) : (
                      <Badge variant="danger" size="sm" dot>Rejected</Badge>
                    )}
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
