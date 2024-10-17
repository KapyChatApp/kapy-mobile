import { View, Text } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";
import { textLight0Dark500 } from "@/styles/theme";

const CommentTyping = () => {
  const { theme } = useTheme();
  return (
    <View
      className="flex flex-row items-center justify-center py-[12px] bg-white dark:bg-dark-0 px-[10px]"
      style={{ columnGap: 4 }}
    >
      <TouchableOpacity>
        <Icon
          iconURL={theme === "light" ? IconURL.image_l : IconURL.image_d}
          size={34}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon iconURL={IconURL.icon} size={34} />
      </TouchableOpacity>
      <TextInput
        placeholder="Type..."
        placeholderTextColor="#A9A9A9"
        className={`flex-1 h-[42px] ${textLight0Dark500} bg-light-600 dark:bg-dark-330 rounded-full px-[12px] font-helvetica-light text-14`}
      />
      <TouchableOpacity>
        <Icon iconURL={IconURL.send} size={34} />
      </TouchableOpacity>
    </View>
  );
};

export default CommentTyping;
