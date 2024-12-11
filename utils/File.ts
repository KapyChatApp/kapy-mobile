import * as FileSystem from 'expo-file-system';

export const prepareFileForUpload = async (fileUri:string, fileName:string) => {
  try {
    const newUri = `${FileSystem.cacheDirectory}${fileName}`;
    await FileSystem.copyAsync({
      from: fileUri,
      to: newUri,
    });
    return newUri;
  } catch (error) {
    console.error('Error preparing file:', error);
    throw error;
  }
};