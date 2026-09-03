import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Building2, User, Wrench, ShieldCheck, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { UserRole } from '../../types';

export const SignupPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const cooperatives = dataService.getCooperatives();
  const categories = dataService.getCategories();

  const [role, setRole] = useState<UserRole>('customer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('110001');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [address, setAddress] = useState('');

  // Worker specific fields
  const [cooperativeId, setCooperativeId] = useState(cooperatives[0]?.id || '');
  const [skillCategory, setSkillCategory] = useState(categories[0]?.name || 'Electrical');
  const [experienceYears, setExperienceYears] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [certificationName, setCertificationName] = useState('Govt ITI Certificate');
  const [bio, setBio] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    register({
      full_name: fullName,
      email,
      phone,
      role,
      city,
      state,
      pincode,
      address,
      language: 'en'
    }, role === 'worker' ? {
      cooperative_id: cooperativeId,
      skill_category: skillCategory,
      experience_years: Number(experienceYears),
      hourly_or_base_rate: Number(hourlyRate),
      certification_name: certificationName,
      bio: bio || `Certified ${skillCategory} professional.`,
      service_area: `${city} (${pincode})`
    } : undefined);

    setLoading(false);
    if (role === 'worker') {
      navigate('/worker/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="max-w-xl w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-coop-600 items-center justify-center text-white shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            Join the Cooperative Network
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create an account as a Household Customer or Skilled Cooperative Worker
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'customer'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            I am a Customer / Household
          </button>

          <button
            type="button"
            onClick={() => setRole('worker')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === 'worker'
                ? 'bg-white dark:bg-slate-900 text-coop-800 dark:text-coop-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-coop-600 dark:text-coop-400" />
            I am a Skilled Worker
          </button>
        </div>

        {/* Form Card */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {role === 'worker' && (
              <div className="p-3 rounded-xl bg-coop-50 dark:bg-coop-950/40 border border-coop-200 dark:border-coop-800 text-xs text-coop-800 dark:text-coop-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-coop-600 dark:text-coop-400" /> 85% Fair Wage & Group Health Insurance
                </p>
                <p className="text-coop-700 dark:text-coop-400 text-[11px]">
                  Your application will be verified by the regional cooperative federation before customer visibility.
                </p>
              </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh@gmail.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Service Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 110001"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Address / Area
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Street / Colony details"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
              />
            </div>

            {/* Worker Specific Section */}
            {role === 'worker' && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
                  Trade & Cooperative Affiliation
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Cooperative Federation *
                  </label>
                  <select
                    value={cooperativeId}
                    onChange={(e) => setCooperativeId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    {cooperatives.map((c) => (
                      <option key={c.id} value={c.id} className="dark:bg-slate-900">
                        {c.name} ({c.city} - {c.registration_number})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Skill Trade Category *
                    </label>
                    <select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-coop-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name} className="dark:bg-slate-900">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Experience (Years) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Base Rate (₹/job) *
                    </label>
                    <input
                      type="number"
                      min="100"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Trade Certification Name *
                    </label>
                    <input
                      type="text"
                      value={certificationName}
                      onChange={(e) => setCertificationName(e.target.value)}
                      placeholder="e.g. ITI Electrician Certificate"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" size="md" className="w-full" isLoading={loading}>
              {role === 'worker' ? 'Submit Worker Membership Application' : 'Register Customer Account'}
            </Button>
          </form>

          <div className="pt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-coop-600 dark:text-coop-400 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
