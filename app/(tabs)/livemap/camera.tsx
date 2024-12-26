import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { CameraType, CameraView } from "expo-camera";
import { VideoPlayer } from "expo-video";
import { useCameraPermissions } from "expo-image-picker";
import CustomButton from "@/components/ui/CustomButton";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { generateRandomNumberString } from "@/utils/Random";
import { Image } from "react-native";
import { useNavigation } from "expo-router";
import { useCamera } from "@/context/CameraContext";

const LiveMapCamera = () => {
  const [uri, setUri] = useState("");
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const navigation = useNavigation();

  const { openCamera, closeCamera, setPhotoUri } = useCamera();
  openCamera();
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View
        className={`flex-1 items-center justify-center ${bgLight500Dark10}`}
        style={{ rowGap: 20 }}
      >
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          We need your permission to show the camera
        </Text>
        <CustomButton
          width={150}
          height={40}
          label="Grant Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        // Ensure camera is ready before taking a picture
        const photo = await cameraRef.current.takePictureAsync({
          base64: true, // Optional: Get the base64 encoded image
        });
        setUri(photo?.uri!);
        console.log("Photo taken: ", photo?.uri);
      }
    } catch (error) {
      console.error("Error taking picture: ", error);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        console.log("stop!");
        await cameraRef.current.stopRecording();
        clearInterval(timerInterval!);
        setTimerInterval(null);
        setIsRecording(false);
        await cameraRef.current.resumePreview();
      } catch (error) {
        console.error("Error stopping video recording: ", error);
      }
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      takePicture();
    }
  };

  return (
    <View className="flex-1 w-screen h-screen fixed ">
      {uri === "" ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          mode="picture"
        >
          <View className=" flex-1 flex justify-between items-center pb-[100px] ">
            <View className="flex-1 w-full flex flex-row justify-between item-center p-[20px] mt-[20px]">
              <TouchableOpacity onPress={() =>{ navigation.goBack(); closeCamera()}}>
                <Icon iconURL={IconURL.close_single} size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <Icon size={30} iconURL={IconURL.change_cam} />
              </TouchableOpacity>
              l
            </View>
            <View
              className="flex items-center justify-between "
              style={{ rowGap: 10 }}
            >
              {isRecording && (
                <View className=" w-full flex items-center">
                  <Text className="text-white text-lg">
                    {Math.floor(recordingTime / 60)}:
                    {(recordingTime % 60).toString().padStart(2, "0")}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                className="w-[80px] h-[80px] bg-cardinal rounded-full"
                onPress={handlePress}
              />
            </View>
          </View>
        </CameraView>
      ) : (
        <View className="flex items-center justify-center">
          <Image className="w-full h-full fixed" source={{ uri: uri }} />
          <View className="absolute top-[20px] left-[20px] mt-[20px]">
            <TouchableOpacity
              onPress={() => {
                setUri("");
              }}
            >
              <Icon iconURL={IconURL.previous} size={30} />
            </TouchableOpacity>
          </View>
          <View className="absolute bottom-[90px] right-[20px]">
            <TouchableOpacity
              onPress={() => {
                setPhotoUri(uri);
                navigation.goBack();
                closeCamera();
              }}
            >
              <Icon iconURL={IconURL.tick} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default LiveMapCamera;
const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
