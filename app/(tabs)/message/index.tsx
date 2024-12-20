import { View, Text, Touchable, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigator/Topbar/TopBar";
import SideBar from "@/components/navigator/Sidebar/SideBar";
import MainHeader from "@/components/navigator/Topbar/MainHeader";
import { SearchBar } from "react-native-screens";
import Search from "@/components/shared/function/Search";
import MessageBox from "@/components/shared/message/MessageBox";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import SideMenu from "@rexovolt/react-native-side-menu";
import { getMyChatBoxes } from "@/lib/message-request";
import { MessageBoxProps, MessageProps } from "@/types/message";
import { getLocalAuth } from "@/lib/local-auth";
import { pusherClient } from "@/lib/pusher";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import CustomButton from "@/components/ui/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconURL } from "@/constants/IconURL";
import Icon from "@/components/ui/Icon";
import { AppSound } from "@/constants/Sound";
import { playSound } from "@/utils/Media";
import { onRefresh } from "@/utils/Refresh";

const OutSideMessagePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageBoxes, setMessageBoxes] = useState<MessageBoxProps[]>([]);
  const router = useRouter();
  const {markAsUnread,unreadMessages, updateDefaultMessages} =useMarkReadContext();
  const [refreshing, setRefreshing] = useState(false);

  const getMyMessageBoxesFUNC = async () => {
    const { _id } = await getLocalAuth();

      

    // Lấy danh sách hộp chat từ AsyncStorage
    const messageBoxes = await AsyncStorage.getItem("ChatBoxes");
    const messageBoxDatas = messageBoxes ? JSON.parse(messageBoxes) : []; // Xử lý null
   
    // Cập nhật dữ liệu với thông tin bổ sung
    const messageBoxesModified = await Promise.all(
      messageBoxDatas.map(async (item: MessageBoxProps) => {
        const messages = await AsyncStorage.getItem(`messages-${item._id}`);
        const parsedMessages = messages ? JSON.parse(messages) : [];
        const lastMessage = parsedMessages.length > 0 ? parsedMessages.pop() : null;
        return {
          ...item,
          localUserId: _id,
          responseLastMessage: lastMessage,
        };
      })
    );
  
    setMessageBoxes(messageBoxesModified ? messageBoxesModified : []);
    
    // Cập nhật danh sách ID của message boxes
    const messageBoxIds = messageBoxDatas.map((item: MessageBoxProps) => item._id);
    updateDefaultMessages(messageBoxIds);
  
    // Đăng ký các kênh Pusher
    for (const messageBox of messageBoxDatas) {
      pusherClient.subscribe(`private-${messageBox._id}`);
    }
  
    // Xử lý sự kiện "new-message"
    pusherClient.bind("new-message", (data: any) => handleSetLastMessage(data));

  
  
    setRefreshing(false);
  };
  useEffect(() => {
    getMyMessageBoxesFUNC();
  }, []);
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
                readStatus:false,
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
      
      {messageBoxes.length > 0 ? (
        <ScrollView className="message-list w-full flex-1"  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh(async()=>await getMyMessageBoxesFUNC)} />
        }>
          {messageBoxes?.map((item) => (
            <MessageBox key={item._id} {...item} />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

export default OutSideMessagePage;
