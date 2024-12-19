import axios from "axios";
import { getLocalAuth } from "./local-auth";

export const getRealtimeOfUser = async (userId: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/realtime/user",
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
