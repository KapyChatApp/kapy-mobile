import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { textLight0Dark500 } from "@/styles/theme";
import { Image } from "react-native";
import VideoPlayer from "./VideoPlayer";

const FastMediaList = ({ label, contents, data, type }: any) => {
  return (
    <View className="flex justify-center gap-y-2 w-full">
      <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>
        {label}
      </Text>
      <View className="flex flex-row gap-x-1 translate-x-3 justify-start items-start w-full">
        {type === "image" && data
          ? data.map((item: any, index: any) => {
              if (index <= 4)
                return (
                  <Image
                    className="w-[69px] h-[69px]"
                    source={{ uri: item.url }}
                  />
                );
            })
          : type === "video" && data
          ? data.map((item: any, index: any) => {
              if (index <= 4) {
                return (
                  <View className="w-[69px] h-[69px]">
                    <VideoPlayer videoSource={item.url} />
                  </View>
                );
              }
            })
          : null}
      </View>
    </View>
  );
};

export default FastMediaList;
