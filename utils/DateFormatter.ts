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
  
    // Tính khoảng cách thời gian (theo giây)
    const secondsDiff = Math.floor((nowUtc.getTime() - utcDate.getTime()) / 1000);
  
    // Nếu thời gian nhỏ hơn 1 phút (60 giây), hiển thị số giây
    if (secondsDiff < 60) {
      return `${secondsDiff} seconds ago`;
    }
  
    // Nếu lớn hơn 1 phút, dùng `formatDistance`
    return formatDistance(utcDate, nowUtc, { addSuffix: true });
  };

  export const millisToMMSS = (timeInMillis: number) => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };