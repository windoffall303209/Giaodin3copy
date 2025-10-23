import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Calendar, 
  User, 
  FileText, 
  Pill, 
  TestTube, 
  Download,
  Clock,
  Stethoscope
} from 'lucide-react';
import { Screen } from '../App';

interface MedicalHistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  specialty: string;
  appointmentType: string;
  diagnosis: string;
  symptoms: string;
  examination: string;
  treatment: string;
  status: 'completed' | 'pending_results' | 'follow_up_required';
  prescriptions?: Prescription[];
  labTests?: LabTest[];
  followUpDate?: string;
  notes?: string;
}

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface LabTest {
  id: string;
  testName: string;
  category: string;
  result?: string;
  status: 'pending' | 'completed';
  resultDate?: string;
  normalRange?: string;
}

export function MedicalHistoryScreen({ onNavigate }: MedicalHistoryScreenProps) {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2024-09-20',
      doctorName: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      appointmentType: 'Khám tổng quát',
      diagnosis: 'Tăng huyết áp độ 1',
      symptoms: 'Đau đầu, chóng mặt, mệt mỏi',
      examination: 'Huyết áp 140/90 mmHg, nhịp tim 85 bpm, không có tiếng thổi',
      treatment: 'Điều chỉnh chế độ ăn uống, tập thể dục, uống thuốc hạ huyết áp',
      status: 'completed',
      followUpDate: '2024-10-20',
      prescriptions: [
        {
          id: '1',
          medicationName: 'Amlodipine 5mg',
          dosage: '1 viên',
          frequency: '1 lần/ngày',
          duration: '30 ngày',
          instructions: 'Uống vào buổi sáng sau ăn'
        },
        {
          id: '2',
          medicationName: 'Aspirin 81mg',
          dosage: '1 viên',
          frequency: '1 lần/ngày',
          duration: '30 ngày',
          instructions: 'Uống vào buổi tối sau ăn'
        }
      ],
      labTests: [
        {
          id: '1',
          testName: 'Xét nghiệm lipid máu',
          category: 'Sinh hóa máu',
          status: 'completed',
          result: 'Cholesterol: 220 mg/dL (Cao)',
          resultDate: '2024-09-21',
          normalRange: '< 200 mg/dL'
        }
      ]
    },
    {
      id: '2',
      date: '2024-09-15',
      doctorName: 'BS. Trần Thị Bình',
      specialty: 'Nội tổng quát',
      appointmentType: 'Khám định kỳ',
      diagnosis: 'Viêm họng cấp',
      symptoms: 'Đau họng, sốt nhẹ, khó nuốt',
      examination: 'Họng đỏ, amidan sưng, nhiệt độ 37.8°C',
      treatment: 'Kháng sinh, thuốc hạ sốt, súc miệng nước muối',
      status: 'completed',
      prescriptions: [
        {
          id: '3',
          medicationName: 'Amoxicillin 500mg',
          dosage: '1 viên',
          frequency: '3 lần/ngày',
          duration: '7 ngày',
          instructions: 'Uống sau ăn, uống đủ đợt'
        },
        {
          id: '4',
          medicationName: 'Paracetamol 500mg',
          dosage: '1-2 viên',
          frequency: 'Khi sốt',
          duration: '5 ngày',
          instructions: 'Cách nhau ít nhất 4 giờ'
        }
      ]
    },
    {
      id: '3',
      date: '2024-09-10',
      doctorName: 'BS. Lê Minh Cường',
      specialty: 'Da liễu',
      appointmentType: 'Khám chuyên khoa',
      diagnosis: 'Viêm da dị ứng',
      symptoms: 'Phát ban, ngứa, da khô',
      examination: 'Vùng da tay và chân có ban đỏ, ngứa, không có nhiễm trùng',
      treatment: 'Thuốc chống dị ứng, kem bôi, tránh các chất gây dị ứng',
      status: 'follow_up_required',
      followUpDate: '2024-09-24',
      prescriptions: [
        {
          id: '5',
          medicationName: 'Loratadine 10mg',
          dosage: '1 viên',
          frequency: '1 lần/ngày',
          duration: '14 ngày',
          instructions: 'Uống vào buổi tối'
        }
      ]
    },
    {
      id: '4',
      date: '2024-09-05',
      doctorName: 'BS. Phạm Thị Dung',
      specialty: 'Nội tổng quát',
      appointmentType: 'Khám sức khỏe định kỳ',
      diagnosis: 'Chờ kết quả xét nghiệm',
      symptoms: 'Khám sức khỏe định kỳ',
      examination: 'Các chỉ số sinh hiệu bình thường',
      treatment: 'Chờ kết quả xét nghiệm để tư vấn',
      status: 'pending_results',
      labTests: [
        {
          id: '2',
          testName: 'Công thức máu',
          category: 'Huyết học',
          status: 'pending'
        },
        {
          id: '3',
          testName: 'Xét nghiệm đường huyết',
          category: 'Sinh hóa máu',
          status: 'pending'
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Hoàn thành</Badge>;
      case 'pending_results':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ kết quả</Badge>;
      case 'follow_up_required':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Cần tái khám</Badge>;
      default:
        return null;
    }
  };

  const getTestStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Có kết quả</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ kết quả</Badge>;
      default:
        return null;
    }
  };

  const renderRecordDetail = (record: MedicalRecord) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Xem chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết lần khám - {record.date}</DialogTitle>
          <DialogDescription>
            {record.doctorName} - {record.specialty}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="diagnosis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="diagnosis">Chẩn đoán</TabsTrigger>
            <TabsTrigger value="prescriptions">Đơn thuốc</TabsTrigger>
            <TabsTrigger value="tests">Xét nghiệm</TabsTrigger>
            <TabsTrigger value="notes">Ghi chú</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagnosis" className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-1">Triệu chứng</h4>
                <p className="text-sm text-muted-foreground">{record.symptoms}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Kết quả khám</h4>
                <p className="text-sm text-muted-foreground">{record.examination}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Chẩn đoán</h4>
                <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Hướng điều trị</h4>
                <p className="text-sm text-muted-foreground">{record.treatment}</p>
              </div>
              {record.followUpDate && (
                <div>
                  <h4 className="font-medium mb-1">Tái khám</h4>
                  <p className="text-sm text-muted-foreground">{record.followUpDate}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="prescriptions" className="space-y-4">
            {record.prescriptions && record.prescriptions.length > 0 ? (
              <div className="space-y-3">
                {record.prescriptions.map((prescription, index) => (
                  <div key={prescription.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <span className="font-medium">{index + 1}. {prescription.medicationName}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Liều dùng:</strong> {prescription.dosage} - {prescription.frequency}</p>
                      <p><strong>Thời gian:</strong> {prescription.duration}</p>
                      <p><strong>Hướng dẫn:</strong> {prescription.instructions}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">Không có đơn thuốc nào được kê</p>
            )}
          </TabsContent>
          
          <TabsContent value="tests" className="space-y-4">
            {record.labTests && record.labTests.length > 0 ? (
              <div className="space-y-3">
                {record.labTests.map((test, index) => (
                  <div key={test.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TestTube className="h-4 w-4 text-primary" />
                        <span className="font-medium">{index + 1}. {test.testName}</span>
                      </div>
                      {getTestStatusBadge(test.status)}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Loại xét nghiệm:</strong> {test.category}</p>
                      {test.result && (
                        <p><strong>Kết quả:</strong> {test.result}</p>
                      )}
                      {test.normalRange && (
                        <p><strong>Giá trị bình thường:</strong> {test.normalRange}</p>
                      )}
                      {test.resultDate && (
                        <p><strong>Ngày có kết quả:</strong> {test.resultDate}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">Không có xét nghiệm nào được chỉ định</p>
            )}
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">Lời dặn của bác sĩ</h4>
              <p className="text-sm text-muted-foreground">
                {record.notes || 'Không có ghi chú đặc biệt'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Tải xuống
          </Button>
          {record.followUpDate && (
            <Button size="sm" onClick={() => onNavigate('appointment-booking')}>
              Đặt lịch tái khám
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Lịch sử khám bệnh</h1>
        <p className="text-muted-foreground">Xem lại các lần khám bệnh và kết quả điều trị</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Stethoscope className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-medium">{medicalRecords.length}</div>
            <div className="text-sm text-muted-foreground">Tổng lần khám</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-medium">
              {medicalRecords.filter(r => r.followUpDate).length}
            </div>
            <div className="text-sm text-muted-foreground">Cần tái khám</div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Danh sách lần khám</h2>
          <Button variant="outline" size="sm" onClick={() => onNavigate('appointment-booking')}>
            Đặt lịch khám mới
          </Button>
        </div>

        <div className="space-y-3">
          {medicalRecords.map(record => (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{record.date}</span>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{record.doctorName} - {record.specialty}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.appointmentType}</p>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Chẩn đoán: </span>
                    <span className="text-muted-foreground">{record.diagnosis}</span>
                  </div>
                  {record.followUpDate && (
                    <div>
                      <span className="font-medium">Tái khám: </span>
                      <span className="text-muted-foreground">{record.followUpDate}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  {record.prescriptions && record.prescriptions.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {record.prescriptions.length} đơn thuốc
                    </Badge>
                  )}
                  {record.labTests && record.labTests.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {record.labTests.length} xét nghiệm
                    </Badge>
                  )}
                </div>

                <div className="flex justify-end mt-4">
                  {renderRecordDetail(record)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}