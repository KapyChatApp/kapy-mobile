import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useNavigation, useRouter } from "expo-router";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";

const SettingItem = ({ index, label, link }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(link)}
      className={`flex p-[18px] ${index % 2 ? bgLight510Dark20 : ""}`}
    >
      <Text className={`text-14 font-helvetica-regular ${textLight0Dark500}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingItem;
