import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getLocalAuth = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("You are unauthenticated!");
  }
  const user = await AsyncStorage.getItem("user");
  if (!user) {
    throw new Error("User not found!");
  }
  const { _id } = JSON.parse(user);
  return {token,_id};
};

export const checkIn = async ()=>{
  try{
    const {token} = await getLocalAuth();
    await axios.post(process.env.EXPO_PUBLIC_BASE_URL + "/user/online",{},{headers:{

      "Content-Type":"application/json",
      Authorization:`${token}`
    }});
  }catch(error){
    console.log(error);
    throw error;
  }
}

export const checkOut = async ()=>{
  try{
    const {token} = await getLocalAuth();
    await axios.post(process.env.EXPO_PUBLIC_BASE_URL + "/user/offline",{},{headers:{
      "Content-Type":"application/json",
      Authorization:`${token}`
    }});
  }catch(error){
    console.log(error);
    throw error;
  }
}