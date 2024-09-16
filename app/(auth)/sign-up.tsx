import { View, Text } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/ui/AuthInput";
import SecretInput from "@/components/ui/SecretInput";
import { Link } from "expo-router";
import { IconURL } from "@/constants/IconURL";
import SubmitButton from "@/components/ui/SubmitButton";
import OtherSign from "@/components/ui/OtherSign";
import CheckBox from 'react-native-check-box'
const SignUpPage = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const onPress = React.useCallback(() => {
    setIsChecked(isChecked => !isChecked);
  }, []);
  return (
    <View className="wrapper flex-1 justify-center items-center flex flex-col dark:bg-darkbg">
      <Text className="text-40 color text-cardinal mb-10 font-helvetica-bold">
        Sign up
      </Text>
      <View className="flex justify-between items-center">
        <View className="input-wrapper flex flex-col" style={{ gap: 16 }}>
          <DataInputBig
            placeHolder="Firstname"
            iconURL={IconURL.firstname_l}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Lastname"
            iconURL={IconURL.user_l}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Phonenumber"
            iconURL={IconURL.phonenumber_l}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Email"
            iconURL={IconURL.mail_l}
          ></DataInputBig>
          <DataInputBig
            placeHolder="Address"
            iconURL={IconURL.location_l}
          ></DataInputBig>
          <SecretInput
            placeHolder="Password"
            iconURL={IconURL.password_l}
          ></SecretInput>
          <SecretInput
            placeHolder="Re-password"
            iconURL={IconURL.password_l}
          ></SecretInput>
        </View>
      </View>
      <View  className="flex flex-row items-center justify-center">
        <OtherSign cause="I agree with" solving="Kapy's policy" link="/policy"></OtherSign>
        <CheckBox checkBoxColor="#f57602"
    onClick={()=>{setIsChecked(!isChecked);
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
