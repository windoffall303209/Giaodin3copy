import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  User, 
  FileText, 
  Upload, 
  Download, 
  Check, 
  X, 
  AlertTriangle,
  Calendar,
  Eye,
  Clock,
  Shield,
  Award
} from 'lucide-react';
import { Screen } from '../App';

interface DoctorApprovalScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface DoctorApplication {
  id: string;
  doctorName: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  documents: Document[];
  education: Education[];
  workHistory: WorkHistory[];
  references: Reference[];
  reviewNotes?: string;
  reviewedBy?: string;
  reviewDate?: string;
  rejectionReason?: string;
}

interface Document {
  id: string;
  type: 'degree' | 'certificate' | 'license' | 'cv' | 'photo' | 'other';
  fileName: string;
  uploadDate: string;
  fileSize: string;
  status: 'pending' | 'verified' | 'rejected' | 'duplicate';
  verifiedBy?: string;
  notes?: string;
}

interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
  isVerified: boolean;
}

interface WorkHistory {
  hospital: string;
  position: string;
  startDate: string;
  endDate: string;
  isVerified: boolean;
}

interface Reference {
  name: string;
  position: string;
  hospital: string;
  phone: string;
  isContacted: boolean;
}

export function DoctorApprovalScreen({ onNavigate }: DoctorApprovalScreenProps) {
  const [selectedApplication, setSelectedApplication] = useState<DoctorApplication | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [reviewNote, setReviewNote] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const applications: DoctorApplication[] = [
    {
      id: '1',
      doctorName: 'BS. Nguyễn Văn Minh',
      email: 'minh.nguyen@email.com',
      phone: '0123456789',
      specialty: 'Tim mạch',
      experience: 8,
      applicationDate: '2024-09-15',
      status: 'pending',
      documents: [
        {
          id: '1',
          type: 'degree',
          fileName: 'bang-tot-nghiep-bac-si.pdf',
          uploadDate: '2024-09-15',
          fileSize: '2.3 MB',
          status: 'pending'
        },
        {
          id: '2',
          type: 'certificate',
          fileName: 'chung-chi-tim-mach.pdf',
          uploadDate: '2024-09-15',
          fileSize: '1.8 MB',
          status: 'pending'
        },
        {
          id: '3',
          type: 'license',
          fileName: 'giay-phep-hanh-nghe.pdf',
          uploadDate: '2024-09-15',
          fileSize: '1.2 MB',
          status: 'verified',
          verifiedBy: 'Admin'
        }
      ],
      education: [
        {
          degree: 'Bác sĩ Y khoa',
          institution: 'Đại học Y Hà Nội',
          graduationYear: 2016,
          isVerified: true
        },
        {
          degree: 'Thạc sĩ Tim mạch',
          institution: 'Đại học Y Dược TP.HCM',
          graduationYear: 2020,
          isVerified: false
        }
      ],
      workHistory: [
        {
          hospital: 'Bệnh viện Chợ Rẫy',
          position: 'Bác sĩ nội trú',
          startDate: '2016-09',
          endDate: '2018-08',
          isVerified: true
        },
        {
          hospital: 'Bệnh viện Tim Tâm Đức',
          position: 'Bác sĩ điều trị',
          startDate: '2018-09',
          endDate: '2024-08',
          isVerified: false
        }
      ],
      references: [
        {
          name: 'GS.TS Trần Văn A',
          position: 'Trưởng khoa Tim mạch',
          hospital: 'Bệnh viện Chợ Rẫy',
          phone: '0987654321',
          isContacted: false
        }
      ]
    },
    {
      id: '2',
      doctorName: 'BS. Lê Thị Hoa',
      email: 'hoa.le@email.com',
      phone: '0987654321',
      specialty: 'Nhi khoa',
      experience: 12,
      applicationDate: '2024-09-10',
      status: 'under_review',
      documents: [
        {
          id: '4',
          type: 'degree',
          fileName: 'bang-dai-hoc-y.pdf',
          uploadDate: '2024-09-10',
          fileSize: '2.1 MB',
          status: 'verified',
          verifiedBy: 'Admin'
        },
        {
          id: '5',
          type: 'certificate',
          fileName: 'chung-chi-nhi-khoa.pdf',
          uploadDate: '2024-09-10',
          fileSize: '1.9 MB',
          status: 'verified',
          verifiedBy: 'Admin'
        }
      ],
      education: [
        {
          degree: 'Bác sĩ Y khoa',
          institution: 'Đại học Y Dược TP.HCM',
          graduationYear: 2012,
          isVerified: true
        }
      ],
      workHistory: [
        {
          hospital: 'Bệnh viện Nhi Đồng 1',
          position: 'Bác sĩ chuyên khoa',
          startDate: '2012-10',
          endDate: '2024-09',
          isVerified: true
        }
      ],
      references: [
        {
          name: 'PGS.TS Phạm Thị B',
          position: 'Phó Giám đốc',
          hospital: 'Bệnh viện Nhi Đồng 1',
          phone: '0369258147',
          isContacted: true
        }
      ]
    },
    {
      id: '3',
      doctorName: 'BS. Hoàng Minh Tuấn',
      email: 'tuan.hoang@email.com',
      phone: '0369258147',
      specialty: 'Thần kinh',
      experience: 6,
      applicationDate: '2024-09-05',
      status: 'rejected',
      documents: [
        {
          id: '6',
          type: 'degree',
          fileName: 'bang-tot-nghiep.pdf',
          uploadDate: '2024-09-05',
          fileSize: '2.5 MB',
          status: 'rejected',
          notes: 'Không đủ rõ ràng, yêu cầu scan lại'
        }
      ],
      education: [
        {
          degree: 'Bác sĩ Y khoa',
          institution: 'Đại học Y Thái Nguyên',
          graduationYear: 2018,
          isVerified: false
        }
      ],
      workHistory: [],
      references: [],
      rejectionReason: 'Hồ sơ không đầy đủ, thiếu chứng chỉ chuyên khoa',
      reviewedBy: 'Admin',
      reviewDate: '2024-09-08'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ duyệt</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Đang xem xét</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Đã phê duyệt</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Từ chối</Badge>;
      default:
        return null;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Chờ xác thực</Badge>;
      case 'verified':
        return <Badge variant="outline" className="text-green-600 border-green-600">Đã xác thực</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Từ chối</Badge>;
      case 'duplicate':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Trùng lặp</Badge>;
      default:
        return null;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'degree':
        return <Award className="h-4 w-4" />;
      case 'certificate':
        return <Shield className="h-4 w-4" />;
      case 'license':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    underReview: applications.filter(a => a.status === 'under_review').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  const handleApprove = (applicationId: string) => {
    if (!reviewNote.trim()) {
      alert('Vui lòng nhập ghi chú phê duyệt');
      return;
    }
    alert('Hồ sơ đã được phê duyệt thành công!');
    setReviewNote('');
  };

  const handleReject = (applicationId: string) => {
    if (!rejectionReason.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }
    alert('Hồ sơ đã bị từ chối!');
    setRejectionReason('');
  };

  const renderApplicationDetail = (application: DoctorApplication) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Xem chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Hồ sơ bác sĩ - {application.doctorName}</DialogTitle>
          <DialogDescription>
            Ngày nộp: {application.applicationDate} • {getStatusBadge(application.status)}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="documents">Tài liệu</TabsTrigger>
            <TabsTrigger value="verification">Xác thực</TabsTrigger>
            <TabsTrigger value="review">Đánh giá</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Thông tin cá nhân</h4>
                <div className="space-y-2">
                  <div>
                    <Label>Họ tên</Label>
                    <p className="font-medium">{application.doctorName}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p>{application.email}</p>
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <p>{application.phone}</p>
                  </div>
                  <div>
                    <Label>Chuyên khoa</Label>
                    <p>{application.specialty}</p>
                  </div>
                  <div>
                    <Label>Kinh nghiệm</Label>
                    <p>{application.experience} năm</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Học vấn</h4>
                <div className="space-y-3">
                  {application.education.map((edu, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{edu.degree}</p>
                        {edu.isVerified ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">Đã xác thực</Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">Chưa xác thực</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">Tốt nghiệp: {edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Kinh nghiệm làm việc</h4>
              <div className="space-y-3">
                {application.workHistory.map((work, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{work.position}</p>
                      {work.isVerified ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">Đã xác thực</Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">Chưa xác thực</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{work.hospital}</p>
                    <p className="text-sm text-muted-foreground">
                      {work.startDate} - {work.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-3">
              {application.documents.map(doc => (
                <div key={doc.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.fileName}</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Loại: {doc.type} • Kích thước: {doc.fileSize}</p>
                          <p>Ngày upload: {doc.uploadDate}</p>
                          {doc.verifiedBy && (
                            <p>Xác thực bởi: {doc.verifiedBy}</p>
                          )}
                          {doc.notes && (
                            <p className="text-red-600">Ghi chú: {doc.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDocumentStatusBadge(doc.status)}
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {doc.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="text-green-600">
                        <Check className="h-4 w-4 mr-2" />
                        Xác thực
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        Từ chối
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="verification" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Người tham chiếu</h4>
              <div className="space-y-3">
                {application.references.map((ref, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{ref.name}</p>
                      {ref.isContacted ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">Đã liên hệ</Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">Chưa liên hệ</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{ref.position}</p>
                    <p className="text-sm text-muted-foreground">{ref.hospital}</p>
                    <p className="text-sm text-muted-foreground">{ref.phone}</p>
                    {!ref.isContacted && (
                      <Button variant="outline" size="sm" className="mt-2">
                        Liên hệ xác thực
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="review" className="space-y-4">
            {application.status === 'pending' && (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Hồ sơ này đang chờ phê duyệt. Vui lòng xem xét kỹ các tài liệu và thông tin.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="review-note">Ghi chú phê duyệt</Label>
                    <Textarea
                      id="review-note"
                      placeholder="Nhập ghi chú về quá trình phê duyệt..."
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rejection-reason">Lý do từ chối (nếu từ chối)</Label>
                    <Textarea
                      id="rejection-reason"
                      placeholder="Nhập lý do từ chối hồ sơ..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="text-green-600 border-green-600"
                      variant="outline"
                      onClick={() => handleApprove(application.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Phê duyệt
                    </Button>
                    <Button 
                      className="text-red-600 border-red-600"
                      variant="outline"
                      onClick={() => handleReject(application.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Từ chối
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {application.status !== 'pending' && (
              <div className="space-y-3">
                {application.reviewNotes && (
                  <div>
                    <Label>Ghi chú đánh giá</Label>
                    <p className="mt-1 p-3 bg-muted rounded">{application.reviewNotes}</p>
                  </div>
                )}
                {application.rejectionReason && (
                  <div>
                    <Label>Lý do từ chối</Label>
                    <p className="mt-1 p-3 bg-red-50 border border-red-200 rounded text-red-700">
                      {application.rejectionReason}
                    </p>
                  </div>
                )}
                {application.reviewedBy && (
                  <div className="text-sm text-muted-foreground">
                    Đánh giá bởi: {application.reviewedBy} • {application.reviewDate}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Phê duyệt hồ sơ bác sĩ</h1>
        <p className="text-muted-foreground">Quản lý và phê duyệt hồ sơ đăng ký của bác sĩ</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-medium">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Tổng hồ sơ</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-medium">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Chờ duyệt</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-medium">{stats.underReview}</div>
            <div className="text-sm text-muted-foreground">Đang xem xét</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Check className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-medium">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">Đã duyệt</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label>Lọc theo trạng thái:</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="under_review">Đang xem xét</SelectItem>
                <SelectItem value="approved">Đã phê duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">
          Danh sách hồ sơ ({filteredApplications.length})
        </h2>
        
        <div className="space-y-3">
          {filteredApplications.map(application => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <User className="h-10 w-10 text-muted-foreground bg-muted rounded-full p-2" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{application.doctorName}</h3>
                        {getStatusBadge(application.status)}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><strong>Chuyên khoa:</strong> {application.specialty}</p>
                        <p><strong>Kinh nghiệm:</strong> {application.experience} năm</p>
                        <p><strong>Email:</strong> {application.email}</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Nộp hồ sơ: {application.applicationDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-2">
                      {application.documents.length} tài liệu
                    </div>
                    {application.reviewedBy && (
                      <p className="text-xs text-muted-foreground">
                        Xem xét bởi: {application.reviewedBy}
                      </p>
                    )}
                  </div>
                </div>

                {application.rejectionReason && (
                  <Alert className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Lý do từ chối:</strong> {application.rejectionReason}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {application.documents.map(doc => 
                      getDocumentStatusBadge(doc.status)
                    ).slice(0, 3)}
                  </div>
                  
                  <div className="flex gap-2">
                    {renderApplicationDetail(application)}
                    {application.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-blue-600 border-blue-600"
                        >
                          Xem xét
                        </Button>
                        <Button 
                          size="sm" 
                          className="text-green-600 border-green-600"
                          variant="outline"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Phê duyệt
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Không có hồ sơ nào phù hợp</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}