import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { WhyCooperativePage } from './pages/public/WhyCooperativePage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { WorkerSearchPage } from './pages/customer/WorkerSearchPage';
import { WorkerDetailPage } from './pages/customer/WorkerDetailPage';
import { BookingCreatePage } from './pages/customer/BookingCreatePage';
import { BookingDetailPage } from './pages/customer/BookingDetailPage';
import { CustomerBookingsPage } from './pages/customer/CustomerBookingsPage';
import { InvoicePage } from './pages/customer/InvoicePage';

// Worker Pages
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerJobsPage } from './pages/worker/WorkerJobsPage';
import { WorkerEarningsWelfarePage } from './pages/worker/WorkerEarningsWelfarePage';
import { WorkerProfilePage } from './pages/worker/WorkerProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { WorkerVerificationPage } from './pages/admin/WorkerVerificationPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminWorkersPage } from './pages/admin/AdminWorkersPage';
import { DemandForecastingPage } from './pages/admin/DemandForecastingPage';
import { AdminWelfarePage } from './pages/admin/AdminWelfarePage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <NotificationProvider>
          <Routes>
            <Route element={<MainLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/why-cooperative" element={<WhyCooperativePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Customer Routes */}
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/workers"
                element={<WorkerSearchPage />}
              />
              <Route
                path="/customer/workers/:id"
                element={<WorkerDetailPage />}
              />
              <Route
                path="/customer/book/:workerId"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <BookingCreatePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/bookings"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <CustomerBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/bookings/:id"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <BookingDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/invoices/:bookingId"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <InvoicePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/profile"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Worker Routes */}
              <Route
                path="/worker/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['worker', 'admin']}>
                    <WorkerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/worker/jobs"
                element={
                  <ProtectedRoute allowedRoles={['worker', 'admin']}>
                    <WorkerJobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/worker/welfare"
                element={
                  <ProtectedRoute allowedRoles={['worker', 'admin']}>
                    <WorkerEarningsWelfarePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/worker/profile"
                element={
                  <ProtectedRoute allowedRoles={['worker', 'admin']}>
                    <WorkerProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/verification"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <WorkerVerificationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/workers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminWorkersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/forecasting"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DemandForecastingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/welfare"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminWelfarePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminServicesPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  </ThemeProvider>
  );
}

export default App;
