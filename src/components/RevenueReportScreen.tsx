import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  FileText
} from 'lucide-react';
import { Screen } from '../App';

interface RevenueReportScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface RevenueData {
  date: string;
  totalRevenue: number;
  appointments: number;
  services: ServiceRevenue[];
  doctors: DoctorRevenue[];
  departments: DepartmentRevenue[];
}

interface ServiceRevenue {
  serviceName: string;
  count: number;
  revenue: number;
}

interface DoctorRevenue {
  doctorName: string;
  specialty: string;
  appointments: number;
  revenue: number;
}

interface DepartmentRevenue {
  departmentName: string;
  appointments: number;
  revenue: number;
}

export function RevenueReportScreen({ onNavigate }: RevenueReportScreenProps) {
  const [filterPeriod, setFilterPeriod] = useState<string>('this_month');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterDoctor, setFilterDoctor] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('2024-09-01');
  const [endDate, setEndDate] = useState<string>('2024-09-30');

  // Mock data - trong thực tế sẽ được lấy từ API
  const revenueData: RevenueData = {
    date: '2024-09',
    totalRevenue: 285000000, // 285 triệu VNĐ
    appointments: 1250,
    services: [
      { serviceName: 'Khám tổng quát', count: 450, revenue: 135000000 },
      { serviceName: 'Khám chuyên khoa', count: 280, revenue: 112000000 },
      { serviceName: 'Xét nghiệm', count: 320, revenue: 32000000 },
      { serviceName: 'Siêu âm', count: 85, revenue: 17000000 },
      { serviceName: 'X-quang', count: 65, revenue: 9750000 },
      { serviceName: 'Thuốc', count: 520, revenue: 26000000 }
    ],
    doctors: [
      { doctorName: 'BS. Nguyễn Văn An', specialty: 'Tim mạch', appointments: 180, revenue: 54000000 },
      { doctorName: 'BS. Trần Thị Bình', specialty: 'Nhi khoa', appointments: 220, revenue: 55000000 },
      { doctorName: 'BS. Lê Minh Cường', specialty: 'Thần kinh', appointments: 165, revenue: 57750000 },
      { doctorName: 'BS. Phạm Thị Dung', specialty: 'Da liễu', appointments: 145, revenue: 29000000 },
      { doctorName: 'BS. Hoàng Văn E', specialty: 'Tiêu hóa', appointments: 125, revenue: 37500000 }
    ],
    departments: [
      { departmentName: 'Tim mạch', appointments: 180, revenue: 54000000 },
      { departmentName: 'Nhi khoa', appointments: 220, revenue: 55000000 },
      { departmentName: 'Thần kinh', appointments: 165, revenue: 57750000 },
      { departmentName: 'Da liễu', appointments: 145, revenue: 29000000 },
      { departmentName: 'Tiêu hóa', appointments: 125, revenue: 37500000 },
      { departmentName: 'Xét nghiệm', appointments: 320, revenue: 32000000 }
    ]
  };

  const monthlyTrend = [
    { month: '2024-06', revenue: 245000000, appointments: 1100 },
    { month: '2024-07', revenue: 268000000, appointments: 1180 },
    { month: '2024-08', revenue: 275000000, appointments: 1200 },
    { month: '2024-09', revenue: 285000000, appointments: 1250 },
  ];

  const avgRevenuePerAppointment = revenueData.totalRevenue / revenueData.appointments;
  const monthlyGrowth = ((285000000 - 275000000) / 275000000 * 100);

  const handleExportExcel = () => {
    alert('Đang xuất báo cáo Excel...');
  };

  const handleExportPDF = () => {
    alert('Đang xuất báo cáo PDF...');
  };

  const renderOverviewStats = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-medium text-green-600">
            {revenueData.totalRevenue.toLocaleString('vi-VN')} VNĐ
          </div>
          <div className="text-sm text-muted-foreground">Doanh thu tháng này</div>
          <div className="text-xs text-green-600 mt-1">
            +{monthlyGrowth.toFixed(1)}% so với tháng trước
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-medium">{revenueData.appointments}</div>
          <div className="text-sm text-muted-foreground">Lượt khám</div>
          <div className="text-xs text-muted-foreground mt-1">
            TB: {avgRevenuePerAppointment.toLocaleString('vi-VN')} VNĐ/lượt
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderServiceRevenue = () => (
    <div className="space-y-3">
      {revenueData.services.map((service, index) => {
        const percentage = (service.revenue / revenueData.totalRevenue * 100);
        return (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{service.serviceName}</p>
              <p className="text-sm text-muted-foreground">{service.count} lượt</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{service.revenue.toLocaleString('vi-VN')} VNĐ</p>
              <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderDoctorRevenue = () => (
    <div className="space-y-3">
      {revenueData.doctors.map((doctor, index) => (
        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <p className="font-medium">{doctor.doctorName}</p>
            <p className="text-sm text-muted-foreground">
              {doctor.specialty} • {doctor.appointments} lượt khám
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">{doctor.revenue.toLocaleString('vi-VN')} VNĐ</p>
            <p className="text-sm text-muted-foreground">
              {(doctor.revenue / doctor.appointments).toLocaleString('vi-VN')} VNĐ/lượt
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDepartmentRevenue = () => (
    <div className="space-y-3">
      {revenueData.departments.map((dept, index) => {
        const percentage = (dept.revenue / revenueData.totalRevenue * 100);
        return (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{dept.departmentName}</p>
              <p className="text-sm text-muted-foreground">{dept.appointments} lượt khám</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{dept.revenue.toLocaleString('vi-VN')} VNĐ</p>
              <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTrendChart = () => (
    <div className="space-y-4">
      <h3 className="font-medium">Xu hướng 4 tháng gần đây</h3>
      <div className="space-y-3">
        {monthlyTrend.map((month, index) => {
          const maxRevenue = Math.max(...monthlyTrend.map(m => m.revenue));
          const barWidth = (month.revenue / maxRevenue) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tháng {month.month.split('-')[1]}/{month.month.split('-')[0]}</span>
                <span className="font-medium">
                  {month.revenue.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">
                {month.appointments} lượt khám
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Báo cáo doanh thu</h1>
          <p className="text-muted-foreground">Phân tích doanh thu và thống kê kinh doanh</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportExcel}>
            <FileText className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Xuất PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc báo cáo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Khoảng thời gian</Label>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hôm nay</SelectItem>
                  <SelectItem value="this_week">Tuần này</SelectItem>
                  <SelectItem value="this_month">Tháng này</SelectItem>
                  <SelectItem value="this_quarter">Quý này</SelectItem>
                  <SelectItem value="this_year">Năm này</SelectItem>
                  <SelectItem value="custom">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Chuyên khoa</Label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="cardiology">Tim mạch</SelectItem>
                  <SelectItem value="pediatrics">Nhi khoa</SelectItem>
                  <SelectItem value="neurology">Thần kinh</SelectItem>
                  <SelectItem value="dermatology">Da liễu</SelectItem>
                  <SelectItem value="gastroenterology">Tiêu hóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filterPeriod === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Từ ngày</Label>
                <Input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Đến ngày</Label>
                <Input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overview Stats */}
      {renderOverviewStats()}

      {/* Detailed Reports */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Dịch vụ
          </TabsTrigger>
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Bác sĩ
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Chuyên khoa
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Xu hướng
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo dịch vụ</CardTitle>
              <CardDescription>
                Phân tích doanh thu của từng loại dịch vụ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderServiceRevenue()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doctors">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo bác sĩ</CardTitle>
              <CardDescription>
                Hiệu suất và doanh thu của từng bác sĩ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderDoctorRevenue()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo chuyên khoa</CardTitle>
              <CardDescription>
                Phân tích hiệu quả kinh doanh theo chuyên khoa
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderDepartmentRevenue()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng doanh thu</CardTitle>
              <CardDescription>
                Biểu đồ thể hiện xu hướng tăng trưởng theo thời gian
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTrendChart()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Report */}
      <Card>
        <CardHeader>
          <CardTitle>Tóm tắt báo cáo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Chỉ số chính</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tổng doanh thu:</span>
                  <span className="font-medium">
                    {revenueData.totalRevenue.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tổng lượt khám:</span>
                  <span className="font-medium">{revenueData.appointments}</span>
                </div>
                <div className="flex justify-between">
                  <span>Doanh thu TB/lượt:</span>
                  <span className="font-medium">
                    {avgRevenuePerAppointment.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tăng trưởng tháng:</span>
                  <span className="font-medium text-green-600">
                    +{monthlyGrowth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Dịch vụ hàng đầu</h4>
              <div className="space-y-2 text-sm">
                {revenueData.services.slice(0, 3).map((service, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{service.serviceName}:</span>
                    <span className="font-medium">
                      {service.revenue.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t text-xs text-muted-foreground">
            Báo cáo được tạo tự động vào {new Date().toLocaleString('vi-VN')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}