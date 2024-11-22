import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { FriendBoxProps } from "@/types/friend";
import { unBlock } from "@/lib/un-request";

const BlockedUserBox = (props: FriendBoxProps) => {
  const [isReloadAndHide, setIsReloadAndHide] = useState<boolean>(false);
  const handleUnBlock = async () => {
    await unBlock(props._id, () => setIsReloadAndHide(true));
  };
  return (
    <View className="flex-1">
      {isReloadAndHide ? null : (
        <View
          className={`flex flex-row items-center justify-between border border-border rounded-3xl py-[8px] px-[14px] mx-[19px] ${bgLight500Dark10}`}
        >
          <View className="flex flex-row items-center justify-center">
            <UserAvatar
              avatarURL={{ uri: props.avatar }}
              size={57}
            ></UserAvatar>
            <Text
              className={`text-14 font-helvetica-bold ml-[12px] ${textLight0Dark500}`}
            >
              {props.firstName + " " + props.lastName}
            </Text>
          </View>
          <CustomButton
            width={76}
            height={31}
            label="Unblock"
            onPress={handleUnBlock}
          ></CustomButton>
        </View>
      )}
    </View>
  );
};

export default BlockedUserBox;
