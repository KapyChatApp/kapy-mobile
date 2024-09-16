import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/ui/AuthInput";
import { IconURL } from "@/constants/IconURL";
import SubmitButton from "@/components/ui/SubmitButton";
import { Link, useRouter } from "expo-router";
import SecretInput from "@/components/ui/SecretInput";
import OtherSign from "@/components/ui/OtherSign";
const SignInPage = () => {
  const [test, setTest] = useState("No Info");
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  return (
    <View className="wrapper flex-1 justify-center items-center flex flex-col dark:bg-darkbg">
      <Text className="text-40 color text-cardinal mb-10 font-helvetica-bold">
        Sign in
      </Text>
      <View className="flex justify-between items-center">
        <View className="input-wrapper flex flex-col" style={{ gap: 16 }}>
          <DataInputBig
            placeHolder="Phonenumber or Email"
            iconURL={IconURL.user_l}
          ></DataInputBig>
          <SecretInput
            placeHolder="Password"
            iconURL={IconURL.password_l}
          ></SecretInput>
        </View>
        <OtherSign cause="Forgot your password?" solving="Reset now!" link="/forgot-password"></OtherSign>
      </View>
      <SubmitButton
        isPressed={isPressed}
        label="Sign in"
        onPress={() => {
          setIsPressed(!isPressed);
           router.push("/message")
        }}
      ></SubmitButton>
     <OtherSign cause="Don't have any account?" solving="Sign up now" link="/sign-up"></OtherSign>
    </View>
  );
};

export default SignInPage;
