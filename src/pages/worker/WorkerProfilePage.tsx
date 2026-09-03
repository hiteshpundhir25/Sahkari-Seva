import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  User, 
  ShieldCheck, 
  Upload, 
  FileCheck, 
  Save, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const WorkerProfilePage: React.FC = () => {
  const { user, workerProfile, refreshUserData } = useAuth();
  if (!user) return null;

  const currentWorker = workerProfile || dataService.getWorkerByProfileId(user.id);
  const cooperatives = dataService.getCooperatives();
  const categories = dataService.getCategories();

  const [bio, setBio] = useState(currentWorker?.bio || '');
  const [skillCategory, setSkillCategory] = useState(currentWorker?.skill_category || 'Electrical');
  const [experienceYears, setExperienceYears] = useState(currentWorker?.experience_years || 5);
  const [hourlyRate, setHourlyRate] = useState(currentWorker?.hourly_or_base_rate || 350);
  const [serviceArea, setServiceArea] = useState(currentWorker?.service_area || 'Central & South Delhi');
  const [pincode, setPincode] = useState(currentWorker?.pincode || '110001');
  const [skillsInput, setSkillsInput] = useState(currentWorker?.skills.join(', ') || '');
  const [certName, setCertName] = useState(currentWorker?.certification_name || 'Govt ITI Certificate');
  const [certExpiry, setCertExpiry] = useState(currentWorker?.certification_expiry || '2028-12-31');

  const [uploadedFile, setUploadedFile] = useState<string | null>(currentWorker?.certification_url || null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setUploadedFile(previewUrl);
      setCertName(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorker) return;
    setSaving(true);

    const skillsArray = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    dataService.updateWorkerProfile(currentWorker.id, {
      bio,
      skill_category: skillCategory,
      experience_years: Number(experienceYears),
      hourly_or_base_rate: Number(hourlyRate),
      service_area: serviceArea,
      pincode,
      skills: skillsArray,
      certification_name: certName,
      certification_expiry: certExpiry,
      certification_url: uploadedFile || currentWorker.certification_url
    });

    dataService.updateProfile(user.id, {
      pincode
    });

    refreshUserData();
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant="coop" size="sm">WORKER CREDENTIALS</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
          Trade Profile & Certifications
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage your trade skills, service coverage area, and upload ITI/NSDC qualifications for cooperative verification.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Profile and qualifications successfully updated and saved!</span>
        </div>
      )}

      {/* Verification Status Banner */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={user.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=16a34a&color=fff`}
            alt={user.full_name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-coop-500 shrink-0"
          />
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-display">{user.full_name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email} • {user.phone}</p>
            <p className="text-[11px] text-coop-700 dark:text-coop-400 font-semibold mt-0.5 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-coop-600 dark:text-coop-400" /> {currentWorker?.cooperative?.name} (Code: {currentWorker?.worker_code})
            </p>
          </div>
        </div>

        <div>
          {currentWorker?.verification_status === 'verified' ? (
            <Badge variant="success" size="md" dot>
              Verified Active Member
            </Badge>
          ) : (
            <Badge variant="warning" size="md" dot>
              Verification Under Review
            </Badge>
          )}
        </div>
      </Card>

      {/* Profile Edit Form */}
      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-6">
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display">
            Trade & Operational Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Skill Category *
              </label>
              <select
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
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
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Standard Cooperative Base Tariff (₹/job) *
              </label>
              <input
                type="number"
                min="150"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Service Pincode *
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Service Areas / Suburbs Covered
            </label>
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="e.g. Central Delhi (CP, Paharganj, Karol Bagh)"
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Specific Skills (Comma-separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. MCB Wiring, Ceiling Fan Fix, Inverter Installation"
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Professional Biography
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500 resize-none"
            />
          </div>

          {/* Trade Certification Upload Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-coop-600 dark:text-coop-400" /> Trade Certification & Qualifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. National Trade Certificate (ITI)"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Validity / Expiry Date
                </label>
                <input
                  type="date"
                  value={certExpiry}
                  onChange={(e) => setCertExpiry(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-coop-500"
                />
              </div>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-coop-400 dark:hover:border-coop-500 rounded-2xl p-4 text-center bg-slate-50 dark:bg-slate-800/60 transition-colors">
              <Upload className="w-6 h-6 text-slate-400 dark:text-slate-500 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Upload Certificate Document (PDF, JPG, PNG)
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Maximum file size: 5MB</p>
              <label className="mt-2.5 inline-block">
                <span className="text-xs font-semibold bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg shadow-xs hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer">
                  Browse File
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedFile && (
                <p className="text-xs text-coop-700 dark:text-coop-400 font-semibold mt-2 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Document attached for cooperative review
                </p>
              )}
            </div>
          </div>

          <div className="pt-3">
            <Button type="submit" size="md" className="w-full" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
              Save Profile & Submit Updates
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
