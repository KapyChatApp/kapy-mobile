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
  withTiming,
} from "react-native-reanimated";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AudioPlayer = ({ audioUri }: { audioUri: string }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const progress = useSharedValue(0);

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
      }

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis || 0);
          progress.value = (status.positionMillis || 0) / duration;
        }
      });
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const playSound = async () => {
    if (sound) {
      try {
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
        progress.value = seekTime / duration;
      } catch (error) {
        console.error("Error seeking position:", error);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(progress.value * SCREEN_WIDTH, { duration: 100 }),
  }));

  return (
    <View style={styles.container}>
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

      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
          <Icon iconURL={isPlaying ? IconURL.pause : IconURL.play} size={30} />
        </TouchableOpacity>
        <Text style={styles.time}>
          {Math.floor(position / 1000)}s / {Math.floor(duration / 1000)}s
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
  },
  progressContainer: {
    width: "90%",
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F57602",
  },
  controlContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  time: {
    color: "#333",
    fontSize: 14,
  },
});

export default AudioPlayer;
