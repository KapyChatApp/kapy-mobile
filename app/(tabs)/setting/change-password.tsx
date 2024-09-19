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

const ChangePasswordPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [isNoitice, setIsNoitice] = useState(false);
  const handleSubmitChangePassword = () => {
    if (isNoitice) {
      router.push("/(auth)/verify-code");
    }
  };
  return (
    <SafeAreaView className="flex items-center" style={{ rowGap: 12 }}>
      <Previous navigation={navigation} header="Change password" />
      <View className="flex items-center mt-[60px]" style={{ rowGap: 16 }}>
        <SecretInput iconURL={IconURL.password_l} placeHolder="Enter your old password"/>
        <SecretInput iconURL={IconURL.password_l} placeHolder="Enter your new password"/>
        <SecretInput iconURL={IconURL.password_l} placeHolder="Re-Enter your new password"/>
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
