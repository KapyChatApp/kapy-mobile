import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useRouter} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OutsidePressHandler, { EventProvider } from "react-native-outside-press";
import { bgLight500Dark10 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    try {
      console.log("aaa");
      const res = await axios.post(
        process.env.EXPO_PUBLIC_BASE_URL + "/auth/check-token",
        { token: token }
      );
      if (res.data.isAuthenticated) {
        console.log("goooo")
        router.push("/(tabs)/message");
      } else {
        router.push("/(auth)/sign-in");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <SafeAreaProvider>
      <View
        className={`flex-1 items-center justify-center h-full w-full ${bgLight500Dark10}`}
      >
        <TouchableOpacity onPress={()=>router.push("/(auth)/sign-in")}><Text>Goooo</Text></TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default index;
