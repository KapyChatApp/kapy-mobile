import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/ui/DataInputBig";
import { IconURL } from "@/constants/IconURL";
import { useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import SubmitButton from "@/components/ui/SubmitButton";
import { useTheme } from "@/context/ThemeProviders";
import { bgLight500Dark10 } from "@/styles/theme";
import { sendOTP } from "@/lib/security";
import SecretInput from "@/components/ui/SecretInput";


const ForgotPasswordPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();
  const router = useRouter();
  const handleGetCode = async () => {
    await sendOTP(phoneNumber, () => router.push({pathname:`/(auth)/verify-code`,params:{phoneNumber:phoneNumber,newPassword:newPassword}}));
  };
  const {theme} = useTheme();
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <Previous navigation={navigation} header="Forgot password" isAbsolute={true}></Previous>
      <View className="flex items-center top-28" style={{ gap: 26 }}>
        <DataInputBig
          placeHolder="Enter your phonenumber"
          iconURL={theme==="light"? IconURL.phonenumber_l: IconURL.phonenumber_d}
          onChangeText={setPhoneNumber}
        ></DataInputBig>
        <SecretInput placeHolder="Enter your new password" iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} onChangeText={setNewPassword}  />
        <SubmitButton
          label="Get code"
          link="/verify-code"
          onPress={handleGetCode}
        ></SubmitButton>
      </View>
    </View>
  );
};

export default ForgotPasswordPage;
