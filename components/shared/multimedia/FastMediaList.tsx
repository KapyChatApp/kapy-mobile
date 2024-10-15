import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { textLight0Dark500 } from "@/styles/theme";

const FastMediaList = ({ label, contents }: any) => {
  return (
    <View className="flex justify-center gap-y-2">
      <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>
        {label}
      </Text>
      <View className="flex flex-row gap-x-1 translate-x-3">
        <View className="bg-slate-400 w-[69px] h-[69px]"></View>
        <View className="bg-slate-400 w-[69px] h-[69px]"></View>
        <View className="bg-slate-400 w-[69px] h-[69px]"></View>
        <View className="bg-slate-400 w-[69px] h-[69px]"></View>
        <View className="bg-slate-400 w-[69px] h-[69px]"></View>
      </View>
    
    </View>
  );
};

export default FastMediaList;
