import { View, Text } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/ui/DataInputBig";
import SecretInput from "@/components/ui/SecretInput";
import { Link } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import SubmitButton from "@/components/ui/SubmitButton";
import OtherSign from "@/components/ui/OtherSign";
import CheckBox from "react-native-check-box";
import { useTheme } from "@/context/ThemeProviders";
import Icon from "@/components/ui/Icon";
const SignUpPage = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {theme} = useTheme();
  return (
    <View className="wrapper flex-1 justify-center items-center flex flex-col dark:bg-darkbg">
      <Text className="text-40 color text-cardinal mb-10 font-helvetica-bold">
        Sign up
      </Text>
      <View className="flex justify-between items-center">
        <View className="input-wrapper flex flex-col" style={{ gap: 16 }}>
          <DataInputBig
            placeHolder="Firstname"
            iconURL={theme==='light'? IconURL.firstname_l:IconURL.firstname_d}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Lastname"
            iconURL={theme==='light'? IconURL.user_l:IconURL.user_d}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Phonenumber"
            iconURL={theme==='light'? IconURL.phonenumber_l: IconURL.phonenumber_d}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Email"
            iconURL={theme==='light'? IconURL.mail_l:IconURL.mail_d}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Address"
            iconURL={theme==='light'? IconURL.location_l: IconURL.location_d}
          ></DataInputBig>
          <SecretInput
            placeHolder="Password"
            iconURL={theme==='light'? IconURL.password_l: IconURL.password_d}
          ></SecretInput>
          <SecretInput
            placeHolder="Re-password"
            iconURL={theme==='light'? IconURL.password_l: IconURL.password_d}
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
        label="Sign in"
        onPress={() => {
          setIsPressed(!isPressed);
        }}
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
