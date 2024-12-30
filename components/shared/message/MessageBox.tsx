import { View, Text, Modal, Dimensions, Platform, GestureResponderEvent } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { bgLight500Dark10, bgLight510Dark10, textLight0Dark500 } from "@/styles/theme";
import { useRouter } from "expo-router";
import { MessageBoxProps } from "@/types/message";
import { formatDate, formatDateDistance} from "@/utils/DateFormatter";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import * as Haptics from "expo-haptics";
import { useClickOutside } from "react-native-click-outside";
const MessageBox = (props:MessageBoxProps) => {
  const router = useRouter();
  
  const [onPressColor, setOnPressColor] = useState("");

  const { unreadMessages } = useMarkReadContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
   const modalRef = useClickOutside<View>(() => setIsModalVisible(false));
 const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0,
  });

  const receiverIds = props.receiverIds ?? []; 
  const receiver = receiverIds[0];  
  const otherReceiver = receiverIds[1];  
  const avatarURL = props.groupAva
  ? props.groupAva
  : receiver && receiver._id === props.localUserId
  ? otherReceiver?.avatar 
  : receiver?.avatar;
const fullName = receiver
  ? receiver._id === props.localUserId
    ? `${otherReceiver?.firstName} ${otherReceiver?.lastName}`
    : `${receiver.firstName} ${receiver.lastName}`
  : "";
  const isReaded = props.readStatus === true ||  unreadMessages[props._id!]===true

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
  
    const handleLongPress = (event:any) => {
      const { pageX, pageY } = event?.nativeEvent;
      
      const modalWidth = 270;
      const modalHeight = 160;
      const { x, y } = adjustModalPosition(pageX, pageY, modalWidth, modalHeight);
      
      setModalPosition({ x, y });
      setIsModalVisible(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

  return (
    <View className="flex-1" ref={pressableRef}>
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
                <View className={`${bgLight500Dark10} w-[250px] rounded-2xl`}>
                  <TouchableOpacity
                    className="flex items-center justify-center w-full h-[50px]  border-border border-b-[0.5px]"
                    onPress={() => {
        
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
            
          </View>
        </Modal>
      ) : null}
    <Pressable
      className={`flex flex-row px-[20px] py-[10px] items-center w-screen ${bgLight510Dark10} ${onPressColor}`}
      onPress={()=>{router.push({
        pathname:"/chatbox/[messageId]",
        params:{messageId:props._id? props._id : ""},
      })}}
      onPressIn={()=>setOnPressColor("bg-light-300")}
      onPressOut={()=>setOnPressColor("")}
    >
      <UserAvatar avatarURL={{uri:avatarURL}} size={48}></UserAvatar>
      <View className="flex ml-5 w-screen">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className={`font-helvetica-bold text-14 ${textLight0Dark500}`}
        >
          {props.groupName===""? fullName:props.groupName}
        </Text>
        <View className="flex flex-row items-center" style={{columnGap:4}}>
        <Text
          numberOfLines={1}
          className={` text-14 overflow-ellipsis ${textLight0Dark500} ${isReaded? "font-helvetica-light" :"font-helvetica-bold"} flex-wrap`}
        >
          {props.responseLastMessage?.createBy === props.localUserId? "You: " + (props.responseLastMessage?.contentId? "Sent a file": props.responseLastMessage?.text) : (props.responseLastMessage?.contentId? "Sent a file" :props.responseLastMessage?.text) }
        </Text>
        {!isReaded? <Icon size={8} iconURL={IconURL.circle}/>:null}
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-helvetica-light text-12 text-deny"
        >
          {formatDateDistance(props.responseLastMessage?.createAt? props.responseLastMessage?.createAt : new Date().toString())}
        </Text>
      </View>
    </Pressable>
    </View>
  );
};

export default MessageBox;
