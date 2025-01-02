import {
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatBoxHeader from "@/components/shared/message/ChatBoxHeader";
import TypingSpace from "@/components/shared/message/TypingSpace";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import { MessageBoxProps, MessageProps } from "@/types/message";
import {
  addToMessageLocal,
  disableTexting,
  getAllMessages,
  getMyChatBoxes,
  markRead,
  sendMessage,
  texting,
} from "@/lib/message";
import Message from "@/components/shared/message/Message";
import { getLocalAuth } from "@/lib/local";
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
import { getFromAsyncStorage, ScreenRatio } from "@/utils/Device";
import { playSound } from "@/utils/Media";
import { AppSound } from "@/constants/Sound";
import { sendPushNotification } from "@/lib/notification";
import { useMessageBox } from "@/context/MessageBoxContext";
import { extractContentFromGroupSystemMessage, isGroupSystemMessage } from "@/utils/Text";
const MessageDetailPage = () => {
 
  const { messageId } = useLocalSearchParams();
  const ref = useClickOutside<View>(() => {
    setIsTypeping(false);
    setIsMicroOpen(false);
  });
  const router = useRouter();
  const { inMessageBox } = useMessageBox();
  const [reload, setReload] = useState(false);
  const [isKicked, setIsKicked] = useState(false);
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

  const [viewingFile, setViewingFile] = useState<FileProps>();

  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string; name: string | null | undefined }[]
  >([]);

  const [memberAvatars, setMemberAvatars] = useState<Map<string, string>>(
    new Map()
  );

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
    const mediaDataList = [...selectedMedia];
    setSelectedMedia([]);
    setMessageText("");

    if (messageTextData !== "" || mediaDataList.length !== 0) {
        await playSound(AppSound.send_message);
        let updatedMessages = [...messages];
        const newTempMessages: MessageProps[] = [];

        // Handle text-only message
        if (messageTextData !== "" && mediaDataList.length === 0) {
            let position: "free" | "top" | "middle" | "bottom" = "free";
            
            // Check position for text-only message
            if (
                messages.length > 0 &&
                messages[messages.length - 1]?.createBy === localUserId
            ) {
                const lastMessage = messages[messages.length - 1];
                if (lastMessage.position === "free") {
                    updatedMessages[updatedMessages.length - 1] = {
                        ...lastMessage,
                        position: "top",
                    };
                    position = "bottom";
                } else {
                    updatedMessages[updatedMessages.length - 1] = {
                        ...lastMessage,
                        position: "middle",
                    };
                    position = "bottom";
                }
            }

            const tempTextMessage: MessageProps = {
                id: "",
                isReact: [],
                readedId: [localUserId],
                text: messageTextData,
                createAt: new Date().toString(),
                createBy: localUserId,
                position: position,
                isSender: true,
                avatar: "",
                boxId: "",
              sendStatus: "sending",
              handleViewImage: () => { },
              handleViewFile:()=>{}
            };
            
            newTempMessages.push(tempTextMessage);
        } else {
            // Existing media handling code
            mediaDataList.forEach((mediaData, index) => {
                let position: "free" | "top" | "middle" | "bottom" = "free";

                if (index === 0) {
                    if (
                        messages.length > 0 &&
                        messages[messages.length - 1]?.createBy === localUserId
                    ) {
                        const lastMessage = messages[messages.length - 1];
                        if (lastMessage.position === "free") {
                            updatedMessages[updatedMessages.length - 1] = {
                                ...lastMessage,
                                position: "top",
                            };
                            position = "middle";
                        } else {
                            updatedMessages[updatedMessages.length - 1] = {
                                ...lastMessage,
                                position: "middle",
                            };
                            position = "middle";
                        }
                    }
                }

                if (index === mediaDataList.length - 1) {
                    position = "bottom";
                }

                if (index > 0 && index < mediaDataList.length - 1) {
                    position = "middle";
                }

                const tempMessage: MessageProps = {
                    id: "",
                    isReact: [],
                    readedId: [localUserId],
                    contentId: {
                        url: mediaData.uri,
                        type: mediaData.type,
                        fileName: mediaData.name!,
                        width: 150,
                        height: 150,
                    },
                    text: index === 0 ? messageText : "",
                    createAt: new Date().toString(),
                    createBy: localUserId,
                    position: position,
                    isSender: true,
                    avatar: "",
                    boxId: "",
                    handleViewImage: () => {
                        handleViewImage(mediaData.uri);
                    },
                    handleViewFile: () => {
                        handleViewFile(mediaData);
                    },
                    sendStatus: "sending",
                };

                newTempMessages.push(tempMessage);
            });
        }

        // Add all new messages to the updated messages array
        updatedMessages = [...updatedMessages, ...newTempMessages];

        const processedMessages = processMessages(updatedMessages);
        setMessages(processedMessages);

        // Send messages
        for (let i = 0; i < newTempMessages.length; i++) {
            const tempMessage = newTempMessages[i];
            const currentMedia = mediaDataList.length > 0 ? [mediaDataList[i]] : [];
            const messageContent = mediaDataList.length === 0 ? messageTextData : 
                                 (i === 0 ? messageText : "");

            await sendMessage(
                messageId.toString(),
                messageContent,
                currentMedia,
                (id, status) => {
                    setMessages((prevMessages) =>
                        prevMessages.map((message) =>
                            message.createAt === tempMessage.createAt
                                ? { ...message, id: id, sendStatus: status }
                                : message
                        )
                    );
                }
            );
        }
    }
};
  const handleDeleteMessage = async (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
    const messageString = await AsyncStorage.getItem(`messages-${messageId}`);
    const messagesObject = await JSON.parse(messageString!);
    const updateDeletedMessages = messagesObject.filter(
      (message: any) => message._id !== id
    );
  };
  const handleRevokeMessage = async (id: string) => {
    setMessages((prevMessages) =>
      prevMessages?.map((message: MessageProps) =>
        message.id === id
          ? { ...message, text: "Message revoked", contentId: undefined }
          : message
      )
    );
    const messageString = await AsyncStorage.getItem(`messages-${messageId}`);
    const messagesObject = await JSON.parse(messageString!);
    const updatedRevokeMessage = messagesObject.map((message: any) =>
      message.id === id
        ? { ...message, text: "Message revoked", contentId: undefined }
        : message
    );
    await AsyncStorage.setItem(
      `messages-${messageId}`,
      JSON.stringify(updatedRevokeMessage)
    );
  };

  
