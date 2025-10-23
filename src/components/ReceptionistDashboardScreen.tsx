import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Calendar, 
  Clock, 
  Phone,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Timer,
  CreditCard,
  Plus
} from 'lucide-react';
import { Screen } from '../App';

interface ReceptionistDashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface PatientAppointment {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  appointmentTime: string;
  doctorName: string;
  specialty: string;
  appointmentType: string;
  reason: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'missed' | 'cancelled';
  checkInTime?: string;
  estimatedWaitTime?: number;
  paymentStatus: 'pending' | 'paid' | 'partial';
  insuranceNumber?: string;
  notes?: string;
}

export function ReceptionistDashboardScreen({ onNavigate }: ReceptionistDashboardScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDoctor, setFilterDoctor] = useState<string>('all');

  const todayAppointments: PatientAppointment[] = [
    {
      id: '1',
      patientName: 'Nguyễn Văn A',
      age: 45,
      gender: 'Nam',
      phone: '0123456789',
      appointmentTime: '08:00',
      doctorName: 'BS. Trần Thị B',
      specialty: 'Tim mạch',
      appointmentType: 'Khám tổng quát',
      reason: 'Kiểm tra huyết áp, đau ngực',
      status: 'completed',
      checkInTime: '07:55',
      paymentStatus: 'paid',
      insuranceNumber: 'BH123456789',
      notes: 'Bệnh nhân có tiền sử cao huyết áp'
    },
    {
      id: '2',
      patientName: 'Lê Thị C',
      age: 32,
      gender: 'Nữ',
      phone: '0987654321',
      appointmentTime: '08:30',
      doctorName: 'BS. Trần Thị B',
      specialty: 'Tim mạch',
      appointmentType: 'Tái khám',
      reason: 'Theo dõi điều trị tăng huyết áp',
      status: 'in_progress',
      checkInTime: '08:25',
      estimatedWaitTime: 15,
      paymentStatus: 'pending',
      insuranceNumber: 'BH987654321'
    },
    {
      id: '3',
      patientName: 'Phạm Minh D',
      age: 28,
      gender: 'Nam',
      phone: '0369258147',
      appointmentTime: '09:00',
      doctorName: 'BS. Nguyễn Văn E',
      specialty: 'Nhi khoa',
      appointmentType: 'Khám định kỳ',
      reason: 'Khám sức khỏe định kỳ cho con',
      status: 'waiting',
      checkInTime: '08:55',
      estimatedWaitTime: 25,
      paymentStatus: 'pending'
    },
    {
      id: '4',
      patientName: 'Hoàng Thị F',
      age: 55,
      gender: 'Nữ',
      phone: '0741852963',
      appointmentTime: '09:30',
      doctorName: 'BS. Lê Minh G',
      specialty: 'Da liễu',
      appointmentType: 'Khám chuyên khoa',
      reason: 'Viêm da, ngứa kéo dài',
      status: 'waiting',
      paymentStatus: 'pending',
      notes: 'Bệnh nhân dị ứng Penicillin'
    },
    {
      id: '5',
      patientName: 'Trần Văn H',
      age: 67,
      gender: 'Nam',
      phone: '0852741963',
      appointmentTime: '10:00',
      doctorName: 'BS. Trần Thị B',
      specialty: 'Tim mạch',
      appointmentType: 'Khám cấp cứu',
      reason: 'Đau ngực cấp, khó thở',
      status: 'waiting',
      paymentStatus: 'pending',
      notes: 'Trường hợp cấp cứu - ưu tiên'
    },
    {
      id: '6',
      patientName: 'Nguyễn Thị I',
      age: 38,
      gender: 'Nữ',
      phone: '0963852741',
      appointmentTime: '10:30',
      doctorName: 'BS. Nguyễn Văn E',
      specialty: 'Nhi khoa',
      appointmentType: 'Khám tổng quát',
      reason: 'Con bị sốt, ho kéo dài',
      status: 'missed',
      paymentStatus: 'pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ khám</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Đang khám</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Hoàn thành</Badge>;
      case 'missed':
        return <Badge variant="outline" className="text-red-600 border-red-600">Vắng mặt</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-gray-600 border-gray-600">Đã hủy</Badge>;
      default:
        return null;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="text-green-600 border-green-600">Đã thanh toán</Badge>;
      case 'partial':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Thanh toán 1 phần</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-red-600 border-red-600">Chưa thanh toán</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Timer className="h-4 w-4 text-orange-600" />;
      case 'in_progress':
        return <Stethoscope className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'missed':
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const filteredAppointments = todayAppointments.filter(appointment => {
    const statusMatch = filterStatus === 'all' || appointment.status === filterStatus;
    const doctorMatch = filterDoctor === 'all' || appointment.doctorName === filterDoctor;
    return statusMatch && doctorMatch;
  });

  const stats = {
    total: todayAppointments.length,
    waiting: todayAppointments.filter(a => a.status === 'waiting').length,
    inProgress: todayAppointments.filter(a => a.status === 'in_progress').length,
    completed: todayAppointments.filter(a => a.status === 'completed').length,
    missed: todayAppointments.filter(a => a.status === 'missed').length
  };

  const handleCheckIn = (appointmentId: string) => {
    // Handle check-in logic
    alert('Bệnh nhân đã được check-in');
  };

  const handleCallNext = (appointmentId: string) => {
    // Handle calling next patient
    alert('Đã gọi bệnh nhân tiếp theo');
  };

  const renderAppointmentDetail = (appointment: PatientAppointment) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Thông tin chi tiết</DialogTitle>
          <DialogDescription>
            {appointment.patientName} - {appointment.appointmentTime}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient">Bệnh nhân</TabsTrigger>
            <TabsTrigger value="appointment">Lịch hẹn</TabsTrigger>
            <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patient" className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Họ tên</label>
                  <p className="font-medium">{appointment.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tuổi</label>
                  <p>{appointment.age} tuổi</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Giới tính</label>
                  <p>{appointment.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <p>{appointment.phone}</p>
                  </div>
                </div>
              </div>
              {appointment.insuranceNumber && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Số BHYT</label>
                  <p>{appointment.insuranceNumber}</p>
                </div>
              )}
              {appointment.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ghi chú</label>
                  <p className="text-sm bg-yellow-50 p-2 rounded">{appointment.notes}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="appointment" className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Thời gian hẹn</label>
                  <p className="font-medium">{appointment.appointmentTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Trạng thái</label>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(appointment.status)}
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Bác sĩ</label>
                <p>{appointment.doctorName} - {appointment.specialty}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Loại khám</label>
                <p>{appointment.appointmentType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Lý do khám</label>
                <p>{appointment.reason}</p>
              </div>
              {appointment.checkInTime && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Giờ check-in</label>
                  <p>{appointment.checkInTime}</p>
                </div>
              )}
              {appointment.estimatedWaitTime && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Thời gian chờ ước tính</label>
                  <p>{appointment.estimatedWaitTime} phút</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Trạng thái thanh toán</label>
                <div className="flex items-center gap-1 mt-1">
                  <CreditCard className="h-4 w-4" />
                  {getPaymentStatusBadge(appointment.paymentStatus)}
                </div>
              </div>
              {appointment.paymentStatus === 'pending' && (
                <Button size="sm" onClick={() => onNavigate('payment')}>
                  Xử lý thanh toán
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl">Danh sách bệnh nhân hôm nay</h1>
          <p className="text-muted-foreground">
            Quản lý lịch khám và check-in bệnh nhân - {new Date().toLocaleDateString('vi-VN')}
          </p>
        </div>
        <Button onClick={() => onNavigate('appointment-booking')}>
          <Plus className="h-4 w-4 mr-2" />
          Đặt lịch
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <User className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-medium">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Tổng lịch hẹn</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Timer className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-medium">{stats.waiting}</div>
            <div className="text-sm text-muted-foreground">Đang chờ</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-medium">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Hoàn thành</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng thái</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="waiting">Chờ khám</SelectItem>
                  <SelectItem value="in_progress">Đang khám</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="missed">Vắng mặt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bác sĩ</label>
              <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả bác sĩ</SelectItem>
                  <SelectItem value="BS. Trần Thị B">BS. Trần Thị B</SelectItem>
                  <SelectItem value="BS. Nguyễn Văn E">BS. Nguyễn Văn E</SelectItem>
                  <SelectItem value="BS. Lê Minh G">BS. Lê Minh G</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Danh sách lịch hẹn ({filteredAppointments.length})</h2>
        
        <div className="space-y-3">
          {filteredAppointments.map(appointment => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(appointment.status)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <span className="text-sm text-muted-foreground">
                          {appointment.age} tuổi, {appointment.gender}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.appointmentTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>
                        <p><strong>Bác sĩ:</strong> {appointment.doctorName} - {appointment.specialty}</p>
                        <p><strong>Lý do:</strong> {appointment.reason}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(appointment.status)}
                    {getPaymentStatusBadge(appointment.paymentStatus)}
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mb-3 p-2 bg-yellow-50 rounded text-sm">
                    <strong>Ghi chú:</strong> {appointment.notes}
                  </div>
                )}

                {appointment.estimatedWaitTime && (
                  <div className="mb-3 text-sm text-orange-600">
                    <strong>Thời gian chờ ước tính:</strong> {appointment.estimatedWaitTime} phút
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {appointment.appointmentType}
                    {appointment.checkInTime && ` • Check-in: ${appointment.checkInTime}`}
                  </div>
                  
                  <div className="flex gap-2">
                    {appointment.status === 'waiting' && !appointment.checkInTime && (
                      <Button size="sm" variant="outline" onClick={() => handleCheckIn(appointment.id)}>
                        Check-in
                      </Button>
                    )}
                    {appointment.status === 'waiting' && appointment.checkInTime && (
                      <Button size="sm" onClick={() => handleCallNext(appointment.id)}>
                        Gọi khám
                      </Button>
                    )}
                    {appointment.paymentStatus === 'pending' && (
                      <Button size="sm" variant="outline" onClick={() => onNavigate('payment')}>
                        Thanh toán
                      </Button>
                    )}
                    {renderAppointmentDetail(appointment)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Không có lịch hẹn nào phù hợp</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}