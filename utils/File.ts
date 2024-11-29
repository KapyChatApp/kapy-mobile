export const uriToFile = async (uri: string, type: string): Promise<File> => {
    const fileData = await fetch(uri); // Lấy dữ liệu từ URI
    const blob = await fileData.blob(); // Chuyển đổi thành Blob
    return new File([blob], "fileName", { type });
  };
