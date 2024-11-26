import { View, Text, Touchable, TouchableOpacity } from "react-native";
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
import { MessageBoxProps } from "@/types/message";
import { getLocalAuth } from "@/lib/local-auth";
import { pusherClient } from "@/lib/pusher";

const OutSideMessagePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageBoxes, setMessageBoxes] = useState<MessageBoxProps[]>([]);
  const router = useRouter();
 
  useEffect(() => {
    const getMyMessageBoxesFUNC = async () => {
      const {_id} = await getLocalAuth();
      const messageBoxes = await getMyChatBoxes();
      const messageBoxesWithLocalId = messageBoxes.map((item:MessageBoxProps) => ({
        ...item, 
        localUserId: _id, 
      }));
      setMessageBoxes(messageBoxesWithLocalId ? messageBoxesWithLocalId : []);

      for(const messageBox of messageBoxes){
        const channel = pusherClient.subscribe(`private-${messageBox._id}`);
        channel.bind("pusher:subscription_succeeded", () => {
          console.log(`Subscribed to channel private-${messageBox._id} successfully!`);
        });
        pusherClient.bind("new-message", (data: any) =>
          handleSetLastMessage(messageBox._id, data)
        );
      }
     
    };
    getMyMessageBoxesFUNC();
   
  }, []);
  const handleSetLastMessage = (messageBoxId: string, newMessage: any) => {
    console.log("new message", newMessage);
    setMessageBoxes((prevMessageBoxes) =>
      prevMessageBoxes.map((box) =>
        box._id === messageBoxId
          ? {
              ...box,
              lastMessage: newMessage, // Cập nhật tin nhắn cuối
              updatedAt: new Date().toISOString(), // Cập nhật thời gian
            }
          : box
      )
    );
  };
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1 `}>
      <MainHeader></MainHeader>
      <TouchableOpacity onPress={() => router.push("/message/search")}>
        <View pointerEvents="box-none">
          <Search isDisable={true} />
        </View>
      </TouchableOpacity>
      {messageBoxes.length > 0 ? (
        <ScrollView className="message-list w-full flex-1">
          {messageBoxes?.map((item) => (
            <MessageBox key={item._id} {...item} />
          ))}
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

export default OutSideMessagePage;
