import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";
import Icon from "./Icon";
import CustomButton from "./CustomButton";

const PostTyping = ({handleGalleryPicker,handleFilePicker, handlePostAction, handleOpenCamera, handleOpenMicro, handleOpenMusicSelector, handleOpenTagSelector}:{handleGalleryPicker:()=>void,handleFilePicker:()=>void,handlePostAction:()=>void, handleOpenCamera:any, handleOpenMicro:any, handleOpenMusicSelector:()=>void, handleOpenTagSelector:()=>void}) => {
  const { theme } = useTheme();
  return (
    <View
      className={`w-full h-[60px] bg-light-500 dark:bg-dark-0 flex flex-row justify-between items-center px-[10px]`}
      style={{ columnGap: 8 }}
    >
      <View className="flex flex-row" style={{columnGap:20}}>
      <TouchableOpacity onPress={handleFilePicker}>
          <Icon
            iconURL={theme === "light" ? IconURL.attach_l : IconURL.attach_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenMicro}>
          <Icon
            iconURL={theme === "light" ? IconURL.mic_l : IconURL.mic_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGalleryPicker}>
          <Icon
            iconURL={theme === "light" ? IconURL.image_l : IconURL.image_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenCamera}>
          <Icon
            iconURL={theme === "light" ? IconURL.opencam_l : IconURL.opencam_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenMusicSelector}>
          <Icon
            iconURL={theme === "light" ? IconURL.disc_l : IconURL.disc_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenTagSelector}>
          <Icon
            iconURL={theme === "light" ? IconURL.tag_l : IconURL.tag_d}
            size={28}
          ></Icon>
        </TouchableOpacity>
      </View>
      <CustomButton label="Post" width={80} height={40} onPress={handlePostAction}/>
    </View>
  );
};

export default PostTyping;
