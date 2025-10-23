import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  User, 
  Clock, 
  Stethoscope, 
  FileText, 
  Heart, 
  Thermometer,
  Weight,
  Ruler,
  Activity,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Save,
  Send,
  Pill,
  TestTube,
  Calendar,
  Phone,
  MapPin,
  Timer,
  Users,
  Search,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react';
import { Screen } from '../App';

interface ExaminationScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  appointmentTime: string;
  appointmentType: string;
  chiefComplaint: string;
  priority: 'normal' | 'urgent' | 'emergency';
  status: 'waiting' | 'in_progress' | 'completed' | 'no_show';
  waitTime: number; // minutes
  estimatedDuration: number; // minutes
  insuranceInfo?: {
    provider: string;
    number: string;
    validUntil: string;
  };
  medicalHistory?: string[];
  allergies?: string[];
  currentMedications?: string[];
}

interface VitalSigns {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  temperature: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  weight: string;
  height: string;
  bmi?: string;
}

interface ExaminationData {
  patientId: string;
  vitalSigns: VitalSigns;
  symptoms: string;
  physicalExamination: string;
  diagnosis: {
    preliminary: string;
    differential: string[];
    final?: string;
  };
  treatment: {
    plan: string;
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions: string;
    }>;
    labTests: string[];
    imaging: string[];
    followUp: {
      required: boolean;
      date?: string;
      notes?: string;
    };
  };
  doctorNotes: string;
  patientInstructions: string;
}

