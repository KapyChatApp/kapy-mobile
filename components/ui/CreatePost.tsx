import { View, Text, Pressable } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { textLight0Dark500 } from "@/styles/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { useRouter } from "expo-router";

const CreatePost = ({ avatarURL }: { avatarURL: string | undefined }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="border-[0.5px] border-border rounded-3xl flex- flex-row mx-[10px] h-[70px] items-center justify-center p-[10px] "
      style={{ columnGap: 10 }}
      onPress={() => router.push("/community/create-post")}
    >
      <UserAvatar avatarURL={{ uri: avatarURL }} size={50} />
  
      <Text
        className={`${textLight0Dark500} font-helvetica-light text-14 flex-1`}
      >
        How are you today? 
      </Text>

      <Icon iconURL={IconURL.editable} size={18} />
    </TouchableOpacity>
  );
};

export default CreatePost;
