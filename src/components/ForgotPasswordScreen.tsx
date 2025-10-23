import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onNavigateToLogin: () => void;
}

export function ForgotPasswordScreen({ onNavigateToLogin }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOTP = () => {
    if (email) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setStep('reset');
    }
  };

  const handleResetPassword = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      onNavigateToLogin();
    }
  };

  const renderEmailStep = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email hoặc số điện thoại</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com hoặc 0123456789"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button onClick={handleSendOTP} className="w-full">
        Gửi mã xác thực
      </Button>

      <Button
        variant="ghost"
        onClick={onNavigateToLogin}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại đăng nhập
      </Button>
    </CardContent>
  );

  const renderOTPStep = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">Mã xác thực (6 số)</Label>
        <Input
          id="otp"
          type="text"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="text-center text-2xl tracking-widest"
        />
        <p className="text-sm text-muted-foreground text-center">
          Mã xác thực đã được gửi đến {email}
        </p>
      </div>

      <Button onClick={handleVerifyOTP} className="w-full">
        Xác thực
      </Button>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Không nhận được mã?
        </p>
        <Button variant="ghost" size="sm">
          Gửi lại mã
        </Button>
      </div>

      <Button
        variant="ghost"
        onClick={() => setStep('email')}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Button>
    </CardContent>
  );

  const renderResetStep = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="newPassword">Mật khẩu mới</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

      <Button onClick={handleResetPassword} className="w-full">
        Đổi mật khẩu
      </Button>

      <Button
        variant="ghost"
        onClick={() => setStep('otp')}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Button>
    </CardContent>
  );

  const getTitle = () => {
    switch (step) {
      case 'email': return 'Quên mật khẩu';
      case 'otp': return 'Xác thực OTP';
      case 'reset': return 'Đổi mật khẩu';
      default: return 'Quên mật khẩu';
    }
  };

  const getDescription = () => {
    switch (step) {
      case 'email': return 'Nhập email hoặc số điện thoại để nhận mã xác thực';
      case 'otp': return 'Nhập mã xác thực để tiếp tục';
      case 'reset': return 'Tạo mật khẩu mới cho tài khoản của bạn';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        
        {step === 'email' && renderEmailStep()}
        {step === 'otp' && renderOTPStep()}
        {step === 'reset' && renderResetStep()}
      </Card>
    </div>
  );
}