import axios from "axios";
import { getLocalAuth } from "./local-auth";
import { Alert } from "react-native";

export const addFriend = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const friendRequestBody = { sender: _id, receiver: friendId };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/friend",
      friendRequestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      goOn();
    } else {
      Alert.alert(`Your request fail ${response.statusText} `);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addBFF = async (friendId: string, goOn: () => void) => {
  try {
    const { token, _id } = await getLocalAuth();
    const bffRequestBody = { sender: _id, receiver: friendId };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/bff",
      bffRequestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      goOn();
    } else {
      Alert.alert(`Your request fail ${response.statusText} `);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const block = async (friendId: string) => {
  try {
    const { token, _id } = await getLocalAuth();
    const bffRequestBody = { sender: _id, receiver: friendId };
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/request/block",
      bffRequestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      Alert.alert(`Your request fail ${response.statusText} `);
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
