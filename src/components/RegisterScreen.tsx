import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { UserRole } from '../App';

interface RegisterScreenProps {
  onRegister: (role: UserRole) => void;
  onNavigateToLogin: () => void;
}

export function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [step, setStep] = useState<'info' | 'verification'>('info');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as UserRole,
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    // Simulate registration validation
    if (formData.fullName && formData.phone && formData.email && formData.password && formData.agreeTerms) {
      setStep('verification');
    }
  };

  const handleVerification = () => {
    // Simulate OTP verification
    if (verificationCode.length === 6) {
      onRegister(formData.role);
    }
  };

  if (step === 'verification') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Xác thực OTP</CardTitle>
            <CardDescription>
              Nhập mã OTP đã được gửi đến {formData.phone}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Mã OTP (6 số)</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>

            <Button onClick={handleVerification} className="w-full">
              Xác thực
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Không nhận được mã?
              </p>
              <Button variant="ghost" size="sm">
                Gửi lại mã OTP
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => setStep('info')}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
          <CardDescription>
            Tạo tài khoản mới để sử dụng hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0123456789"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Bệnh nhân</SelectItem>
                <SelectItem value="doctor">Bác sĩ</SelectItem>
                <SelectItem value="receptionist">Lễ tân</SelectItem>
                <SelectItem value="manager">Quản lý</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleInputChange('agreeTerms', !!checked)}
            />
            <Label htmlFor="terms" className="text-sm">
              Tôi đồng ý với{' '}
              <button className="text-primary hover:underline">
                điều khoản sử dụng
              </button>{' '}
              và{' '}
              <button className="text-primary hover:underline">
                chính sách bảo mật
              </button>
            </Label>
          </div>

          <Button onClick={handleRegister} className="w-full">
            Đăng ký
          </Button>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Đã có tài khoản?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-primary hover:underline"
              >
                Đăng nhập ngay
              </button>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}