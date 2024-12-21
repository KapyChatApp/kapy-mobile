import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatBoxHeader from "@/components/shared/message/ChatBoxHeader";
import TypingSpace from "@/components/shared/message/TypingSpace";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import { MessageBoxProps, MessageProps } from "@/types/message";
import {
  addToMessageLocal,
  disableTexting,
  getAllMessages,
  getAMessageBox,
  markRead,
  sendMessage,
  texting,
} from "@/lib/message-request";
import Message from "@/components/shared/message/Message";
import { getLocalAuth } from "@/lib/local-auth";
import { pusherClient } from "@/lib/pusher";
import { pickMedia } from "@/utils/GalleryPicker";
import { useMarkReadContext } from "@/context/MarkReadProvider";
import SelectedMedia from "@/components/shared/multimedia/SelectedMedia";
import ExpoCamera from "@/components/shared/multimedia/ExpoCamera";
import AudioRecorder from "@/components/shared/multimedia/AudioRecorder";
import TypingAnimation from "@/components/ui/TypingAnimation";
import { pickDocument } from "@/utils/DoucmentPicker";
import ImageViewing from "react-native-image-viewing";
import { FileProps } from "@/types/file";
import { openWebFile } from "@/utils/File";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatar from "@/components/ui/UserAvatar";
import { ScreenRatio } from "@/utils/Device";
import { playSound } from "@/utils/Media";
import { AppSound } from "@/constants/Sound";
const MessageDetailPage = () => {
  const { messageId } = useLocalSearchParams();
  const ref = useClickOutside<View>(() => {
    setIsTypeping(false);
    setIsMicroOpen(false);
  });

  const [isTyping, setIsTypeping] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [localUserId, setLocalUserId] = useState("");
  const [chatBoxHeader, setChatBoxHeader] = useState<MessageBoxProps>();
  const [messageText, setMessageText] = useState("");
  const [messageBox, setMessageBox] = useState<MessageBoxProps>();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMicroOpen, setIsMicroOpen] = useState(false);

  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [viewingImage, setViewingImage] = useState("");

  const [isFileViewOpen, setIsFileViewOpen] = useState(false);
  const [viewingFile, setViewingFile] = useState<FileProps>();

  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string; name: string | null | undefined }[]
  >([]);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [textingAvatar, setTextingAvatar] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);
  const handlePickMedia = async () => {
    const media = await pickMedia();
    setSelectedMedia((prev) => [...prev, ...media]);
  };

  const handlePickDocument = async () => {
    const document = await pickDocument();
    if (document) {
      setSelectedMedia((prev) => [
        ...prev,
        ...document.map((item) => ({
          ...item,
          type: item.type ?? "defaultType",
        })),
      ]);
    }
  };

  const handleViewImage = (imageURL: string) => {
    setViewingImage(imageURL);
    setIsImageViewOpen(true);
  };

  const handleViewFile = async (file: FileProps) => {
    setViewingFile(file);
    await openWebFile(file.url!);
  };

  const { markAsRead, unreadMessages } = useMarkReadContext();

  const receiverIds = messageBox?.receiverIds ?? [];
  const receiver = receiverIds[0];
  const otherReceiver = receiverIds[1];

  const handleTextChange = (text: string) => {
    setMessageText(text);

    handleTexting();
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleDisableTexting();
    }, 1500);
  };

  const handleTexting = async () => {
    await texting(messageId.toString());
  };
  const handleDisableTexting = async () => {
    await disableTexting(messageId.toString());
  };

  const processMessages = (messages: MessageProps[]) => {
    return messages.map((item, index) => {
      const previousMessage = messages[index - 1];
      const nextMessage = messages[index + 1];
      let position = "free";
  
      if (
        (!previousMessage || previousMessage.createBy !== item.createBy) &&
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
  
      // Xác định avatar
      const avatar = messageBox?.groupAva
        ? messageBox?.groupAva
        : receiver
        ? receiver._id === localUserId
          ? otherReceiver?.avatar
          : receiver.avatar
        : "";
  
      // Trả về message đã xử lý
      return {
        ...item,
        position: position,
        avatar,
        isSender: localUserId === item.createBy.toString(),
      };
    });
  };
  
  const handleSendMessage = async () => {
    handleDisableTexting();
    const messageTextData = messageText;
    let mediaData = selectedMedia[0];
    setSelectedMedia([]);
    setMessageText("");
  
    if (messageTextData !== "" || selectedMedia.length !== 0) {
      await playSound(AppSound.send_message);
      let tempMessage: MessageProps = {
        id: "",
        isReact: [],
        readedId: [localUserId],
        contentId: selectedMedia[0]
          ? { url: selectedMedia[0].uri, type: selectedMedia[0].type, fileName: selectedMedia[0].name!, width: 150, height: 150 }
          : undefined,
        text: messageText,
        createAt: new Date().toString(),
        createBy: localUserId,
        position: "free",
        isSender: true,
        avatar: "",
        boxId: "",
        handleViewImage: () => {
          handleViewImage(mediaData.uri);
        },
        handleViewFile: () => {
          handleViewFile(mediaData);
        },
        sendStatus: "sending"
      };
  
      let updatedMessages = [...messages];
  
      if (messages.length > 0 && messages[messages.length - 1]?.createBy === localUserId) {
        // Cập nhật tin nhắn cuối cùng
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.position === "free") {
          console.log("lastmessage will be top");
          updatedMessages[updatedMessages.length - 1] = { ...lastMessage, position: "top" };
          tempMessage.position = "bottom";
        } else {
          console.log("lastmessage will be middle")
          updatedMessages[updatedMessages.length - 1] = { ...lastMessage, position: "middle" };
          tempMessage.position = "bottom";
        }
      }
  
      updatedMessages.push(tempMessage); // Thêm tin nhắn mới vào cuối
  
      const processedMessages = processMessages(updatedMessages); // Xử lý tất cả tin nhắn
      setMessages(processedMessages);
        console.log("updatedLastMessage : ",processedMessages[processedMessages.length-2])
      await markRead(messageId.toString());
      await sendMessage(messageId.toString(), messageText, selectedMedia, (id, status) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.createAt === tempMessage.createAt // So khớp với message tạm thời dựa trên thời gian tạo
              ? { ...message, id, sendStatus: status }
              : message
          )
        );
      });
    }
  };
  const handleDeleteMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };
  const handleRevokeMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages?.map((message: MessageProps) =>
        message.id === id ? { ...message, text: "Message revoked", contentId:undefined } : message
      )
    );
  };
  useEffect(() => {
    const getAllMessageFUNC = async () => {
      const { _id } = await getLocalAuth();
      await markRead(messageId.toString());
      const messageBoxLocal = await AsyncStorage.getItem(`box-${messageId}`);
      const messageBox: MessageBoxProps = await JSON.parse(messageBoxLocal!);
      messageBox.localUserId = _id;
      setChatBoxHeader(messageBox);
      setMessageBox(messageBox);
      const localMessage = await AsyncStorage.getItem(`messages-${messageId}`);
      const messages = await JSON.parse(localMessage!);
      const messagesWithPosition = processMessages(messages);
      setMessages(messagesWithPosition);
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
      pusherClient.bind("new-message", async (data: any) => {
        if(data.createBy!==_id){
          setMessages((prevMessages) => [...prevMessages, data]);
        
        }
        markAsRead(messageId.toString());
        await addToMessageLocal(messageId.toString(),data);
      });
      pusherClient.bind("revoke-message", (data: any) => {
        console.log("revoke: ", data);
        handleRevokeMessage(data.id);
      });
      pusherClient.bind("texting-status", async (data: any) => {
        if (data.userId !== _id) {
          const textingUser = await AsyncStorage.getItem(`user-${data.userId}`);
          const textingUserData = await JSON.parse(textingUser!);
          setTextingAvatar(textingUserData.avatar);
          setTimeout(() => setIsTypingMessage(data.texting), 200);
        }
      });
      markAsRead(messageId.toString());
    };
    getAllMessageFUNC();
  }, []);

  return (
    <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ paddingBottom: Platform.OS === "android" ? 0 : 10 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? (ScreenRatio >1.8? 56:14) : 0}
          >
      <View className="flex-1 ">
        {isImageViewOpen ? (
          <ImageViewing
            images={[{ uri: viewingImage }]}
            imageIndex={0}
            visible={isImageViewOpen}
            onRequestClose={() => setIsImageViewOpen(false)}
            doubleTapToZoomEnabled={true}
          />
        ) : null}
        {isCameraOpen ? (
          <View className="fixed w-screen h-screen">
            <ExpoCamera
              onClose={() => setIsCameraOpen(false)}
              onSend={handleSendMessage}
              setSelectedMedia={(uri: string, type: string, name: string) =>
                setSelectedMedia([{ uri: uri, type: type, name: name }])
              }
              isSendNow={true}
            />
          </View>
        ) : null}

        <View ref={ref}>
          <ChatBoxHeader {...chatBoxHeader}/>
        </View>
        <View className="flex-1">
          <ScrollView
            ref={scrollViewRef}
            className={` ${bgLight500Dark10} flex-1 flex`}
            contentContainerStyle={{ rowGap: 4, padding: 2 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {/* {messages.length!=0 && messages? messages.map((item, index) => {
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
                  avatar={
                    messageBox?.groupAva
                      ? messageBox?.groupAva
                      : receiver
                      ? receiver._id === localUserId
                        ? otherReceiver?.avatar
                        : receiver.avatar
                      : ""
                  }
                  isSender={localUserId === item.createBy.toString()}
                  position={item.position!=""? position:item.position}
                  localUserId={localUserId}
                  deleteMessage={handleDeleteMessage}
                  revokeMessage={handleRevokeMessage}
                  handleViewImage={handleViewImage}
                  handleViewFile={handleViewFile}
                />
              );
            }):null} */}
            {messages && messages.length!=0? processMessages(messages).map((item,index)=><Message key={index} {...item} isSender={localUserId === item.createBy.toString()}
                  localUserId={localUserId}
                  deleteMessage={handleDeleteMessage}
                  revokeMessage={handleRevokeMessage}
                  handleViewImage={handleViewImage}
                  handleViewFile={handleViewFile}/>):null}
            {isTypingMessage ? (
              <View
                className="flex flex-row"
                style={{ columnGap: 4 }}
              >
                <UserAvatar size={34} avatarURL={{uri:textingAvatar}}/>
                <TypingAnimation />
              </View>
            ) : null}
          </ScrollView>
        </View>
        <View collapsable={false} ref={ref}>
          <SelectedMedia
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />
          <TypingSpace
            handlePickMedia={handlePickMedia}
            handlePickDocument={handlePickDocument}
            isTyping={isTyping}
            setIsTypeping={setIsTypeping}
            onChangeText={handleTextChange}
            value={messageText}
            onPress={handleSendMessage}
            setIsCameraOpen={() => setIsCameraOpen(true)}
            setIsMicroOpen={() => setIsMicroOpen(true)}
          />
          {isMicroOpen ? (
            <View ref={ref}>
              <AudioRecorder
                setSelectedMedia={(uri: string, type: string, name: string) =>
                  setSelectedMedia([{ uri: uri, type: type, name }])
                }
              />
            </View>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageDetailPage;
