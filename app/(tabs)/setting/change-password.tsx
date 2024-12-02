import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import BaseInput from "@/components/ui/BaseInput";
import OtherSign from "@/components/ui/OtherSign";
import SubmitButton from "@/components/ui/SubmitButton";
import NoticeCard from "@/components/ui/NoticeCard";
import SecretInput from "@/components/ui/SecretInput";
import { IconURL } from "@/constants/IconURL";
import { bgLight500Dark10 } from "@/styles/theme";
import { useTheme } from "@/context/ThemeProviders";

const ChangePasswordPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [isNoitice, setIsNoitice] = useState(false);
  const handleSubmitChangePassword = () => {
    if (isNoitice) {
      router.push("/(auth)/verify-code");
    }
  };
  const {theme} = useTheme();
  return (
    <SafeAreaView className={`flex items-center ${bgLight500Dark10} flex-1`} style={{ rowGap: 12 }}>
      <Previous navigation={navigation} header="Change password" isAbsolute={true}/>
      <View className="flex items-center mt-[60px]" style={{ rowGap: 16 }}>
        <SecretInput iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} placeHolder="Enter your old password"/>
        <SecretInput iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} placeHolder="Enter your new password"/>
        <SecretInput iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} placeHolder="Re-Enter your new password"/>
      </View>
      <OtherSign
        cause="Forgot your password?"
        solving="Reset now"
        link="/(auth)/forgot-password"
      ></OtherSign>
      <SubmitButton
        label="Submit"
        onPress={() => setIsNoitice(!isNoitice)}
      ></SubmitButton>
      {isNoitice ? (
        <NoticeCard
          content="You can change the password only 2 times per month"
          isOpen={isNoitice}
          setIsOpen={setIsNoitice}
          goOn={handleSubmitChangePassword}
        ></NoticeCard>
      ) : null}
    </SafeAreaView>
  );
};

export default ChangePasswordPage;
