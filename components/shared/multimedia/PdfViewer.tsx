import React from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const PdfViewer = ({ fileUri }:{fileUri:string}) => {
  const openPdf = async () => {
    try {
      await WebBrowser.openBrowserAsync(fileUri);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  return (
    <Button title="Open PDF" onPress={openPdf} />
  );
};

export default PdfViewer;
