import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { bgLight340Dark330, textLight0Dark500 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import UserAvatar from "@/components/ui/UserAvatar";
import { MessageProps } from "@/types/message";
import { formatDateDistance } from "@/utils/DateFormatter";
import { Image } from "react-native";
import VideoPlayer from "../multimedia/VideoPlayer";
import AudioPlayer from "../multimedia/AudioPlayer";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { deleteMessage, revokeMessage } from "@/lib/message-request";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";
import { getPathWithConventionsCollapsed } from "expo-router/build/fork/getPathFromState-forks";

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

  const handleRevokeMessage = async () => {
    props.revokeMessage?.(props.id);
    await revokeMessage(props.id);
  };

  const handleDeleteMessage = async () => {
    Alert.alert(
      "Delete Message", // Tiêu đề
      "Are you sure you want to delete this message?", // Nội dung
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            props.deleteMessage?.(props.id);
            await deleteMessage(props.id);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const { showActionSheetWithOptions } = useActionSheet();
  const handleLongPress = async () => {
    const options = props.isSender
      ? ["Revoke message", "Delete message", "Cancel"]
      : ["Report this rate", "Delete message", "Cancel"];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 0:
            if (props.isSender) {
              handleRevokeMessage();
            } else {
              console.log("report");
            }
            break;
          case 1:
            handleDeleteMessage();
            break;
          case cancelButtonIndex:
        }
      }
    );
  };

  const renderContent = () => {
    switch (props.contentId.type) {
      case "Image":
        return (
          <Pressable
            onPress={() => props?.handleViewImage(props.contentId.url!)}
          >
            <Image
              source={{ uri: props.contentId.url }}
              className="w-full h-full rounded-2xl"
            />
          </Pressable>
        );
      case "Video":
        return (
          <View className="rounded-2xl flex-1">
            <VideoPlayer videoSource={props.contentId.url!} />
          </View>
        );
      case "Audio":
        return (
          <AudioPlayer
            audioUri={props.contentId.url!}
            isSender={props.isSender}
          />
        );
      default:
        switch (props.contentId.url?.split(".").pop()) {
          case "docx":
            return (
              <Pressable
                className={`flex flex-row p-[10px]  ${
                  props.isSender
                    ? "bg-cardinal"
                    : " bg-ios-light-340 dark:bg-ios-dark-330"
                } ${
                  props.isSender ? roundedValueSender() : roundedValueReceiver()
                }`}
                style={{ columnGap: 4 }}
                onPress={() => props.handleViewFile(props.contentId)}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl bg-light- p-[10px] bg-light-510`}
                >
                  <Icon iconURL={IconURL.docx} size={40} />
                </View>
                <View className="flex" style={{ rowGap: 4 }}>
                  <View className="flex flex-row w-[140px]">
                    <Text
                      className={`${
                        props.isSender ? "text-white" : "text-black"
                      } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                      numberOfLines={3}
                    >
                      {props.contentId.fileName}
                    </Text>
                  </View>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {props.contentId.url.split(".").pop()?.toUpperCase()}
                  </Text>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {0.001 * props.contentId.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
          case "xls":
            return (
              <Pressable
                className={`flex flex-row p-[10px]  ${
                  props.isSender
                    ? "bg-cardinal"
                    : " bg-ios-light-340 dark:bg-ios-dark-330"
                } ${
                  props.isSender ? roundedValueSender() : roundedValueReceiver()
                }`}
                style={{ columnGap: 4 }}
                onPress={() => props.handleViewFile(props.contentId)}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl bg-light- p-[10px]bg-light-510`}
                >
                  <Icon iconURL={IconURL.xls} size={40} />
                </View>
                <View className="flex" style={{ rowGap: 4 }}>
                  <View className="flex flex-row w-[140px]">
                    <Text
                      className={`${
                        props.isSender ? "text-white" : "text-black"
                      } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                      numberOfLines={3}
                    >
                      {props.contentId.fileName}
                    </Text>
                  </View>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {props.contentId.url.split(".").pop()?.toUpperCase()}
                  </Text>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    }font-helvetica-light text-10`}
                  >
                    {0.001 * props.contentId.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
          case "ppt":
            return (
              <Pressable
                className={`flex flex-row p-[10px]  ${
                  props.isSender
                    ? "bg-cardinal"
                    : " bg-ios-light-340 dark:bg-ios-dark-330"
                } ${
                  props.isSender ? roundedValueSender() : roundedValueReceiver()
                }`}
                style={{ columnGap: 4 }}
                onPress={() => props.handleViewFile(props.contentId)}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl bg-light- p-[10px]bg-light-510`}
                >
                  <Icon iconURL={IconURL.ppt} size={40} />
                </View>
                <View className="flex" style={{ rowGap: 4 }}>
                  <View className="flex flex-row w-[140px]">
                    <Text
                      className={`${
                        props.isSender ? "text-white" : "text-black"
                      } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                      numberOfLines={3}
                    >
                      {props.contentId.fileName}
                    </Text>
                  </View>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {props.contentId.url.split(".").pop()?.toUpperCase()}
                  </Text>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {0.001 * props.contentId.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
          case "pdf":
            return (
              <Pressable
                className={`flex flex-row p-[10px]  ${
                  props.isSender
                    ? "bg-cardinal"
                    : " bg-ios-light-340 dark:bg-ios-dark-330"
                } ${
                  props.isSender ? roundedValueSender() : roundedValueReceiver()
                }`}
                style={{ columnGap: 4 }}
                onPress={() => props.handleViewFile(props.contentId)}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl bg-light- p-[10px] bg-light-510`}
                >
                  <Icon iconURL={IconURL.pdf} size={40} />
                </View>
                <View className="flex" style={{ rowGap: 4 }}>
                  <View className="flex flex-row w-[140px]">
                    <Text
                      className={`${
                        props.isSender ? "text-white" : "text-black"
                      } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                      numberOfLines={3}
                    >
                      {props.contentId.fileName}
                    </Text>
                  </View>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {props.contentId.url.split(".").pop()?.toUpperCase()}
                  </Text>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {0.001 * props.contentId.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
          default:
            return (
              <Pressable
                className={`flex flex-row p-[10px] ${
                  props.isSender
                    ? "bg-cardinal"
                    : " bg-ios-light-340 dark:bg-ios-dark-330"
                } ${
                  props.isSender ? roundedValueSender() : roundedValueReceiver()
                }`}
                style={{ columnGap: 4 }}
              >
                <Icon iconURL={IconURL.my_document} size={40} />
                <View className="flex" style={{ rowGap: 4 }}>
                  <View className="flex flex-row w-[140px]">
                    <Text
                      className={`${
                        props.isSender ? "text-white" : "text-black"
                      } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                      numberOfLines={3}
                    >
                      {props.contentId.fileName}
                    </Text>
                  </View>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {props.contentId?.url
                      ?.split(".")
                      .pop()
                      ?.toLocaleUpperCase()}
                  </Text>
                  <Text
                    className={`${
                      props.isSender ? "text-white" : "text-black"
                    } font-helvetica-light text-10`}
                  >
                    {0.001 * props.contentId.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
        }
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
        onLongPress={handleLongPress}
      >
        {!props.isSender && (position === "bottom" || position === "free") ? (
          <UserAvatarLink
            avatarURL={{ uri: props.avatar }}
            size={36}
            userId={props.createBy}
          />
        ) : (
          <View className="w-[36px] h-[36px] bg-transparent-"></View>
        )}
        {props.contentId ? (
          <View
            className="flex-1"
            style={{
              maxWidth: 240,
              maxHeight: 240,
              aspectRatio: props.contentId.width! / props.contentId.height!,
            }}
          >
            {renderContent()}
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
              } text-14 ${
                props.text === "Message revoked"
                  ? "font-helvetica-light-italic"
                  : "font-helvetica-light "
              } `}
            >
              {props.text === "Message revoked"
                ? `*${props.text}*`
                : props.text}
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
