import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  ArrowLeft,
  CheckCircle2,
  Building2,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingCreatePage: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!workerId || !user) return null;

  const worker = dataService.getWorkerById(workerId);
  const categories = dataService.getCategories();
  const defaultCategory = categories.find(c => c.name.toLowerCase() === worker?.skill_category.toLowerCase()) || categories[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [serviceCategoryId, setServiceCategoryId] = useState(defaultCategory?.id || '');
  const [bookingDate, setBookingDate] = useState(defaultDateStr);
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [address, setAddress] = useState(user.address || 'Flat 402, Royal Residency, Connaught Place');
  const [city, setCity] = useState(user.city || 'New Delhi');
  const [state, setState] = useState(user.state || 'Delhi');
  const [pincode, setPincode] = useState(user.pincode || '110001');
  const [serviceDescription, setServiceDescription] = useState('Ceiling fan repair and regulator sparking check in bedroom.');
  const [isEmergency, setIsEmergency] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!worker) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Worker not found.</p>
        <Link to="/customer/workers"><Button size="sm">Back</Button></Link>
      </div>
    );
  }

  const selectedCategoryObj = categories.find(c => c.id === serviceCategoryId) || defaultCategory;
  const baseRate = selectedCategoryObj ? selectedCategoryObj.base_price : worker.hourly_or_base_rate;
  const finalAmount = isEmergency ? Math.round(baseRate * 1.25) : baseRate;

  // Cooperative Breakdown
  const workerAmount = Number((finalAmount * 0.85).toFixed(2));
  const welfareAmount = Number((finalAmount * 0.10).toFixed(2));
  const platformAmount = Number((finalAmount * 0.05).toFixed(2));

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newBooking = dataService.createBooking({
        customer_id: user.id,
        worker_id: worker.id,
        service_category_id: selectedCategoryObj.id,
        booking_date: bookingDate,
        booking_time: bookingTime,
        address,
        city,
        state,
        pincode,
        service_description: serviceDescription,
        is_emergency: isEmergency
      });

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      setLoading(false);
      navigate(`/customer/bookings/${newBooking.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">STEP 2 OF 3: SERVICE SCHEDULE</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Book Appointment with {worker.profile?.full_name}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Transparent cooperative tariff with zero hidden fees. 85% paid directly to the technician.
        </p>
      </div>

      <form onSubmit={handleCreateBooking} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Details */}
        <div className="md:col-span-2 space-y-4">
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display uppercase tracking-wider">
              Service & Schedule Details
            </h3>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Emergency Toggle */}
            <div className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              isEmergency 
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 ring-1 ring-rose-400' 
                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`} onClick={() => setIsEmergency(!isEmergency)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isEmergency ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 font-display">
                      24/7 Priority Emergency Service
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Dispatched within 30-45 minutes. Priority worker alert.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="w-4 h-4 text-coop-600 rounded focus:ring-coop-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Selected Service Category *
              </label>
              <select
                value={serviceCategoryId}
                onChange={(e) => setServiceCategoryId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="dark:bg-slate-900">
                    {c.name} (Co-op Tariff: ₹{c.base_price})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Time Slot *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    <option value="09:00 AM" className="dark:bg-slate-900">09:00 AM - 11:00 AM</option>
                    <option value="11:30 AM" className="dark:bg-slate-900">11:30 AM - 01:30 PM</option>
                    <option value="02:00 PM" className="dark:bg-slate-900">02:00 PM - 04:00 PM</option>
                    <option value="04:30 PM" className="dark:bg-slate-900">04:30 PM - 06:30 PM</option>
                    <option value="07:00 PM" className="dark:bg-slate-900">07:00 PM - 09:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Service Address / Flat No / Street *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 402, Royal Residency, Connaught Place"
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            {/* Pincode & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Describe the Work Requirement *
              </label>
              <textarea
                required
                rows={3}
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                placeholder="Explain the specific repair or maintenance needed..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500 resize-none"
              />
            </div>
          </Card>
        </div>

        {/* Price Breakdown Sidebar */}
        <div className="space-y-4">
          <Card className="p-5 bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 space-y-4 shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-wider">
                Fair Wage Breakdown
              </span>
              <h4 className="font-bold text-base font-display text-white">
                Cooperative Tariff Summary
              </h4>
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-slate-800 text-slate-300">
              <div className="flex items-center justify-between">
                <span>Base Service Rate</span>
                <span className="font-semibold text-white">₹{baseRate}</span>
              </div>

              {isEmergency && (
                <div className="flex items-center justify-between text-amber-300">
                  <span>Emergency Priority Add-on</span>
                  <span className="font-semibold">+ ₹{finalAmount - baseRate}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-coop-300">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-coop-400" /> Worker Payout (85%):
                  </span>
                  <span className="font-bold">₹{workerAmount}</span>
                </div>

                <div className="flex items-center justify-between text-saffron-300">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-saffron-400" /> Welfare & Medical (10%):
                  </span>
                  <span className="font-bold">₹{welfareAmount}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Platform Operations (5%):</span>
                  <span>₹{platformAmount}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-sm">
                <span className="font-bold text-white">Total Amount Due</span>
                <span className="text-xl font-extrabold text-coop-400 font-display">
                  ₹{finalAmount}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={loading}
              >
                Confirm & Send Booking Request
              </Button>
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-tight">
              Payment is requested only after the job is completed to your full satisfaction.
            </p>
          </Card>

          {/* Worker card reminder */}
          <Card className="p-4 bg-white dark:bg-slate-900 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src={worker.profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.profile?.full_name || 'Worker')}&background=16a34a&color=fff`}
                alt={worker.profile?.full_name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate font-display">{worker.profile?.full_name}</p>
                <p className="text-[11px] text-coop-700 dark:text-coop-400 font-medium">{worker.skill_category} ({worker.experience_years}y exp)</p>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
