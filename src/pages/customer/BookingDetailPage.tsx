import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { RatingStars } from '../../components/ui/RatingStars';
import { BookingStatusBadge } from '../../components/ui/BookingStatusBadge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  CreditCard, 
  Star, 
  ArrowLeft, 
  Phone, 
  FileText,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'demo' | 'upi' | 'card'>('demo');
  const [paying, setPaying] = useState(false);

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingScore, setRatingScore] = useState(5);
  const [feedback, setFeedback] = useState('Excellent, punctual, and professional service. Transparent cooperative rates!');
  const [submittingRating, setSubmittingRating] = useState(false);

  if (!id || !user) return null;

  const booking = dataService.getBookingById(id);
  if (!booking) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Booking record not found.</p>
        <Link to="/customer/bookings"><Button size="sm">Back to Bookings</Button></Link>
      </div>
    );
  }

  const steps = [
    { key: 'pending', label: 'Requested', desc: 'Awaiting worker acceptance' },
    { key: 'accepted', label: 'Accepted', desc: 'Technician confirmed slot' },
    { key: 'in_progress', label: 'In Progress', desc: 'Work underway at location' },
    { key: 'completed', label: 'Completed', desc: 'Job completed & signed off' }
  ];

  const getStepIndex = (st: string) => {
    switch (st) {
      case 'pending': return 0;
      case 'accepted': return 1;
      case 'in_progress': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(booking.status);

  // Handle Demo Payment
  const handleProcessPayment = () => {
    setPaying(true);
    setTimeout(() => {
      dataService.processPayment({
        booking_id: booking.id,
        payment_method: paymentMethod
      });
      setPaying(false);
      setPaymentModalOpen(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      if (!booking.rating) {
        setTimeout(() => setRatingModalOpen(true), 600);
      }
    }, 800);
  };

  // Handle Rating Submission
  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingRating(true);

    dataService.createRating({
      booking_id: booking.id,
      customer_id: user.id,
      worker_id: booking.worker_id,
      rating: ratingScore,
      feedback
    });

    setSubmittingRating(false);
    setRatingModalOpen(false);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/customer/bookings')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Bookings
      </button>

      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              {booking.booking_code}
            </span>
            <BookingStatusBadge status={booking.status} isEmergency={booking.is_emergency} />
          </div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
            {booking.service_category?.name} Service Order
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Booked on {new Date(booking.created_at).toLocaleDateString()} for {booking.booking_date} at {booking.booking_time}
          </p>
        </div>

        {/* Action button based on state */}
        <div className="flex gap-2">
          {booking.status === 'completed' && booking.payment_status === 'pending' && (
            <Button
              size="md"
              onClick={() => setPaymentModalOpen(true)}
              leftIcon={<CreditCard className="w-4 h-4" />}
            >
              Pay Now (₹{booking.final_amount})
            </Button>
          )}

          {booking.payment_status === 'paid' && (
            <Link to={`/customer/invoices/${booking.id}`}>
              <Button size="md" variant="outline" leftIcon={<FileText className="w-4 h-4 text-coop-600 dark:text-coop-400" />}>
                View Cooperative Invoice
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* 4-Step Visual Progress Stepper */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
          Live Service Lifecycle Stepper
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative pt-2">
          {steps.map((step, idx) => {
            const isPassed = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div
                key={step.key}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-coop-50 dark:bg-coop-950/60 border-coop-400 dark:border-coop-600 ring-2 ring-coop-500/20'
                    : isPassed
                    ? 'bg-slate-50 dark:bg-slate-800/80 border-coop-200 dark:border-coop-800'
                    : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isPassed ? 'bg-coop-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {isPassed ? '✓' : idx + 1}
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 font-display truncate">
                    {step.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Grid: Assigned Worker & Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Worker Profile Card */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
            Assigned Cooperative Professional
          </h3>

          <div className="flex items-start gap-3">
            <img
              src={booking.worker?.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.worker?.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
              alt={booking.worker?.profile?.full_name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-coop-500 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate font-display">
                {booking.worker?.profile?.full_name}
              </h4>
              <p className="text-xs font-semibold text-coop-700 dark:text-coop-400">{booking.worker?.skill_category}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{booking.cooperative?.name}</p>
              <div className="mt-1">
                <RatingStars rating={booking.worker?.average_rating || 5} size="sm" showText />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-500">Worker Code:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{booking.worker?.worker_code}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-500">Contact:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                <Phone className="w-3 h-3 text-coop-600 dark:text-coop-400" /> {booking.worker?.profile?.phone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 dark:text-slate-500">Trade Cert:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{booking.worker?.certification_name || 'ITI Qualified'}</span>
            </div>
          </div>
        </Card>

        {/* Booking Details Card */}
        <div className="md:col-span-2 space-y-4">
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
              Job Specifications & Address
            </h3>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Requirement:</p>
              <p>{booking.service_description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Service Location:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400 shrink-0 mt-0.5" />
                  {booking.address}, {booking.city} - {booking.pincode}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Scheduled Time:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" />
                  {booking.booking_date} ({booking.booking_time})
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 p-4 rounded-xl bg-gradient-to-r from-coop-50/80 to-emerald-50/80 dark:from-slate-950 dark:to-slate-900 border border-coop-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Cooperative Standard Tariff</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-display text-sm">₹{booking.final_amount}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-coop-800 dark:text-coop-300 font-medium">
                <span>Direct Worker Compensation (85%):</span>
                <span className="font-bold">₹{(booking.final_amount * 0.85).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-saffron-800 dark:text-saffron-300 font-medium">
                <span>Welfare & Health Shield (10%):</span>
                <span className="font-bold">₹{(booking.final_amount * 0.10).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>Platform Operations (5%):</span>
                <span>₹{(booking.final_amount * 0.05).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-coop-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">Payment Status:</span>
                {booking.payment_status === 'paid' ? (
                  <Badge variant="success" size="sm" dot>Paid via Demo/UPI</Badge>
                ) : (
                  <Badge variant="warning" size="sm" dot>Payment Pending</Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Rating Section if Completed */}
          {booking.status === 'completed' && (
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
                Service Review & Rating
              </h3>

              {booking.rating ? (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={booking.rating.rating} size="sm" showText />
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Submitted</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic">"{booking.rating.feedback}"</p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    How was your service with {booking.worker?.profile?.full_name}?
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setRatingModalOpen(true)}
                    leftIcon={<Star className="w-3.5 h-3.5" />}
                  >
                    Submit 5-Star Review
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* PAYMENT MODAL */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Complete Service Payment"
        subtitle={`Booking Ref: ${booking.booking_code}`}
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200">
            <p className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> DEMO PAYMENT SANDBOX MODE
            </p>
            <p className="text-[11px] mt-0.5 text-amber-800 dark:text-amber-300">
              No real bank deduction will occur. Simulates complete payment verification, invoice creation, and cooperative welfare allocation.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Service Amount:</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{booking.final_amount}</span>
            </div>
            <div className="flex justify-between text-coop-700 dark:text-coop-400">
              <span>Direct to {booking.worker?.profile?.full_name} (85%):</span>
              <span className="font-bold">₹{(booking.final_amount * 0.85).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-saffron-700 dark:text-saffron-400">
              <span>To Worker Welfare Fund (10%):</span>
              <span className="font-bold">₹{(booking.final_amount * 0.10).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Demo Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-coop-50 dark:bg-coop-950/60 border-coop-500 text-coop-800 dark:text-coop-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-coop-50 dark:bg-coop-950/60 border-coop-500 text-coop-800 dark:text-coop-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('demo')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  paymentMethod === 'demo'
                    ? 'bg-coop-50 dark:bg-coop-950/60 border-coop-500 text-coop-800 dark:text-coop-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Instant Demo
              </button>
            </div>
          </div>

          <Button
            size="md"
            className="w-full"
            isLoading={paying}
            onClick={handleProcessPayment}
          >
            Authorize & Complete Payment (₹{booking.final_amount})
          </Button>
        </div>
      </Modal>

      {/* RATING MODAL */}
      <Modal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        title="Rate Worker & Give Feedback"
        subtitle={`Service by ${booking.worker?.profile?.full_name}`}
      >
        <form onSubmit={handleSubmitRating} className="space-y-4">
          <div className="text-center py-2 space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">Tap stars to rate your satisfaction:</p>
            <div className="flex justify-center">
              <RatingStars
                rating={ratingScore}
                size="lg"
                interactive
                onChange={(score) => setRatingScore(score)}
              />
            </div>
            <p className="text-xs font-bold text-coop-700 dark:text-coop-400">
              {ratingScore === 5 ? '5.0 — Outstanding Cooperative Quality!' : `${ratingScore}.0 Stars`}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Written Feedback
            </label>
            <textarea
              required
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500 resize-none"
            />
          </div>

          <Button type="submit" size="md" className="w-full" isLoading={submittingRating}>
            Submit Review & Update Rating
          </Button>
        </form>
      </Modal>
    </div>
  );
};
