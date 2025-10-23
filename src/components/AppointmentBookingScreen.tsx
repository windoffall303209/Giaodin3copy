import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { CalendarIcon, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserRole, Screen } from '../App';
// import { format } from 'date-fns';
// import { vi } from 'date-fns/locale';

interface AppointmentBookingScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

export function AppointmentBookingScreen({ userRole, onNavigate }: AppointmentBookingScreenProps) {
  const [step, setStep] = useState<'doctor' | 'datetime' | 'details' | 'confirm'>('doctor');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const doctors = [
    { id: '1', name: 'BS. Nguyễn Văn An', specialty: 'Tim mạch', fee: 300000 },
    { id: '2', name: 'BS. Trần Thị Bình', specialty: 'Nhi khoa', fee: 250000 },
    { id: '3', name: 'BS. Lê Minh Cường', specialty: 'Thần kinh', fee: 350000 },
    { id: '4', name: 'BS. Phạm Thị Dung', specialty: 'Da liễu', fee: 200000 },
  ];

  const appointmentTypes = [
    'Khám tổng quát',
    'Khám chuyên khoa',
    'Tái khám',
    'Khám định kỳ',
    'Khám cấp cứu'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleNext = () => {
    switch (step) {
      case 'doctor':
        if (selectedDoctor) setStep('datetime');
        break;
      case 'datetime':
        if (selectedDate && selectedTime) setStep('details');
        break;
      case 'details':
        if (appointmentType && reason) setStep('confirm');
        break;
      case 'confirm':
        // Handle appointment booking
        alert('Đặt lịch thành công!');
        onNavigate('dashboard');
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'datetime':
        setStep('doctor');
        break;
      case 'details':
        setStep('datetime');
        break;
      case 'confirm':
        setStep('details');
        break;
    }
  };

  const getSelectedDoctor = () => {
    return doctors.find(d => d.id === selectedDoctor);
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'doctor', label: 'Chọn bác sĩ' },
      { id: 'datetime', label: 'Chọn thời gian' },
      { id: 'details', label: 'Chi tiết' },
      { id: 'confirm', label: 'Xác nhận' }
    ];

    const currentIndex = steps.findIndex(s => s.id === step);

    return (
      <div className="flex items-center justify-between mb-6">
        {steps.map((stepItem, index) => (
          <div key={stepItem.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              index <= currentIndex 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                index < currentIndex ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDoctorSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Chọn bác sĩ</h2>
      <div className="space-y-3">
        {doctors.map(doctor => (
          <Card 
            key={doctor.id} 
            className={`cursor-pointer transition-colors ${
              selectedDoctor === doctor.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedDoctor(doctor.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">
                    {doctor.fee.toLocaleString('vi-VN')} VNĐ
                  </p>
                  <Badge variant="secondary">Có lịch trống</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDateTimeSelection = () => {
    const doctor = getSelectedDoctor();
    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Chọn ngày và giờ khám</h2>
        
        {doctor && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4" />
                <span className="font-medium">{doctor.name}</span>
                <Badge variant="secondary">{doctor.specialty}</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          <div>
            <Label>Chọn ngày khám</Label>
            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? selectedDate.toLocaleDateString('vi-VN') : 'Chọn ngày'}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-auto">
                <DialogHeader>
                  <DialogTitle>Chọn ngày khám</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {selectedDate && (
            <div>
              <Label>Chọn giờ khám</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDetails = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Chi tiết lịch hẹn</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="appointmentType">Loại khám</Label>
          <Select value={appointmentType} onValueChange={setAppointmentType}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại khám" />
            </SelectTrigger>
            <SelectContent>
              {appointmentTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Lý do khám</Label>
          <Textarea
            id="reason"
            placeholder="Mô tả triệu chứng hoặc lý do khám..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú thêm (tùy chọn)</Label>
          <Textarea
            id="notes"
            placeholder="Ghi chú thêm cho bác sĩ..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
          />
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const doctor = getSelectedDoctor();
    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Xác nhận lịch hẹn</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Thông tin lịch hẹn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bác sĩ:</span>
              <span className="font-medium">{doctor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chuyên khoa:</span>
              <span>{doctor?.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ngày khám:</span>
              <span>{selectedDate && selectedDate.toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Giờ khám:</span>
              <span>{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loại khám:</span>
              <span>{appointmentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lý do khám:</span>
              <span className="text-right">{reason}</span>
            </div>
            {notes && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ghi chú:</span>
                <span className="text-right">{notes}</span>
              </div>
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Phí khám:</span>
                <span className="text-primary">
                  {doctor?.fee.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Lưu ý:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Vui lòng có mặt trước 15 phút so với giờ hẹn</li>
            <li>• Mang theo giấy tờ tùy thân và thẻ bảo hiểm y tế (nếu có)</li>
            <li>• Có thể hủy hoặc đổi lịch trước 2 giờ</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Đặt lịch khám bệnh</h1>
        <p className="text-muted-foreground">Đặt lịch hẹn với bác sĩ phù hợp</p>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      {step === 'doctor' && renderDoctorSelection()}
      {step === 'datetime' && renderDateTimeSelection()}
      {step === 'details' && renderDetails()}
      {step === 'confirm' && renderConfirmation()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        {step !== 'doctor' && (
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        )}
        <div className="flex-1" />
        <Button 
          onClick={handleNext}
          disabled={
            (step === 'doctor' && !selectedDoctor) ||
            (step === 'datetime' && (!selectedDate || !selectedTime)) ||
            (step === 'details' && (!appointmentType || !reason))
          }
        >
          {step === 'confirm' ? 'Xác nhận đặt lịch' : 'Tiếp tục'}
          {step !== 'confirm' && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}