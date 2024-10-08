import { View, Text, Switch, Image, useColorScheme } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { IconURL } from "@/constants/IconURL";
import SunMoonSwitch from "@/components/ui/SunMoonSwitch";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeProviders";
const SettingHeader = () => {
  const [isOn, setIsOn] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme, isDarkTheme } = useTheme();
  return (
    <View className="flex flex-row items-center justify-between py-[17px] px-[19px]">
      <View className="flex flex-row">
        <UserAvatarLink size={72} link="/friends/my-wall"></UserAvatarLink>
        <View className="flex ml-[12px] justify-center">
          <Text className="text-18 font-helvetica-bold">Name</Text>
          <Text className="text-16 font-helvetica-light">@linkname</Text>
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
