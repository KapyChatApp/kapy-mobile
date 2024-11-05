import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import Love from "@/components/ui/Love";
import Share from "@/components/ui/Share";
import Comment from "@/components/ui/Comment";
import { useRouter } from "expo-router";
import { SocialPostProps } from "@/types/post";
import { formatDate } from "@/utils/DateFormatter";
import { Video } from 'expo-av';

const SocialPost = (props: SocialPostProps) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const router = useRouter();

  return (
    <Pressable
     
      className="flex border border-border rounded-3xl p-[16px] w-full pb-[50px]"
      style={{ rowGap: 8 }}
      pointerEvents="box-none"
    >
      <View className="flex flex-row" style={{ columnGap: 8 }}>
        <UserAvatarLink avatarURL={{ uri: props.avatar }} userId={props.userId} size={59} />
        <View className="flex pt-[8px]" style={{ rowGap: 6 }}>
          <Text className={`${textLight0Dark500} font-helvetica-bold text-16`}>
            {props.firstName + ' ' + props.lastName}
          </Text>
          <Text className="text-dark-330 font-helvetica-light text-10">
            {formatDate(props.createAt)}
          </Text>
        </View>
      </View>
      <View className="flex" style={{ rowGap: 10 }}>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          {props.caption}
        </Text>
        {props.contents.map((item)=>
          item.type==="Video"?  <Video
            source={{ uri: item.url }}
            style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 10 }}
            shouldPlay={false}
            isLooping={false}
            useNativeControls
          />:(item.type==="Image"? <Image
            source={{ uri: item.url }}
            style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 10 }}
            resizeMode="cover"
          />:null)
        )}
        

      </View>
      <View
        className="flex flex-row absolute -bottom-[14px] left-[20px]"
        style={{ columnGap: 8 }}
      >
        <Love />
        <Comment />
        <Share />
      </View>
    </Pressable>
  );
};

export default SocialPost;
