import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Calendar, 
  CreditCard, 
  Download, 
  Receipt,
  DollarSign,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Screen } from '../App';

interface PaymentHistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  doctorName: string;
  appointmentType: string;
  services: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  total: number;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'refunded' | 'failed';
  paymentDate?: string;
  refundDate?: string;
  refundReason?: string;
}

export function PaymentHistoryScreen({ onNavigate }: PaymentHistoryScreenProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');

  const paymentRecords: PaymentRecord[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: '2024-09-20',
      doctorName: 'BS. Nguyễn Văn An',
      appointmentType: 'Khám tổng quát',
      services: [
        { name: 'Phí khám bệnh', quantity: 1, unitPrice: 300000, total: 300000 },
        { name: 'Xét nghiệm lipid máu', quantity: 1, unitPrice: 150000, total: 150000 },
        { name: 'Thuốc Amlodipine 5mg', quantity: 30, unitPrice: 2000, total: 60000 },
        { name: 'Thuốc Aspirin 81mg', quantity: 30, unitPrice: 1500, total: 45000 }
      ],
      total: 555000,
      paymentMethod: 'Thẻ tín dụng',
      status: 'paid',
      paymentDate: '2024-09-20'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: '2024-09-15',
      doctorName: 'BS. Trần Thị Bình',
      appointmentType: 'Khám định kỳ',
      services: [
        { name: 'Phí khám bệnh', quantity: 1, unitPrice: 250000, total: 250000 },
        { name: 'Thuốc Amoxicillin 500mg', quantity: 21, unitPrice: 3000, total: 63000 },
        { name: 'Thuốc Paracetamol 500mg', quantity: 10, unitPrice: 1000, total: 10000 }
      ],
      total: 323000,
      paymentMethod: 'MoMo',
      status: 'paid',
      paymentDate: '2024-09-15'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      date: '2024-09-10',
      doctorName: 'BS. Lê Minh Cường',
      appointmentType: 'Khám chuyên khoa',
      services: [
        { name: 'Phí khám chuyên khoa', quantity: 1, unitPrice: 400000, total: 400000 },
        { name: 'Thuốc Loratadine 10mg', quantity: 14, unitPrice: 2500, total: 35000 },
        { name: 'Kem bôi da', quantity: 1, unitPrice: 85000, total: 85000 }
      ],
      total: 520000,
      paymentMethod: 'Chuyển khoản',
      status: 'paid',
      paymentDate: '2024-09-10'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      date: '2024-09-05',
      doctorName: 'BS. Phạm Thị Dung',
      appointmentType: 'Khám sức khỏe',
      services: [
        { name: 'Phí khám sức khỏe định kỳ', quantity: 1, unitPrice: 350000, total: 350000 },
        { name: 'Xét nghiệm công thức máu', quantity: 1, unitPrice: 80000, total: 80000 },
        { name: 'Xét nghiệm đường huyết', quantity: 1, unitPrice: 50000, total: 50000 }
      ],
      total: 480000,
      paymentMethod: 'Tiền mặt',
      status: 'paid',
      paymentDate: '2024-09-05'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      date: '2024-08-28',
      doctorName: 'BS. Hoàng Văn E',
      appointmentType: 'Khám cấp cứu',
      services: [
        { name: 'Phí khám cấp cứu', quantity: 1, unitPrice: 500000, total: 500000 },
        { name: 'Thuốc tiêm', quantity: 1, unitPrice: 150000, total: 150000 }
      ],
      total: 650000,
      paymentMethod: 'Thẻ ATM',
      status: 'refunded',
      paymentDate: '2024-08-28',
      refundDate: '2024-09-01',
      refundReason: 'Bệnh nhân yêu cầu hoàn tiền do chẩn đoán sai'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="text-green-600 border-green-600">Đã thanh toán</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ thanh toán</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Đã hoàn tiền</Badge>;
      case 'failed':
        return <Badge variant="outline" className="text-red-600 border-red-600">Thất bại</Badge>;
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.includes('Thẻ') || method.includes('MoMo') || method.includes('Chuyển khoản')) {
      return <CreditCard className="h-4 w-4" />;
    }
    return <DollarSign className="h-4 w-4" />;
  };

  const filteredRecords = paymentRecords.filter(record => {
    const statusMatch = filterStatus === 'all' || record.status === filterStatus;
    const monthMatch = filterMonth === 'all' || record.date.startsWith(`2024-${filterMonth}`);
    return statusMatch && monthMatch;
  });

  const totalSpent = filteredRecords
    .filter(r => r.status === 'paid')
    .reduce((sum, record) => sum + record.total, 0);

  const renderPaymentDetail = (record: PaymentRecord) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Hóa đơn {record.invoiceNumber}</DialogTitle>
          <DialogDescription>
            Ngày khám: {record.date} - {record.doctorName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">Chi tiết dịch vụ</h4>
            {record.services.map((service, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-muted-foreground">
                    {service.quantity} x {service.unitPrice.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <span className="font-medium">
                  {service.total.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between font-medium text-lg">
              <span>Tổng cộng:</span>
              <span className="text-primary">
                {record.total.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phương thức thanh toán:</span>
              <span>{record.paymentMethod}</span>
            </div>
            {record.paymentDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày thanh toán:</span>
                <span>{record.paymentDate}</span>
              </div>
            )}
            {record.refundDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày hoàn tiền:</span>
                <span>{record.refundDate}</span>
              </div>
            )}
            {record.refundReason && (
              <div>
                <span className="text-muted-foreground">Lý do hoàn tiền:</span>
                <p className="mt-1">{record.refundReason}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Tải hóa đơn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Lịch sử thanh toán</h1>
        <p className="text-muted-foreground">Quản lý các giao dịch và hóa đơn y tế</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-medium">
              {totalSpent.toLocaleString('vi-VN')} VNĐ
            </div>
            <div className="text-sm text-muted-foreground">Tổng chi phí</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Receipt className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-medium">{filteredRecords.length}</div>
            <div className="text-sm text-muted-foreground">Số giao dịch</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Bộ lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng thái</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                  <SelectItem value="pending">Chờ thanh toán</SelectItem>
                  <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tháng</label>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="09">Tháng 9</SelectItem>
                  <SelectItem value="08">Tháng 8</SelectItem>
                  <SelectItem value="07">Tháng 7</SelectItem>
                  <SelectItem value="06">Tháng 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Records */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Danh sách giao dịch</h2>
        
        <div className="space-y-3">
          {filteredRecords.map(record => (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{record.invoiceNumber}</span>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{record.date} - {record.appointmentType}</span>
                      </div>
                      <p>{record.doctorName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-primary">
                      {record.total.toLocaleString('vi-VN')} VNĐ
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      {getPaymentMethodIcon(record.paymentMethod)}
                      <span>{record.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {record.services.length} dịch vụ
                    {record.paymentDate && ` • Thanh toán: ${record.paymentDate}`}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Tải xuống
                    </Button>
                    {renderPaymentDetail(record)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Receipt className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Không có giao dịch nào phù hợp</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}