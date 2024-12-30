import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";
import Icon from "./Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { getLocalAuth } from "@/lib/local";

const SignOutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const deviceId = await AsyncStorage.getItem("device-id");
    const { token } = await getLocalAuth();
    const storedToken = token;
    const storedDeviceId = deviceId;
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(auth)" }],
      })
    );
    await axios.post(
      process.env.EXPO_PUBLIC_BASE_URL + "/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${storedToken}`,
        },
        params: {
          id: storedDeviceId,
        },
      }
    );
    
  };
  return (
    <TouchableOpacity
      className="bg-deny w-[115px] h-[41px] rounded-full flex flex-row items-center justify-center"
      onPress={handleLogout}
    >
      <Text className="text-16 text-white font-helvetica">Sign out</Text>
      <Icon size={26} iconURL={IconURL.leave_d}></Icon>
    </TouchableOpacity>
  );
};

export default SignOutButton;
