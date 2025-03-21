import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import DataInputBig from "@/components/ui/DataInputBig";
import { IconURL } from "@/constants/IconURL";
import SubmitButton from "@/components/ui/SubmitButton";
import {useNavigation, useRouter } from "expo-router";
import SecretInput from "@/components/ui/SecretInput";
import OtherSign from "@/components/ui/OtherSign";
import { useTheme } from "@/context/ThemeProviders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLoginProps } from "@/types/user";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { bgLight500Dark10 } from "@/styles/theme";
import { getMyProfile } from "@/lib/my-profile";
import { getDeviceInfo, synchronizeData } from "@/lib/local";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const SignInPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.post(
          process.env.EXPO_PUBLIC_BASE_URL + "/auth/check-token",
          { token: token }
        );
        if (res.data.isAuthenticated) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "(tabs)" }],
            })
          );
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    checkToken();
  }, [navigation]);

  const handleSignIn = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      const param: UserLoginProps = { ...deviceInfo,phoneNumber, password };
      const loginResponse = await axios.post(process.env.EXPO_PUBLIC_BASE_URL + "/auth/login", param, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await AsyncStorage.clear();
      const loginData = loginResponse.data;
      const token = loginData.token;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("device-id",loginResponse.data.device._id);
      const savedToken = await AsyncStorage.getItem("token")
    
      if (savedToken) {
       router.push("/(auth)/sync");
      }
    
    } catch (error) {
     console.log(error);
     Alert.alert("Invalid Phonenumber or Password");
     throw error;
    }
  };
  return (
    <View className={`wrapper flex-1 justify-center items-center flex flex-col ${bgLight500Dark10}`} >
      <Text className="text-40 color text-cardinal mb-10 font-helvetica-bold">
        Sign in
      </Text>
      <View className="flex justify-between items-center">
        <View className="input-wrapper flex flex-col" style={{ gap: 16 }}>
          <DataInputBig
            placeHolder="Phonenumber or Email"
            iconURL={theme === "light" ? IconURL.user_l : IconURL.user_d}
            onChangeText={setPhoneNumber}
          ></DataInputBig>
          <SecretInput
            placeHolder="Password"
            iconURL={
              theme === "light" ? IconURL.password_l : IconURL.password_d
            }
            onChangeText={setPassword}
          ></SecretInput>
        </View>
        <OtherSign
          cause="Forgot your password?"
          solving="Reset now!"
          link="/forgot-password"
        ></OtherSign>
      </View>
      <SubmitButton
        isPressed={isPressed}
        label="Sign in"
        onPress={handleSignIn}
        // () => {
        //   setIsPressed(!isPressed);
        //   router.push("/message");
        // }
      ></SubmitButton>
      <OtherSign
        cause="Don't have any account?"
        solving="Sign up now"
        link="/sign-up"
      ></OtherSign>
      {loading? <LoadingSpinner loading={loading} title="Synchronizing"/>:null}
    </View>
  );
};

export default SignInPage;
