import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";

const Previous = ({ navigation,header }: any) => {
  return (
    <View className="absolute top-[40px] left-[20px] flex flex-row items-center gap-4">
      <TouchableOpacity onPress={() => navigation.goBack()}> 
        <Image source={IconURL.previous} className="w-[40px] h-[40px]"></Image>
      </TouchableOpacity>
      <Text className="text-18 font-helvetica-bold text-black dark:text-white">{header}</Text>
    </View>
  );
};

export default Previous;
