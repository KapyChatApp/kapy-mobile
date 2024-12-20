import { Audio } from "expo-av";
import { Asset } from "expo-asset";

export const playSound = async (path: string) => {
  const soundAsset = Asset.fromModule(require(path)); 
  await soundAsset.downloadAsync();


  const { sound } = await Audio.Sound.createAsync(
    { uri: soundAsset.uri } 
  );
  await  sound.setVolumeAsync(0.2);
  await sound.playAsync();
};