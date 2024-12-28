import React, { createContext, useContext, useState, ReactNode } from 'react';

type CameraContextType = {
  isCameraOpen: boolean;
  photoUri: string | null;  // Thêm photoUri để lưu ảnh chụp
  openCamera: () => void;
  closeCamera: () => void;
  setPhotoUri: (uri: string) => void;  // Hàm để cập nhật photoUri
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string>("");  // Khởi tạo photoUri

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);
  const updatePhotoUri = (uri: string) => setPhotoUri(uri);  // Cập nhật photoUri

  return (
    <CameraContext.Provider
      value={{ isCameraOpen, photoUri, openCamera, closeCamera, setPhotoUri: updatePhotoUri }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
};
