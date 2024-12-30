import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { bgLight500Dark10 } from "@/styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import ChatBoxDetailHeader from "@/components/shared/message/ChatBoxDetailHeader";
import FastMediaList from "@/components/shared/multimedia/FastMediaList";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";
import FunctionCard from "@/components/shared/function/FunctionCard";
import { MessageBoxProps } from "@/types/message";
import { deleteMessageBox, getAMessageBox } from "@/lib/message";
import { FileProps } from "@/types/file";
import { getFilesOfAMessageBox } from "@/lib/media";
import { getFromAsyncStorage } from "@/utils/Device";
import { getLocalAuth } from "@/lib/local";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useMessageBox } from "@/context/MessageBoxContext";
import { CommonActions } from "@react-navigation/native";

const ChatBoxDetailPage = () => {
  const { chatboxDetailId } = useLocalSearchParams();
  const { theme } = useTheme();
  const { waitDeleteMessageBox } = useMessageBox();
  const [messageBox, setMessageBox] = useState<MessageBoxProps | null>(null);
  const [images, setImages] = useState<FileProps[]>([]);
  const [videos, setVideos] = useState<FileProps[]>([]);
  const [audios, setAudios] = useState<FileProps[]>([]);
  const [others, setOthers] = useState<FileProps[]>([]);
  const [isGroup, setIsGroup] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleDeleteMessageBox = async () => {
    await deleteMessageBox(
      chatboxDetailId.toString(),
      () => setLoading(true),
      () => setLoading(false),
      () => {
        waitDeleteMessageBox(chatboxDetailId.toString());
         navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "(tabs)" }],
                  })
                );
      }
    );
  };
  useEffect(() => {
    const getAMessageBoxFUNC = async () => {
      const { _id } = await getLocalAuth();
      const messageBox: MessageBoxProps = await getFromAsyncStorage(
        `box-${chatboxDetailId}`
      );
      const messageBoxData = {
        ...messageBox,
        _id: messageBox._id,
        localUserId: _id,
      };
      setMessageBox(messageBoxData);
      const files: FileProps[] = await getFilesOfAMessageBox(
        chatboxDetailId.toString()
      );
      const images = files.filter((item) => item.type && item.type === "Image");
      const videos = files.filter((item) => item.type && item.type === "Video");
      const audios = files.filter((item) => item.type && item.type === "Audio");
      const others = files.filter(
        (item) =>
          item.type &&
          !(item.type === "Image") &&
          !(item.type === "Video") &&
          !(item.type === "Audio")
      );
      setImages(images);
      setVideos(videos);
      setAudios(audios);
      setOthers(others);
      if (messageBox.receiverIds?.length! > 2) {
        setIsGroup(true);
      }
    };
    getAMessageBoxFUNC();
  }, []);
  return (
    <View className={`${bgLight500Dark10} flex-1`}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ChatBoxDetailHeader {...messageBox} />
        <FastMediaList label="Photos" type="image" data={images} />
        <FastMediaList label="Videos" type="video" data={videos} />
        <View
          className="flex justify-center w-full mt-[16px]"
          style={{ rowGap: 5 }}
        >
          {isGroup ? (
            <FunctionCard
              label="Members"
              iconURL={theme === "light" ? IconURL.groups_l : IconURL.groups_d}
              onPress={() =>
                router.push({
                  pathname: "/chatbox/members",
                  params: { boxId: chatboxDetailId.toString() },
                })
              }
            />
          ) : null}
          <FunctionCard
            label="Multimedia"
            iconURL={
              theme === "light" ? IconURL.multimedia_l : IconURL.multimedia_d
            }
            onPress={() =>
              router.push({
                pathname: "/chatbox/multimedia",
                params: { boxId: chatboxDetailId.toString() },
              })
            }
          />
          <FunctionCard
            label="Notification"
            iconURL={theme === "light" ? IconURL.bell_l : IconURL.bell_d}
            URL="/"
          />
          <FunctionCard
            label="Pin"
            iconURL={theme === "light" ? IconURL.pin_l : IconURL.pin_d}
            URL="/"
          />
          {!isGroup ? (
            <FunctionCard
              label="Delete the chat"
              iconURL={
                theme === "light" ? IconURL.trashcan_l : IconURL.trashcan_d
              }
              onPress={handleDeleteMessageBox}
            />
          ) : null}
          <FunctionCard
            label="Block"
            iconURL={theme === "light" ? IconURL.block_l : IconURL.block_d}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
      {loading ? <LoadingSpinner loading={loading} /> : null}
    </View>
  );
};

export default ChatBoxDetailPage;
