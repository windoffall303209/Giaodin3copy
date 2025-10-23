import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Filter, Star, Calendar, Clock } from 'lucide-react';
import { UserRole, Screen } from '../App';

interface DoctorListScreenProps {
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  experience: number;
  rating: number;
  avatar: string;
  schedule: string[];
  description: string;
  consultationFee: number;
  isAvailable: boolean;
}

export function DoctorListScreen({ userRole, onNavigate }: DoctorListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      degree: 'Tiến sĩ Y học',
      experience: 15,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      schedule: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
      description: 'Chuyên về điều trị các bệnh tim mạch, tăng huyết áp, rối loạn nhịp tim',
      consultationFee: 300000,
      isAvailable: true
    },
    {
      id: '2',
      name: 'BS. Trần Thị Bình',
      specialty: 'Nhi khoa',
      degree: 'Thạc sĩ Y học',
      experience: 12,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      schedule: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
      description: 'Chuyên khám và điều trị các bệnh lý ở trẻ em từ sơ sinh đến 16 tuổi',
      consultationFee: 250000,
      isAvailable: true
    },
    {
      id: '3',
      name: 'BS. Lê Minh Cường',
      specialty: 'Thần kinh',
      degree: 'Tiến sĩ Y học',
      experience: 20,
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face',
      schedule: ['Thứ 2', 'Thứ 5', 'Chủ nhật'],
      description: 'Chuyên điều trị các bệnh lý thần kinh, đau đầu, tai biến mạch máu não',
      consultationFee: 350000,
      isAvailable: false
    },
    {
      id: '4',
      name: 'BS. Phạm Thị Dung',
      specialty: 'Da liễu',
      degree: 'Thạc sĩ Y học',
      experience: 8,
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1594824804732-5f670d7ca4b8?w=100&h=100&fit=crop&crop=face',
      schedule: ['Thứ 3', 'Thứ 6', 'Thứ 7'],
      description: 'Chuyên điều trị các bệnh lý về da, mụn trứng cá, viêm da dị ứng',
      consultationFee: 200000,
      isAvailable: true
    }
  ];

  const specialties = ['all', 'Tim mạch', 'Nhi khoa', 'Thần kinh', 'Da liễu', 'Tiêu hóa', 'Hô hấp'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesTime = selectedTime === 'all' || 
                       (selectedTime === 'available' && doctor.isAvailable) ||
                       (selectedTime === 'unavailable' && !doctor.isAvailable);
    
    return matchesSearch && matchesSpecialty && matchesTime;
  });

  const handleBookAppointment = (doctorId: string) => {
    // Navigate to appointment booking with selected doctor
    onNavigate('appointment-booking');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Danh sách bác sĩ</h1>
        <p className="text-muted-foreground">Tìm kiếm và đặt lịch khám với bác sĩ</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Tìm kiếm bác sĩ hoặc chuyên khoa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
          {(selectedSpecialty !== 'all' || selectedTime !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedSpecialty('all');
                setSelectedTime('all');
              }}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chuyên khoa</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {specialties.slice(1).map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng thái</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="available">Có lịch trống</SelectItem>
                  <SelectItem value="unavailable">Không có lịch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Doctor List */}
      <div className="space-y-4">
        {filteredDoctors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Không tìm thấy bác sĩ phù hợp</p>
            </CardContent>
          </Card>
        ) : (
          filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <img 
                      src={doctor.avatar} 
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.degree}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{doctor.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{doctor.specialty}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {doctor.experience} năm kinh nghiệm
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {doctor.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {doctor.schedule.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className={`text-sm ${doctor.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {doctor.isAvailable ? 'Có lịch trống' : 'Hết lịch'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-medium text-primary">
                        {doctor.consultationFee.toLocaleString('vi-VN')} VNĐ
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                        {userRole === 'patient' && doctor.isAvailable && (
                          <Button size="sm" onClick={() => handleBookAppointment(doctor.id)}>
                            Đặt lịch
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}