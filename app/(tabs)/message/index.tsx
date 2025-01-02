import { View, TouchableOpacity, RefreshControl, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import Search from "@/components/shared/function/Search";
import MessageBox from "@/components/shared/message/MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import { MessageBoxProps, ReceiverProps } from "@/types/message";
import { getLocalAuth} from "@/lib/local";
import { pusherClient } from "@/lib/pusher";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onRefresh } from "@/utils/Refresh";
import { getAllMessages, getMyChatBoxes } from "@/lib/message";
import { getFromAsyncStorage } from "@/utils/Device";
import { useMessageBox } from "@/context/MessageBoxContext";
import { sendPushNotification } from "@/lib/notification";

const OutSideMessagePage = () => {
  const { deletedMessageBox, completeDeleteMessageBox , inMessageBox} = useMessageBox();
  const [messageBoxes, setMessageBoxes] = useState<MessageBoxProps[]>([]);
  const [localUserId, setLocalUserId] = useState("");
  const router = useRouter();
  const { markAsUnread, unreadMessages, updateDefaultMessages } =
    useMarkReadContext();
  const [refreshing, setRefreshing] = useState(false);

  const getMyMessageBoxesFUNC = async () => {
    const { _id } = await getLocalAuth();
    setLocalUserId(localUserId);
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
   
    pusherClient.subscribe(`private-${_id}`);
    for (const messageBox of messageBoxDatas) {
      pusherClient.subscribe(`private-${messageBox._id}`);
    }
    const pushToken = await AsyncStorage.getItem('notification-token');
    const _inMessageBox = inMessageBox;
    pusherClient.bind("new-message", async (data: any) => {
      const { _id } = await getLocalAuth();
      if (data && _id ) {
        if (data.createBy !== _id && _inMessageBox !== data.boxId) {
          const userInfo = await getFromAsyncStorage(`user-${data.createBy}`);
          // await sendPushNotification(pushToken!, userInfo.firstName + " " + userInfo.lastName, data.text ? data.text.toString() : "Sent a file", userInfo.avatar)
        }
        handleSetLastMessage(data)
      }
    });

    pusherClient.bind("new-box", async (data: any) => {
      // console.log("new-box: ", data);
      // handleSetNewMessageBox(data);
      await refreshLogic();
      pusherClient.subscribe(`private-${data._id}`);
    });
  };
  
  const refreshLogic = async () => {
    const { _id } = await getLocalAuth();
    for (const messageBox of messageBoxes) {
      pusherClient.unsubscribe(`private-${messageBox._id}`);
    }
    const updateMessageBoxes = await getMyChatBoxes();
    for (const box of updateMessageBoxes) {
      const messages = await getAllMessages(box._id);
      await AsyncStorage.setItem(`messages-${box._id}`, JSON.stringify(messages));
    }
    for (const messageBox of updateMessageBoxes) {
      pusherClient.subscribe(`private-${messageBox._id}`);
    }
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
  }

  const handleRefreshMessageBox = async () => {
    setRefreshing(true);
    await refreshLogic();

    setRefreshing(false);
  };

  const handleSetNewMessageBox = async (data: MessageBoxProps) => {
  const chatBoxString = await AsyncStorage.getItem("ChatBoxes");
  const chatBoxes = await JSON.parse(chatBoxString!) || []; 

  const isExisting = chatBoxes.some((box: MessageBoxProps) => box._id === data._id);
  
  if (isExisting) {
    console.log("MessageBox with this _id already exists. Skipping addition.");
    return;
  }


  setMessageBoxes((prev) => [...prev, data]);

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
      pusherClient.unsubscribe(`private-${deletedMessageBox}`);
      pusherClient.unbind(`new-message`);
      console.log("unsubscribe to: ", deletedMessageBox);
    }
    getMyMessageBoxesFUNC();
return () => {
  pusherClient.unsubscribe(`private-${localUserId}`);
    messageBoxes.forEach(item => {
      pusherClient.unsubscribe(`private-${item._id}`);
    });
  };
  }, [deletedMessageBox, inMessageBox]);
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
