import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { ChatBoxHeaderProps, MessageBoxProps, MessageProps } from "@/types/message";
import { getAllMessages, getAMessageBox, sendMessage } from "@/requests/message-request";
import Message from "@/components/shared/message/Message";
import { getLocalAuth } from "@/requests/local-auth";

const MessageDetailPage = () => {
  const { messageId } = useLocalSearchParams();
  const ref = useClickOutside<View>(() => setIsTypeping(false));
  const [isTyping, setIsTypeping] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [localUserId, setLocalUserId] = useState("");
  const [chatBoxHeader, setChatBoxHeader] = useState<ChatBoxHeaderProps>();
  const [avatar, setAvatar] = useState("");
  const [messageText, setMessageText] = useState("");
  useEffect(() => {
    const getAllMessageFUNC = async () => {
      const { _id } = await getLocalAuth();
      const messageBox = await getAMessageBox(messageId);
      setChatBoxHeader(messageBox);
      setAvatar(messageBox.avatar);
      const messages = await getAllMessages(messageId);
      setMessages(messages);
      setLocalUserId(_id);
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
            className={` ${bgLight500Dark10} flex-1 flex`}
            contentContainerStyle={{ rowGap: 3, padding: 2 }}
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
                  key={item._id}
                  {...item}
                  avatar={avatar}
                  isSender={localUserId === item.createBy.toString()}
                  position={position}
                 
                />
              );
            })}
          </ScrollView>
        </View>
        <View collapsable={false} ref={ref}>
          <TypingSpace isTyping={isTyping} setIsTypeping={setIsTypeping} onChangeText={setMessageText} onPress={async()=> await sendMessage(localUserId,messageId.toString(),chatBoxHeader?.receiverId,messageText)
}/>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MessageDetailPage;