import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatBoxHeader from "@/components/shared/message/ChatBoxHeader";
import TypingSpace from "@/components/shared/message/TypingSpace";
import MessageSpace from "@/components/shared/message/MessageSpace";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import {
  ClickOutsideProvider,
  useClickOutside,
} from "react-native-click-outside";
import MessageBox from "@/components/shared/message/MessageBox";

const MessageDetailPage = () => {
  const { messageId } = useLocalSearchParams();
  const ref = useClickOutside<View>(() => setIsTypeping(false));
  const [isTyping, setIsTypeping] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 ">
        <View ref={ref}>
          <ChatBoxHeader />
        </View>
        <MessageSpace />
        <View collapsable={false} ref={ref}>
          <TypingSpace isTyping={isTyping} setIsTypeping={setIsTypeping} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MessageDetailPage;
