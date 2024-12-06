import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getMyFriends = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      process.env.EXPO_PUBLIC_BASE_URL + "/mine/friends",
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
    console.log("failed");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
