import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatBoxHeader from "@/components/shared/message/ChatBoxHeader";
import TypingSpace from "@/components/shared/message/TypingSpace";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import {
  ClickOutsideProvider,
  useClickOutside,
} from "react-native-click-outside";
import MessageBox from "@/components/shared/message/MessageBox";
import {
  ChatBoxHeaderProps,
  MessageBoxProps,
  MessageProps,
} from "@/types/message";
import {
  getAllMessages,
  getAMessageBox,
  markRead,
  sendMessage,
} from "@/lib/message-request";
import Message from "@/components/shared/message/Message";
import { getLocalAuth } from "@/lib/local-auth";
import { pusherClient } from "@/lib/pusher";
import { pickMedia } from "@/utils/GalleryPicker";
import GalleryPickerBox from "@/components/ui/GalleryPickerBox";
import { Video } from "expo-av";

const MessageDetailPage = () => {
  const { messageId } = useLocalSearchParams();
  const ref = useClickOutside<View>(() => setIsTypeping(false));
  const [isTyping, setIsTypeping] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [localUserId, setLocalUserId] = useState("");
  const [chatBoxHeader, setChatBoxHeader] = useState<ChatBoxHeaderProps>();
  const [avatar, setAvatar] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageBox, setMessageBox]= useState<MessageBoxProps>();

  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string }[]
  >([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const handlePickMedia = async () => {
    const media = await pickMedia();
    setSelectedMedia((prev) => [...prev, ...media]);
    console.log(selectedMedia);
  };

  const receiverIds = messageBox?.receiverIds ?? []; 
  const receiver = receiverIds[0];  
  const otherReceiver = receiverIds[1];  
  useEffect(() => {
    const getAllMessageFUNC = async () => {
      const { _id } = await getLocalAuth();
      await markRead(messageId.toString());
      const messageBox = await getAMessageBox(messageId);
        setChatBoxHeader(messageBox);
        setMessageBox(messageBox);
      const messages = await getAllMessages(messageId);
      setMessages(messages);
      setLocalUserId(_id);
      const channel = pusherClient.subscribe(`private-${messageId}`);
      channel.bind("pusher:subscription_succeeded", () => {
        console.log(`Subscribed to channel private-${messageId} successfully!`);
      });

      channel.bind("pusher:subscription_error", (status: any) => {
        console.error(
          `Subscription failed for channel private-${messageId}.`,
          status
        );
      });
      pusherClient.bind("new-message", (data: any) =>
        setMessages((prevMessages) => [...prevMessages, data])
      );
    };
    getAllMessageFUNC();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 ">
        <View ref={ref}>
          <ChatBoxHeader {...chatBoxHeader} />
        </View>
        <View className="flex-1">
          <ScrollView
           ref={scrollViewRef} 
            className={` ${bgLight500Dark10} flex-1 flex`}
            contentContainerStyle={{ rowGap: 3, padding: 2 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            } 
          >
            {messages.map((item, index) => {
              const previousMessage = messages[index - 1];
              const nextMessage = messages[index + 1];
              let position = "free";
              if (
                (!previousMessage ||
                  previousMessage.createBy !== item.createBy) &&
                nextMessage?.createBy === item.createBy
              ) {
                position = "top";
              } else if (
                previousMessage?.createBy === item.createBy &&
                nextMessage?.createBy === item.createBy
              ) {
                position = "middle";
              } else if (
                previousMessage?.createBy === item.createBy &&
                (!nextMessage || nextMessage.createBy !== item.createBy)
              ) {
                position = "bottom";
              }

              return (
                <Message
                  key={index}
                  {...item}
                  avatar={messageBox?.groupAva
                    ? messageBox?.groupAva
                    : receiver
                    ? receiver._id === localUserId
                      ? otherReceiver?.avatar
                      : receiver.avatar
                    : ""}
                  isSender={localUserId === item.createBy.toString()}
                  position={position}
                />
              );
            })}

          </ScrollView>
          
        </View>
        <View collapsable={false} ref={ref}>
          <TypingSpace
            handlePickMedia={handlePickMedia}
            isTyping={isTyping}
            setIsTypeping={setIsTypeping}
            onChangeText={setMessageText}
            onPress={async () => {
              if(messageText!=""){
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  _id: "",
                  isReact: false,
                  readedId: [],
                  contentId: [],
                  text: messageText,
                  createAt: new Date().toString(),
                  createBy: localUserId,
                  position: "",
                  isSender: true,
                  avatar: "",
                  boxId:"",
                },
              ]);
              await sendMessage(messageId.toString(), messageText);
              setMessageText("");}
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MessageDetailPage;
