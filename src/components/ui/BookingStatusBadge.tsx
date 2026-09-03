import React from 'react';
import { BookingStatus } from '../../types';
import { Badge } from './Badge';
import { useTranslation } from 'react-i18next';

interface BookingStatusBadgeProps {
  status: BookingStatus;
  isEmergency?: boolean;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, isEmergency }) => {
  const { t } = useTranslation();

  const getVariant = (s: BookingStatus) => {
    switch (s) {
      case 'pending': return 'warning';
      case 'accepted': return 'info';
      case 'in_progress': return 'coop';
      case 'completed': return 'success';
      case 'cancelled':
      case 'rejected': return 'danger';
      default: return 'neutral';
    }
  };

  const getLabel = (s: BookingStatus) => {
    return t(`booking.status.${s}`, s);
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      {isEmergency && (
        <Badge variant="emergency" dot size="sm">
          EMERGENCY
        </Badge>
      )}
      <Badge variant={getVariant(status)} dot>
        {getLabel(status)}
      </Badge>
    </div>
  );
};
