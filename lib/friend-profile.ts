import axios from "axios";
import { getLocalAuth } from "./local-auth";

export const getFriendProfile = async (friendId: string|string[], goOn:()=>void) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/friend/profile",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { friendId: friendId },
      }
    );
    if(response.status==404){
        return false;
    }
    goOn();
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};