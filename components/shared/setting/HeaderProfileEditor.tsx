import { View, Text } from "react-native";
import React, {  useState } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import ImagePickerBox from "@/components/ui/ImagePicker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { HeaderProfileEditorProps } from "@/types/user";

const HeaderProfileEditor = (props:HeaderProfileEditorProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ['Select an image in your gallery', 'Take a picture', 'Cancel' ];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    }, (selectedIndex: number | undefined) => {
      switch (selectedIndex) {
        case 0:
          setIsGalleryOpen(true);
          break;
          case 1:

            break;
          

        case cancelButtonIndex:
          // Canceled
      }});
  }
  console.log(props.avatar)
  return (
    <View className="flex items-center justify-center relative">
      <View>
        <View className="w-[430px] h-[200px] bg-deny "></View>
        <TouchableOpacity className="absolute right-[10px] -top-[40px]">
          <Icon iconURL={IconURL.change_image} size={35} />
        </TouchableOpacity>
      </View>
      <View className=" flex items-center justify-center absolute top-[90px]">
        <View>
          <UserAvatar avatarURL={{uri:props.avatar}} size={176}></UserAvatar>
          <View className="absolute -right-[10px] top-[20px] ">
          <TouchableOpacity  onPress={onPress} style={{zIndex:200}}>
            <Icon iconURL={IconURL.change_image} size={35} />
          </TouchableOpacity>
          </View>
          {isGalleryOpen? (<View className="absolute"><ImagePickerBox setIsOpen={setIsGalleryOpen}/></View>):null}
        </View>
      </View>
     
    </View>
  );
};

export default HeaderProfileEditor;
