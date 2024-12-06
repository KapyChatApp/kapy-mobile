import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import DataInputBig from "@/components/ui/DataInputBig";
import { IconURL } from "@/constants/IconURL";
import { useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import SubmitButton from "@/components/ui/SubmitButton";
import { useTheme } from "@/context/ThemeProviders";
import { bgLight500Dark10 } from "@/styles/theme";


const ForgotPasswordPage = () => {
  const [info, setInfo] = useState("");
  const navigation = useNavigation();
  const router = useRouter();
  const handleGetCode = () => {
    router.push(`/(auth)/verify-code?info=${info}`);
    // router.push({pathname:"/(auth)/verify-code",params:{info}});
    console.log("goo");
  };
  const {theme} = useTheme();
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <Previous navigation={navigation} header="Forgot password" isAbsolute={true}></Previous>
      <View className="flex items-center top-28" style={{ gap: 26 }}>
        <DataInputBig
          placeHolder="Enter your email/ phonenumber"
          iconURL={theme==="light"? IconURL.password_l: IconURL.password_d}
          onChangeText={(info: any) => setInfo(info)}
        ></DataInputBig>
        <SubmitButton
          label="Get code"
          link="/verify-code"
          onPress={handleGetCode}
        ></SubmitButton>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
