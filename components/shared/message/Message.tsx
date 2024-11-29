import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { bgLight340Dark330, textLight0Dark500 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import UserAvatar from "@/components/ui/UserAvatar";
import { MessageProps } from "@/types/message";
import { formatDateDistance } from "@/utils/DateFormatter";
import { Image } from "react-native";

const Message = (props: MessageProps) => {
  const [position, setPosition] = useState(props.position);
  const [isShowTime, setIsShowTime] = useState(
    position === "bottom" ? true : false
  );
  const ref = useClickOutside<View>(() => setIsShowTime(false));
  const roundedValueReceiver = () => {
    switch (position) {
      case "top":
        return "rounded-t-2xl rounded-bl-sm rounded-tr-3xl rounded-br-3xl";
      case "middle":
        return "rounded-tl-sm rounded-bl-sm rounded-tr-3xl rounded-br-3xl";
      case "bottom":
        return "rounded-tl-sm rounded-bl-2xl rounded-tr-3xl rounded-br-3xl";
      case "free":
        return "rounded-3xl";
    }
  };
  const roundedValueSender = () => {
    switch (position) {
      case "top":
        return "rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl rounded-br-sm";
      case "middle":
        return "rounded-tl-3xl rounded-bl-3xl rounded-tr-sm rounded-br-sm";
      case "bottom":
        return "rounded-tl-3xl rounded-bl-3xl rounded-tr-sm rounded-br-2xl";
      case "free":
        return "rounded-3xl";
    }
  };
  return (
    <View
      className={`flex-1 flex ${props.isSender ? "items-end" : "items-start"}`}
    >
      <Pressable
        className="flex flex-row"
        style={{ columnGap: 4 }}
        onPress={() => {
          if (position !== "bottom") setIsShowTime(!isShowTime);
        }}
      >
        {!props.isSender && (position === "bottom" || position === "free") ? (
          <UserAvatar avatarURL={{ uri: props.avatar }} size={36} />
        ) : (
          <View className="w-[36px] h-[36px] bg-transparent-"></View>
        )}
        {props.contentId.length != 0 ? (
       <View
       className="flex-1"
       style={{
         maxWidth: 240,
         maxHeight: 240,
         aspectRatio: props.contentId[0].width! / props.contentId[0].height!,
       }}
     >
       <Image
         source={{ uri: props.contentId[0].url }}
         className="w-full h-full rounded-2xl"
        
       />
     </View>
        ) : (
          <View
            ref={ref}
            className={`p-[10px] max-w-[60%] ${
              props.isSender
                ? "bg-cardinal"
                : " bg-ios-light-340 dark:bg-ios-dark-330"
            } ${
              props.isSender ? roundedValueSender() : roundedValueReceiver()
            }`}
          >
            <Text
              className={`${
                props.isSender ? "text-light-500" : textLight0Dark500
              } text-14 font-helvetica-light `}
            >
              {props.text}
            </Text>
          </View>
        )}
      </Pressable>
      {position === "bottom" || isShowTime ? (
        <Text className="text-deny font-helvetica-light text-10 ml-[40px]">
          {formatDateDistance(props.createAt)}
        </Text>
      ) : null}
    </View>
  );
};

export default Message;
