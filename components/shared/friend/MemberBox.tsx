import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { FriendBoxProps } from "@/types/friend";
import { useRouter } from "expo-router";
import { ReceiverProps } from "@/types/message";
import { textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const MemberBox = (props: ReceiverProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="flex flex-row py-[12px] px-[10px] items-center"
      onPress={() =>
        router.push({
          pathname:
            props._id === props.localUserId
              ? "/(mine)/my-wall"
              : "/friend/friend-profile/[friendId]",
          params: { friendId: props._id },
        })
      }
      style={{ columnGap: 12 }}
    >
      <View
        className="flex flex-row items-center flex-1"
        style={{ columnGap: 12 }}
      >
        <UserAvatar size={40} avatarURL={{ uri: props.avatar }} />
        <View className="flex" style={{ rowGap: 6 }}>
          <Text className={`${textLight0Dark500} text-14 font-helvetica-bold`}>
            {props.firstName + " " + props.lastName}
          </Text>
          {props.isLeader ? (
            <Text
              className={`${textLight0Dark500} text-12 font-helvetica-regular`}
            >
              Leader
            </Text>
          ) : null}
        </View>
      </View>
      {props.isLeaderRole ? (
        <View className="flex flex-row" style={{columnGap:8}}>
        <TouchableOpacity
          className="flex items-center justify-center p-[8px] rounded-xl bg-dark-300"
          onPress={() => props.handleRemoveMember?.(props._id)}
        >
          <Icon iconURL={IconURL.minus_white} size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex items-center justify-center p-[8px] rounded-xl bg-cardinal"
          onPress={() => props.handleChangeLeader?.(props._id)}
        >
          <Icon iconURL={IconURL.key} size={16} />
        </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default MemberBox;
