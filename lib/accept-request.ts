import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { getLocalAuth } from "./local-auth";

export const acceptFriend = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const acceptBody = { sender: friendId, receiver: _id };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/accept-friend",
      acceptBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (response.status == 200 || response.status == 201) {
      goOn();
    } else {
      Alert.alert("Cannot accept now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const acceptBFF = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const acceptBody = { sender: friendId, receiver: _id };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/accept-bff",
      acceptBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (response.status == 200 || response.status == 201) {
      goOn();
    } else {
      Alert.alert("Cannot accept now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
