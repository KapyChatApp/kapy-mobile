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

const CreateGroupForm = ({ isVisible, onClose }: any) => {
  const router = useRouter();
  const ref = useClickOutside(() => onClose());
  const [friends, setFriends] = useState<FriendBoxProps[]>([]);
  const [selected, setSelected] = useState<FriendBoxProps[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string; name: string | null | undefined }[]
  >([]);
  const [groupName, setGroupName] = useState("");
  const handleGalleryPicker = async () => {
    const media = await singlePickMedia();
    setSelectedMedia(media);
  };
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

  const convertToReceiverProps = async (receiverIds: string[]) => {
    const user = await AsyncStorage.getItem("user");
    const userData = await JSON.parse(user!);
    const localReceiver: ReceiverProps = {
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: userData.avatar,
      phoneNumber: userData.phoneNumber,
    };
    const receivers: ReceiverProps[] = [localReceiver];
    for (const receiverId of receiverIds) {
      const friend = await AsyncStorage.getItem(`friend-${receiverId}`);
      const friendData = await JSON.parse(friend!);
      const receiver: ReceiverProps = {
        _id: friendData._id,
        firstName: friendData.firstName,
        lastName: friendData.lastName,
        avatar: friendData.avatar,
        phoneNumber: friendData.phoneNumber,
      };
      receivers.push(receiver);
    }
    return receivers;
  };

  const handleCreateGroup = async () => {
    const { _id } = await getLocalAuth();
    const memberIds:string[] = [];
    for (const friend of selected) {
      memberIds.push(friend._id);
    }
    await createGroup(memberIds, groupName, selectedMedia[0], async (boxId) => {
      await AsyncStorage.setItem(
        `box-${boxId}`,
        JSON.stringify({
          _id: boxId,
          groupName: groupName,
          groupAva: selectedMedia[0].uri,
          receiverIds: convertToReceiverProps(memberIds),
          createAt: new Date().toDateString,
          responseLastMessage: null,
          localUserId: (await getLocalAuth())._id,
          setLastMessage: () => {},
          readStatus: true,
          isOnline: true,
        })
      );
      router.push({
        pathname: "/chatbox/[messageId]",
        params: { messageId: boxId },
      });
      onClose();
    });
  };

  useEffect(() => {
    const getMyFriendsFUNC = async () => {
      const friends = await AsyncStorage.getItem("friends");
      const friendDatas = await JSON.parse(friends!);
      setFriends(friendDatas);
    };
    getMyFriendsFUNC();
  }, []);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.overlay}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[{ transform: [{ translateY }] }, { rowGap: 20 }]}
          className={`w-full h-3/4 flex items-center ${bgLight500Dark10}`}
          ref={ref}
        >
          <View style={styles.dragHandle} />
          <View className=" px-[20px] w-full flex  flex-row items-center justify-between">
            <Text
              className={`text-18 font-helvetica-bold ${textLight0Dark500} text-cardinal`}
            >
              Create group
            </Text>
            <CustomButton
              width={80}
              height={40}
              label="Create"
              onPress={handleCreateGroup}
            />
          </View>
          <View
            className="flex flex-row w-full items-center justify-center px-[10px]"
            style={{ columnGap: 8 }}
          >
            <TouchableOpacity
              className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-light-300"
              onPress={handleGalleryPicker}
            >
              {selectedMedia.length != 0 ? (
                <Image
                  className="rounded-full"
                  source={{ uri: selectedMedia[0].uri }}
                  width={70}
                  height={70}
                />
              ) : (
                <Icon iconURL={IconURL.change_image} size={30} />
              )}
            </TouchableOpacity>
            <TextInput
              className={`flex-1 py-[12px] pr-[8px] text-16 font-helvetica-bold border-b border-border ${textLight0Dark500}`}
              placeholder="Group name"
              onChangeText={setGroupName}
            />
          </View>
          <View
            className="flex flex-row flex-wrap px-[20px] w-full"
            style={{ rowGap: 4, columnGap: 10 }}
          >
            {selected.map((item, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-center bg-light-340 dark:bg-dark-20 p-[4px] rounded-xl
            "
                style={{ columnGap: 2 }}
              >
                <UserAvatar avatarURL={{ uri: item.avatar }} size={24} />
                <Text
                  className={`${textLight0Dark500} text-14 font-helvetica-bold`}
                >
                  {item.lastName}
                </Text>
              </View>
            ))}
          </View>
          <ScrollView className="flex-1 pb-[10px] h-3/4" contentContainerStyle={{paddingBottom:10}} >
            {
              friends.map((item, index) => (
                <SelectFriendBox
                  onSelect={(data) => setSelected((prev) => [...prev, data])}
                  onUnSelect={(data) => {
                    setSelected((prev) =>
                      prev.filter((item) => item._id !== data._id)
                    );
                  }}
                  key={index}
                  {...item}
                />
              ))
            }
          </ScrollView>
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

export default CreateGroupForm;
