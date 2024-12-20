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
      await AsyncStorage.setItem("friends",JSON.stringify((response.data)));
      for (const friend of response.data) {
        await AsyncStorage.setItem(
          `friend-${friend._id}`,
          JSON.stringify(friend)
        );
      }
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
