// ==============================================================================
// SAHAKARI SEVA — DOMAIN TYPES AND INTERFACES
// ==============================================================================

export type UserRole = 'customer' | 'worker' | 'admin';

export type AvailabilityStatus = 'available' | 'busy' | 'offline' | 'emergency_only';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'cancelled'
  | 'in_progress'
  | 'completed';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cash' | 'demo';

export interface Profile {
  id: string;
  auth_user_id?: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  profile_photo?: string;
  address?: string;
  city: string;
  state: string;
  pincode: string;
  language: 'en' | 'hi';
  created_at?: string;
  updated_at?: string;
}

export interface Cooperative {
  id: string;
  name: string;
  description: string;
  registration_number: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  logo_url?: string;
  welfare_pool_balance: number;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  name_hi: string;
  description: string;
  description_hi: string;
  icon: string;
  base_price: number;
  emergency_available: boolean;
  active: boolean;
  created_at?: string;
}

export interface Worker {
  id: string;
  profile_id: string;
  cooperative_id: string;
  worker_code: string;
  skill_category: string;
  skills: string[];
  experience_years: number;
  bio?: string;
  service_area: string;
  pincode: string;
  hourly_or_base_rate: number;
  availability_status: AvailabilityStatus;
  verification_status: VerificationStatus;
  verification_notes?: string;
  certification_url?: string;
  certification_name?: string;
  certification_expiry?: string;
  average_rating: number;
  total_jobs: number;
  total_earnings: number;
  welfare_status: string;
  insurance_status: string;
  created_at?: string;
  updated_at?: string;

  // Joined fields for display convenience
  profile?: Profile;
  cooperative?: Cooperative;
}

export interface Booking {
  id: string;
  booking_code: string;
  customer_id: string;
  worker_id: string;
  service_category_id: string;
  cooperative_id: string;
  booking_date: string;
  booking_time: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  service_description: string;
  estimated_amount: number;
  final_amount: number;
  is_emergency: boolean;
  status: BookingStatus;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;

  // Joined fields
  customer?: Profile;
  worker?: Worker;
  service_category?: ServiceCategory;
  cooperative?: Cooperative;
  rating?: Rating;
  invoice?: Invoice;
  payment?: Payment;
}

export interface Rating {
  id: string;
  booking_id: string;
  customer_id: string;
  worker_id: string;
  rating: number; // 1-5
  feedback?: string;
  created_at: string;
  customer_name?: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  customer_id: string;
  worker_id: string;
  amount: number;
  payment_method: PaymentMethod;
  transaction_reference: string;
  status: PaymentStatus;
  payment_gateway: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  booking_id: string;
  invoice_number: string;
  customer_id: string;
  worker_id: string;
  subtotal: number;
  platform_fee: number; // 5%
  cooperative_share: number; // 10%
  worker_amount: number; // 85%
  tax: number; // 0%
  total_amount: number;
  generated_at: string;
}

export interface Welfare {
  id: string;
  worker_id: string;
  welfare_scheme: string;
  enrollment_status: 'Active' | 'Pending' | 'Renewed' | 'Expired';
  contribution_balance: number;
  insurance_status: string;
  insurance_provider: string;
  policy_reference?: string;
  valid_until?: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  action_url?: string;
  created_at: string;
}

// Statistical Demand Forecast Heuristic Model Types
export interface AreaDemandForecast {
  area: string;
  pincode: string;
  category: string;
  predictedDemandLevel: 'High' | 'Medium' | 'Normal';
  growthPercentage: number;
  activeWorkers: number;
  recommendedWorkers: number;
  reason: string;
}

export interface DayForecast {
  dayName: string;
  projectedBookings: number;
  peakHour: string;
  topCategory: string;
  emergencyRisk: 'Low' | 'Moderate' | 'Elevated';
}
