import { CreateRateProps } from "@/types/rate";
import { getLocalAuth } from "./local";
import axios from "axios";
import { Alert } from "react-native";

export const getRatesOfUser = async (userId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/point/user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { userId: userId },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRate = async (
  param: CreateRateProps,
  setStartLoading: () => void,
  setEndLoading: () => void,
  setIsLoading: () => void,
  setNotIsLoading: () => void,
  setReload: () => void
) => {
  try {
    setStartLoading();
    setIsLoading();
    const { token } = await getLocalAuth();
    const response = await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/point/create",
      param,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      setNotIsLoading();
      setTimeout(() => setEndLoading(), 1500);
      setReload();
      return response.data;
    } else {
      Alert.alert("Cannot rate now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editRate = async (
  pointId: string,
  point: number,
  message: string,
  setStartLoading: () => void,
  setEndLoading: () => void,
  setIsLoading: () => void,
  setNotIsLoading: () => void,
  setReload: () => void
) => {
  try {
    setStartLoading();
    setIsLoading();
    const { token } = await getLocalAuth();
    const response = await axios.patch(
      process.env.EXPO_PUBLIC_BASE_URL + "/point/edit",
      { point: point, message: message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { pointId: pointId },
      }
    );
    if (response.status === 200 || response.status === 201) {
      setNotIsLoading();
      setTimeout(() => setEndLoading(), 1500);
      setReload();
      return response.data;
    } else {
      Alert.alert("Cannot edit now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRate = async (
  pointId: string,
  setStartLoading: () => void,
  setEndLoading: () => void,
  setIsLoading: () => void,
  setNotIsLoading: () => void,
  setReload: () => void
) => {
  try {
    setStartLoading();
    setIsLoading();
    const { token } = await getLocalAuth();
    const response = await axios.delete(
      process.env.EXPO_PUBLIC_BASE_URL + "/point/delete-my",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { pointId: pointId },
      }
    );
    if (response.status === 200 || response.status === 201) {
      setNotIsLoading();
      setTimeout(() => setEndLoading(), 1500);
      setReload();
      return;
    } else {
      Alert.alert("Cannot edit now!");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
