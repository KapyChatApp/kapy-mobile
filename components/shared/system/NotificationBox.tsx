import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DefaultAva } from "@/constants/DefaultAva";
import { bgLight510Dark20, textLight0Dark500 } from "@/styles/theme";

const NotificationBox = () => {
  return (
    <TouchableOpacity className={`flex flex-row ${bgLight510Dark20} py-[10px] px-[14px]`} style={{ columnGap: 10 }}>
        <Image className="w-[70px] h-[70px] rounded-full" source={DefaultAva.female} />
      <View className="flex" style={{ columnGap: 2 }}>
        <Text
          className={`flex-1 flex-grow font-helvetica-bold text-14 ${textLight0Dark500}`}
        >
          Title
        </Text>
        <Text
          className={`flex-1 flex-grow font-helvetica-light text-12 ${textLight0Dark500}`}
        >
          Content
        </Text>
        <Text className="text-10 text-light-330 dark:text-dark-320">
          1 day ago
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBox;
