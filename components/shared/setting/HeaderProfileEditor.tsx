import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import ImagePickerBox from "@/components/ui/ImagePicker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { HeaderProfileEditorProps } from "@/types/user";

const HeaderProfileEditor = (props: HeaderProfileEditorProps) => {
  const [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = useState(false);
  const [isUpdateBackgroundOpen, setIsUpdateBackgroundOpen] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

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
            setIsUpdateAvatarOpen(true);
            break;
          case 1:
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
            setIsUpdateBackgroundOpen(true);
            break;
          case 1:
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
          {isUpdateAvatarOpen ? (
            <View className="absolute">
              <ImagePickerBox
                toEndPoint="/media/upload-avatar"
                setIsOpen={setIsUpdateAvatarOpen}
                aspect={[4,3]}
              />
            </View>
          ) : null}
          {isUpdateBackgroundOpen? (
            <View className="absolute">
              <ImagePickerBox
                toEndPoint="/media/upload-background"
                setIsOpen={setIsUpdateBackgroundOpen}
                aspect={[16,9]}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default HeaderProfileEditor;
