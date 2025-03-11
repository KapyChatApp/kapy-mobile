import { View, Text } from "react-native";
import React from "react";
import { MusicTrack } from "@/types/music";
import { textLight0Dark500 } from "@/styles/theme";
import { Image } from "react-native";

const MiniMusicBox = (props: MusicTrack) => {
  return (
    <View
      className="flex items-center justify-center flex-row flex-1 bg-light-340 dark:bg-dark-20 rounded-lg"
      style={{ columnGap: 4 }}
    >
      <Image
        source={{ uri: props.artworkUrl100 }}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <View className="flex-1 flex">
        <Text className={`${textLight0Dark500} font-helvetica-bold text-12`}>
          {props.trackName}
        </Text>
        <Text className={`${textLight0Dark500} font-helvetica-light text-10`}>
          {props.artistName}
        </Text>
      </View>
    </View>
  );
};

export default MiniMusicBox;
