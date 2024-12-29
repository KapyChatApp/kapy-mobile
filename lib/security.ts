import axios from "axios";
import { getLocalAuth } from "./local";

export const getMyAuthHistory = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/auth-history",
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
