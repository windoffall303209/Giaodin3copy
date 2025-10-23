import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Edit2, Save, X, User, History, Shield, LogOut } from 'lucide-react';
import { UserRole } from '../App';

interface PatientProfileScreenProps {
  userRole: UserRole;
  onLogout: () => void;
}

export function PatientProfileScreen({ userRole, onLogout }: PatientProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0123456789',
    email: 'nguyenvana@email.com',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    occupation: 'Kỹ sư phần mềm',
    idNumber: '123456789',
    insuranceNumber: 'BH123456789',
    emergencyContact: '0987654321',
    medicalHistory: 'Không có tiền sử bệnh lý đặc biệt'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  const loginHistory = [
    { date: '2024-09-22', time: '14:30', device: 'iPhone 12', location: 'TP.HCM' },
    { date: '2024-09-21', time: '09:15', device: 'Chrome Desktop', location: 'TP.HCM' },
    { date: '2024-09-20', time: '16:45', device: 'Android App', location: 'TP.HCM' },
  ];

  const profileChanges = [
    { date: '2024-09-15', field: 'Số điện thoại', oldValue: '0123456788', newValue: '0123456789' },
    { date: '2024-09-10', field: 'Địa chỉ', oldValue: '456 Đường XYZ', newValue: '123 Đường ABC' },
    { date: '2024-09-05', field: 'Email', oldValue: 'old@email.com', newValue: 'nguyenvana@email.com' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Hồ sơ cá nhân</h1>
          <p className="text-muted-foreground">Quản lý thông tin tài khoản của bạn</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Thông tin
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Lịch sử
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Bảo mật
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>
                  {isEditing ? 'Chỉnh sửa thông tin cá nhân' : 'Xem thông tin cá nhân'}
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Hủy
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    <Select 
                      value={profileData.gender} 
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Nghề nghiệp</Label>
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">Số CMND/CCCD</Label>
                    <Input
                      id="idNumber"
                      value={profileData.idNumber}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Không thể chỉnh sửa</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Số thẻ BHYT</Label>
                    <Input
                      id="insuranceNumber"
                      value={profileData.insuranceNumber}
                      onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
                  <Input
                    id="emergencyContact"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Tiền sử bệnh lý</Label>
                  <Textarea
                    id="medicalHistory"
                    value={profileData.medicalHistory}
                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử thay đổi thông tin</CardTitle>
              <CardDescription>Theo dõi các thay đổi thông tin cá nhân</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profileChanges.map((change, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{change.field}</p>
                      <p className="text-sm text-muted-foreground">
                        {change.oldValue} → {change.newValue}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{change.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đăng nhập</CardTitle>
              <CardDescription>Theo dõi hoạt động đăng nhập tài khoản</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loginHistory.map((login, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{login.device}</p>
                      <p className="text-sm text-muted-foreground">{login.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{login.date}</p>
                      <p className="text-sm text-muted-foreground">{login.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật tài khoản</CardTitle>
              <CardDescription>Quản lý mật khẩu và bảo mật</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Đổi mật khẩu
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Xác thực 2 yếu tố
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Thiết bị đã đăng nhập
              </Button>
              <Separator />
              <Button variant="destructive" onClick={onLogout} className="w-full">
                Đăng xuất khỏi tất cả thiết bị
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}