import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderProfileEditor from "@/components/shared/setting/HeaderProfileEditor";
import BioEditor from "@/components/shared/setting/BioEditor";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BioEditorProps, HeaderProfileEditorProps } from "@/types/user";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ExpoCamera from "@/components/shared/multimedia/ExpoCamera";
import { sendMessage } from "@/lib/message";
import { uploadAvatar, uploadBackground } from "@/lib/my-profile";
import { useCamera } from "@/context/CameraContext";

const UpdateProfilePage = () => {
  const navigation = useNavigation();
  const { isCameraOpen, openCamera, closeCamera } = useCamera();
  const [bioProps, setBioProps] = useState<BioEditorProps | undefined>();
  const [headerProps, setHeaderProps] = useState<
    HeaderProfileEditorProps | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [reload, setReload] = useState<boolean>(false);

  const [isAvatarCameraOpen, setIsAvatarCameraOpen] = useState(false);
  const [isBgCameraOpen, setIsBgCameraOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          process.env.EXPO_PUBLIC_BASE_URL + "/mine/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        setBioProps(response.data);
        setHeaderProps(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [reload]);
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1">
          <HeaderProfileEditor
            {...headerProps}
            setStartLoading={() => setLoading(true)}
            setEndLoading={() => setLoading(false)}
            setIsLoading={() => setIsLoading(true)}
            setNotIsLoading={() => setIsLoading(false)}
            setReload={() => setReload(true)}
            setIsAvatarCameraOpen={(value) => {
              setIsAvatarCameraOpen(value);
              openCamera();
            }}
            setIsBgCameraOpen={(value) => {
              setIsBgCameraOpen(value);
              openCamera();
            }}
          />
          <View className="space w-full h-[90px]"></View>
          <BioEditor
            {...bioProps}
            setStartLoading={() => setLoading(true)}
            setEndLoading={() => setLoading(false)}
            setIsLoading={() => setIsLoading(true)}
            setNotIsLoading={() => setIsLoading(false)}
          />
          <View className="absolute mt-[20px] ml-[20px]">
            <Previous navigation={navigation} />
          </View>
        </ScrollView>
        {loading ? <LoadingSpinner loading={isLoading} /> : null}
        {isAvatarCameraOpen ? (
          <View
            style={StyleSheet.absoluteFillObject}
            className="fixed w-screen h-screen z-100"
          >

            <ExpoCamera
              setSelectedMedia={setSelectedAvatar}
              isSendNow={true}
              onClose={() => {
                setIsAvatarCameraOpen(false);
                closeCamera();
              }}
              onSend={async () =>
                await uploadAvatar(
                  selectedAvatar,
                  () => setLoading(true),
                  () => setIsLoading(true),
                  () => setLoading(false),
                  () => setIsLoading(false),
                  () => setReload(true)
                )
              }
            />
          </View>
        ) : null}
        {isBgCameraOpen ? (
          <View
            style={StyleSheet.absoluteFillObject}
            className="fixed w-screen h-screen z-100"
          >
            <ExpoCamera
              setSelectedMedia={setSelectedBackground}
              isSendNow={true}
              onClose={() => {
                setIsBgCameraOpen(false);
                closeCamera();
              }}
              onSend={async () =>
                await uploadBackground(
                  selectedBackground,
                  () => setLoading(true),
                  () => setIsLoading(true),
                  () => setLoading(false),
                  () => setIsLoading(false),
                  () => setReload(true)
                )
              }
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};

export default UpdateProfilePage;
