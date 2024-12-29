import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { getLocalAuth } from "./local";

export const unFriend = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const denyBody = { sender: friendId, receiver: _id };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/unfriend",
      denyBody,
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
      Alert.alert("Cannot unFriend now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const unBFF = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const denyBody = { sender: friendId, receiver: _id };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/unbff",
      denyBody,
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
      Alert.alert("Cannot unBFF now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unBlock = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const unBlockBody = { sender: _id, receiver: friendId };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/unblock",
      unBlockBody,
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
      Alert.alert("Cannot unblock now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
