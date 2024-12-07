import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
} from "react-native-reanimated";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AudioPlayer = ({
  audioUri,
  isSender,
}: {
  audioUri: string;
  isSender: boolean;
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const progress = useSharedValue(0);

  useEffect(() => {
    const loadNewAudio = async () => {
      if (sound) {
        await sound.unloadAsync();
      }
      loadAudio();
    };

    loadNewAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: audioUri,
      });
      setSound(newSound);

      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
        setIsFinished(false);
      }

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0);
          const currentProgress = (status.positionMillis || 0) / duration;

          progress.value = withSpring(currentProgress, {
            damping: 20, // Làm mượt, di chuyển chậm hơn
            stiffness: 70, // Giảm cứng để di chuyển chậm
            mass: 20, // Tăng khối lượng để hiệu ứng chậm hơn
          });

          if ("didJustFinish" in status && status.didJustFinish) {
            setIsPlaying(false);
            setIsFinished(true);
            progress.value = 0; // Reset progress bar
          }
        }
      });
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const playSound = async () => {
    if (sound) {
      try {
        const status = await sound.getStatusAsync();

        if (isFinished || ("didJustFinish" in status && status.didJustFinish)) {
          await sound.setPositionAsync(0); // Đặt lại vị trí phát về đầu
          setIsFinished(false);
          progress.value = 0; // Reset progress bar khi replay
        }

        setIsPlaying(true);
        await sound.playAsync();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };

  const pauseSound = async () => {
    if (sound) {
      try {
        setIsPlaying(false);
        await sound.pauseAsync();
      } catch (error) {
        console.error("Error pausing sound:", error);
      }
    }
  };

  const seekPosition = async (newPosition: number) => {
    if (sound) {
      try {
        const seekTime = (newPosition / SCREEN_WIDTH) * duration;
        await sound.setPositionAsync(seekTime);
        setPosition(seekTime);
        progress.value = withSpring(seekTime / duration, {
          damping: 20, // Làm mượt khi seek
          stiffness: 70, // Giảm cứng khi seek
        });

        const status = await sound.getStatusAsync();
        if ("didJustFinish" in status && status.didJustFinish) {
          setIsPlaying(false);
          setIsFinished(false);
        }
      } catch (error) {
        console.error("Error seeking position:", error);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value * SCREEN_WIDTH,
    backgroundColor: "#F57602",
    transition: {
      easing: Easing.out(Easing.ease), // Sử dụng easing để mượt hơn
    },
  }));

  return (
    <View
      className={`w-full h-[50px] ${
        isSender ? "bg-cardinal" : "bg-ios-light-340 dark:bg-ios-dark-330"
      } py-[4px] px-[20px] rounded-3xl flex flex-row items-center  justify-between`} style={{columnGap:8}}
    >
      <View>
        <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
          <Icon iconURL={isPlaying ? IconURL.pause : IconURL.play} size={20} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 " style={{rowGap:4}}>
        <TouchableOpacity
          style={styles.progressContainer}
          activeOpacity={1}
          onPress={(e) => {
            const touchX = e.nativeEvent.locationX;
            seekPosition(touchX);
          }}
        >
          <Animated.View style={[styles.progressBar, animatedStyle]} />
        </TouchableOpacity>
        <Text
          className={`${
            isSender ? "text-white" : "text-black"
          } text-10 font-helvetica-light absolute top-[8px]`}
        >
          {Math.floor(position / 1000)}s / {Math.floor(duration / 1000)}s
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  time: {
    color: "#333",
    fontSize: 14,
  },
});

export default AudioPlayer;
