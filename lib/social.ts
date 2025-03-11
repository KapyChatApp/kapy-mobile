import axios from "axios";
import { getLocalAuth } from "./local";

export const getMyComunityPosts = async (page: number, limit: number) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/social/personal",
      {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          page: page,
          limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
