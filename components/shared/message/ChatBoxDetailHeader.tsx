import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import UserAvatar from "@/components/ui/UserAvatar";
import { borderLight0Dark500, textLight0Dark500 } from "@/styles/theme";
import CustomButton from "@/components/ui/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { useTheme } from "@/context/ThemeProviders";

const ChatBoxDetailHeader = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <View className="flex items-center justify-center">
      <View className="ml-[14px] mt-[22px] w-full">
        <Previous navigation={navigation} isAbsolute={false} />
      </View>
      <UserAvatar size={99} />
      <Text
        className={`${textLight0Dark500} font-helvetica-bold text-20 mt-[8px] mb-[8px]`}
      >
        Name
      </Text>
      <CustomButton
        label="View profile"
        width={118}
        height={37}
        fontSize={14}
      />
      <View className="flex flex-row items-center justify-center gap-x-2 mt-[8px]">
        <TouchableOpacity
          className={`flex items-center justify-center border border-black dark:border-white rounded-full w-[36px] h-[36px]`}
        >
          <Icon
            iconURL={theme === "light" ? IconURL.search_l : IconURL.search_d}
            size={16}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex items-center justify-center border border-black dark:border-white rounded-full w-[36px] h-[36px]`}
        >
          <Icon
            iconURL={theme === "light" ? IconURL.flag_l : IconURL.flag_d}
            size={16}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxDetailHeader;
