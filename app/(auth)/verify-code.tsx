import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import SubmitButton from "@/components/ui/SubmitButton";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import Previous from "@/components/ui/Previous";
import * as Clipboard from "expo-clipboard"; // Import Clipboard
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { forgotPassword } from "@/lib/security";

const VerifyCodePage = () => {
  const { phoneNumber,newPassword } = useGlobalSearchParams();
  const [countDown, setCountDown] = useState(60);
  const [isExpired, setIsExpired] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [num3, setNum3] = useState<string>("");
  const [num4, setNum4] = useState<string>("");
  const [num5, setNum5] = useState<string>("");
  const [num6, setNum6] = useState<string>("");

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleInputChange = (text: string, index: number) => {
    if (text.length === 1) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text.length === 0) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    switch (index) {
      case 0:
        setNum1(text);
        break;
      case 1:
        setNum2(text);
        break;
      case 2:
        setNum3(text);
        break;
      case 3:
        setNum4(text);
        break;
      case 4:
        setNum5(text);
        break;
      case 5:
        setNum6(text);
        break;
      default:
        break;
    }
  };

  const pasteClipboard = async () => {
    const content = await Clipboard.getStringAsync();
    if (content.length === 6) {
      setNum1(content[0]);
      setNum2(content[1]);
      setNum3(content[2]);
      setNum4(content[3]);
      setNum5(content[4]);
      setNum6(content[5]);
    }
  };

  const handleVerify = async () => {
    await forgotPassword("" + num1 + num2 + num3 + num4 + num5 + num6,phoneNumber.toString(),newPassword.toString(),()=>Alert.alert(
      "Notice",         
      "Reset password successfully!",
      [
        {
          text: "Back to Sign in",         
          onPress: () =>router.push("/(auth)/sign-in"),
        },
      ],
      { cancelable: true }  
    ))
  }

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    if (countDown === 0) {
      setIsExpired(true);
    }
  }, [countDown]);

  return (
    <View
      className={`flex items-center h-full w-full flex-1 ${bgLight500Dark10}`}
    >
      <Previous navigation={navigation} isAbsolute={true} />
      <Text
        className={`text-18 font-helvetica-light mt-[118px] w-[303px] text-center ${textLight0Dark500}`}
      >
        We have sent a verification code to your {phoneNumber}
      </Text>

      <View className="mt-[62px] flex flex-row items-center gap-x-1">
        {[num1, num2, num3, num4, num5, num6].map((num, index) => (
          <TextInput
            key={index}
            keyboardType="numeric"
            maxLength={1}
            value={num}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChangeText={(text) => handleInputChange(text, index)}
            className={`w-[47px] h-[47px] border border-l_input rounded-xl text-center text-18 ${textLight0Dark500}`}
          />
        ))}
      </View>

      <TouchableOpacity className="mt-[20px]" onPress={pasteClipboard}>
        <Text className="font-helvetica-bold text-12 text-cardinal">
          Paste Code from Clipboard
        </Text>
      </TouchableOpacity>

      {!isExpired ? (
        <View className="flex flex-row items-center justify-center mt-[54px] mb-[18px]">
          <Text
            className={`font-helvetica-light text-14 text-center ${textLight0Dark500}`}
          >
            Your code will expire after
          </Text>
          <Text className="font-bold text-14 text-cardinal text-center">
            {countDown}
          </Text>
          <Text>s</Text>
        </View>
      ) : (
        <View className="flex flex-row mt-[54px] mb-[18px] gap-x-1">
          <Text className={`font-helvetica-light ${textLight0Dark500}`}>
            Your code has expired
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
        onPress={handleVerify}
      />
    </View>
  );
};

export default VerifyCodePage;
