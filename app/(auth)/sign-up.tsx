import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DataInputBig from "@/components/ui/DataInputBig";
import SecretInput from "@/components/ui/SecretInput";
import { Link, useNavigation, useRouter } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import SubmitButton from "@/components/ui/SubmitButton";
import OtherSign from "@/components/ui/OtherSign";
import CheckBox from "react-native-check-box";
import { useTheme } from "@/context/ThemeProviders";
import Icon from "@/components/ui/Icon";
import { UserRegisterProps } from "@/types/user";
import axiosInstance from "@/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { bgLight500Dark10 } from "@/styles/theme";
const SignUpPage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "(tabs)" }],
          }))
        }
    };

    checkToken();
  }, [navigation]);


  const handleSignUp = async () => {
    
    const param: UserRegisterProps = {
      firstName,
      lastName,
      nickName,
      phoneNumber,
      email,
      password,
      rePassword,
    };

    try {
      // Gửi request đăng ký
      const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + "/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(param),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const signInParam = { phoneNumber, password };

      const loginResponse = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInParam),
        }
      );

      if (!loginResponse.ok) {
        throw new Error("Network response was not ok during login");
      }

      const loginData = await loginResponse.json();

      const token = loginData.token;
      await AsyncStorage.setItem("token", token);
      const savedToken = await AsyncStorage.getItem("token");

      if (savedToken) {
        router.push("/(tabs)/message");
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Error:", error);
    }
  };
  return (
    <View className={`wrapper flex-1 justify-center items-center flex flex-col ${bgLight500Dark10}`}>
      <Text className="text-40 color text-cardinal mb-10 font-helvetica-bold">
        Sign up
      </Text>
      <View className="flex justify-between items-center">
        <View className="input-wrapper flex flex-col" style={{ gap: 16 }}>
          <DataInputBig
            placeHolder="Firstname"
            iconURL={
              theme === "light" ? IconURL.firstname_l : IconURL.firstname_d
            }
            onChangeText={setFirstName}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Lastname"
            iconURL={theme === "light" ? IconURL.user_l : IconURL.user_d}
            onChangeText={setLastName}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Nickname (Your short url name)"
            iconURL={
              theme === "light" ? IconURL.nickname_l : IconURL.nickname_d
            }
            onChangeText={setNickname}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Phonenumber"
            iconURL={
              theme === "light" ? IconURL.phonenumber_l : IconURL.phonenumber_d
            }
            onChangeText={setPhoneNumber}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Email"
            iconURL={theme === "light" ? IconURL.mail_l : IconURL.mail_d}
            onChangeText={setEmail}
          ></DataInputBig>

          <SecretInput
            placeHolder="Password"
            iconURL={
              theme === "light" ? IconURL.password_l : IconURL.password_d
            }
            onChangeText={setPassword}
          ></SecretInput>
          <SecretInput
            placeHolder="Re-password"
            iconURL={
              theme === "light" ? IconURL.password_l : IconURL.password_d
            }
            onChangeText={setRePassword}
          ></SecretInput>
        </View>
      </View>
      <View className="flex flex-row items-center justify-center">
        <OtherSign
          cause="I agree with"
          solving="Kapy's policy"
          link="/policy"
        ></OtherSign>
        <CheckBox
          checkBoxColor="#f57602"
          onClick={() => {
            setIsChecked(!isChecked);
          }}
          isChecked={isChecked}
        />
      </View>
      <SubmitButton
        isPressed={isPressed}
        label="Sign up"
        onPress={handleSignUp}
      ></SubmitButton>
      <OtherSign
        cause="Already have an account?"
        solving="Sign in now"
        link="/sign-in"
      ></OtherSign>
    </View>
  );
};

export default SignUpPage;
