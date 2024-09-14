import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/AuthInput";
import { IconURL } from "@/constants/IconURL";
import SubmitButton from "@/components/SubmitButton";
import { Link } from "expo-router";
const SignIn = () => {
  const [test, setTest] = useState("No Info");
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View className="wrapper flex-1 justify-center items-center flex flex-col dark:bg-darkbg">
      <Text className="font-bold text-40 color text-cardinal mb-10">
        Sign in
      </Text>
      <View className="flex justify-between items-center">
        <View className="input-wrapper flex flex-col" style={{ gap: 16 }}>
          <DataInputBig
            placeHolder="Phonenumber or Email"
            iconURL={IconURL.user_l}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Password"
            iconURL={IconURL.password_l}
          ></DataInputBig>
        </View>
        <View className="forgot-wrapper mt-2 mb-10">
          <Text>
            <Text>Forgot your password? </Text>
            <Link href="/" className="font-bold text-cardinal">
              Reset now!
            </Link>
          </Text>
        </View>
      </View>

      <SubmitButton
        isPressed={isPressed}
        label="Sign in"
        onPress={() => {
          setIsPressed(!isPressed);
        }}
      ></SubmitButton>
    </View>
  );
};

export default SignIn;
