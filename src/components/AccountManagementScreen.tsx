import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldOff,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Stethoscope,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Key,
  MoreVertical
} from 'lucide-react';
import { Screen } from '../App';

interface AccountManagementScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'doctor' | 'patient' | 'receptionist';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin?: string;
  specialization?: string;
  licenseNumber?: string;
  department?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
  insuranceInfo?: string;
  workSchedule?: string[];
  permissions?: string[];
}

export function AccountManagementScreen({ onNavigate }: AccountManagementScreenProps) {
  const [currentTab, setCurrentTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Mock data
  const [doctors, setDoctors] = useState<UserAccount[]>([
    {
      id: '1',
      name: 'BS. Nguyễn Văn An',
      email: 'bs.nguyenvanan@clinic.com',
      phone: '0123456789',
      role: 'doctor',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2025-09-22 08:30',
      specialization: 'Tim mạch',
      licenseNumber: 'BV123456',
      department: 'Khoa Tim mạch',
      workSchedule: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      permissions: ['examination', 'prescription', 'schedule_management']
    },
    {
      id: '2',
      name: 'BS. Trần Thị Bình',
      email: 'bs.tranthbinh@clinic.com',
      phone: '0987654321',
      role: 'doctor',
      status: 'active',
      createdAt: '2024-02-20',
      lastLogin: '2025-09-21 16:45',
      specialization: 'Thần kinh',
      licenseNumber: 'BV789012',
      department: 'Khoa Thần kinh',
      workSchedule: ['Monday', 'Wednesday', 'Friday'],
      permissions: ['examination', 'prescription']
    },
    {
      id: '3',
      name: 'BS. Lê Minh Cường',
      email: 'bs.leminhcuong@clinic.com',
      phone: '0369258147',
      role: 'doctor',
      status: 'pending',
      createdAt: '2025-09-20',
      specialization: 'Nội khoa',
      licenseNumber: 'BV345678',
      department: 'Khoa Nội',
      permissions: ['examination']
    }
  ]);

  const [patients, setPatients] = useState<UserAccount[]>([
    {
      id: 'p1',
      name: 'Nguyễn Văn Đức',
      email: 'duc.nguyen@email.com',
      phone: '0123456789',
      role: 'patient',
      status: 'active',
      createdAt: '2024-03-10',
      lastLogin: '2025-09-21 14:20',
      dateOfBirth: '1985-05-15',
      gender: 'Nam',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      emergencyContact: '0987654321',
      insuranceInfo: 'BHYT - 123456789'
    },
    {
      id: 'p2',
      name: 'Trần Thị Hương',
      email: 'huong.tran@email.com',
      phone: '0987654321',
      role: 'patient',
      status: 'active',
      createdAt: '2024-04-05',
      lastLogin: '2025-09-20 09:15',
      dateOfBirth: '1990-08-22',
      gender: 'Nữ',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      emergencyContact: '0123456789',
      insuranceInfo: 'Bảo hiểm tư nhân'
    },
    {
      id: 'p3',
      name: 'Phạm Minh Tuấn',
      email: 'tuan.pham@email.com',
      phone: '0369258147',
      role: 'patient',
      status: 'inactive',
      createdAt: '2024-02-28',
      lastLogin: '2025-08-15 11:30',
      dateOfBirth: '1978-12-03',
      gender: 'Nam',
      address: '789 Đường DEF, Quận 7, TP.HCM'
    }
  ]);

  const [receptionists, setReceptionists] = useState<UserAccount[]>([
    {
      id: 'r1',
      name: 'Lê Thị Mai',
      email: 'mai.le@clinic.com',
      phone: '0123456789',
      role: 'receptionist',
      status: 'active',
      createdAt: '2024-01-20',
      lastLogin: '2025-09-22 07:45',
      department: 'Lễ tân tầng 1',
      workSchedule: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      permissions: ['appointment_booking', 'payment_processing', 'patient_management']
    },
    {
      id: 'r2',
      name: 'Nguyễn Thị Lan',
      email: 'lan.nguyen@clinic.com',
      phone: '0987654321',
      role: 'receptionist',
      status: 'active',
      createdAt: '2024-03-15',
      lastLogin: '2025-09-21 18:00',
      department: 'Lễ tân tầng 2',
      workSchedule: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      permissions: ['appointment_booking', 'payment_processing']
    }
  ]);

  const getCurrentData = () => {
    switch (currentTab) {
      case 'doctors': return doctors;
      case 'patients': return patients;
      case 'receptionists': return receptionists;
      default: return [];
    }
  };

  const getFilteredData = () => {
    const data = getCurrentData();
    return data.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.phone.includes(searchQuery);
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Hoạt động</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-600 border-gray-600 bg-gray-50">Không hoạt động</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="text-red-600 border-red-600 bg-red-50">Bị khóa</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600 bg-orange-50">Chờ duyệt</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      case 'suspended':
        return <ShieldOff className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'doctor':
        return <Stethoscope className="h-4 w-4 text-blue-600" />;
      case 'patient':
        return <User className="h-4 w-4 text-green-600" />;
      case 'receptionist':
        return <UserCheck className="h-4 w-4 text-purple-600" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getTabStats = (role: string) => {
    let data;
    switch (role) {
      case 'doctors': data = doctors; break;
      case 'patients': data = patients; break;
      case 'receptionists': data = receptionists; break;
      default: data = [];
    }
    
    return {
      total: data.length,
      active: data.filter(u => u.status === 'active').length,
      pending: data.filter(u => u.status === 'pending').length,
      inactive: data.filter(u => u.status === 'inactive' || u.status === 'suspended').length
    };
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    const updateData = (data: UserAccount[]) => 
      data.map(user => user.id === userId ? { ...user, status: newStatus as any } : user);

    switch (currentTab) {
      case 'doctors': setDoctors(updateData(doctors)); break;
      case 'patients': setPatients(updateData(patients)); break;
      case 'receptionists': setReceptionists(updateData(receptionists)); break;
    }
  };

  const handleDeleteUser = (userId: string) => {
    const filterData = (data: UserAccount[]) => data.filter(user => user.id !== userId);

    switch (currentTab) {
      case 'doctors': setDoctors(filterData(doctors)); break;
      case 'patients': setPatients(filterData(patients)); break;
      case 'receptionists': setReceptionists(filterData(receptionists)); break;
    }
    setShowDeleteDialog(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Quản lý tài khoản</h1>
          <p className="text-muted-foreground">Quản lý tài khoản bác sĩ, bệnh nhân và lễ tân</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm tài khoản
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm tài khoản mới</DialogTitle>
              <DialogDescription>
                Tạo tài khoản mới cho {currentTab === 'doctors' ? 'bác sĩ' : currentTab === 'patients' ? 'bệnh nhân' : 'lễ tân'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Họ tên</Label>
                <Input placeholder="Nhập họ tên đầy đủ" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input placeholder="0123456789" />
              </div>
              {currentTab === 'doctors' && (
                <>
                  <div className="space-y-2">
                    <Label>Chuyên khoa</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chuyên khoa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Tim mạch</SelectItem>
                        <SelectItem value="neurology">Thần kinh</SelectItem>
                        <SelectItem value="internal">Nội khoa</SelectItem>
                        <SelectItem value="surgery">Ngoại khoa</SelectItem>
                        <SelectItem value="pediatrics">Nhi khoa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Số giấy phép hành nghề</Label>
                    <Input placeholder="BV123456" />
                  </div>
                </>
              )}
              {currentTab === 'receptionists' && (
                <div className="space-y-2">
                  <Label>Phòng ban</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reception1">Lễ tân tầng 1</SelectItem>
                      <SelectItem value="reception2">Lễ tân tầng 2</SelectItem>
                      <SelectItem value="cashier">Thu ngân</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>
                  Tạo tài khoản
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Bác sĩ ({getTabStats('doctors').total})
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Bệnh nhân ({getTabStats('patients').total})
          </TabsTrigger>
          <TabsTrigger value="receptionists" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Lễ tân ({getTabStats('receptionists').total})
          </TabsTrigger>
        </TabsList>

        {/* Stats for current tab */}
        <div className="grid grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <div className="font-medium text-sm">{getTabStats(currentTab).total}</div>
              <div className="text-xs text-muted-foreground">Tổng cộng</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <div className="font-medium text-sm">{getTabStats(currentTab).active}</div>
              <div className="text-xs text-muted-foreground">Hoạt động</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <div className="font-medium text-sm">{getTabStats(currentTab).pending}</div>
              <div className="text-xs text-muted-foreground">Chờ duyệt</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <XCircle className="h-5 w-5 mx-auto mb-1 text-gray-500" />
              <div className="font-medium text-sm">{getTabStats(currentTab).inactive}</div>
              <div className="text-xs text-muted-foreground">Không hoạt động</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên, email hoặc số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
              <SelectItem value="suspended">Bị khóa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User Lists */}
        <TabsContent value="doctors" className="space-y-3">
          {getFilteredData().map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{doctor.name}</h3>
                        {getStatusBadge(doctor.status)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {doctor.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {doctor.phone}
                        </p>
                        <p><strong>Chuyên khoa:</strong> {doctor.specialization}</p>
                        <p><strong>Số giấy phép:</strong> {doctor.licenseNumber}</p>
                        {doctor.lastLogin && (
                          <p><strong>Đăng nhập cuối:</strong> {new Date(doctor.lastLogin).toLocaleString('vi-VN')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      setSelectedUser(doctor);
                      setShowEditDialog(true);
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Select value={doctor.status} onValueChange={(value) => handleStatusChange(doctor.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Tạm ngưng</SelectItem>
                        <SelectItem value="suspended">Khóa tài khoản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="patients" className="space-y-3">
          {getFilteredData().map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{patient.name}</h3>
                        {getStatusBadge(patient.status)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {patient.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {patient.phone}
                        </p>
                        {patient.dateOfBirth && (
                          <p><strong>Ngày sinh:</strong> {new Date(patient.dateOfBirth).toLocaleDateString('vi-VN')}</p>
                        )}
                        {patient.gender && (
                          <p><strong>Giới tính:</strong> {patient.gender}</p>
                        )}
                        {patient.insuranceInfo && (
                          <p><strong>Bảo hiểm:</strong> {patient.insuranceInfo}</p>
                        )}
                        {patient.lastLogin && (
                          <p><strong>Đăng nhập cuối:</strong> {new Date(patient.lastLogin).toLocaleString('vi-VN')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      setSelectedUser(patient);
                      setShowEditDialog(true);
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Select value={patient.status} onValueChange={(value) => handleStatusChange(patient.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Tạm ngưng</SelectItem>
                        <SelectItem value="suspended">Khóa tài khoản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="receptionists" className="space-y-3">
          {getFilteredData().map((receptionist) => (
            <Card key={receptionist.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{receptionist.name}</h3>
                        {getStatusBadge(receptionist.status)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {receptionist.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {receptionist.phone}
                        </p>
                        <p><strong>Phòng ban:</strong> {receptionist.department}</p>
                        {receptionist.workSchedule && (
                          <p><strong>Lịch làm:</strong> {receptionist.workSchedule.join(', ')}</p>
                        )}
                        {receptionist.lastLogin && (
                          <p><strong>Đăng nhập cuối:</strong> {new Date(receptionist.lastLogin).toLocaleString('vi-VN')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => {
                      setSelectedUser(receptionist);
                      setShowEditDialog(true);
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Select value={receptionist.status} onValueChange={(value) => handleStatusChange(receptionist.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Tạm ngưng</SelectItem>
                        <SelectItem value="suspended">Khóa tài khoản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      {selectedUser && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin cho {selectedUser.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Họ tên</Label>
                <Input defaultValue={selectedUser.name} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label>Số điện thoại</Label>
                <Input defaultValue={selectedUser.phone} />
              </div>
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Tạm ngưng</SelectItem>
                    <SelectItem value="suspended">Khóa tài khoản</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between pt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setShowEditDialog(false);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa tài khoản
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={() => setShowEditDialog(false)}>
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedUser && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa tài khoản của {selectedUser.name}? Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Việc xóa tài khoản sẽ xóa toàn bộ dữ liệu liên quan bao gồm lịch sử khám bệnh, đơn thuốc và các thông tin cá nhân.
              </AlertDescription>
            </Alert>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser.id)}>
                Xóa tài khoản
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}