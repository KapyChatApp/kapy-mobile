import {
  View,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
} from "react-native";
import * as Linking from 'expo-linking';

import React, { useEffect, useRef, useState } from "react";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import { MessageProps } from "@/types/message";
import { formatDateDistance } from "@/utils/DateFormatter";
import { Image } from "react-native";
import VideoPlayer from "../multimedia/VideoPlayer";
import AudioPlayer from "../multimedia/AudioPlayer";
import { deleteMessage, react, revokeMessage } from "@/lib/message";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";
import { useRouter } from "expo-router";
import MessageLove from "@/components/ui/MessageLove";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import UserAvatar from "@/components/ui/UserAvatar";
import { getFromAsyncStorage } from "@/utils/Device";
import { ScrollView } from "react-native-gesture-handler";
import { hasLink } from "@/utils/Link";
import { playSound } from "@/utils/Media";
import { AppSound } from "@/constants/Sound";
import { isGroupSystemMessage } from "@/utils/Text";


const Message = (props: MessageProps) => {
  const [position, setPosition] = useState(props.position);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowMessageInfo, setIsShowMessageInfo] = useState(
    position === "bottom" ? true : false
  );

  const [avatar, setAvatar] = useState("");
  const [readedId, setReadedId] = useState<string[]>([]);
  const timeRef = useClickOutside<View>(() => setIsShowMessageInfo(false));
  const modalRef = useClickOutside<View>(() => setIsModalVisible(false));

  const [isLiked, setIsLiked] = useState(false);
  const [likedArray, setLikedArray] = useState<string[]>([]);
  const [totalLike, setTotalLike] = useState(0);
  const [timeLikes, setTimeLikes] = useState(0);

  const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const pressableRef = useRef<View | null>(null);
  const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");
  const adjustModalPosition = (
    x: number,
    y: number,
    modalWidth: number,
    modalHeight: number
  ) => {
    let adjustedX = x;
    let adjustedY = y;

    if (x + modalWidth > screenWidth) {
      adjustedX = screenWidth - modalWidth - 10; 
    }

    if (x < 0) {
      adjustedX = 10; 
    }

    if (y + modalHeight > screenHeight) {
      adjustedY = screenHeight - modalHeight - 10; 
    }

    if (y < 0) {
      adjustedY = 10; 
    }

    return { x: adjustedX, y: adjustedY };
  };

  const handleLongPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;

    const modalWidth = 270;
    const modalHeight = 160;
    const { x, y } = adjustModalPosition(pageX, pageY, modalWidth, modalHeight);

    setModalPosition({ x, y });
    setIsModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const router = useRouter();
  const roundedValueReceiver = () => {
    if (props.contentId) {
      return "rounded-3xl";
    }
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
    if (props.contentId) {
      return "rounded-3xl";
    }
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


// Tách và xử lý link trong văn bản
const highlightLinks = (message:string) => {
  const parts = message.split(/(\b(?:https?:\/\/|www\.)[^\s]+\b)/g); // Tách văn bản tại các URL
  return parts.map((part, index) => {
    if (hasLink(part)) {
      const formattedLink = part.startsWith('http://') || part.startsWith('https://')
        ? part
        : `https://${part}`;

      return (
        <Text
          key={index}
        className="font-helvetica-bold underline"
          onPress={() => Linking.openURL(formattedLink).catch(err => console.warn('Error opening link:', err))}
        >
          {part}
        </Text>
      );
    }
    return <Text key={index}>{part}</Text>;
  });
};


  const renderContent = () => {
    switch (props.contentId?.type) {
      case "Image":
      case "image":
        return (
          <Pressable
            onPress={() => props?.handleViewImage(props.contentId?.url!)}
            onLongPress={handleLongPress}
          >
            <Image
              source={{ uri: props.contentId.url }}
              className="w-full h-full rounded-2xl"
            />
          </Pressable>
        );
      case "Video":
      case "video":
        return (
          <Pressable
            className="rounded-2xl flex-1 w-full h-full"
            onLongPress={handleLongPress}
          >
            <VideoPlayer videoSource={props.contentId.url!} />
          </Pressable>
        );
      case "Audio":
      case "audio":
        return (
          <AudioPlayer
            audioUri={props.contentId.url!}
            isSender={props.isSender}
          />
        );
      default:
        switch (props.contentId?.url?.split(".").pop()) {
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
                onPress={() => props.handleViewFile(props.contentId!)}
                onLongPress={handleLongPress}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl p-[10px] bg-light-510`}
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
          case "xlsx":
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
                onPress={() => props.handleViewFile(props.contentId!)}
                onLongPress={handleLongPress}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl p-[10px] bg-light-510`}
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
                    } font-helvetica-light text-10`}
                  >
                    {0.001 * props.contentId.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
          case "pptx":
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
                onPress={() => props.handleViewFile(props.contentId!)}
                onLongPress={handleLongPress}
              >
                <View
                  className={`flex items-center justify-center rounded-2xl bg-light- p-[10px]  bg-light-510`}
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
                onPress={() => props.handleViewFile(props.contentId!)}
                onLongPress={handleLongPress}
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
                onLongPress={handleLongPress}
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
                      {props.contentId?.fileName}
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
                    {0.001 * props.contentId?.bytes!}kB
                  </Text>
                </View>
              </Pressable>
            );
        }
    }
  };

  const renderSendStatus = () => {
    switch (props.sendStatus) {
      case "sending":
        return "Sending...";
      case "success":
        return "Sent ✓";
      case "fail":
        return "Fail ×";
    }
  };

  const handleLike = async () => {
    await playSound(AppSound.kiss);
    setIsLiked(!isLiked);
    if ((timeLikes + 1) % 2 != 0) {
      setTotalLike(totalLike + 1);
      setTimeLikes(timeLikes + 1);
    } else {
      setTotalLike(totalLike - 1);
      setTimeLikes(timeLikes + 1);
    }
    await react(props.id);
  };

  const [lastTap, setLastTap] = useState(0);

  const handleDoubleTapPress = () => {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastTap;

    if (timeDifference >= 300 || timeDifference <= 0) {
      if (position !== "bottom") setIsShowMessageInfo(!isShowMessageInfo);
    } else {
      handleLike();
    }
    setLastTap(currentTime);
  };

  useEffect(() => {
    setPosition(props.position);
    setLikedArray(props.isReact);
    setReadedId(props.readedId);
    const setUpMessage = async () => {
      setTotalLike(props.isReact.length);
      const createdUser = await AsyncStorage.getItem(`user-${props.createBy}`);
      const createdUserData = await JSON.parse(createdUser!);
      console.log("getUserAva From: ", createdUserData);
      setAvatar(createdUserData?.avatar);
      if (props.isReact.includes(props.localUserId!)) {
        setIsLiked(true);
        setTimeLikes(1);
      }
    };
    setUpMessage();
  }, [props,avatar]);
  return (
    <View
      className={`flex-1 flex ${props.isSender ? "items-end" : "items-start"}`}
      ref={pressableRef}
    >
      {isModalVisible ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.isSender ? (
              <View
                ref={modalRef}
                className={`w-[150px] right-0 ${
                  Platform.OS === "ios" ? "top-[76px]" : "top-[60px]"
                }  rounded-3xl`}
                style={{
                  position: "absolute",
                  top: modalPosition.y,
                  left: modalPosition.x,
                  borderRadius: 8,
                  padding: 10,
                  width: 150,
                  elevation: 4,
                  rowGap: 10,
                }}
              >
                <View className="flex flex-row items-center" style={{columnGap:10}}>
                <TouchableOpacity
                  className="flex items-center justify-center w-[30px] h-[30px] bg-light-510 dark:bg-dark-20 rounded-full"
                  onPress={async () => {
                    await handleLike();
                    setIsModalVisible(false);
                  }}
                >
                  <Icon iconURL={IconURL.loved} size={16} />
                </TouchableOpacity>
                <View className={`${bgLight500Dark10} rounded-full px-[10px]`}>
                  <ScrollView horizontal={true} contentContainerStyle={{padding:5,columnGap:6}}>
                    {likedArray.map((item, index)=><View key={index} className="flex"><UserAvatar size={30} avatarURL={{uri:props.memberAvatars?.get(item)}}/><View className="absolute -right-[2px] -bottom-[5px]"><Icon size={16} iconURL={IconURL.loved}/></View></View>)}
                  </ScrollView>
                  </View>
                </View>
                <View className={`${bgLight500Dark10} w-[250px] rounded-2xl`}>
                  <TouchableOpacity
                    className="flex items-center justify-center w-full h-[50px]  border-border border-b-[0.5px]"
                    onPress={() => {
                      handleRevokeMessage();
                      setIsModalVisible(false);
                    }}
                  >
                    <Text
                      className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}
                    >
                      Revoke message
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex items-center justify-center w-full h-[50px]  border-border border-t-[0.5px]"
                    onPress={() => {
                      handleDeleteMessage();
                      setIsModalVisible(false);
                    }}
                  >
                    <Text
                      className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}
                    >
                      Delete message
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                ref={modalRef}
                className={`w-[150px] right-0 ${
                  Platform.OS === "ios" ? "top-[76px]" : "top-[60px]"
                }  rounded-3xl`}
                style={{
                  position: "absolute",
                  top: modalPosition.y,
                  left: modalPosition.x,
                  borderRadius: 8,
                  padding: 10,
                  width: 150,
                  elevation: 4,
                  rowGap: 10,
                }}
              >
                <View className="flex flex-row items-center" style={{columnGap:10}}>
                <TouchableOpacity
                  className="flex items-center justify-center w-[30px] h-[30px] bg-light-510 dark:bg-dark-20 rounded-full"
                  onPress={async () => {
                    await handleLike();
                    setIsModalVisible(false);
                  }}
                >
                  <Icon iconURL={IconURL.loved} size={16} />
                </TouchableOpacity>
                <View className={`${bgLight500Dark10} rounded-full px-[10px]`}>
                  <ScrollView horizontal={true} contentContainerStyle={{padding:5,columnGap:6}}>
                    {likedArray.map((item, index)=><View key={index} className="flex"><UserAvatar size={30} avatarURL={{uri:props.memberAvatars?.get(item)}}/><View className="absolute -right-[2px] -bottom-[5px]"><Icon size={16} iconURL={IconURL.loved}/></View></View>)}
                  </ScrollView>
                  </View>
                </View>
                <View className={`${bgLight500Dark10} w-[250px] rounded-2xl`}>
                  <TouchableOpacity
                    className="flex items-center justify-center w-full h-[50px]  border-border border-b-[0.5px]"
                    onPress={() => {
                      router.push({
                        pathname: "/report",
                        params: { targetId: props.id, targetType: "Message" },
                      });
                      setIsModalVisible(false);
                    }}
                  >
                    <Text
                      className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}
                    >
                      Report message
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex items-center justify-center w-full h-[50px]  border-border border-t-[0.5px]"
                    onPress={() => {
                      handleDeleteMessage();
                      setIsModalVisible(false);
                    }}
                  >
                    <Text
                      className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}
                    >
                      Delete message
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Modal>
      ) : null}
      <Pressable
        className="flex flex-row"
        style={{ columnGap: 4 }}
        onPress={handleDoubleTapPress}
        onLongPress={handleLongPress}
      >
        {!props.isSender && (position === "bottom" || position === "free") ? (
          <UserAvatarLink
            avatarURL={{ uri: avatar }}
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
              aspectRatio: props.contentId.type==="Image" || props.contentId.type==="Video"? props.contentId.width! / props.contentId.height!:'auto',
            }}
          >
            {/* {props.sendStatus === "sending" ? (
              <View
                className="rounded-3xl"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.7)",
                  zIndex: 1,
                }}
              />
            ) : null} */}

            {renderContent()}
          </View>
        ) : (
          <View
            ref={timeRef}
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
    }`}
  >
    {props.text === "Message revoked" ? `*${props.text}*` :  highlightLinks((props.text))}
  </Text>
          </View>
        )}
        {totalLike > 0 ? (
          <View
            className={`absolute -bottom-[16px] ${
              props.isSender ? "left-[42px]" : "right-0"
            }`}
          >
            <MessageLove
              onPress={handleLike}
              isLiked={isLiked}
              likedArray={likedArray}
            />
          </View>
        ) : null}
      </Pressable>
      {totalLike > 0 ? <View className="w-full h-[14px]" /> : null}
      {position === "bottom" || isShowMessageInfo ? (
        <View className="flex" style={{rowGap:2}}>
  <View className={`flex flex-row  ${props.isSender? "justify-end":"justify-start ml-[40px]"} `} style={{columnGap:2}}>
    {[...new Set(readedId)].map((item, index) => item === props.createBy? null : (
      <UserAvatar 
        key={item} 
        size={14} 
        avatarURL={{uri: props.memberAvatars?.get(item)}}
      />
    ))}
  </View>
  <Text className="text-deny font-helvetica-light text-10 ml-[40px]">
    {formatDateDistance(props.createAt)}
  </Text>
</View>
      ) : null}
      {props.sendStatus ? (
        <Text className="text-deny font-helvetica-light text-10">
          {renderSendStatus()}
        </Text>
) : null
}
    </View>
  );
};

export default Message;
