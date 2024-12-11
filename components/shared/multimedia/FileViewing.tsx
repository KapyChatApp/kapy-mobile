import { View, Text, Alert, Button, Linking } from "react-native";
import React from "react";
import { FileProps } from "@/types/file";
import FileViewer from 'react-native-file-viewer';
const FileViewing = ({file}:{file:FileProps}) => {
  const openFile = async () => {
    const { url, format } = file;

    if (!url) {
      Alert.alert("Error", "File URL is missing");
      return;
    }

    try {
      if (format === "pdf") {
        await FileViewer.open(url);
      } else if (format === "docx") {
        await FileViewer.open(url);
      } else if (format?.startsWith("image")) {
        Linking.openURL(url).catch((err) =>
          Alert.alert("Error", "Failed to open image")
        );
      } else if (format === "text") {
        Linking.openURL(url).catch((err) =>
          Alert.alert("Error", "Failed to open text file")
        );
      } else {
        Alert.alert("Unsupported File Type", "The file type is not supported");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while opening the file");
    }
  };

  return (
    <View>
      <Text>{file.fileName || "Unknown File"}</Text>
      <Button title="Open File" onPress={openFile} />
    </View>
  );
};

export default FileViewing;
