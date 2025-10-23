import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CreditCard, 
  Smartphone, 
  Receipt, 
  Download, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { Screen } from '../App';

interface PaymentScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Invoice {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  services: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  total: number;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: string;
}

export function PaymentScreen({ onNavigate }: PaymentScreenProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [selectedInvoice, setSelectedInvoice] = useState<string>('');

  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      patientName: 'Nguyễn Văn A',
      doctorName: 'BS. Trần Thị B',
      date: '2024-09-22',
      services: [
        { name: 'Khám tổng quát', quantity: 1, unitPrice: 300000, total: 300000 },
        { name: 'Xét nghiệm máu', quantity: 1, unitPrice: 150000, total: 150000 },
        { name: 'Thuốc kê đơn', quantity: 1, unitPrice: 200000, total: 200000 }
      ],
      total: 650000,
      status: 'pending'
    },
    {
      id: 'INV-002',
      patientName: 'Lê Thị C',
      doctorName: 'BS. Nguyễn Văn D',
      date: '2024-09-21',
      services: [
        { name: 'Khám chuyên khoa tim', quantity: 1, unitPrice: 400000, total: 400000 },
        { name: 'Siêu âm tim', quantity: 1, unitPrice: 300000, total: 300000 }
      ],
      total: 700000,
      status: 'paid',
      paymentMethod: 'Thẻ tín dụng'
    },
    {
      id: 'INV-003',
      patientName: 'Phạm Văn E',
      doctorName: 'BS. Hoàng Thị F',
      date: '2024-09-20',
      services: [
        { name: 'Khám da liễu', quantity: 1, unitPrice: 250000, total: 250000 },
        { name: 'Thuốc bôi', quantity: 2, unitPrice: 75000, total: 150000 }
      ],
      total: 400000,
      status: 'overdue'
    }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Tiền mặt', icon: DollarSign, description: 'Thanh toán tại quầy' },
    { id: 'atm', name: 'Thẻ ATM/Visa', icon: CreditCard, description: 'Thẻ ngân hàng nội địa và quốc tế' },
    { id: 'momo', name: 'MoMo', icon: Smartphone, description: 'Ví điện tử MoMo' },
    { id: 'zalopay', name: 'ZaloPay', icon: Smartphone, description: 'Ví điện tử ZaloPay' },
    { id: 'banking', name: 'Internet Banking', icon: CreditCard, description: 'Chuyển khoản ngân hàng' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ thanh toán</Badge>;
      case 'paid':
        return <Badge variant="outline" className="text-green-600 border-green-600">Đã thanh toán</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="text-red-600 border-red-600">Quá hạn</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const handlePayment = () => {
    if (selectedInvoice && selectedPaymentMethod) {
      alert('Thanh toán thành công!');
      // Update invoice status to paid
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Tải xuống hóa đơn ${invoiceId}`);
  };

  const renderPaymentForm = () => {
    const invoice = invoices.find(inv => inv.id === selectedInvoice);
    
    if (!invoice) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <Receipt className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Chọn hóa đơn để thanh toán</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết hóa đơn {invoice.id}</CardTitle>
            <CardDescription>
              Bệnh nhân: {invoice.patientName} - Bác sĩ: {invoice.doctorName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {invoice.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.quantity} x {service.unitPrice.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                  <span className="font-medium">
                    {service.total.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center font-medium text-lg">
              <span>Tổng cộng:</span>
              <span className="text-primary">
                {invoice.total.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        {invoice.status === 'pending' && (
          <Card>
            <CardHeader>
              <CardTitle>Chọn phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map(method => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPaymentMethod === method.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {selectedPaymentMethod && (
                <Button onClick={handlePayment} className="w-full">
                  Thanh toán {invoice.total.toLocaleString('vi-VN')} VNĐ
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderInvoiceHistory = () => (
    <div className="space-y-4">
      {invoices.map(invoice => (
        <Card key={invoice.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{invoice.id}</h3>
                  {getStatusBadge(invoice.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {invoice.patientName} - {invoice.doctorName}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {invoice.date}
                  </div>
                  {getStatusIcon(invoice.status)}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-lg text-primary">
                  {invoice.total.toLocaleString('vi-VN')} VNĐ
                </p>
                {invoice.paymentMethod && (
                  <p className="text-sm text-muted-foreground">
                    {invoice.paymentMethod}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownloadInvoice(invoice.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </Button>
              {invoice.status === 'pending' && (
                <Button 
                  size="sm" 
                  onClick={() => setSelectedInvoice(invoice.id)}
                >
                  Thanh toán
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Thanh toán & Hóa đơn</h1>
        <p className="text-muted-foreground">Quản lý thanh toán và hóa đơn điện tử</p>
      </div>

      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-4">
          {/* Pending Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Hóa đơn chờ thanh toán</CardTitle>
              <CardDescription>Chọn hóa đơn để thanh toán</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.filter(inv => inv.status === 'pending').map(invoice => (
                  <div
                    key={invoice.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedInvoice === invoice.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedInvoice(invoice.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.patientName} - {invoice.date}
                        </p>
                      </div>
                      <span className="font-medium text-primary">
                        {invoice.total.toLocaleString('vi-VN')} VNĐ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          {renderPaymentForm()}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Lịch sử hóa đơn</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="pending">Chờ thanh toán</SelectItem>
                <SelectItem value="overdue">Quá hạn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderInvoiceHistory()}
        </TabsContent>
      </Tabs>
    </div>
  );
}