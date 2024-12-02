import * as FileSystem from 'expo-file-system';

export const uriToFile = async (uri: string, type: string): Promise<File> => {
    const fileData = await fetch(uri); // Lấy dữ liệu từ URI
    const blob = await fileData.blob(); // Chuyển đổi thành Blob
    return new File([blob], "fileName", { type });
  };

  export const audioFromUri = async (uri: string) => {
    if (uri) {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        
        const fileName = uri.split('/').pop() || 'audio.m4a'; 
  
        const file = new File([blob], fileName, { type: blob.type });
  
        console.log("file: ", file);
        return file;
      } catch (err) {
        console.error('Không thể lấy tệp từ URI', err);
        return undefined;
      }
    }
  };