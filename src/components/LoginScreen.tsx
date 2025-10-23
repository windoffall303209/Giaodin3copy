import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, Phone, Mail, Facebook } from 'lucide-react';
import { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }: LoginScreenProps) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('patient');

  const handleLogin = () => {
    // Simulate login validation
    if (identifier && password) {
      onLogin(role);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Đăng nhập vào hệ thống quản lý phòng khám
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
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

          {/* Login Method Toggle */}
          <div className="flex rounded-md border p-1">
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded text-sm transition-colors ${
                loginMethod === 'phone' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              <Phone size={16} />
              Số điện thoại
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded text-sm transition-colors ${
                loginMethod === 'email' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              <Mail size={16} />
              Email
            </button>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">
                {loginMethod === 'phone' ? 'Số điện thoại' : 'Email'}
              </Label>
              <Input
                id="identifier"
                type={loginMethod === 'phone' ? 'tel' : 'email'}
                placeholder={loginMethod === 'phone' ? '0123456789' : 'email@example.com'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button onClick={handleLogin} className="w-full">
              Đăng nhập
            </Button>

            <div className="text-center">
              <button
                onClick={onNavigateToForgotPassword}
                className="text-sm text-primary hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          <div className="relative">
            <Separator className="my-4" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
              Hoặc
            </span>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Đăng nhập với Google
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Đăng nhập với Facebook
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Chưa có tài khoản?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-primary hover:underline"
              >
                Đăng ký ngay
              </button>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}