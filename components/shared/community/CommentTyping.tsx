import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";
import { textLight0Dark500 } from "@/styles/theme";
import SingleGalleryPickerBox from "@/components/ui/SingleGalleryPicker";
import { pickMedia, singlePickMedia } from "@/utils/GalleryPicker";
import { createComment } from "@/lib/comment";
import { CommentProps } from "@/types/post";

const CommentTyping = ({
  replyId,
  replyName,
  setReplyName,
  targetType,
  setTargetType,
  createNewComment,
  handleOpenCamera,
  handleOpenMicro,
  selectedMedia,
  setSelectedMedia
}: {
  replyId: string | undefined;
  replyName: string;
  setReplyName: (name: string) => void;
  setTargetType: (type: string) => void;
  targetType: string;
  createNewComment: (newComment: CommentProps) => void;
  handleOpenCamera:any;
  handleOpenMicro:any;
  selectedMedia:any;
  setSelectedMedia:any;
}) => {
  const { theme } = useTheme();
  const [caption, setCaption] = useState("");
  const handlePickMedia = async () => {
    const media = await singlePickMedia();
    setSelectedMedia(media[0]);
  };

  return (
    <View >
      {replyName != "" ? (
        <View
          className=" flex flex-row p-[10px] items-center"
          style={{ columnGap: 4 }}
        >
          <Text className="text-cardinal text-10 font-helvetica-light">
            ...Replying {replyName}
          </Text>
          <TouchableOpacity
            onPress={() => (setReplyName(""), setTargetType("post"))}
          >
            <Icon iconURL={IconURL.close} size={12} />
          </TouchableOpacity>
        </View>
      ) : null}

      <View
        className="flex flex-row items-center justify-center py-[12px] bg-white dark:bg-dark-0 px-[10px]"
        style={{ columnGap: 14 }}
      >
        <TouchableOpacity onPress={handleOpenMicro}>
          <Icon
            iconURL={theme === "light" ? IconURL.mic_l: IconURL.mic_d}
            size={34}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickMedia()}>
          <Icon
            iconURL={theme === "light" ? IconURL.image_l : IconURL.image_d}
            size={34}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenCamera}>
          <Icon
            iconURL={theme === "light" ? IconURL.opencam_l : IconURL.opencam_d}
            size={34}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Type..."
          placeholderTextColor="#A9A9A9"
          className={`flex-1 h-[42px] ${textLight0Dark500} bg-light-600 dark:bg-dark-330 rounded-full px-[12px] font-helvetica-light text-14`}
          onChangeText={setCaption}
        />
        <TouchableOpacity
          onPress={async () => {
            const newComment = await createComment(
              caption,
              selectedMedia,
              () => Alert.alert("Successfully!"),
              replyId,
              targetType
            );
            createNewComment(newComment);
          }}
        >
          <Icon iconURL={IconURL.send} size={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentTyping;
