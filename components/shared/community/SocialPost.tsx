import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import Love from "@/components/ui/Love";
import Share from "@/components/ui/Share";
import Comment from "@/components/ui/Comment";
import { useRouter } from "expo-router";

const SocialPost = ({ content }: any) => {
  const [isShowComment, setIsShowComment] = useState(false);
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/community/post-detail/[postId]",
          params: { postId: 1 },
        })
      }
      className="flex border border-border rounded-3xl p-[16px] w-full pb-[50px]"
      style={{ rowGap: 8 }}
    >
      <View className="flex flex-row" style={{ columnGap: 8 }}>
        <UserAvatarLink link="/friends/friend-profile/1" size={59} />
        <View className="flex pt-[8px]" style={{ rowGap: 6 }}>
          <Text className={`${textLight0Dark500} font-helvetica-bold text-16`}>
            Name
          </Text>
          <Text className="text-dark-330 font-helvetica-light text-10">
            00:00
          </Text>
        </View>
      </View>
      <View>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          {content}
        </Text>
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
