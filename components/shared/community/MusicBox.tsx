import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { MusicTrack } from "@/types/music";
import { textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import CustomButton from "@/components/ui/CustomButton";

const MusicBox = (props: MusicTrack) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: props.previewUrl },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          setIsPlaying(false);
          newSound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  // Dừng nhạc khi bấm ra ngoài
  useEffect(() => {
    const stopOnOutsidePress = () => {
      stopSound();
    };

    const keyboardListener = Keyboard.addListener(
      "keyboardDidHide",
      stopOnOutsidePress
    );

    return () => {
      keyboardListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={stopSound}>
      <View
        className={`flex items-center justify-center flex-row px-[8px] ${
          props.isSelected ? "bg-light-310 dark:bg-dark-20" : ""
        }`}
        style={{ columnGap: 16 }}
      >
        <Image
          source={{ uri: props.artworkUrl100 }}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <View className="flex-1 flex">
          <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>
            {props.trackName}
          </Text>
          <Text className={`${textLight0Dark500} font-helvetica-light text-10`}>
            {props.artistName}
          </Text>
        </View>
        <View
          className="flex flex-row justify-center items-center"
          style={{ columnGap: 4 }}
        >
          <TouchableOpacity onPress={isPlaying ? stopSound : playSound}>
            <Icon
              iconURL={isPlaying ? IconURL.pause_orange : IconURL.play_orange}
              size={26}
            />
          </TouchableOpacity>
          {props.isSelected ? (
            <CustomButton
              width={44}
              height={30}
              label="RM"
              fontSize={12}
              onPress={() => props.deleteMusic?.()}
            />
          ) : (
            <CustomButton
              width={44}
              height={30}
              label="Use"
              fontSize={12}
              onPress={() => props.setSelectedMusic?.()}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MusicBox;
