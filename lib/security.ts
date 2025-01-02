import axios from "axios";
import { getLocalAuth } from "./local";
import { Alert } from "react-native";

export const getMyAuthHistory = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/auth-history",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async (oldPassword:string, newPassword:string, goOn:()=>void) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.patch(process.env.EXPO_PUBLIC_BASE_URL + "/auth/change-password", { oldPassword: oldPassword, newPassword: newPassword }, {
      headers: {
        "Content-Type": "application/json",
        Authorization:`${token}`
      }
    })
    if (response.status === 200 || response.status === 200){
     goOn()
    } else {
      Alert.alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const sendOTP = async (phoneNumber:string, goOn:()=>void) => {
  try {
    const response = await axios.post(process.env.EXPO_PUBLIC_BASE_URL + "/auth/send-otp", {}, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { phoneNumber: phoneNumber }
    });
    if (response.status === 200 || response.status === 201) { 
      goOn();
    } else {
      Alert.alert("An error occur, please try again!");
    }

  } catch (error) {
    console.log("error");
    throw error;
  }
}

export const forgotPassword = async (otp: string, phoneNumber: string, newPassword: string, goOn:()=>void)=>{
  try {
    const response = await axios.patch(process.env.EXPO_PUBLIC_BASE_URL + "/auth/verify-forgot-password", {
      otp: otp,
      phoneNumber: phoneNumber,
      newPassword:newPassword,
    });
    if (response.status === 200 || response.status === 201) {
      goOn();
    } else {
      Alert.alert(response.data.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}