import { FriendBoxProps } from "@/types/friend";
import axios from "axios";
import { getLocalAuth } from "./local-auth";

export const getMyBlocks = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/blocks",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const myBlocks: FriendBoxProps[] = response.data;
    return myBlocks;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
