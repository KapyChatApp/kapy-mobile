import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocalAuth = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("You are unauthenticated!");
  }
  const user = await AsyncStorage.getItem("user");
  if (!user) {
    throw new Error("User not found!");
  }
  const { _id } = JSON.parse(user);
  return {token,_id};
};
