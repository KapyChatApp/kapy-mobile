import { View, Text, SafeAreaView, Alert } from "react-native";
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
import { changePassword } from "@/lib/security";

const ChangePasswordPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [isNoitice, setIsNoitice] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmitChangePassword = () => {
    if (isNoitice) {
      router.push("/(auth)/verify-code");
    }
  };
  const { theme } = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setRenewPassword] = useState("");
  const handleChangePassword = async () => {
    if (newPassword !== reNewPassword) {
      setErrorMessage("Your Re-Enter new password isn't match with new password!")
    }
    await changePassword(oldPassword,newPassword,()=>Alert.alert(
      "Notice",         
      "Change password successfully!",
      [
        {
          text: "OK",         
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: true }  
    ))
  }

  return (
    <View className={`flex items-center ${bgLight500Dark10} flex-1`} style={{ rowGap: 12 }}>
      <Previous navigation={navigation} header="Change password" isAbsolute={true}/>
      <View className="flex items-center mt-[60px]" style={{ rowGap: 16 }}>
        <SecretInput iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} placeHolder="Enter your old password" onChangeText={setOldPassword}/>
        <SecretInput iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} placeHolder="Enter your new password" onChangeText={setNewPassword}/>
        <SecretInput iconURL={theme==="light"? IconURL.password_l:IconURL.password_d} placeHolder="Re-Enter your new password" onChangeText={setRenewPassword}/>
       {errorMessage !== "" ? <Text className="font-helvetica-regular text-12 text-red-600">{errorMessage}</Text> :null}
      </View>
      <OtherSign
        cause="Forgot your password?"
        solving="Reset now"
        link="/(auth)/forgot-password"
      ></OtherSign>
         <SubmitButton
        label="Submit"
        onPress={handleChangePassword}
      ></SubmitButton>
      {isNoitice ? (
        <NoticeCard
          content="You can change the password only 2 times per month"
          isOpen={isNoitice}
          setIsOpen={setIsNoitice}
          goOn={handleSubmitChangePassword}
        ></NoticeCard>
      ) : null}
    </View>
  );
};

export default ChangePasswordPage;
