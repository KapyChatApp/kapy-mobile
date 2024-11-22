import { CreateRateProps } from "@/types/rate";
import { getLocalAuth } from "./local-auth";
import axios from "axios";

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
