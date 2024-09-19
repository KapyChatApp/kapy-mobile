import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";

const Previous = ({ navigation, header }: any) => {
  const [textWidth, setTextWidth] = useState(0);
  const handleTextLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };
  return (
    <View
      pointerEvents="auto"
      className="absolute top-[20px] left-[20px] flex flex-row items-center gap-4"
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={IconURL.previous} className="w-[40px] h-[40px]"></Image>
      </TouchableOpacity>
      <View className="flex gap-y-[4px]">
        <Text
          onLayout={handleTextLayout}
          className="text-18 font-helvetica-bold text-cardinal "
        >
          {header}
        </Text>
        <View className={`w-[${textWidth}px] h-[2px] bg-cardinal`}></View>
      </View>
    </View>
  );
};

export default Previous;
