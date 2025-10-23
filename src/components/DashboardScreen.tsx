import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Users, TrendingUp, Clock, Bell, Activity } from 'lucide-react';
import { UserRole, Screen } from '../App';

interface DashboardScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

export function DashboardScreen({ userRole, onNavigate }: DashboardScreenProps) {
  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'patient': return 'Chào mừng bệnh nhân';
      case 'doctor': return 'Chào mừng bác sĩ';
      case 'receptionist': return 'Chào mừng lễ tân';
      case 'manager': return 'Chào mừng quản lý';
      default: return 'Chào mừng';
    }
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'patient':
        return [
          { title: 'Đặt lịch khám', description: 'Đặt lịch hẹn với bác sĩ', icon: Calendar, action: () => onNavigate('appointment-booking') },
          { title: 'Xem bác sĩ', description: 'Danh sách bác sĩ có sẵn', icon: Users, action: () => onNavigate('doctors') },
          { title: 'Lịch sử khám', description: 'Xem lịch sử khám bệnh', icon: Activity, action: () => onNavigate('medical-history') },
        ];
      case 'doctor':
        return [
          { title: 'Lịch làm việc', description: 'Xem và quản lý lịch làm việc', icon: Calendar, action: () => onNavigate('doctor-schedule') },
          { title: 'Khám bệnh', description: 'Danh sách bệnh nhân hôm nay', icon: Users, action: () => onNavigate('examination') },
          { title: 'Kê đơn thuốc', description: 'Kê đơn và chỉ định xét nghiệm', icon: Activity, action: () => onNavigate('prescription') },
        ];
      case 'receptionist':
        return [
          { title: 'Đặt lịch hẹn', description: 'Hỗ trợ bệnh nhân đặt lịch', icon: Calendar, action: () => onNavigate('appointment-booking') },
          { title: 'Thanh toán', description: 'Xử lý thanh toán và hóa đơn', icon: TrendingUp, action: () => onNavigate('payment') },
          { title: 'Danh sách bác sĩ', description: 'Quản lý thông tin bác sĩ', icon: Users, action: () => onNavigate('doctors') },
        ];
      case 'manager':
        return [
          { title: 'Báo cáo', description: 'Xem báo cáo tổng quan', icon: TrendingUp, action: () => onNavigate('reports') },
          { title: 'Quản lý bác sĩ', description: 'Quản lý thông tin bác sĩ', icon: Users, action: () => onNavigate('doctors') },
          { title: 'Lịch hẹn', description: 'Tổng quan lịch hẹn', icon: Calendar, action: () => onNavigate('appointments') },
        ];
      default:
        return [];
    }
  };

  const getStats = () => {
    switch (userRole) {
      case 'patient':
        return [
          { label: 'Lịch hẹn tháng này', value: '3', icon: Calendar },
          { label: 'Lần khám gần nhất', value: '5 ngày trước', icon: Clock },
        ];
      case 'doctor':
        return [
          { label: 'Bệnh nhân hôm nay', value: '12', icon: Users },
          { label: 'Lịch hẹn tuần này', value: '45', icon: Calendar },
          { label: 'Đơn thuốc đã kê', value: '8', icon: Activity },
        ];
      case 'receptionist':
        return [
          { label: 'Lịch hẹn hôm nay', value: '28', icon: Calendar },
          { label: 'Thanh toán chờ xử lý', value: '5', icon: TrendingUp },
        ];
      case 'manager':
        return [
          { label: 'Tổng doanh thu tháng', value: '125M VNĐ', icon: TrendingUp },
          { label: 'Bệnh nhân mới', value: '23', icon: Users },
          { label: 'Tỷ lệ hài lòng', value: '96%', icon: Activity },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">{getWelcomeMessage()}</h1>
          <p className="text-muted-foreground">
            Hôm nay là {new Date().toLocaleDateString('vi-VN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onNavigate('notifications')}>
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {getStats().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-medium">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg">Tác vụ nhanh</h2>
        <div className="space-y-3">
          {getQuickActions().map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity or Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
          <CardDescription>
            {userRole === 'patient' ? 'Lịch hẹn sắp tới' : 'Hoạt động trong hệ thống'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {userRole === 'patient' ? (
            <>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Khám tổng quát</p>
                  <p className="text-sm text-muted-foreground">BS. Nguyễn Văn A - 14:00, 25/09/2024</p>
                </div>
                <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Chờ khám</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Khám chuyên khoa tim</p>
                  <p className="text-sm text-muted-foreground">BS. Trần Thị B - 09:00, 28/09/2024</p>
                </div>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">Đã đặt</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Bệnh nhân Nguyễn Văn C</p>
                  <p className="text-sm text-muted-foreground">Hoàn thành khám - 13:30</p>
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Hoàn thành</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Bệnh nhân Lê Thị D</p>
                  <p className="text-sm text-muted-foreground">Đang chờ khám - 14:00</p>
                </div>
                <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Chờ khám</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}