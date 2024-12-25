import { LocationProps } from "@/types/location";
import { getLocalAuth } from "./local-auth";
import axios from "axios";
import {
  CreateMapStatusProps,
  EditMapStatusProps,
  MapStatusProps,
} from "@/types/map";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const initiateMapStatus = async (location: LocationProps) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/livemap/initiate",
      location,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyBffMapStatus = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/livemap/bff",
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
}

export const getMyMapStatus=async ()=>{
    try{
        const {token} = await getLocalAuth();
        const response = await axios.get(process.env.EXPO_PUBLIC_BASE_URL+"/mine/map-status",{headers:{
            "Content-Type":"application/json",
            Authorization:`${token}`
        }});
        return response.data;
    }catch(error){
        console.log(error);
        throw error; 
    }
}
export const createMapStatus = async (
  param: CreateMapStatusProps,
  startLoading:any,
  endLoading:any,
  isLoading:any,
  notIsLoading:any,
  goOn?: (data: MapStatusProps) => void,
) => {
  try {
    startLoading();
    isLoading();
    const { token } = await getLocalAuth();
    const formData = new FormData();
    formData.append("caption", param.caption);
    formData.append("file", param.file);
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/livemap/status/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      goOn?.(response.data);
      notIsLoading();
      setTimeout(()=>endLoading(),1000);
      return response.data;
    } else {
      Alert.alert("Cannot create status now, please try again!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editMapStatus = async (
  statusId: string,
  param: EditMapStatusProps,
  startLoading:any,
  endLoading:any,
  isLoading:any,
  notIsLoading:any,
  goOn?: (data: MapStatusProps) => void
) => {
  try {
    startLoading();
    isLoading();
    const { token } = await getLocalAuth();
    const formData = new FormData();
    formData.append("caption", param.caption);
    formData.append("file", param.file);
    formData.append("keepOldContent", param.keepOldContent.toString());
    const response = await axios.patch(
      process.env.EXPO_PUBLIC_BASE_URL + "/livemap/status/edit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/formdata",
          Authorization: `${token}`,
        },
        params: { statusId: statusId },
      }
    );
    if (response.status === 200 || response.status === 201) {
      goOn?.(response.data);
      notIsLoading();
      setTimeout(()=>endLoading(),1000);
      return response.data;
    } else {
      Alert.alert("Cannot edit Status now, please try again!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMapStatus = async (startLoading:any,
  endLoading:any,
  isLoading:any,
  notIsLoading:any,goOn:()=>void) => {
  try {
    startLoading();
    isLoading();
    const { token } = await getLocalAuth();
    const response = await axios.delete(
      process.env.EXPO_PUBLIC_BASE_URL + "/livemap/status/delete",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if(response.status===200|| response.status===201){
      endLoading();
      setTimeout(()=>notIsLoading(),1000);
      goOn();
      const statusString = await AsyncStorage.getItem("my-map-status");
      const status = await JSON.parse(statusString!);
      const blankStatus =  {...status, caption:undefined, content:undefined}
      await AsyncStorage.setItem("my-map-status", JSON.stringify(blankStatus));
    }else{
      Alert.alert("Cannot delete Status now! Please try again!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