const handleReactMessage = useCallback((id: string, isReact: string[]) => {
  setMessages((prevMessages) => {
    return prevMessages?.map((message: MessageProps) => {
      if (message.id === id) {
        return { ...message, isReact: [...isReact] };
      }
      return message;
    });
  });
}, []);


  const handleReadMessage = (readedId: string[]) => {
    setMessages((prevMessages) => {
      if (!prevMessages || prevMessages.length === 0) {
        return prevMessages;
      }
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = {
        ...updatedMessages[updatedMessages.length - 1],
        readedId: [...readedId],
      };

      return updatedMessages;
    });
  };

  const addToMap = (key: string, value: string): void => {
    setMemberAvatars((prevMap) => {
      const updatedMap = new Map(prevMap); // Tạo bản sao từ prevMap
      updatedMap.set(key, value); // Thêm cặp key-value vào bản sao
      return updatedMap; // Cập nhật state
    });
  };

  useEffect(() => {
    const getAllMessageFUNC = async () => {
      const { _id } = await getLocalAuth();
      await markRead(messageId.toString());
      const messageBoxLocal = await AsyncStorage.getItem(`box-${messageId}`);
      let messageBox: MessageBoxProps = await JSON.parse(messageBoxLocal!);
      let messages = await getFromAsyncStorage(`messages-${messageId.toString()}`);
      if (messageBox===null||messageBox===undefined) {
        const newChatBoxes = await getMyChatBoxes();
        messageBox = newChatBoxes.find((item) => item._id === messageId.toString());
        messages = await getAllMessages(messageId.toString());
        setReload(true);
        console.log("reloadnow");
      }
      console.log("inside-messagebox: ", messageBox);
      messageBox.localUserId = _id;
      setIsKicked(messageBox.isKicked ? true : false);
      for (const receiver of messageBox.receiverIds!) {
        addToMap(receiver._id, receiver.avatar);
      }
      setChatBoxHeader(messageBox);
      setMessageBox(messageBox);
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
        if (data.createBy !== _id) {
          setMessages((prevMessages) => [...prevMessages, data]);
          await markRead(messageId.toString());
        } else {
        }
        markAsRead(messageId.toString());
        await addToMessageLocal(messageId.toString(), data);
      });
      pusherClient.bind("revoke-message", (data: any) => {
        handleRevokeMessage(data.id);
      });
      pusherClient.bind("texting-status", async (data: any) => {
        if (data.userId !== _id) {
          console.log("is texting")
          const textingUser = await AsyncStorage.getItem(`user-${data.userId}`);
          const textingUserData = await JSON.parse(textingUser!);
          setTextingAvatar(textingUserData.avatar);
          setTimeout(() => setIsTypingMessage(data.texting), 200);
        }
      });
      pusherClient.bind("react-message", async (data: any) => {
          await playSound(AppSound.kiss);
        handleReactMessage(data.id, data.isReact);
        const messageString = await AsyncStorage.getItem(
          `messages-${messageId}`
        );
        const messagesObject = await JSON.parse(messageString!);
        const updatedReactMessages = messagesObject.map((item: any) =>
          item.id === data.id ? { ...item, isReact: data.isReact } : item
        );
        await AsyncStorage.setItem(
          `messages-${messageId}`,
          JSON.stringify(updatedReactMessages)
        );
      });
      pusherClient.bind("readed-status", (data: any) => {
        handleReadMessage(data.readedId);
      });
      pusherClient.bind("kick", async(data: any) => {
        const { _id } = await getLocalAuth();
        if (data.targetId === _id) {
          setIsKicked(true);
          const chatBoxes = await getFromAsyncStorage("ChatBoxes");
          const updatedChatBoxes = chatBoxes.map((item:any) => item._id === data.boxId ? {...item,isKicked:true} :item)
          const box = await getFromAsyncStorage(`box-${messageId.toString()}`);
          await AsyncStorage.setItem(`box-${messageId.toString()}`, JSON.stringify({ ...box, isKicked: true }));
          await AsyncStorage.setItem("ChatBoxes", JSON.stringify(updatedChatBoxes));
        }
      });
      markAsRead(messageId.toString());
    };
    getAllMessageFUNC();
    return () => {
    // Ngừng lắng nghe sự kiện của kênh Pusher
    pusherClient.unsubscribe(`private-${messageId}`);
    console.log("Disconnected from Pusher channel.");
  };
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ paddingBottom: Platform.OS === "android" ? 0 : 10 }}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? (ScreenRatio > 1.8 ? 56 : 14) : 0
      }
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
          <ChatBoxHeader {...chatBoxHeader} />
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
            {messages && messages.length != 0
              ? processMessages(messages).map((item, index) => isGroupSystemMessage(item.text) ? (
              <View className="w-full flex items-center justify-center py-[6px]">
                  <Text className="font-helvetica-light text-12 text-light-320">{extractContentFromGroupSystemMessage(item.text)}</Text>
              </View>
              ):(
                  <Message
                    key={index}
                    {...item}
                    isSender={localUserId === item.createBy.toString()}
                    localUserId={localUserId}
                    deleteMessage={handleDeleteMessage}
                    revokeMessage={handleRevokeMessage}
                    handleViewImage={handleViewImage}
                    handleViewFile={handleViewFile}
                    memberAvatars={memberAvatars}
                  />
                ))
              : null}
            {isTypingMessage ? (
              <View className="flex flex-row" style={{ columnGap: 4 }}>
                <UserAvatar size={34} avatarURL={{ uri: textingAvatar }} />
                <TypingAnimation />
              </View>
            ) : null}
            {isKicked? (
            <View className="flex items-center justify-center py-[20px]">
              <Text
                className={`font-helvetica-light text-12 text-light-320`}
              >
                You has been kicked
              </Text>
            </View>
            ) : null}
            </ScrollView>
        </View>
        <View collapsable={false} ref={ref}>
          <SelectedMedia
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
          />
          {isKicked ? null : (
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
          )}

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
