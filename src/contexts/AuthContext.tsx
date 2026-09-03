import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Worker, UserRole } from '../types';
import { dataService } from '../services/dataService';

interface AuthContextType {
  user: Profile | null;
  workerProfile: Worker | null;
  isLoading: boolean;
  login: (email: string) => boolean;
  quickLoginAs: (role: UserRole, email?: string) => void;
  logout: () => void;
  register: (profileData: Omit<Profile, 'id'>, workerExtra?: Partial<Worker>) => Profile;
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [workerProfile, setWorkerProfile] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = (userId?: string) => {
    setIsLoading(true);
    const targetId = userId || localStorage.getItem('sahakari_current_user_id_v1');
    if (targetId) {
      const profile = dataService.getProfileById(targetId);
      if (profile) {
        setUser(profile);
        if (profile.role === 'worker') {
          const w = dataService.getWorkerByProfileId(profile.id);
          setWorkerProfile(w || null);
        } else {
          setWorkerProfile(null);
        }
        setIsLoading(false);
        return;
      }
    }
    // Default fallback to customer for seamless first-load demonstration
    const defaultCustomer = dataService.getProfileByEmail('priya.singh@customer.in');
    if (defaultCustomer) {
      setUser(defaultCustomer);
      localStorage.setItem('sahakari_current_user_id_v1', defaultCustomer.id);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (email: string): boolean => {
    const profile = dataService.getProfileByEmail(email);
    if (!profile) return false;

    setUser(profile);
    localStorage.setItem('sahakari_current_user_id_v1', profile.id);
    if (profile.role === 'worker') {
      const w = dataService.getWorkerByProfileId(profile.id);
      setWorkerProfile(w || null);
    } else {
      setWorkerProfile(null);
    }
    return true;
  };

  const quickLoginAs = (role: UserRole, specificEmail?: string) => {
    let targetEmail = specificEmail;
    if (!targetEmail) {
      if (role === 'admin') targetEmail = 'admin@delhicoop.in';
      else if (role === 'worker') targetEmail = 'rahul.sharma@worker.in';
      else targetEmail = 'priya.singh@customer.in';
    }
    login(targetEmail);
  };

  const logout = () => {
    setUser(null);
    setWorkerProfile(null);
    localStorage.removeItem('sahakari_current_user_id_v1');
  };

  const register = (profileData: Omit<Profile, 'id'>, workerExtra?: Partial<Worker>): Profile => {
    const newProfile = dataService.createProfile(profileData);
    if (profileData.role === 'worker' && workerExtra) {
      const defaultCoop = dataService.getCooperatives()[0];
      dataService.createWorker({
        profile_id: newProfile.id,
        cooperative_id: workerExtra.cooperative_id || (defaultCoop ? defaultCoop.id : 'c0000000-0000-0000-0000-000000000001'),
        worker_code: `WRK-NEW-${Math.floor(1000 + Math.random() * 9000)}`,
        skill_category: workerExtra.skill_category || 'Electrical',
        skills: workerExtra.skills || ['General Maintenance'],
        experience_years: workerExtra.experience_years || 2,
        bio: workerExtra.bio || 'Skilled cooperative trade member.',
        service_area: workerExtra.service_area || `${newProfile.city} (${newProfile.pincode})`,
        pincode: newProfile.pincode,
        hourly_or_base_rate: workerExtra.hourly_or_base_rate || 300,
        availability_status: 'available',
        certification_name: workerExtra.certification_name || 'Trade Qualification',
        certification_url: workerExtra.certification_url || 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600',
        certification_expiry: '2028-12-31',
        welfare_status: 'Application Under Review',
        insurance_status: 'Pending Verification'
      });
    }

    login(newProfile.email);
    return newProfile;
  };

  const refreshUserData = () => {
    if (user) {
      loadUser(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      workerProfile,
      isLoading,
      login,
      quickLoginAs,
      logout,
      register,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
