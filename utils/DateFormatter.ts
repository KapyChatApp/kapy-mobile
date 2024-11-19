import { formatDistanceToNow } from "date-fns";

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  export const formatDateDistance = (date: string | Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };