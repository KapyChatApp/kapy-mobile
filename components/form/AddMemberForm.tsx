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
import { createGroup } from "@/lib/message";
import { getLocalAuth } from "@/lib/local";
import { create } from "tailwind-rn";
import { useRouter } from "expo-router";
import { MessageBoxProps, ReceiverProps } from "@/types/message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../ui/LoadingSpinner";
import Search from "../shared/function/Search";

const AddMemberForm = ({isVisible, onClose, members}:any) => {
  const router = useRouter();
  const ref = useClickOutside(() => onClose());
  const [friends, setFriends] = useState<FriendBoxProps[]>([]);
  const [selected, setSelected] = useState<FriendBoxProps[]>([]);
  const [memberIds,setMemberIds] = useState<string[]>([]);
 
    const [q,setQ] = useState("");

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

  const handleAddMemberToGroup = async ()=>{

  }

  useEffect(() => {
    const getMyFriendsFUNC = async () => {
      const friends = await AsyncStorage.getItem("friends");
      const friendDatas = await JSON.parse(friends!);
      setFriends(friendDatas);
      const memberIds = members.map((item:any)=>item._id);
      setMemberIds(memberIds);
    };
    getMyFriendsFUNC();
  }, []);

  const handleSearch = ()=>{
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
  }

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
          <View className=" px-[20px] w-full flex  flex-row items-center justify-between">
            <Text
              className={`text-18 font-helvetica-bold ${textLight0Dark500} text-cardinal`}
            >
              Your friends
            </Text>
            <CustomButton
              width={80}
              height={40}
              iconURL={IconURL.to_right_arrow}
              iconSize={15}
              onPress={handleAddMemberToGroup}
            />
          </View>
         <Search onChangeText={setQ}/>
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
          <ScrollView
            className="flex-1 pb-[10px] h-3/4"
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {q===""? friends.map((item, index) => (
              <SelectFriendBox
                onSelect={(data) => setSelected((prev) => [...prev, data])}
                onUnSelect={(data) => {
                  setSelected((prev) =>
                    prev.filter((item) => item._id !== data._id)
                  );
                }}
                key={index}
                {...item}
                isDisable={memberIds.includes(item._id)}
              />
            )): handleSearch().map((item, index) => (
                <SelectFriendBox
                  onSelect={(data) => setSelected((prev) => [...prev, data])}
                  onUnSelect={(data) => {
                    setSelected((prev) =>
                      prev.filter((item) => item._id !== data._id)
                    );
                  }}
                  key={index}
                  {...item}
                  isDisable={memberIds.includes(item._id)}
                />
              ))}
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

export default AddMemberForm;
