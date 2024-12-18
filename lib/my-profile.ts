import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalAuth } from "./local-auth"
import axios from "axios";
import { generateRandomNumberString } from "@/utils/Random";
import { Alert } from "react-native";

export const getMyProfile = async ()=>{
    try{
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
        process.env.EXPO_PUBLIC_BASE_URL + "/mine/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const userData = response.data;
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      console.log("this is localuser " ,await AsyncStorage.getItem("user"));
      return userData;
    } catch(error){
        console.log(error);
        throw error;
    }
}

export const uploadAvatar = async (uri:any, setStartLoading:any, setIsLoading:any,setEndLoading:any, setNotIsLoading:any,setReload :any) => {
  const formData = new FormData();

  try {
    setStartLoading();
    setIsLoading();
    const token = await AsyncStorage.getItem("token");

    // Tạo đối tượng tệp từ URI
    formData.append("file", {
      uri: uri,
      name: generateRandomNumberString(10)?.toString(), 
      type: "image/jpeg",
    } as any); 

    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/media/upload-avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );

    if (response.status == 200 || response.status == 201) {
      setNotIsLoading();
      const timmer = setTimeout(() => setEndLoading(), 1500);
      await getMyProfile();
      setReload();
      return () => clearInterval(timmer);
    } else {
      Alert.alert(
        "Upload Failed",
        "There was an issue uploading your image."
      );
    }
  } catch (error) {
    console.error("Upload Error:", error);
    Alert.alert("Error", "Failed to upload image. Please try again.");
  } 
};

export const uploadBackground = async (uri:any, setStartLoading:any, setIsLoading:any,setEndLoading:any, setNotIsLoading:any,setReload :any) => {
  const formData = new FormData();

  try {
    setStartLoading();
    setIsLoading();
    const token = await AsyncStorage.getItem("token");

    // Tạo đối tượng tệp từ URI
    formData.append("file", {
      uri: uri,
      name: generateRandomNumberString(10)?.toString(), 
      type: "image/jpeg",
    } as any); 

    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/media/upload-background",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );

    if (response.status == 200 || response.status == 201) {
      setNotIsLoading();
      const timmer = setTimeout(() => setEndLoading(), 1500);
      await getMyProfile();
      setReload();
      return () => clearInterval(timmer);
    } else {
      Alert.alert(
        "Upload Failed",
        "There was an issue uploading your image."
      );
    }
  } catch (error) {
    console.error("Upload Error:", error);
    Alert.alert("Error", "Failed to upload image. Please try again.");
  } 
};