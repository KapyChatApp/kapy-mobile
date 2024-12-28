import { Header } from "react-native/Libraries/NewAppScreen";
import { getLocalAuth } from "./local";
import axios from "axios";

export const findMyFriend = async (q: string) => {
  try {
    const { token } = await getLocalAuth();
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/friend/find",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: { q: q },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
