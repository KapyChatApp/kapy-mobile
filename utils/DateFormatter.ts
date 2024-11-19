import { formatDistance } from "date-fns";

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  export const formatDateDistance = (date: string | Date) => {
    const utcDate = new Date(date);
  
    const nowUtc = new Date(new Date().toISOString()); 
  
    return formatDistance(utcDate, nowUtc, { addSuffix: true });
  };