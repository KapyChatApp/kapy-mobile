import { View, TouchableOpacity, RefreshControl } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import Search from "@/components/shared/function/Search";
import MessageBox from "@/components/shared/message/MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import { MessageBoxProps } from "@/types/message";
import { getLocalAuth } from "@/lib/local";
import { pusherClient } from "@/lib/pusher";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onRefresh } from "@/utils/Refresh";
import { getMyChatBoxes } from "@/lib/message";
import { getFromAsyncStorage } from "@/utils/Device";
import { useMessageBox } from "@/context/MessageBoxContext";

const OutSideMessagePage = () => {
  const { deletedMessageBox, completeDeleteMessageBox } = useMessageBox();
  const [messageBoxes, setMessageBoxes] = useState<MessageBoxProps[]>([]);
  const router = useRouter();
  const { markAsUnread, unreadMessages, updateDefaultMessages } =
    useMarkReadContext();
  const [refreshing, setRefreshing] = useState(false);

  const getMyMessageBoxesFUNC = async () => {
    const { _id } = await getLocalAuth();

    const messageBoxes = await AsyncStorage.getItem("ChatBoxes");
    const messageBoxDatas = messageBoxes ? JSON.parse(messageBoxes) : [];
    const messageBoxesModified = await Promise.all(
      messageBoxDatas.map(async (item: MessageBoxProps) => {
        const messages = await AsyncStorage.getItem(`messages-${item._id}`);
        const parsedMessages = messages ? JSON.parse(messages) : [];
        const lastMessage =
          parsedMessages.length > 0 ? parsedMessages.pop() : null;
        return {
          ...item,
          localUserId: _id,
          responseLastMessage: lastMessage,
        };
      })
    );

    setMessageBoxes(messageBoxesModified ? messageBoxesModified : []);
    const messageBoxIds = messageBoxDatas.map(
      (item: MessageBoxProps) => item._id
    );
    updateDefaultMessages(messageBoxIds);

    // Đăng ký các kênh Pusher
    for (const messageBox of messageBoxDatas) {
      pusherClient.subscribe(`private-${messageBox._id}`);
    }
    pusherClient.bind("new-message", (data: any) => handleSetLastMessage(data));

    pusherClient.bind("new-box", (data: any) => {
      handleSetNewMessageBox(data);
    });
  };

  const handleRefreshMessageBox = async () => {
    setRefreshing(true);
    const { _id } = await getLocalAuth();
    const updateMessageBoxes = await getMyChatBoxes();
    const messageBoxesModified = await Promise.all(
      updateMessageBoxes.map(async (item: MessageBoxProps) => {
        const messages = await AsyncStorage.getItem(`messages-${item._id}`);
        const parsedMessages = messages ? JSON.parse(messages) : [];
        const lastMessage =
          parsedMessages.length > 0 ? parsedMessages.pop() : null;
        return {
          ...item,
          localUserId: _id,
          responseLastMessage: lastMessage,
        };
      })
    );

    setMessageBoxes(messageBoxesModified ? messageBoxesModified : []);

    setRefreshing(false);
  };

  const handleSetNewMessageBox = async (data: MessageBoxProps) => {
    setMessageBoxes((prev) => [...prev, data]);
    const chatBoxString = await AsyncStorage.getItem("ChatBoxes");
    const chatBoxes = await JSON.parse(chatBoxString!);
    const newChatBoxes = [...chatBoxes, data];
    await AsyncStorage.setItem("ChatBoxes", JSON.stringify(newChatBoxes));
    await AsyncStorage.setItem(`box-${data._id}`, JSON.stringify(data));
  };

  const handleDeleteMessageBox = async (id: string) => {
    const chatBoxes = await getFromAsyncStorage("ChatBoxes");
    const updatedChatBoxes = chatBoxes.filter(
      (item: MessageBoxProps) => item._id !== id
    );
    await AsyncStorage.setItem("ChatBoxes", JSON.stringify(updatedChatBoxes));
    await AsyncStorage.removeItem(`box-${deletedMessageBox}`);
    await AsyncStorage.removeItem(`messages-${deletedMessageBox}`);
    setMessageBoxes((prev) =>
      prev.filter((messageBox) => messageBox._id !== id)
    );
    completeDeleteMessageBox();
  };

  useEffect(() => {
    if (deletedMessageBox !== "") {
      handleDeleteMessageBox(deletedMessageBox);
    }
    getMyMessageBoxesFUNC();
  }, [deletedMessageBox]);
  const handleSetLastMessage = (data: any) => {
    const { boxId } = data;
    setTimeout(() => {
      markAsUnread(boxId);
      setMessageBoxes((prevMessageBoxes) =>
        prevMessageBoxes.map((box) =>
          box._id === boxId
            ? {
                ...box,
                responseLastMessage: data,
                updatedAt: new Date().toISOString(),
                readStatus: false,
              }
            : box
        )
      );
    }, 0);
  };

  return (
    <View className={`${bgLight500Dark10} flex-1 `}>
      <MainHeader></MainHeader>
      <TouchableOpacity onPress={() => router.push("/message/search")}>
        <View pointerEvents="box-none">
          <Search isDisable={true} />
        </View>
      </TouchableOpacity>
      <ScrollView
        className="message-list w-full flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshMessageBox}
          />
        }
      >
        {messageBoxes.length > 0
          ? messageBoxes?.map((item) => <MessageBox key={item._id} {...item} />)
          : null}
      </ScrollView>
    </View>
  );
};

export default OutSideMessagePage;
