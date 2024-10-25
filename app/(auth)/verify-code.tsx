import { View, Text, TextInput, Touchable } from "react-native";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/ui/SubmitButton";
import React from "react";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import OtherSign from "@/components/ui/OtherSign";
import { TouchableOpacity } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
const VerifyCodePage = () => {
  const { info } = useGlobalSearchParams();
  const [countDown, setCountDown] = useState(60);
  const [isExpired, setIsExpired] = useState(false);
  const navigation= useNavigation();
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  const [num5, setNum5] = useState();
  const [num6, setNum6] = useState();

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    if (countDown == 0) {
      setIsExpired(true);
    }
  }, [countDown]);
  return (
    <View className="flex items-center h-full w-full">
      <Previous navigation={navigation} isAbsolute={true}></Previous>
      <Text className="text-18 font-helvetica-light mt-[118px] w-[303px] text-center">
        We have send an verification code to your {info}
      </Text>
      <View className="mt-[62px] flex flex-row items-center gap-x-1">
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className="w-[47px] h-[47px] border border-l_input rounrf rounded-xl text-center text-18"
          onChangeText={(num: any) => setNum1(num)}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className="w-[47px] h-[47px] border border-l_input rounrf rounded-xl text-center text-18"
          onChangeText={(num: any) => setNum2(num)}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className="w-[47px] h-[47px] border border-l_input rounrf rounded-xl text-center text-18"
          onChangeText={(num: any) => setNum3(num)}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className="w-[47px] h-[47px] border border-l_input rounrf rounded-xl text-center text-18"
          onChangeText={(num: any) => setNum4(num)}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className="w-[47px] h-[47px] border border-l_input rounrf rounded-xl text-center text-18"
          onChangeText={(num: any) => setNum5(num)}
        ></TextInput>
        <TextInput
          keyboardType="numeric"
          maxLength={1}
          className="w-[47px] h-[47px] border border-l_input rounrf rounded-xl text-center text-18"
          onChangeText={(num: any) => setNum6(num)}
        ></TextInput>
      </View>
      {!isExpired? (
        <View className="flex flex-row items-center justify-center mt-[54px] mb-[18px]">
          <Text className="font-helvetica-light text-14 text-center">
            Your code will be expired after
          </Text>
          <Text className="font-bold text-14 text-cardinal text-center items-center justify-center">
            {" "}
            {countDown}
          </Text>
          <Text>s</Text>
        </View>
      ) : (
        <View className="flex flex-row mt-[54px] mb-[18px] gap-x-1">
          <Text className="font-helvetica-light">
            Your code has been expired
          </Text>
          <TouchableOpacity onPress={() => console.log("send new code!")}>
            <Text className="font-helvetica-bold text-14 text-cardinal">
              Get new code
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <SubmitButton
        label="Submit"
        onPress={() =>
          console.log("total:" + num1 + num2 + num3 + num4 + num5 + num6)
        }
      ></SubmitButton>
    </View>
  );
};

export default VerifyCodePage;
