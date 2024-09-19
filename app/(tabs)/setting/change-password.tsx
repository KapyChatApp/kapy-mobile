import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import BaseInput from "@/components/ui/BaseInput";
import OtherSign from "@/components/ui/OtherSign";
import SubmitButton from "@/components/ui/SubmitButton";
import NoticeCard from "@/components/ui/NoticeCard";

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
        <BaseInput
          width={354}
          height={43}
          label="Enter your old password"
        ></BaseInput>
        <BaseInput
          width={354}
          height={43}
          label="Enter your new password"
        ></BaseInput>
        <BaseInput
          width={354}
          height={43}
          label="Re-Enter your new password"
        ></BaseInput>
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
