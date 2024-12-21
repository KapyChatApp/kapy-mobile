import { View, Text, Touchable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TabIcon from "../../ui/TabIcon";
import { IconURL } from "@/constants/IconURL";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../ui/Icon";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import MyAvatar from "@/components/ui/MyAvatar";
import CreateGroupForm from "@/components/form/CreateGroupForm";
const TopBar = ({ isOpen, setIsOpen }: any) => {
  const [avatar, setAvatar] = useState("/assets/avatars/Male.png");
  const router = useRouter();
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const getAvatar = async () => {
        const user = await AsyncStorage.getItem("user");
        if (!user) {
          throw new Error("You are unauthenticated!");
        }
        const { avatar } = JSON.parse(user);
        setAvatar(avatar);
      };
      getAvatar();
    }, [])
  );
  return (
    <View
      className={`wrapper flex flex-row items-center justify-between px-[22px] pt-[12px]`}
    >
      <TouchableOpacity
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Icon size={22} iconURL={IconURL.sidebar}></Icon>
      </TouchableOpacity>
      <View
        className="flex flex-row items-center justify-center"
        style={{ columnGap: 20 }}
      >
        <TouchableOpacity onPress={() => router.push("/(mine)/notification")}>
          <Icon size={30} iconURL={IconURL.notification} />
        </TouchableOpacity>
        <TouchableOpacity
          className=""
          onPress={() => setIsCreateGroupOpen(true)}
        >
          <Icon iconURL={IconURL.editable} size={30} />
        </TouchableOpacity>
        <MyAvatar size={47} />
      </View>
      {isCreateGroupOpen ? (
        <CreateGroupForm
          isVisible={isCreateGroupOpen}
          onClose={() => setIsCreateGroupOpen(false)}
        />
      ) : null}
    </View>
  );
};

export default TopBar;
