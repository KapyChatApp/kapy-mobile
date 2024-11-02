import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalAuth } from "./local-auth"
import axios from "axios";

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
      return userData;
    } catch(error){
        console.log(error);
        throw error;
    }
}