import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Settings,
  Mail,
  Smartphone
} from 'lucide-react';
import { UserRole } from '../App';

interface NotificationScreenProps {
  userRole: UserRole;
}

interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'result' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export function NotificationScreen({ userRole }: NotificationScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Lịch hẹn sắp tới',
      message: 'Bạn có lịch khám với BS. Nguyễn Văn A vào 14:00 ngày mai',
      time: '2 giờ trước',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'result',
      title: 'Kết quả xét nghiệm',
      message: 'Kết quả xét nghiệm máu của bạn đã có. Vui lòng xem chi tiết.',
      time: '5 giờ trước',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Nhắc nhở uống thuốc',
      message: 'Đã đến giờ uống thuốc theo đơn của BS. Trần Thị B',
      time: '1 ngày trước',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'system',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống đã được cập nhật với các tính năng mới',
      time: '2 ngày trước',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    resultNotifications: true,
    medicationReminders: true,
    systemUpdates: false
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'result':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">Cao</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">Trung bình</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs">Thấp</Badge>;
      default:
        return null;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotificationList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          Thông báo ({unreadCount} chưa đọc)
        </h2>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map(notification => (
          <Card 
            key={notification.id} 
            className={`cursor-pointer transition-colors ${
              !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${!notification.isRead ? 'text-blue-900' : ''}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(notification.priority)}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Cài đặt thông báo</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Quản lý cách bạn nhận thông báo từ hệ thống
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Kênh nhận thông báo
          </CardTitle>
          <CardDescription>
            Chọn cách bạn muốn nhận thông báo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-notifications">Thông báo qua Email</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo qua địa chỉ email đã đăng ký
                </p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={notificationSettings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="sms-notifications">Thông báo qua SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo qua tin nhắn SMS
                </p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={notificationSettings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Loại thông báo
          </CardTitle>
          <CardDescription>
            Chọn loại thông báo bạn muốn nhận
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="appointment-reminders">Nhắc nhở lịch hẹn</Label>
              <p className="text-sm text-muted-foreground">
                Nhắc nhở trước lịch khám 1 ngày và 1 giờ
              </p>
            </div>
            <Switch
              id="appointment-reminders"
              checked={notificationSettings.appointmentReminders}
              onCheckedChange={(checked) => handleSettingChange('appointmentReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="result-notifications">Kết quả khám</Label>
              <p className="text-sm text-muted-foreground">
                Thông báo khi có kết quả xét nghiệm và chẩn đoán
              </p>
            </div>
            <Switch
              id="result-notifications"
              checked={notificationSettings.resultNotifications}
              onCheckedChange={(checked) => handleSettingChange('resultNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="medication-reminders">Nhắc nhở uống thuốc</Label>
              <p className="text-sm text-muted-foreground">
                Nhắc nhở uống thuốc theo đơn bác sĩ kê
              </p>
            </div>
            <Switch
              id="medication-reminders"
              checked={notificationSettings.medicationReminders}
              onCheckedChange={(checked) => handleSettingChange('medicationReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="system-updates">Cập nhật hệ thống</Label>
              <p className="text-sm text-muted-foreground">
                Thông báo về các tính năng mới và bảo trì hệ thống
              </p>
            </div>
            <Switch
              id="system-updates"
              checked={notificationSettings.systemUpdates}
              onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Thông báo</h1>
          <p className="text-muted-foreground">Quản lý thông báo và nhắc nhở</p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-xs">
            {unreadCount}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Cài đặt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          {renderNotificationList()}
        </TabsContent>

        <TabsContent value="settings">
          {renderNotificationSettings()}
        </TabsContent>
      </Tabs>
    </div>
  );
}