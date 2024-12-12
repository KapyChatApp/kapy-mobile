import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';

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

export const openWebFile = async (fileUrl:string)=>{
    try {
      await WebBrowser.openBrowserAsync(fileUrl);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };