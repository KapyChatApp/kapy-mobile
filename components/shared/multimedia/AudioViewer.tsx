import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { Audio } from "expo-av";
import { millisToMMSS } from "@/utils/DateFormatter";

const MAX_PROGRESS_WIDTH = Dimensions.get("screen").width - 40;

const AudioViewer = ({ uri, fileName, onClose }: any) => {
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
  }, [uri]);

  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: uri,
      });
      setSound(newSound);

      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0); 
        setPosition(0); 
        setIsFinished(false);
      }

      // Cập nhật trạng thái âm thanh
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0); 
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
            progress.value = 1; 
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
          await sound.setPositionAsync(0); 
          setIsFinished(false);
          progress.value = 0; 
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
    <SafeAreaView className={`w-screen h-screen fixed flex items-center justify-between ${bgLight500Dark10}`} style={{rowGap:200}}>
      <View className="flex flex-row items-center justify-center">
        <View className="w-[40px] h-[40px]" />
        <View className="flex flex-grow items-center justify-center">
          <Text
            className={`text-ellipsis ${textLight0Dark500} font-helvetica-bold text-14 text-center`}
          >
            {fileName}
          </Text>
        </View>
        <View>
          <TouchableOpacity className="mt-[10px] mr-[10px]" onPress={()=>{pauseSound(); onClose();}}>
            <Icon iconURL={IconURL.close} size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1  flex items-center justify-center ">
        <Icon iconURL={IconURL.voice} size={200} />
      </View>
      <View
        className={`flex-1 flex file:items-center `}
        style={{ rowGap: 30 }}
      >
        <View style={{ rowGap: 4 }}>
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
            className={`absolute text-10 font-helvetica-light ${textLight0Dark500} right-[2px] top-[10px]`}
          >
            {millisToMMSS(position)}
          </Text>
        </View>
        <View className="">
          <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
            <Icon
              iconURL={isPlaying ? IconURL.pause_orange : IconURL.play_orange}
              size={70}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressContainer: {
    width: MAX_PROGRESS_WIDTH,
    height: 6,
    backgroundColor: "#D7D7D7",
    borderRadius: 5,
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F57602",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 5,
  },
  time: {
    width: MAX_PROGRESS_WIDTH,
    color: "#F57602",
    fontSize: 10,
    fontWeight: "300",
    position: "absolute",
    bottom: -10,
    right: 5,
  },
});

export default AudioViewer;
