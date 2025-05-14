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
} from "react-native";
import { useClickOutside } from "react-native-click-outside";
import CustomButton from "../ui/CustomButton";
import { FriendBoxProps } from "@/types/friend";
import SelectFriendBox from "../shared/friend/SelectFriendBox";
import Icon from "../ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { singlePickMedia } from "@/utils/GalleryPicker";
import { createGroup } from "@/lib/message";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../ui/LoadingSpinner";
import Search from "../shared/function/Search";
import { getFromAsyncStorage } from "@/utils/Device";

// ✅ SelectedFriendBox hiển thị đúng layout
const SelectedFriendBox = ({
  onRemove,
  ...friend
}: {
  onRemove: (friend: FriendBoxProps) => void;
} & FriendBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onRemove(friend)}
      style={styles.selectedBox}
      activeOpacity={0.7}
    >
      <Image source={{ uri: friend.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{friend.lastName}</Text>
      <Icon iconURL={IconURL.close} size={16} />
    </TouchableOpacity>
  );
};

const CreateGroupForm = ({ isVisible, onClose }: any) => {
  const router = useRouter();
  const ref = useClickOutside(() => onClose());
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<FriendBoxProps[]>([]);
  const [selected, setSelected] = useState<FriendBoxProps[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string; name: string | null | undefined }[]
  >([]);
  const [groupName, setGroupName] = useState("");
  const [q, setQ] = useState("");

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

  const handleCreateGroup = async () => {
    setLoading(true);
    const memberIds = selected.map((friend) => friend._id);
    const newGroup = await createGroup(memberIds, groupName, selectedMedia[0]);
    const chatboxes = await getFromAsyncStorage("ChatBoxes");
    const updatedChatBoxes = [...chatboxes, newGroup];
    await AsyncStorage.setItem("ChatBoxes", JSON.stringify(updatedChatBoxes));
    await AsyncStorage.setItem(`box-${newGroup._id}`, JSON.stringify(newGroup));
    onClose();
    setLoading(false);
    router.push({
      pathname: "/chatbox/[messageId]",
      params: { messageId: newGroup._id },
    });
  };

  const handleSearch = () => {
    const lowerCaseQuery = q.toLowerCase();
    return friends.filter((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`.toLowerCase();
      const reverseFullName = `${friend.lastName} ${friend.firstName}`.toLowerCase();
      return (
        friend.firstName?.toLowerCase().includes(lowerCaseQuery) ||
        friend.lastName?.toLowerCase().includes(lowerCaseQuery) ||
        fullName.includes(lowerCaseQuery) ||
        reverseFullName.includes(lowerCaseQuery)
      );
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
          className={`w-full h-5/6 flex items-center ${bgLight500Dark10}`}
          ref={ref}
        >
          <View style={styles.dragHandle} />
          <View className="px-[20px] w-full flex flex-row items-center justify-between">
            <Text className={`text-18 font-helvetica-bold ${textLight0Dark500}`}>
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
              {selectedMedia.length !== 0 ? (
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

          <Search onChangeText={setQ} />

          <View style={styles.selectedContainer}>
            {selected.map((item, index) => (
              <SelectedFriendBox
                key={index}
                {...item}
                onRemove={(friend) =>
                  setSelected((prev) => prev.filter((f) => f._id !== friend._id))
                }
              />
            ))}
          </View>

          <ScrollView className="flex-1 w-full pb-[10px] h-3/4">
            {(q === "" ? friends : handleSearch()).map((item, index) => (
              <SelectFriendBox
                key={index}
                {...item}
                isDisable={false}
                isSelected={selected.some((s) => s._id === item._id)}
                onSelect={(data) => setSelected((prev) => [...prev, data])}
                onUnSelect={(data) =>
                  setSelected((prev) => prev.filter((f) => f._id !== data._id))
                }
              />
            ))}
          </ScrollView>
        </Animated.View>
        {loading ? <LoadingSpinner loading={loading} /> : null}
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
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
    marginVertical: 10,
  },
  selectedContainer: {
    flexDirection: "row",
    rowGap: 8,
    columnGap: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 80,
    maxWidth: "48%",
    flexShrink: 0,
    gap: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  name: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
});

export default CreateGroupForm;
