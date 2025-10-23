import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Edit, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Timer,
  BarChart3,
  TrendingUp,
  MapPin,
  Phone,
  FileText,
  Bell,
  Filter,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Copy,
  Settings,
  Calendar as CalendarDays,
  Briefcase,
  Coffee,
  Activity,
  DollarSign,
  Target
} from 'lucide-react';
import { Screen } from '../App';

interface DoctorScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface ScheduleSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'break' | 'pending_approval' | 'emergency' | 'overtime';
  patientName?: string;
  appointmentType?: string;
  notes?: string;
  patientPhone?: string;
  estimatedDuration?: number;
  priority?: 'normal' | 'urgent' | 'emergency';
  room?: string;
  revenue?: number;
}

interface ScheduleRequest {
  id: string;
  type: 'add' | 'modify' | 'cancel' | 'swap';
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  originalDate?: string;
  swapWith?: string;
}

interface ScheduleStats {
  totalHours: number;
  totalPatients: number;
  totalRevenue: number;
  availableSlots: number;
  bookedSlots: number;
  utilizationRate: number;
  avgSessionDuration: number;
}

export function DoctorScheduleScreen({ onNavigate }: DoctorScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<'calendar' | 'week' | 'month'>('calendar');
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([
    {
      id: '1',
      date: '2025-09-22',
      startTime: '08:00',
      endTime: '09:00',
      status: 'booked',
      patientName: 'Nguyễn Văn An',
      appointmentType: 'Khám tổng quát',
      patientPhone: '0123456789',
      estimatedDuration: 60,
      priority: 'normal',
      room: 'P101',
      revenue: 500000
    },
    {
      id: '2',
      date: '2025-09-22',
      startTime: '09:00',
      endTime: '10:00',
      status: 'booked',
      patientName: 'Trần Thị Bình',
      appointmentType: 'Tái khám tim mạch',
      patientPhone: '0987654321',
      priority: 'urgent',
      room: 'P102',
      revenue: 750000
    },
    {
      id: '3',
      date: '2025-09-22',
      startTime: '10:00',
      endTime: '10:30',
      status: 'break',
      notes: 'Nghỉ giải lao'
    },
    {
      id: '4',
      date: '2025-09-22',
      startTime: '10:30',
      endTime: '11:30',
      status: 'available'
    },
    {
      id: '5',
      date: '2025-09-22',
      startTime: '14:00',
      endTime: '15:00',
      status: 'booked',
      patientName: 'Lê Minh Cường',
      appointmentType: 'Khám chuyên khoa thần kinh',
      patientPhone: '0369258147',
      priority: 'emergency',
      room: 'P103',
      revenue: 1000000
    },
    {
      id: '6',
      date: '2025-09-22',
      startTime: '15:00',
      endTime: '16:00',
      status: 'pending_approval',
      notes: 'Đề xuất ca tăng ca'
    },
    {
      id: '7',
      date: '2025-09-22',
      startTime: '16:00',
      endTime: '17:00',
      status: 'overtime',
      patientName: 'Phạm Thị Dung',
      appointmentType: 'Khám cấp cứu',
      room: 'Emergency',
      revenue: 2000000
    }
  ]);

  const [scheduleRequests, setScheduleRequests] = useState<ScheduleRequest[]>([
    {
      id: '1',
      type: 'add',
      date: '2025-09-25',
      startTime: '18:00',
      endTime: '20:00',
      reason: 'Thêm ca tăng ca cuối tuần để phục vụ bệnh nhân',
      status: 'pending',
      requestDate: '2025-09-20'
    },
    {
      id: '2',
      type: 'modify',
      date: '2025-09-24',
      startTime: '09:00',
      endTime: '12:00',
      reason: 'Điều chỉnh giờ làm do có hội nghị y khoa',
      status: 'approved',
      requestDate: '2025-09-19'
    },
    {
      id: '3',
      type: 'swap',
      date: '2025-09-26',
      startTime: '14:00',
      endTime: '17:00',
      reason: 'Đổi ca với BS Nguyễn Văn X',
      status: 'pending',
      requestDate: '2025-09-21',
      swapWith: 'BS Nguyễn Văn X'
    }
  ]);

  const selectedDateString = selectedDate.toISOString().split('T')[0];
  const todaySlots = scheduleSlots.filter(slot => slot.date === selectedDateString);

  const calculateStats = (): ScheduleStats => {
    const bookedSlots = scheduleSlots.filter(s => s.status === 'booked');
    const totalSlots = scheduleSlots.filter(s => s.status !== 'break');
    
    return {
      totalHours: scheduleSlots.reduce((acc, slot) => {
        const start = new Date(`1970-01-01T${slot.startTime}`);
        const end = new Date(`1970-01-01T${slot.endTime}`);
        return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0),
      totalPatients: bookedSlots.length,
      totalRevenue: bookedSlots.reduce((acc, slot) => acc + (slot.revenue || 0), 0),
      availableSlots: scheduleSlots.filter(s => s.status === 'available').length,
      bookedSlots: bookedSlots.length,
      utilizationRate: totalSlots.length > 0 ? (bookedSlots.length / totalSlots.length) * 100 : 0,
      avgSessionDuration: bookedSlots.length > 0 ? 
        bookedSlots.reduce((acc, slot) => acc + (slot.estimatedDuration || 60), 0) / bookedSlots.length : 0
    };
  };

  const stats = calculateStats();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Trống</Badge>;
      case 'booked':
        return <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">Đã đặt</Badge>;
      case 'break':
        return <Badge variant="outline" className="text-gray-600 border-gray-600 bg-gray-50">Nghỉ</Badge>;
      case 'pending_approval':
        return <Badge variant="outline" className="text-orange-600 border-orange-600 bg-orange-50">Chờ duyệt</Badge>;
      case 'emergency':
        return <Badge variant="destructive" className="bg-red-100 text-red-700">Cấp cứu</Badge>;
      case 'overtime':
        return <Badge variant="outline" className="text-purple-600 border-purple-600 bg-purple-50">Tăng ca</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    switch (priority) {
      case 'emergency':
        return <Badge variant="destructive" className="text-xs">Cấp cứu</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">Khẩn cấp</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'booked':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'break':
        return <Coffee className="h-4 w-4 text-gray-600" />;
      case 'pending_approval':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'overtime':
        return <Timer className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };

  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ duyệt</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Từ chối</Badge>;
      default:
        return null;
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'add': return 'Thêm ca';
      case 'modify': return 'Sửa đổi';
      case 'cancel': return 'Hủy ca';
      case 'swap': return 'Đổi ca';
      default: return type;
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'add': return <Plus className="h-4 w-4" />;
      case 'modify': return <Edit className="h-4 w-4" />;
      case 'cancel': return <XCircle className="h-4 w-4" />;
      case 'swap': return <Copy className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const hasConflict = () => {
    const conflicts = scheduleSlots.filter(slot => 
      slot.date === selectedDateString && 
      slot.status === 'pending_approval'
    );
    return conflicts.length > 0;
  };

  const filteredSlots = todaySlots.filter(slot => {
    const matchesFilter = filterStatus === 'all' || slot.status === filterStatus;
    const matchesSearch = !searchQuery || 
      (slot.patientName && slot.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (slot.appointmentType && slot.appointmentType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (slot.notes && slot.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const slot = todaySlots.find(s => s.startTime === timeString);
        slots.push({
          time: timeString,
          slot: slot || null
        });
      }
    }
    return slots;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header with Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1>Lịch làm việc</h1>
            <p className="text-muted-foreground">Quản lý lịch trình và ca làm việc</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Thống kê
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Thống kê lịch làm việc</DialogTitle>
                  <DialogDescription>Tổng quan hiệu suất làm việc hôm nay</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-3 text-center">
                        <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                        <div className="font-medium">{stats.totalPatients}</div>
                        <div className="text-xs text-muted-foreground">Bệnh nhân</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
                        <div className="font-medium">{stats.totalHours.toFixed(1)}h</div>
                        <div className="text-xs text-muted-foreground">Tổng giờ</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <DollarSign className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                        <div className="font-medium text-xs">{formatCurrency(stats.totalRevenue).slice(0, -2)}K</div>
                        <div className="text-xs text-muted-foreground">Doanh thu</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <Target className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                        <div className="font-medium">{stats.utilizationRate.toFixed(0)}%</div>
                        <div className="text-xs text-muted-foreground">Hiệu suất</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tỷ lệ sử dụng lịch</span>
                      <span>{stats.utilizationRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={stats.utilizationRate} className="h-2" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showAddSlotDialog} onOpenChange={setShowAddSlotDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm ca
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Đề xuất thêm ca làm việc</DialogTitle>
                  <DialogDescription>
                    Đề xuất sẽ được gửi đến quản lý để phê duyệt
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ngày làm việc</Label>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate.toLocaleDateString('vi-VN')}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Giờ bắt đầu</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Giờ kết thúc</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Loại ca</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại ca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Ca thường</SelectItem>
                        <SelectItem value="overtime">Tăng ca</SelectItem>
                        <SelectItem value="emergency">Cấp cứu</SelectItem>
                        <SelectItem value="consultation">Tư vấn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Lý do</Label>
                    <Textarea placeholder="Nhập lý do đề xuất thêm ca..." rows={3} />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setShowAddSlotDialog(false)}>
                      Hủy
                    </Button>
                    <Button onClick={() => setShowAddSlotDialog(false)}>
                      Gửi đề xuất
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <div className="font-medium text-sm">{stats.availableSlots}</div>
              <div className="text-xs text-muted-foreground">Slot trống</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <div className="font-medium text-sm">{stats.bookedSlots}</div>
              <div className="text-xs text-muted-foreground">Đã đặt</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-500" />
              <div className="font-medium text-sm">{stats.utilizationRate.toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Hiệu suất</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Timer className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <div className="font-medium text-sm">{stats.avgSessionDuration.toFixed(0)}m</div>
              <div className="text-xs text-muted-foreground">TB/Khám</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conflict Warning */}
      {hasConflict() && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <span className="font-medium">Cảnh báo xung đột lịch!</span> Có ca làm việc đang chờ phê duyệt có thể xung đột với lịch hiện tại.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Ngày</TabsTrigger>
          <TabsTrigger value="week">Tuần</TabsTrigger>
          <TabsTrigger value="month">Tháng</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Calendar */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Chọn ngày</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Schedule Timeline */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      Lịch làm việc
                    </CardTitle>
                    <CardDescription>
                      {selectedDate.toLocaleDateString('vi-VN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm bệnh nhân, loại khám..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="available">Trống</SelectItem>
                      <SelectItem value="booked">Đã đặt</SelectItem>
                      <SelectItem value="break">Nghỉ</SelectItem>
                      <SelectItem value="emergency">Cấp cứu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeline */}
                {filteredSlots.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {todaySlots.length === 0 ? 'Không có ca làm việc nào' : 'Không tìm thấy kết quả phù hợp'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredSlots.map(slot => (
                      <Card key={slot.id} className="hover:shadow-sm transition-shadow cursor-pointer"
                            onClick={() => setSelectedSlot(slot)}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              {getStatusIcon(slot.status)}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">
                                    {slot.startTime} - {slot.endTime}
                                  </span>
                                  {getStatusBadge(slot.status)}
                                  {getPriorityBadge(slot.priority)}
                                </div>
                                
                                {slot.patientName && (
                                  <div className="space-y-1">
                                    <p className="font-medium text-sm">{slot.patientName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {slot.appointmentType}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      {slot.patientPhone && (
                                        <span className="flex items-center gap-1">
                                          <Phone className="h-3 w-3" />
                                          {slot.patientPhone}
                                        </span>
                                      )}
                                      {slot.room && (
                                        <span className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          {slot.room}
                                        </span>
                                      )}
                                      {slot.revenue && (
                                        <span className="flex items-center gap-1">
                                          <DollarSign className="h-3 w-3" />
                                          {formatCurrency(slot.revenue)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {slot.notes && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {slot.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {slot.estimatedDuration && (
                                <span className="text-xs text-muted-foreground">
                                  {slot.estimatedDuration}p
                                </span>
                              )}
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch tuần</CardTitle>
              <CardDescription>Xem lịch làm việc theo tuần</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Chế độ xem tuần đang được phát triển</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch tháng</CardTitle>
              <CardDescription>Xem tổng quan lịch làm việc cả tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Chế độ xem tháng đang được phát triển</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Đề xuất thay đổi lịch</CardTitle>
              <CardDescription>Theo dõi các đề xuất và yêu cầu thay đổi lịch làm việc</CardDescription>
            </div>
            <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Đề xuất mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Đề xuất thay đổi lịch</DialogTitle>
                  <DialogDescription>
                    Tạo đề xuất thay đổi lịch làm việc
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Loại đề xuất</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Thêm ca làm việc</SelectItem>
                        <SelectItem value="modify">Sửa đổi ca làm việc</SelectItem>
                        <SelectItem value="cancel">Hủy ca làm việc</SelectItem>
                        <SelectItem value="swap">Đổi ca với đồng nghiệp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Giờ bắt đầu</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>Giờ kết thúc</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lý do</Label>
                    <Textarea placeholder="Nhập lý do đề xuất..." rows={3} />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                      Hủy
                    </Button>
                    <Button onClick={() => setShowRequestDialog(false)}>
                      Gửi đề xuất
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduleRequests.map(request => (
              <Card key={request.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getRequestTypeIcon(request.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{getRequestTypeLabel(request.type)}</span>
                          {getRequestStatusBadge(request.status)}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {request.date} • {request.startTime} - {request.endTime}
                          </p>
                          {request.swapWith && (
                            <p className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Đổi ca với: {request.swapWith}
                            </p>
                          )}
                          <p className="mt-2">{request.reason}</p>
                          <p className="text-xs">
                            Đề xuất ngày: {new Date(request.requestDate).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Slot Detail Dialog */}
      {selectedSlot && (
        <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chi tiết ca làm việc</DialogTitle>
              <DialogDescription>
                {selectedSlot.startTime} - {selectedSlot.endTime}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedSlot.status)}
                {getStatusBadge(selectedSlot.status)}
                {getPriorityBadge(selectedSlot.priority)}
              </div>
              
              {selectedSlot.patientName && (
                <div className="space-y-3">
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Thông tin bệnh nhân</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Tên:</span> {selectedSlot.patientName}</p>
                      <p><span className="text-muted-foreground">Loại khám:</span> {selectedSlot.appointmentType}</p>
                      {selectedSlot.patientPhone && (
                        <p><span className="text-muted-foreground">SĐT:</span> {selectedSlot.patientPhone}</p>
                      )}
                      {selectedSlot.room && (
                        <p><span className="text-muted-foreground">Phòng:</span> {selectedSlot.room}</p>
                      )}
                      {selectedSlot.revenue && (
                        <p><span className="text-muted-foreground">Doanh thu:</span> {formatCurrency(selectedSlot.revenue)}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedSlot.notes && (
                <div className="space-y-2">
                  <Separator />
                  <div>
                    <h4 className="font-medium">Ghi chú</h4>
                    <p className="text-sm text-muted-foreground">{selectedSlot.notes}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                  Đóng
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}