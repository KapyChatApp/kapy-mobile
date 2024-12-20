import { Audio, AVPlaybackSource } from "expo-av";

export const playSound = async (path:AVPlaybackSource) => {
    const { sound } = await Audio.Sound.createAsync(
      path
    );
    await sound.setVolumeAsync(0.5);
    await sound.playAsync(); 
  };