export function ExaminationScreen({ onNavigate }: ExaminationScreenProps) {
  const [currentView, setCurrentView] = useState<'queue' | 'examination'>('queue');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [examinationData, setExaminationData] = useState<ExaminationData | null>(null);
  const [currentTab, setCurrentTab] = useState('vitals');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      age: 45,
      gender: 'Nam',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      appointmentTime: '08:30',
      appointmentType: 'Khám tổng quát',
      chiefComplaint: 'Đau ngực, khó thở khi gắng sức',
      priority: 'urgent',
      status: 'waiting',
      waitTime: 15,
      estimatedDuration: 30,
      insuranceInfo: {
        provider: 'Bảo hiểm xã hội',
        number: 'BH1234567890',
        validUntil: '2025-12-31'
      },
      medicalHistory: ['Tăng huyết áp', 'Tiểu đường type 2'],
      allergies: ['Penicillin'],
      currentMedications: ['Metformin 500mg', 'Lisinopril 10mg']
    },
    {
      id: '2',
      name: 'Trần Thị Bình',
      age: 32,
      gender: 'Nữ',
      phone: '0987654321',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      appointmentTime: '09:00',
      appointmentType: 'Tái khám',
      chiefComplaint: 'Theo dõi điều trị viêm khớp',
      priority: 'normal',
      status: 'in_progress',
      waitTime: 45,
      estimatedDuration: 20,
      medicalHistory: ['Viêm khớp dạng thấp'],
      currentMedications: ['Methotrexate 15mg']
    },
    {
      id: '3',
      name: 'Lê Minh Cường',
      age: 28,
      gender: 'Nam',
      phone: '0369258147',
      address: '789 Đường DEF, Quận 7, TP.HCM',
      appointmentTime: '09:30',
      appointmentType: 'Khám chuyên khoa',
      chiefComplaint: 'Đau đầu kéo dài, chóng mặt',
      priority: 'normal',
      status: 'waiting',
      waitTime: 5,
      estimatedDuration: 25,
      insuranceInfo: {
        provider: 'Bảo hiểm tư nhân',
        number: 'PV9876543210',
        validUntil: '2024-12-31'
      }
    },
    {
      id: '4',
      name: 'Phạm Thị Dung',
      age: 55,
      gender: 'Nữ',
      phone: '0741852963',
      address: '321 Đường GHI, Quận 5, TP.HCM',
      appointmentTime: '10:00',
      appointmentType: 'Khám định kỳ',
      chiefComplaint: 'Khám sức khỏe định kỳ',
      priority: 'normal',
      status: 'completed',
      waitTime: 0,
      estimatedDuration: 15
    }
  ];

  const initializeExamination = (patient: Patient) => {
    setExaminationData({
      patientId: patient.id,
      vitalSigns: {
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        weight: '',
        height: '',
      },
      symptoms: patient.chiefComplaint,
      physicalExamination: '',
      diagnosis: {
        preliminary: '',
        differential: [],
        final: ''
      },
      treatment: {
        plan: '',
        medications: [],
        labTests: [],
        imaging: [],
        followUp: {
          required: false
        }
      },
      doctorNotes: '',
      patientInstructions: ''
    });
  };

  const handleStartExamination = (patient: Patient) => {
    setSelectedPatient(patient);
    initializeExamination(patient);
    setCurrentView('examination');
    setCurrentTab('vitals');
  };

  const handleBackToQueue = () => {
    setCurrentView('queue');
    setSelectedPatient(null);
    setExaminationData(null);
  };

  const calculateBMI = (weight: string, height: string) => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    if (w > 0 && h > 0) {
      return (w / (h * h)).toFixed(1);
    }
    return '';
  };

  const updateVitalSigns = (field: keyof VitalSigns, value: string) => {
    if (!examinationData) return;
    
    const newVitalSigns = { ...examinationData.vitalSigns, [field]: value };
    
    // Auto-calculate BMI
    if (field === 'weight' || field === 'height') {
      const bmi = calculateBMI(
        field === 'weight' ? value : newVitalSigns.weight,
        field === 'height' ? value : newVitalSigns.height
      );
      newVitalSigns.bmi = bmi;
    }

    setExaminationData({
      ...examinationData,
      vitalSigns: newVitalSigns
    });
  };

  const addMedication = () => {
    if (!examinationData) return;
    
    setExaminationData({
      ...examinationData,
      treatment: {
        ...examinationData.treatment,
        medications: [
          ...examinationData.treatment.medications,
          {
            name: '',
            dosage: '',
            frequency: '',
            duration: '',
            instructions: ''
          }
        ]
      }
    });
  };

  const updateMedication = (index: number, field: string, value: string) => {
    if (!examinationData) return;
    
    const newMedications = [...examinationData.treatment.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    
    setExaminationData({
      ...examinationData,
      treatment: {
        ...examinationData.treatment,
        medications: newMedications
      }
    });
  };

  const removeMedication = (index: number) => {
    if (!examinationData) return;
    
    const newMedications = examinationData.treatment.medications.filter((_, i) => i !== index);
    
    setExaminationData({
      ...examinationData,
      treatment: {
        ...examinationData.treatment,
        medications: newMedications
      }
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'emergency':
        return <Badge variant="destructive" className="text-xs">Cấp cứu</Badge>;
      case 'urgent':
        return <Badge variant="outline" className="text-orange-600 border-orange-600 text-xs">Khẩn cấp</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Bình thường</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ khám</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Đang khám</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Hoàn thành</Badge>;
      case 'no_show':
        return <Badge variant="outline" className="text-red-600 border-red-600">Vắng mặt</Badge>;
      default:
        return null;
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const queueStats = {
    waiting: patients.filter(p => p.status === 'waiting').length,
    inProgress: patients.filter(p => p.status === 'in_progress').length,
    completed: patients.filter(p => p.status === 'completed').length,
    noShow: patients.filter(p => p.status === 'no_show').length,
  };

  if (currentView === 'examination' && selectedPatient && examinationData) {
    return (
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleBackToQueue}>
              ← Quay lại
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{selectedPatient.name}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedPatient.age} tuổi • {selectedPatient.gender} • {selectedPatient.appointmentTime}
              </p>
            </div>
          </div>
          {getPriorityBadge(selectedPatient.priority)}
        </div>

        {/* Patient Quick Info */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p><span className="text-muted-foreground">Lý do khám:</span></p>
                <p className="font-medium">{selectedPatient.chiefComplaint}</p>
              </div>
              <div className="space-y-1">
                <p><span className="text-muted-foreground">Loại khám:</span></p>
                <p>{selectedPatient.appointmentType}</p>
              </div>
            </div>
            
            {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
              <Alert className="mt-3">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Dị ứng:</strong> {selectedPatient.allergies.join(', ')}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Examination Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="vitals" className="text-xs">Sinh hiệu</TabsTrigger>
              <TabsTrigger value="examination" className="text-xs">Khám</TabsTrigger>
              <TabsTrigger value="diagnosis" className="text-xs">Chẩn đoán</TabsTrigger>
              <TabsTrigger value="treatment" className="text-xs">Điều trị</TabsTrigger>
              <TabsTrigger value="summary" className="text-xs">Tổng kết</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vitals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Sinh hiệu cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Blood Pressure */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Huyết áp (mmHg)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tâm thu"
                      value={examinationData.vitalSigns.bloodPressureSystolic}
                      onChange={(e) => updateVitalSigns('bloodPressureSystolic', e.target.value)}
                      type="number"
                    />
                    <span className="self-center">/</span>
                    <Input
                      placeholder="Tâm trương"
                      value={examinationData.vitalSigns.bloodPressureDiastolic}
                      onChange={(e) => updateVitalSigns('bloodPressureDiastolic', e.target.value)}
                      type="number"
                    />
                  </div>
                </div>

                {/* Heart Rate & Temperature */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      Nhịp tim (bpm)
                    </Label>
                    <Input
                      placeholder="72"
                      value={examinationData.vitalSigns.heartRate}
                      onChange={(e) => updateVitalSigns('heartRate', e.target.value)}
                      type="number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-blue-500" />
                      Nhiệt độ (°C)
                    </Label>
                    <Input
                      placeholder="36.5"
                      value={examinationData.vitalSigns.temperature}
                      onChange={(e) => updateVitalSigns('temperature', e.target.value)}
                      type="number"
                      step="0.1"
                    />
                  </div>
                </div>

                {/* Respiratory Rate & Oxygen Saturation */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nhịp thở (/phút)</Label>
                    <Input
                      placeholder="16"
                      value={examinationData.vitalSigns.respiratoryRate}
                      onChange={(e) => updateVitalSigns('respiratoryRate', e.target.value)}
                      type="number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SpO2 (%)</Label>
                    <Input
                      placeholder="98"
                      value={examinationData.vitalSigns.oxygenSaturation}
                      onChange={(e) => updateVitalSigns('oxygenSaturation', e.target.value)}
                      type="number"
                    />
                  </div>
                </div>

                {/* Weight & Height */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-green-500" />
                      Cân nặng (kg)
                    </Label>
                    <Input
                      placeholder="65"
                      value={examinationData.vitalSigns.weight}
                      onChange={(e) => updateVitalSigns('weight', e.target.value)}
                      type="number"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-purple-500" />
                      Chiều cao (cm)
                    </Label>
                    <Input
                      placeholder="170"
                      value={examinationData.vitalSigns.height}
                      onChange={(e) => updateVitalSigns('height', e.target.value)}
                      type="number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>BMI</Label>
                    <Input
                      value={examinationData.vitalSigns.bmi || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examination" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Khám lâm sàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Triệu chứng chi tiết</Label>
                  <Textarea
                    placeholder="Mô tả chi tiết các triệu chứng và tình trạng của bệnh nhân..."
                    value={examinationData.symptoms}
                    onChange={(e) => setExaminationData({
                      ...examinationData,
                      symptoms: e.target.value
                    })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kết quả khám thể</Label>
                  <Textarea
                    placeholder="Ghi nhận kết quả khám các hệ cơ quan..."
                    value={examinationData.physicalExamination}
                    onChange={(e) => setExaminationData({
                      ...examinationData,
                      physicalExamination: e.target.value
                    })}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Chẩn đoán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Chẩn đoán sơ bộ</Label>
                  <Textarea
                    placeholder="Nhập chẩn đoán sơ bộ..."
                    value={examinationData.diagnosis.preliminary}
                    onChange={(e) => setExaminationData({
                      ...examinationData,
                      diagnosis: {
                        ...examinationData.diagnosis,
                        preliminary: e.target.value
                      }
                    })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Chẩn đoán phân biệt</Label>
                  <Textarea
                    placeholder="Các chẩn đoán cần phân biệt..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Điều trị và kê đơn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Hướng điều trị</Label>
                  <Textarea
                    placeholder="Mô tả kế hoạch điều trị..."
                    value={examinationData.treatment.plan}
                    onChange={(e) => setExaminationData({
                      ...examinationData,
                      treatment: {
                        ...examinationData.treatment,
                        plan: e.target.value
                      }
                    })}
                    rows={3}
                  />
                </div>

                {/* Medications */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Đơn thuốc</Label>
                    <Button size="sm" variant="outline" onClick={addMedication}>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm thuốc
                    </Button>
                  </div>
                  
                  {examinationData.treatment.medications.map((medication, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Thuốc {index + 1}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMedication(index)}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-xs">Tên thuốc</Label>
                            <Input
                              placeholder="Tên thuốc"
                              value={medication.name}
                              onChange={(e) => updateMedication(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Liều dùng</Label>
                            <Input
                              placeholder="500mg"
                              value={medication.dosage}
                              onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Tần suất</Label>
                            <Select
                              value={medication.frequency}
                              onValueChange={(value) => updateMedication(index, 'frequency', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn tần suất" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1x/day">1 lần/ngày</SelectItem>
                                <SelectItem value="2x/day">2 lần/ngày</SelectItem>
                                <SelectItem value="3x/day">3 lần/ngày</SelectItem>
                                <SelectItem value="4x/day">4 lần/ngày</SelectItem>
                                <SelectItem value="as_needed">Khi cần</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Thời gian</Label>
                            <Input
                              placeholder="7 ngày"
                              value={medication.duration}
                              onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Hướng dẫn sử dụng</Label>
                          <Textarea
                            placeholder="Uống sau ăn..."
                            value={medication.instructions}
                            onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Lab Tests */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <TestTube className="h-4 w-4" />
                    Chỉ định xét nghiệm
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Xét nghiệm máu</Button>
                    <Button variant="outline" size="sm">Xét nghiệm nước tiểu</Button>
                    <Button variant="outline" size="sm">X-quang ngực</Button>
                    <Button variant="outline" size="sm">Siêu âm bụng</Button>
                  </div>
                </div>

                {/* Follow-up */}
                <div className="space-y-3">
                  <Label>Tái khám</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={examinationData.treatment.followUp.required}
                      onChange={(e) => setExaminationData({
                        ...examinationData,
                        treatment: {
                          ...examinationData.treatment,
                          followUp: {
                            ...examinationData.treatment.followUp,
                            required: e.target.checked
                          }
                        }
                      })}
                    />
                    <span className="text-sm">Cần tái khám</span>
                  </div>
                  {examinationData.treatment.followUp.required && (
                    <Input
                      type="date"
                      placeholder="Ngày tái khám"
                      value={examinationData.treatment.followUp.date || ''}
                      onChange={(e) => setExaminationData({
                        ...examinationData,
                        treatment: {
                          ...examinationData.treatment,
                          followUp: {
                            ...examinationData.treatment.followUp,
                            date: e.target.value
                          }
                        }
                      })}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tóm tắt khám bệnh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ghi chú của bác sĩ</Label>
                  <Textarea
                    placeholder="Ghi chú thêm cho hồ sơ bệnh án..."
                    value={examinationData.doctorNotes}
                    onChange={(e) => setExaminationData({
                      ...examinationData,
                      doctorNotes: e.target.value
                    })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hướng dẫn cho bệnh nhân</Label>
                  <Textarea
                    placeholder="Lời dặn và hướng dẫn cho bệnh nhân..."
                    value={examinationData.patientInstructions}
                    onChange={(e) => setExaminationData({
                      ...examinationData,
                      patientInstructions: e.target.value
                    })}
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu nháp
                  </Button>
                  <Button className="flex-1" onClick={() => {
                    alert('Hoàn thành khám bệnh!');
                    handleBackToQueue();
                  }}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Hoàn thành
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Queue View
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Khám bệnh</h1>
          <p className="text-muted-foreground">Danh sách bệnh nhân hôm nay</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('vi-VN')}
          </p>
          <p className="font-medium">{patients.length} bệnh nhân</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="text-center">
          <CardContent className="p-3">
            <Timer className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="font-medium">{queueStats.waiting}</div>
            <div className="text-xs text-muted-foreground">Chờ khám</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Stethoscope className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="font-medium">{queueStats.inProgress}</div>
            <div className="text-xs text-muted-foreground">Đang khám</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="font-medium">{queueStats.completed}</div>
            <div className="text-xs text-muted-foreground">Hoàn thành</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-3">
            <Users className="h-6 w-6 mx-auto mb-2 text-gray-500" />
            <div className="font-medium">{patients.length}</div>
            <div className="text-xs text-muted-foreground">Tổng cộng</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm tên bệnh nhân hoặc số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="waiting">Chờ khám</SelectItem>
            <SelectItem value="in_progress">Đang khám</SelectItem>
            <SelectItem value="completed">Hoàn thành</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Patient List */}
      <div className="space-y-3">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{patient.name}</h3>
                      {getPriorityBadge(patient.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} tuổi • {patient.gender}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{patient.appointmentTime}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm">{patient.appointmentType}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(patient.status)}
                  {patient.status === 'waiting' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Chờ {patient.waitTime} phút
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Lý do khám:</span> {patient.chiefComplaint}
                </p>
                {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Tiền sử:</span> {patient.medicalHistory.join(', ')}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  {patient.insuranceInfo && (
                    <span className="text-green-600">• Có BHYT</span>
                  )}
                  {patient.estimatedDuration > 0 && (
                    <span> • Dự kiến {patient.estimatedDuration} phút</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {patient.status === 'waiting' && (
                    <Button 
                      size="sm"
                      onClick={() => handleStartExamination(patient)}
                    >
                      Bắt đầu khám
                    </Button>
                  )}
                  {patient.status === 'in_progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStartExamination(patient)}
                    >
                      Tiếp tục
                    </Button>
                  )}
                  {patient.status === 'completed' && (
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem hồ sơ
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Không có bệnh nhân nào phù hợp</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}