import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { PatientProfileScreen } from './components/PatientProfileScreen';
import { DoctorListScreen } from './components/DoctorListScreen';
import { DoctorScheduleScreen } from './components/DoctorScheduleScreen';
import { AppointmentBookingScreen } from './components/AppointmentBookingScreen';
import { ExaminationScreen } from './components/ExaminationScreen';
import { PrescriptionScreen } from './components/PrescriptionScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { NotificationScreen } from './components/NotificationScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { MedicalHistoryScreen } from './components/MedicalHistoryScreen';
import { PaymentHistoryScreen } from './components/PaymentHistoryScreen';
import { ReceptionistDashboardScreen } from './components/ReceptionistDashboardScreen';
import { DoctorApprovalScreen } from './components/DoctorApprovalScreen';
import { RevenueReportScreen } from './components/RevenueReportScreen';
import { Home, Calendar, Users, Bell, BarChart3, User } from 'lucide-react';

export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'manager';

export type Screen = 
  | 'login' 
  | 'register' 
  | 'forgot-password'
  | 'dashboard'
  | 'appointments' 
  | 'medical-history'
  | 'payment-history'
  | 'doctors' 
  | 'doctor-schedule'
  | 'appointment-booking'
  | 'examination'
  | 'prescription'
  | 'profile' 
  | 'payment'
  | 'notifications'
  | 'reports'
  | 'doctor-approval'
  | 'certificate-management'
  | 'schedule-management'
  | 'account-management'
  | 'revenue-report'
  | 'receptionist-dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Trang chủ', icon: Home },
    ];

    switch (userRole) {
      case 'patient':
        return [
          ...baseItems,
          { id: 'medical-history', label: 'Lịch sử khám', icon: Calendar },
          { id: 'doctors', label: 'Bác sĩ', icon: Users },
          { id: 'payment-history', label: 'Thanh toán', icon: BarChart3 },
          { id: 'profile', label: 'Hồ sơ', icon: User },
        ];
      case 'doctor':
        return [
          ...baseItems,
          { id: 'doctor-schedule', label: 'Lịch làm', icon: Calendar },
          { id: 'examination', label: 'Khám bệnh', icon: Users },
          { id: 'notifications', label: 'Thông báo', icon: Bell },
          { id: 'profile', label: 'Hồ sơ', icon: User },
        ];
      case 'receptionist':
        return [
          ...baseItems,
          { id: 'receptionist-dashboard', label: 'Bệnh nhân', icon: Users },
          { id: 'payment', label: 'Thanh toán', icon: BarChart3 },
          { id: 'notifications', label: 'Thông báo', icon: Bell },
        ];
      case 'manager':
        return [
          ...baseItems,
          { id: 'doctor-approval', label: 'Phê duyệt', icon: Users },
          { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
          { id: 'notifications', label: 'Thông báo', icon: Bell },
        ];
      default:
        return baseItems;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateToRegister={() => setCurrentScreen('register')}
            onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            onRegister={handleLogin}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordScreen 
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'dashboard':
        return <DashboardScreen userRole={userRole} onNavigate={setCurrentScreen} />;
      case 'medical-history':
        return <MedicalHistoryScreen onNavigate={setCurrentScreen} />;
      case 'payment-history':
        return <PaymentHistoryScreen onNavigate={setCurrentScreen} />;
      case 'doctors':
        return <DoctorListScreen userRole={userRole} onNavigate={setCurrentScreen} />;
      case 'doctor-schedule':
        return <DoctorScheduleScreen onNavigate={setCurrentScreen} />;
      case 'appointment-booking':
        return <AppointmentBookingScreen userRole={userRole} onNavigate={setCurrentScreen} />;
      case 'examination':
        return <ExaminationScreen onNavigate={setCurrentScreen} />;
      case 'prescription':
        return <PrescriptionScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <PatientProfileScreen userRole={userRole} onLogout={handleLogout} />;
      case 'payment':
        return <PaymentScreen onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <NotificationScreen userRole={userRole} />;
      case 'receptionist-dashboard':
        return <ReceptionistDashboardScreen onNavigate={setCurrentScreen} />;
      case 'doctor-approval':
        return <DoctorApprovalScreen onNavigate={setCurrentScreen} />;
      case 'reports':
        return <RevenueReportScreen onNavigate={setCurrentScreen} />;
      case 'certificate-management':
      case 'schedule-management':
      case 'account-management':
      case 'revenue-report':
        return <DoctorApprovalScreen onNavigate={setCurrentScreen} />;
      default:
        return <DashboardScreen userRole={userRole} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile App Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {/* Main Content */}
        <div className={isAuthenticated ? "pb-20" : ""}>
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {isAuthenticated && (
          <BottomNavigation
            items={getNavItems()}
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}
      </div>
    </div>
  );
}