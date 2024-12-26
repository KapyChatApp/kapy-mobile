import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  PanResponder,
  Animated,
  ScrollView,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { useClickOutside } from "react-native-click-outside";
import CustomButton from "../ui/CustomButton";
import { getMyFriends } from "@/lib/my-friends";
import { FriendBoxProps } from "@/types/friend";
import SelectFriendBox from "../shared/friend/SelectFriendBox";
import Icon from "../ui/Icon";
import { IconURL } from "@/constants/IconURL";
import UserAvatar from "../ui/UserAvatar";
import { singlePickMedia } from "@/utils/GalleryPicker";
import { createGroup } from "@/lib/message-request";
import { getLocalAuth } from "@/lib/local-auth";
import { create } from "tailwind-rn";
import { useRouter } from "expo-router";
import { MessageBoxProps, ReceiverProps } from "@/types/message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../ui/LoadingSpinner";
import DataInputBig from "../ui/DataInputBig";
import { createMapStatus, deleteMapStatus, editMapStatus } from "@/lib/map";
import { CreateMapStatusProps, EditMapStatusProps } from "@/types/map";
import ExpoCamera from "../shared/multimedia/ExpoCamera";
import { useCamera } from "@/context/CameraContext";

const MapStatusForm = ({
  isVisible,
  onClose,
  after,
  startLoading,
  endLoading,
  isLoading,
  notIsLoading,
  handleOpenCamera
}: any) => {
  const ref = useClickOutside(() => onClose());
  const router = useRouter();
  const {photoUri} = useCamera();
  const [mode, setMode] = useState("create");
  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string; name: string | null | undefined }[]
  >([]);
  const [statusId, setStatusId] = useState("");
  const [caption, setCaption] = useState("");
  const [avatar, setAvatar] = useState("");
  const [keepOldContent, setKeepOldContent] = useState(true);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleCreateMapStatus = async () => {
    onClose();
    const param: CreateMapStatusProps = {
      caption: caption,
      file: selectedMedia[0],
    };
    const newMapStatus = await createMapStatus(
      param,
      startLoading,
      endLoading,
      isLoading,
      notIsLoading,
      (data) => after(data)
    );
    await AsyncStorage.setItem("my-map-status", JSON.stringify(newMapStatus));
    setMode("edit");
  };

  const handleEditMapStatus = async () => {
    onClose();
    const param: EditMapStatusProps = {
      caption: caption,
      file: selectedMedia[0],
      keepOldContent: keepOldContent,
    };
    const updatedMapStatus = await editMapStatus(
      statusId,
      param,
      startLoading,
      endLoading,
      isLoading,
      notIsLoading,
      (data) => after(data)
    );
    await AsyncStorage.setItem(
      "my-map-status",
      JSON.stringify(updatedMapStatus)
    );
  };

  const handleDeleteMapStatus = async () => {
    onClose();
    setMode("create");
    setStatusId("");
setCaption("");
setSelectedMedia([]);
    await deleteMapStatus(
      startLoading,
      endLoading,
      isLoading,
      notIsLoading,
      () => after(undefined)
    );
  };

  useEffect(() => {
    const getLocalUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      const user = await JSON.parse(userString!);
      setAvatar(user.avatar);
    };
    const getLocalStatus = async () => {
      const localStatus = await AsyncStorage.getItem("my-map-status");
      const localStatusObject = await JSON.parse(localStatus!);
      if (
        ((localStatusObject.caption !== undefined && localStatusObject.capton!== null) &&
          localStatusObject.caption !== "") ||
        (localStatusObject.content !== undefined && localStatusObject.content!==null)
      ) {
       
          setMode("edit");
          const status = await JSON.parse(localStatus!);
          setStatusId(status._id);
          setCaption(status.caption);
          setSelectedMedia([
            {
              uri: status.content.url,
              type: status.content.type,
              name: status.content.fileName,
            },
          ]);
      }
    };
    getLocalStatus();
    getLocalUser();
  }, []);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
      style={{zIndex:50, elevation:50}}
    >
      <View style={styles.overlay}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[{ transform: [{ translateY }] }, { rowGap: 30 }]}
          className={`w-full h-3/4 flex items-center ${bgLight500Dark10}`}
          ref={ref}
        >
          <View style={styles.dragHandle} />
          <View className=" px-[20px] w-full flex  flex-row items-center justify-between">
            <Text
              className={`text-18 font-helvetica-bold ${textLight0Dark500} text-cardinal`}
            >
              What are you doing?
            </Text>
            <View className="flex flex-row" style={{ columnGap: 10 }}>
              <CustomButton
                width={80}
                height={40}
                label={mode === "create" ? "Create" : "Edit"}
                onPress={
                  mode === "create"
                    ? handleCreateMapStatus
                    : handleEditMapStatus
                }
              />
              {mode === "edit" ? (
                <CustomButton
                  width={80}
                  height={40}
                  label="Delete"
                  onPress={handleDeleteMapStatus}
                />
              ) : null}
            </View>
          </View>
          <UserAvatar size={100} avatarURL={{ uri: avatar }} />
          <View
            className="flex flex-row items-center justify-between px-[20px]"
            style={{ columnGap: 10 }}
          >
            <Icon iconURL={IconURL.chat_select} size={40} />
            <TextInput
              className={`flex-1 ${textLight0Dark500} font-helvectica-regular text-16 px-[10px] py-[12px] border-b border-border`}
              placeholder="How do you feel?"
              onChangeText={setCaption}
              value={caption}
            />
          </View>
          {selectedMedia.length === 0 ? (
            <TouchableOpacity
              className="h-[270px] w-[190px] flex items-center justify-center bg-light-300 dark:bg-dark-20 rounded-2xl"
              style={{ rowGap: 10 }}
              onPress={()=>router.push("/livemap/camera")}
            >
              <Icon iconURL={IconURL.opencam_d} size={40} />
              <Text className="text-white font-helvetica-light">
                Take a picture
              </Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Image
                source={{ uri: photoUri! }}
                style={{ width: 250, aspectRatio: 1, borderRadius: 10 }}
              />
              <TouchableOpacity
                className="absolute -top-[20px] -right-[20px]"
                onPress={
                  mode === "create"
                    ? () => setSelectedMedia([])
                    : () => {
                        setKeepOldContent(false);
                        setSelectedMedia([]);
                      }
                }
              >
                <Icon iconURL={IconURL.close} size={40} />
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MapStatusForm;
