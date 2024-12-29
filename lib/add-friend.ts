import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getLocalAuth } from "./local";

export const findUserByPhoneNumber = async (query: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/user/find",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { phonenumber: query },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMySuggest = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/friend/suggest",
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
