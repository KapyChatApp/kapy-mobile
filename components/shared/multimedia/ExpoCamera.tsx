import React, { useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraOrientation,
} from "expo-camera";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import CustomButton from "@/components/ui/CustomButton";
import { Video } from "expo-av";
import VideoPlayer from "./VideoPlayer";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { generateRandomNumberString } from "@/utils/Random";

const ExpoCamera = ({
  onClose,
  isSendNow,
  onSend,
  setSelectedMedia,
  type,
  acceptSelectedMedia,
}: {
  onClose: () => void;
  isSendNow?: boolean;
  onSend?: () => void;
  setSelectedMedia: (uri: string, type: string, name: string) => void;
  removeSelectedMedia?: () => void;
  type?: "video" | "picture";
  acceptSelectedMedia?: () => void;
}) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>("");
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | undefined>("");

  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const [mode, setMode] = useState("picture");

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
        // Reduce quality and disable base64 to save memory
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.1,        // Reduce quality to save memory
          base64: false,       // Don't use base64 encoding (major memory saver)
          skipProcessing: true // Skip additional processing if possible
        });
        
        if (photo?.uri) {
          setPhotoUri(photo.uri);
          setSelectedMedia(photo.uri, "image", generateRandomNumberString(10)!);
          console.log("Photo taken: ", photo.uri);
        }
      }
    } catch (error) {
      console.error("Error taking picture: ", error);
    }
  };

  const startRecording = async () => {
    setMode("video");
    if (cameraRef.current) {
      try {
        setIsRecording(true);

        setRecordingTime(0);

        const interval = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);

        setTimerInterval(interval);

        const video = await cameraRef.current.recordAsync({
          maxDuration: 60,
          codec: "avc1",
        });
        setVideoUri(video?.uri);
        setSelectedMedia(video?.uri!, "video", generateRandomNumberString(10)!);
        console.log("Video recording started: ", video?.uri);
      } catch (error) {
        console.error("Error starting video recording: ", error);
      }
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

  const handleLongPress = () => {
    startRecording();
  };
  return (
    <View className="flex-1 w-screen h-screen fixed ">
      {photoUri === "" && videoUri === "" ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          mode="picture"
        >
          <View className=" flex-1 flex justify-between items-center pb-[100px] ">
            <View className="flex-1 w-full flex flex-row justify-between item-center p-[20px] mt-[20px]">
              <TouchableOpacity onPress={onClose}>
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
                onLongPress={type === "picture" ? () => {} : handleLongPress}
              />
            </View>
          </View>
        </CameraView>
      ) : (
        <View className="flex items-center justify-center">
          {videoUri === "" ? (
            <Image className="w-full h-full fixed" source={{ uri: photoUri }} />
          ) : (
            <View className="fixed w-full h-full flex items-center justify-center">
              <VideoPlayer videoSource={videoUri!} />
            </View>
          )}
          <View className="absolute top-[20px] left-[20px] mt-[20px]">
            <TouchableOpacity
              onPress={() => {
                setPhotoUri("");
                setVideoUri("");
              }}
            >
              <Icon iconURL={IconURL.previous} size={30} />
            </TouchableOpacity>
          </View>
          <View className="absolute bottom-[90px] right-[20px]">
            {isSendNow ? (
              <TouchableOpacity
                onPress={() => {
                  onSend?.();
                  onClose();
                }}
              >
                <Icon size={40} iconURL={IconURL.send} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  acceptSelectedMedia?.();
                }}
              >
                <Icon iconURL={IconURL.tick} size={40} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});

export default ExpoCamera;
