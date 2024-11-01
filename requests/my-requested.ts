import axios from "axios";
import { getLocalAuth } from "./local-auth";

export const getMyRequesteds = async () => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/requested",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
