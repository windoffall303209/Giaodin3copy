import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Pill, 
  Plus, 
  Trash2, 
  FileText, 
  Send, 
  User,
  Clock,
  TestTube,
  Download
} from 'lucide-react';
import { Screen } from '../App';

interface PrescriptionScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
}

interface LabTest {
  id: string;
  name: string;
  category: string;
  instructions: string;
  urgent: boolean;
}

interface Prescription {
  patientId: string;
  patientName: string;
  medications: Medication[];
  labTests: LabTest[];
  notes: string;
  followUpDate?: string;
}

export function PrescriptionScreen({ onNavigate }: PrescriptionScreenProps) {
  const [prescription, setPrescription] = useState<Prescription>({
    patientId: '1',
    patientName: 'Nguyễn Văn A',
    medications: [],
    labTests: [],
    notes: '',
    followUpDate: ''
  });

  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showLabTestDialog, setShowLabTestDialog] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Medication>({
    id: '',
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    quantity: 0
  });
  const [currentLabTest, setCurrentLabTest] = useState<LabTest>({
    id: '',
    name: '',
    category: '',
    instructions: '',
    urgent: false
  });

  const commonMedications = [
    'Paracetamol 500mg',
    'Ibuprofen 400mg',
    'Amoxicillin 500mg',
    'Omeprazole 20mg',
    'Loratadine 10mg',
    'Metformin 500mg',
    'Amlodipine 5mg',
    'Simvastatin 20mg'
  ];

  const labTestCategories = [
    'Huyết học',
    'Sinh hóa máu',
    'Nước tiểu',
    'Vi sinh',
    'Nội tiết',
    'Miễn dịch',
    'Hình ảnh học'
  ];

  const commonLabTests = {
    'Huyết học': ['Công thức máu', 'Tốc độ máu lắng', 'Thời gian đông máu'],
    'Sinh hóa máu': ['Glucose', 'Creatinine', 'ALT/AST', 'Cholesterol'],
    'Nước tiểu': ['Tổng phân tích nước tiểu', 'Protein niệu', 'Vi khuẩn niệu'],
    'Hình ảnh học': ['X-quang ngực', 'Siêu âm bụng', 'CT não', 'MRI cột sống']
  };

  const addMedication = () => {
    if (currentMedication.name && currentMedication.dosage) {
      const newMedication = {
        ...currentMedication,
        id: Date.now().toString()
      };
      setPrescription(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication]
      }));
      setCurrentMedication({
        id: '',
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        quantity: 0
      });
      setShowMedicationDialog(false);
    }
  };

  const addLabTest = () => {
    if (currentLabTest.name && currentLabTest.category) {
      const newLabTest = {
        ...currentLabTest,
        id: Date.now().toString()
      };
      setPrescription(prev => ({
        ...prev,
        labTests: [...prev.labTests, newLabTest]
      }));
      setCurrentLabTest({
        id: '',
        name: '',
        category: '',
        instructions: '',
        urgent: false
      });
      setShowLabTestDialog(false);
    }
  };

  const removeMedication = (id: string) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
  };

  const removeLabTest = (id: string) => {
    setPrescription(prev => ({
      ...prev,
      labTests: prev.labTests.filter(test => test.id !== id)
    }));
  };

  const generatePrescription = () => {
    alert('Toa thuốc đã được tạo và gửi đến bệnh nhân!');
  };

  const renderPatientInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Thông tin bệnh nhân
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p><strong>Họ tên:</strong> {prescription.patientName}</p>
          <p><strong>Ngày khám:</strong> {new Date().toLocaleDateString('vi-VN')}</p>
          <p><strong>Bác sĩ:</strong> BS. Nguyễn Văn B</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderMedicationList = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Đơn thuốc
        </CardTitle>
        <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm thuốc
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm thuốc vào đơn</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên thuốc</Label>
                <Select value={currentMedication.name} onValueChange={(value) => 
                  setCurrentMedication(prev => ({ ...prev, name: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thuốc" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonMedications.map(med => (
                      <SelectItem key={med} value={med}>{med}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Liều dùng</Label>
                  <Input 
                    placeholder="1 viên"
                    value={currentMedication.dosage}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tần suất</Label>
                  <Select value={currentMedication.frequency} onValueChange={(value) => 
                    setCurrentMedication(prev => ({ ...prev, frequency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Tần suất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 lần/ngày">1 lần/ngày</SelectItem>
                      <SelectItem value="2 lần/ngày">2 lần/ngày</SelectItem>
                      <SelectItem value="3 lần/ngày">3 lần/ngày</SelectItem>
                      <SelectItem value="4 lần/ngày">4 lần/ngày</SelectItem>
                      <SelectItem value="Khi cần">Khi cần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Thời gian dùng</Label>
                  <Input 
                    placeholder="7 ngày"
                    value={currentMedication.duration}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Số lượng</Label>
                  <Input 
                    type="number"
                    placeholder="14"
                    value={currentMedication.quantity}
                    onChange={(e) => setCurrentMedication(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hướng dẫn sử dụng</Label>
                <Textarea 
                  placeholder="Uống sau ăn, với đầy đủ nước..."
                  value={currentMedication.instructions}
                  onChange={(e) => setCurrentMedication(prev => ({ ...prev, instructions: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMedicationDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={addMedication}>
                  Thêm thuốc
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {prescription.medications.length === 0 ? (
          <div className="text-center py-8">
            <Pill className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Chưa có thuốc nào được kê</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescription.medications.map((medication, index) => (
              <div key={medication.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{index + 1}. {medication.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Liều:</strong> {medication.dosage} - {medication.frequency}</p>
                      <p><strong>Thời gian:</strong> {medication.duration} - <strong>Số lượng:</strong> {medication.quantity}</p>
                      {medication.instructions && (
                        <p><strong>Hướng dẫn:</strong> {medication.instructions}</p>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeMedication(medication.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderLabTestList = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Chỉ định xét nghiệm
        </CardTitle>
        <Dialog open={showLabTestDialog} onOpenChange={setShowLabTestDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Thêm xét nghiệm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉ định xét nghiệm</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Loại xét nghiệm</Label>
                <Select value={currentLabTest.category} onValueChange={(value) => 
                  setCurrentLabTest(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {labTestCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tên xét nghiệm</Label>
                <Select value={currentLabTest.name} onValueChange={(value) => 
                  setCurrentLabTest(prev => ({ ...prev, name: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn xét nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentLabTest.category && commonLabTests[currentLabTest.category]?.map(test => (
                      <SelectItem key={test} value={test}>{test}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hướng dẫn</Label>
                <Textarea 
                  placeholder="Nhịn ăn 8 tiếng, không uống thuốc..."
                  value={currentLabTest.instructions}
                  onChange={(e) => setCurrentLabTest(prev => ({ ...prev, instructions: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={currentLabTest.urgent}
                  onChange={(e) => setCurrentLabTest(prev => ({ ...prev, urgent: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="urgent">Cấp bách</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowLabTestDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={addLabTest}>
                  Thêm xét nghiệm
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {prescription.labTests.length === 0 ? (
          <div className="text-center py-8">
            <TestTube className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Chưa có xét nghiệm nào được chỉ định</p>
          </div>
        ) : (
          <div className="space-y-3">
            {prescription.labTests.map((test, index) => (
              <div key={test.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{index + 1}. {test.name}</span>
                      <Badge variant="secondary">{test.category}</Badge>
                      {test.urgent && (
                        <Badge variant="destructive" className="text-xs">Cấp bách</Badge>
                      )}
                    </div>
                    {test.instructions && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Hướng dẫn:</strong> {test.instructions}
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeLabTest(test.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Kê đơn thuốc & Xét nghiệm</h1>
        <p className="text-muted-foreground">Kê đơn thuốc và chỉ định xét nghiệm cho bệnh nhân</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info */}
        <div className="space-y-4">
          {renderPatientInfo()}
          
          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Lời dặn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Lời dặn và ghi chú cho bệnh nhân..."
                value={prescription.notes}
                onChange={(e) => setPrescription(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Follow-up */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Tái khám
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Ngày tái khám</Label>
                <Input 
                  type="date"
                  value={prescription.followUpDate}
                  onChange={(e) => setPrescription(prev => ({ ...prev, followUpDate: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Prescriptions */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="medications" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="medications">Đơn thuốc</TabsTrigger>
              <TabsTrigger value="labtests">Xét nghiệm</TabsTrigger>
            </TabsList>

            <TabsContent value="medications">
              {renderMedicationList()}
            </TabsContent>

            <TabsContent value="labtests">
              {renderLabTestList()}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xem trước
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate('examination')}>
                Quay lại khám
              </Button>
              <Button onClick={generatePrescription}>
                <Send className="w-4 h-4 mr-2" />
                Xuất toa thuốc
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}