import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { HeaderProfileEditorProps } from "@/types/user";
import { pickMedia, singlePickMedia } from "@/utils/GalleryPicker";
import { uploadAvatar, uploadBackground } from "@/lib/my-profile";
import ExpoCamera from "../multimedia/ExpoCamera";

const HeaderProfileEditor = (props: HeaderProfileEditorProps) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleUploadAvatarFromGallery = async ()=>{
    const avatar = await singlePickMedia();
    await uploadAvatar(avatar[0].uri, props.setStartLoading,props.setIsLoading, props.setEndLoading, props.setNotIsLoading, props.setReload, true);
  }

  const handleUploadBackgroundFromGallery = async ()=>{
    const background = await singlePickMedia();
    await uploadBackground(background[0].uri, props.setStartLoading,props.setIsLoading, props.setEndLoading, props.setNotIsLoading, props.setReload, true);
  }

  const onPressAvatar = () => {
    const options = [
      "Select an image in your gallery",
      "Take a picture",
      "Cancel",
    ];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0:
            handleUploadAvatarFromGallery();
            break;
          case 1:
            props.setIsAvatarCameraOpen?.(true);
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };
  const onPressBackground = () => {
    const options = [
      "Select an image in your gallery",
      "Take a picture",
      "Cancel",
    ];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0:
            handleUploadBackgroundFromGallery();
            break;
          case 1:
            props.setIsBgCameraOpen?.(true);
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <View className="flex items-center justify-center relative">
     
      <View>
        <Image
          source={{ uri: props.background }}
          className="w-[430px] h-[200px] bg-deny "
        ></Image>
        <View className="w-[35px] absolute right-[10px] bottom-[6px]" style={{zIndex:100}}>
          <TouchableOpacity
            onPress={onPressBackground}
          >
            <Icon iconURL={IconURL.change_image} size={35} />
          </TouchableOpacity>
        </View>
      </View>
      <View className=" flex items-center justify-center absolute top-[90px]">
        <View>
          <UserAvatar avatarURL={{ uri: props.avatar }} size={176}></UserAvatar>
          <View className="absolute -right-[10px] top-[20px] ">
            <TouchableOpacity onPress={onPressAvatar} style={{ zIndex: 200 }}>
              <Icon iconURL={IconURL.change_image} size={35} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

export default HeaderProfileEditor;
