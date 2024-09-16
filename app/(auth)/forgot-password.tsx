import { View, Text } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/ui/AuthInput";
import { IconURL } from "@/constants/IconURL";
import { useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import SubmitButton from "@/components/ui/SubmitButton";

const ForgotPasswordPage = () => {
  const [info, setInfo] = useState('');
  const navigation = useNavigation();
  const router = useRouter();
  const handleGetCode = () => {
    router.push(`/(auth)/verify-code?info=${info}`)
    // router.push({pathname:"/(auth)/verify-code",params:{info}});
    console.log("goo")
  };
  return (
    <View>
      <Previous navigation={navigation} header="Forgot password">
      </Previous>
      <View className="flex items-center top-28" style={{ gap: 26 }}>
        <DataInputBig
          placeHolder="Enter your email/ phonenumber"
          iconURL={IconURL.password_l}
          onChangeText={(info:any)=>setInfo(info)}
        ></DataInputBig>
        <SubmitButton label="Get code" link="/verify-code" onPress={handleGetCode}></SubmitButton>
      </View>
    </View>
  );
};

export default ForgotPasswordPage;
