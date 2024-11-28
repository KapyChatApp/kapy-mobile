import React, { createContext, useContext, useState, ReactNode } from "react";

// Interface cho context
interface MarkReadContextProps {
  markAsRead: (boxId: string) => void;
  markAsUnread: (boxId: string) => void;
  updateDefaultMessages: (boxIds: string[]) => void; // Hàm mới
  unreadMessages: Record<string, boolean>;
}

// Context
const MarkReadContext = createContext<MarkReadContextProps | undefined>(undefined);

export const MarkReadProvider = ({ children }: { children: ReactNode }) => {
  // Khởi tạo giá trị mặc định cho unreadMessages
  const [unreadMessages, setUnreadMessages] = useState<Record<string, boolean>>({});

  // Hàm đánh dấu là đã đọc
  const markAsRead = (boxId: string) => {
    setUnreadMessages((prev) => ({
      ...prev,
      [boxId]: true, // Đánh dấu đã đọc
    }));
  };

  // Hàm đánh dấu là chưa đọc
  const markAsUnread = (boxId: string) => {
    setUnreadMessages((prev) => {
      if (prev[boxId] === false) {
        console.log(`Box ${boxId} đã là trạng thái 'unread'. Không cần cập nhật.`);
        return prev; // Không thay đổi trạng thái
      }
  
      const updated = { ...prev, [boxId]: false };
      console.log("Updated unreadMessages:", updated);
      return updated; // Cập nhật giá trị mới
    });
  };

  // Hàm cập nhật giá trị mặc định cho các boxId là false
  const updateDefaultMessages = (boxIds: string[]) => {
    setUnreadMessages((prev) => {
      // Tạo một bản sao của unreadMessages với tất cả các boxId mới được đặt là false
      const updatedMessages = { ...prev };
      boxIds.forEach((boxId) => {
        updatedMessages[boxId] = false; // Cập nhật trạng thái của các boxId là false
      });
      return updatedMessages;
    });
  };

  return (
    <MarkReadContext.Provider value={{ markAsRead, markAsUnread, updateDefaultMessages, unreadMessages }}>
      {children}
    </MarkReadContext.Provider>
  );
};

// Hook để sử dụng context
export const useMarkReadContext = () => {
  const context = useContext(MarkReadContext);
  if (!context) {
    throw new Error("useMarkReadContext must be used within a MarkReadProvider");
  }
  return context;
};
