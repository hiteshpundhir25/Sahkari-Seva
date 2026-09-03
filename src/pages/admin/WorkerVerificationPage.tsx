import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Building2, 
  Award,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Worker } from '../../types';

export const WorkerVerificationPage: React.FC = () => {
  const { refreshUserData } = useAuth();
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const pendingWorkers = dataService.getPendingWorkers();
  const verifiedWorkers = dataService.getVerifiedWorkers();

  const handleApprove = (workerId: string, workerName: string) => {
    dataService.updateWorkerVerification(workerId, 'verified', 'Approved by Cooperative Secretariat. All trade certificates verified.');
    refreshUserData();
    setActionSuccess(`Worker ${workerName} has been approved and is now live for household discovery! 🎉`);
    setTimeout(() => setActionSuccess(null), 4000);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleOpenReject = (w: Worker) => {
    setSelectedWorker(w);
    setRejectNotes('Trade certification document does not meet federation criteria.');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedWorker) return;
    dataService.updateWorkerVerification(selectedWorker.id, 'rejected', rejectNotes);
    refreshUserData();
    setRejectModalOpen(false);
    setActionSuccess(`Worker application for ${selectedWorker.profile?.full_name} marked as rejected.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">GOVERNANCE & VETTING</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Worker Verification & Certification Queue
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Review trade qualifications, ITI certificates, and background documents before granting cooperative accreditation.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold">{actionSuccess}</span>
        </div>
      )}

      {/* Pending Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" /> Pending Applications Awaiting Review ({pendingWorkers.length})
          </h2>
        </div>

        {pendingWorkers.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
            <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">All worker applications are currently verified!</p>
            <p>New worker submissions will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingWorkers.map((worker) => (
              <Card key={worker.id} className="p-6 bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-900/60 ring-1 ring-amber-300/40 dark:ring-amber-500/20 shadow-sm space-y-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <img
                      src={worker.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.profile?.full_name || 'Worker')}&background=f59e0b&color=fff`}
                      alt={worker.profile?.full_name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 font-display">
                          {worker.profile?.full_name}
                        </h3>
                        <Badge variant="warning" size="sm" dot>
                          Pending Approval
                        </Badge>
                      </div>

                      <p className="text-xs font-bold text-coop-700 dark:text-coop-400 mt-0.5">
                        Trade: {worker.skill_category} Professional ({worker.experience_years} Years Experience)
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> Affiliated to: {worker.cooperative?.name}
                      </p>

                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                        Email: {worker.profile?.email} • Phone: {worker.profile?.phone} • Pincode: {worker.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
                    <Button
                      size="md"
                      variant="outline"
                      className="text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      onClick={() => handleOpenReject(worker)}
                      leftIcon={<XCircle className="w-4 h-4" />}
                    >
                      Reject
                    </Button>
                    <Button
                      size="md"
                      onClick={() => handleApprove(worker.id, worker.profile?.full_name || 'Worker')}
                      leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    >
                      Approve & Grant Accreditation
                    </Button>
                  </div>
                </div>

                {/* Document & Skills Inspection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Qualification Doc */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Trade Certification
                    </span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-coop-600 dark:text-coop-400" /> {worker.certification_name || 'Govt ITI Plumber Trade Certificate'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Valid Until: {worker.certification_expiry || '2028-06-30'}
                    </p>
                    {worker.certification_url && (
                      <a
                        href={worker.certification_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-coop-700 dark:text-coop-400 font-semibold hover:underline"
                      >
                        Inspect Document <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Skills Vetted */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Skills Claimed
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {worker.skills.map((s, i) => (
                        <span key={i} className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Operational details */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                      Tariff & Service Coverage
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">Base Tariff: <strong className="text-slate-900 dark:text-slate-100">₹{worker.hourly_or_base_rate}</strong></p>
                    <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-saffron-600 dark:text-saffron-400" /> {worker.service_area}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Verified Members Directory Preview */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-coop-600 dark:text-coop-400" /> Active Verified Members ({verifiedWorkers.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifiedWorkers.map((w) => (
            <Card key={w.id} className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={w.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(w.profile?.full_name || 'Worker')}`}
                  alt={w.profile?.full_name}
                  className="w-10 h-10 rounded-xl object-cover border border-coop-300 dark:border-coop-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate font-display">{w.profile?.full_name}</p>
                  <p className="text-[11px] text-coop-700 dark:text-coop-400 font-semibold">{w.skill_category} • {w.worker_code}</p>
                </div>
                <Badge variant="success" size="sm" dot>Active</Badge>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>{w.total_jobs} Jobs Completed</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{w.average_rating} ⭐</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Worker Application"
        subtitle={`Application: ${selectedWorker?.profile?.full_name}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reason for Rejection (Will be visible to applicant)
            </label>
            <textarea
              rows={3}
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject}>
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
