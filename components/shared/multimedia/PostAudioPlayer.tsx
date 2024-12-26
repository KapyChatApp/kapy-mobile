import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
import { millisToMMSS } from "@/utils/DateFormatter";

const MAX_PROGRESS_WIDTH = Dimensions.get("screen").width - 150; // Chiều rộng tối đa của progress bar

const PostAudioPlayer = ({ audioUri }: { audioUri: string }) => {
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
        setDuration(status.durationMillis || 0); // Lưu tổng thời gian
        setPosition(0); // Đặt vị trí ban đầu
        setIsFinished(false);
      }

      // Cập nhật trạng thái âm thanh
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0); // Cập nhật vị trí hiện tại
          const currentProgress =
            (status.positionMillis || 0) / (status.durationMillis || 1);
          progress.value = withSpring(currentProgress, {
            damping: 20,
            stiffness: 50,
            mass: 10,
          });

          // Nếu phát xong
          if ("didJustFinish" in status && status.didJustFinish) {
            setIsPlaying(false);
            setIsFinished(true);
            progress.value = 1; // Dừng thanh tiến trình tại vị trí cuối
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

        // Khi âm thanh kết thúc, nhấn replay để phát lại từ đầu
        if (isFinished || ("didJustFinish" in status && status.didJustFinish)) {
          await sound.setPositionAsync(0); // Đặt lại vị trí về 0
          setIsFinished(false);
          progress.value = 0; // Đặt lại thanh tiến trình về đầu
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
        const seekTime = (newPosition / MAX_PROGRESS_WIDTH) * duration;
        await sound.setPositionAsync(seekTime);
        setPosition(seekTime);
        progress.value = withSpring(seekTime / duration, {
          damping: 20,
          stiffness: 70,
        });

        const status = await sound.getStatusAsync();
        if ("didJustFinish" in status && status.didJustFinish) {
          setIsPlaying(false);
          setIsFinished(false);
        } else {
          // Tiếp tục phát ngay sau khi tìm vị trí mới
          if (!isPlaying) {
            await sound.playAsync();
            setIsPlaying(true);
          }
        }
      } catch (error) {
        console.error("Error seeking position:", error);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value * MAX_PROGRESS_WIDTH,
    backgroundColor: "#F57602",
    transition: {
      easing: Easing.out(Easing.linear),
    },
  }));

  return (
    <View
      className={`w-full h-[50px] border-[2px] border-cardinal
      } py-[4px] px-[20px] rounded-3xl flex flex-row items-center justify-between`}
      style={{ columnGap: 16 }}
    >
      <View>
        <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
          <Icon
            iconURL={isPlaying ? IconURL.pause_orange : IconURL.play_orange}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1" style={{ rowGap: 4 }}>
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
          className={`absolute text-10 font-helvetica-light right-[2px] top-[10px] text-cardinal`}
        >
          {millisToMMSS(position)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: MAX_PROGRESS_WIDTH,
    height: 6,
    backgroundColor: "#D7D7D7",
    borderRadius: 5,
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 5,
  },
  time: {
    width: MAX_PROGRESS_WIDTH,
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "300",
    position: "absolute",
    bottom: -10,
    right: 5,
  },
});

export default PostAudioPlayer;
