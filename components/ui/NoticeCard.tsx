import { View, Text } from "react-native";
import React from "react";
import DenyButton from "./DenyButton";
import CustomButton from "./CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const NoticeCard = ({ content, isOpen, setIsOpen, goOn }: any) => {
  return (
    <SafeAreaView className="absoulte flex items-center justify-center bottom-[60px]">
      <View className="w-[370px] h-[160px] absolute flex items-center justify-center bg-white rounded-3xl">
        <View className="h-[120px] flex items-center justify-center">
          <Text className="text-16 font-helvetica-light text-center">{content}</Text>
        </View>
        <View className="w-[370px] h-[2px] bg-border mb-[4px]"></View>
        <View className="flex flex-row gap-x-[6px] justify-end w-full mb-[8px] px-[12px]">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="w-[75px] h-[34px] bg-deny text-14 rounded-full  flex items-center justify-center"
          >
            <Text className="text-16 text-white font-helvetica-bold">No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(!isOpen);
              goOn();
            }}
            className="w-[75px] h-[34px] bg-cardinal text-14 rounded-full flex items-center justify-center"
          >
            <Text className="text-16 text-white font-helvetica-bold">Yes</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default NoticeCard;
