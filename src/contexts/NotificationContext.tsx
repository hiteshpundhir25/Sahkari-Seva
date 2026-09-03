import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '../types';
import { dataService } from '../services/dataService';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const list = dataService.getNotificationsByUser(user.id);
    setNotifications(list);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    dataService.markNotificationAsRead(id);
    fetchNotifications();
  };

  const markAllAsRead = () => {
    if (user) {
      dataService.markAllNotificationsAsRead(user.id);
      fetchNotifications();
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      refreshNotifications: fetchNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
