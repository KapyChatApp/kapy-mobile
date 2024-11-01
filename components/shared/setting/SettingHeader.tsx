import { View, Text, Switch, Image, useColorScheme } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { IconURL } from "@/constants/IconURL";
import SunMoonSwitch from "@/components/ui/SunMoonSwitch";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { useFocusEffect, useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeProviders";
import { textLight0Dark500 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingHeader = () => {
  const [isOn, setIsOn] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme, isDarkTheme } = useTheme();
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  useFocusEffect( useCallback(() => {
    const getAvatar = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const {firstName, lastName, nickName, avatar } = JSON.parse(user);
      setAvatar(avatar);
      setFirstName(firstName);
      setLastName(lastName);
      setNickName(nickName);
    };
    getAvatar();},[]
  ));
  return (
    <View className="flex flex-row items-center justify-between py-[17px] px-[19px]">
      <View className="flex flex-row">
        <UserAvatarLink avatarURL={{uri:avatar}} size={72} link="/(mine)/my-wall"></UserAvatarLink>
        <View className={`flex ml-[12px] justify-center `}>
          <Text
            className={`text-16 font-helvetica-bold text-light-0 dark:text-dark-500 ${textLight0Dark500} `}
          >
            {firstName + ' ' + lastName}
          </Text>
          <Text className={`text-12 font-helvetica-light ${textLight0Dark500}`}>
            {'@' + nickName}
          </Text>
          <Text className="text-14 font-helvetica-bold text-cardinal">100</Text>
        </View>
      </View>
      <View className="flex justify-center" style={{ rowGap: 4 }}>
        <CustomButton
          width={106}
          height={33}
          label="Update profile"
          onPress={() => {
            router.push("/setting/update-profile");
          }}
        ></CustomButton>
        <View className="flex flex-row items-center justify-around">
          <Text
            className={`text-14 font-helvetica-regular ${
              theme ? "text-white" : "text-cardinal"
            }`}
          >
            {theme ? "Dark" : "Light"}
          </Text>
          <SunMoonSwitch
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
          ></SunMoonSwitch>
        </View>
      </View>
    </View>
  );
};

export default SettingHeader;
