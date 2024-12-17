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
  const handleSendMessage = async () => {
    handleDisableTexting();
    const messageTextData = messageText;
    let mediaData = selectedMedia[0];
    setSelectedMedia([]);
    setMessageText("");
    if (messageTextData != "" || selectedMedia.length != 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: "",
          isReact: [],
          readedId: [],
          contentId: mediaData,
          text: messageText,
          createAt: new Date().toString(),
          createBy: localUserId,
          position: "",
          isSender: true,
          avatar: "",
          boxId: "",
          handleViewImage: () => {
            handleViewImage(mediaData.uri);
          },
          handleViewFile: () => {
            handleViewFile(mediaData);
          },
          handleViewPdf: () => handleViewFile(mediaData),
        },
      ]);
      await sendMessage(messageId.toString(), messageText, selectedMedia);
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
      const messageBox: MessageBoxProps = await getAMessageBox(messageId);
      messageBox.localUserId = _id;
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
      pusherClient.bind("new-message", (data: any) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        markAsRead(messageId.toString());
      });
      pusherClient.bind("revoke-message", (data: any) => {
        console.log("revoke: ", data);
        handleRevokeMessage(data.id);
      });
      pusherClient.bind("texting-status", (data: any) => {
        if (data.userId !== _id) {
          setTextingAvatar(data.avatar);
          setTimeout(() => setIsTypingMessage(data.texting), 200);
        }
      });
      markAsRead(messageId.toString());
    };
    getAllMessageFUNC();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
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
                  position={position}
                  localUserId={localUserId}
                  deleteMessage={handleDeleteMessage}
                  revokeMessage={handleRevokeMessage}
                  handleViewImage={handleViewImage}
                  handleViewFile={handleViewFile}
                />
              );
            })}
            {isTypingMessage ? (
              <View
                className="flex flex-row ml-[34px]"
                style={{ columnGap: 4 }}
              >
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
