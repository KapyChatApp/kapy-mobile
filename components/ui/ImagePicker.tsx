import React, { useState, useEffect } from "react";
import { View, Image, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useClickOutside } from "react-native-click-outside";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateRandomNumberString } from "@/utils/Random";

const ImagePickerBox = ({ setIsOpen, toEndPoint, aspect }: any) => {
  const ref = useClickOutside<View>(() => setIsOpen(false));
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      pickImage();
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      handleImageUpload(imageUri);
    }
  };

  const handleImageUpload = async (uri: string) => {
    const formData = new FormData();

    try {
      setUploading(true);
      const token = await AsyncStorage.getItem("token");

      // Tạo đối tượng tệp từ URI
      formData.append("file", {
        uri: uri,
        name: generateRandomNumberString(10)?.toString(), // Tên tệp
        type: "image/jpeg", // Hoặc 'image/png'
      } as any); // Dùng 'as any' để tránh lỗi TypeScript

      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + toEndPoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Upload Successful!",
          "Your profile picture has been updated."
        );
      } else {
        Alert.alert(
          "Upload Failed",
          "There was an issue uploading your image."
        );
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View
      ref={ref}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    ></View>
  );
};

export default ImagePickerBox;
