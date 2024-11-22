import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getLocalAuth } from "./local-auth";
import { FriendBoxProps } from "@/types/friend";

export const getMyBFFs = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/bffs",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const myBFfs: FriendBoxProps[] = response.data;
    return myBFfs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
