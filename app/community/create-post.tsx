import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAvatar from "@/components/ui/UserAvatar";
import { HeadProfileProps } from "@/types/user";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { getLocalAuth } from "@/lib/local-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import PostTyping from "@/components/ui/PostTyping";
import GalleryPickerBox from "@/components/ui/GalleryPickerBox";
import { pickMedia } from "@/utils/GalleryPicker";
import { createPost } from "@/lib/post";
import ExpoCamera from "@/components/shared/multimedia/ExpoCamera";
import AudioRecorder from "@/components/shared/multimedia/AudioRecorder";

const CreatePostPage = () => {
  const navigation = useNavigation();

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isMicroOpen, setIsMicroOpen] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [caption, setCaption] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ref = useClickOutside<View>(() => setIsTyping(false));
  const [selectedMedia, setSelectedMedia] = useState<
    { uri: string; type: string;name:string }[]
  >([]);
  const handlePickMedia = async () => {
    const media = await pickMedia();
    setSelectedMedia((prev) => [
      ...prev,
      ...media.map((item) => ({
        uri: item.uri,
        type: item.type,
        name: item.name || "", 
      }))
    ]);
  };

  useEffect(() => {
    const getLocalData = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        throw new Error("You are unauthenticated!");
      }
      const { firstName, lastName, avatar } = JSON.parse(user);
      setName(firstName + " " + lastName);
      setAvatar(avatar);
    };
    getLocalData();
  }, []);

  return (
    <SafeAreaView className={`bg-white dark:bg-black flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
         {isCameraOpen?<View className="fixed w-screen h-screen"> <ExpoCamera onClose={()=>setIsCameraOpen(false)} isSendNow={false} setSelectedMedia={(uri:string,  type:string,name:string)=>setSelectedMedia([{uri:uri, type:type, name:name}])}/></View>:null}
        <View className="pl-[10px] pt-[10px] mb-[10px]">
          <Previous header="Create a post" navigation={navigation} />
        </View>
       
        
        <ScrollView
          className={`${bgLight500Dark10}`}
          contentContainerStyle={{ padding: 10, rowGap: 8 }}
        >
          <View className="flex flex-row" style={{ columnGap: 10 }}>
            <UserAvatar avatarURL={{ uri: avatar }} size={50} />
            <View className="flex" style={{ rowGap: 4 }}>
              <Text
                className={`${textLight0Dark500} font-helvetica-bold text-14`}
              >
                {name}
              </Text>
              <Popover
                offset={0}
                popoverShift={{ x: 0, y: 0 }}
                backgroundStyle={{ backgroundColor: "transparent" }}
                arrowSize={{ width: 0, height: 0 }}
                placement={PopoverPlacement.BOTTOM}
                from={
                  <TouchableOpacity className="border border-border rounded-full p-[2px]  flex flex-row items-center justify-center w-[60px]">
                    <Text className="font-helvetica-bold text-10 text-border ">
                      {isPrivate ? "Private" : "Public"}
                    </Text>
                    <Icon iconURL={IconURL.show_more_func} size={6}></Icon>
                  </TouchableOpacity>
                }
              >
                <TouchableOpacity
                  className={`flex items-center justify-start w-[68px] border-b border-border ${bgLight500Dark10}`}
                  onPress={() => setIsPrivate?.(false)}
                >
                  <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
                    Public
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex items-center justify-start w-[68px] ${bgLight500Dark10}`}
                  onPress={() => setIsPrivate?.(true)}
                >
                  <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
                    Private
                  </Text>
                </TouchableOpacity>
              </Popover>
            </View>
          </View>
          <TextInput
            placeholder="Write something..."
            multiline={true}
            className={`font-helvetica-light text-16 ${textLight0Dark500}`}
            onChangeText={setCaption}
          />
          <View>
            <GalleryPickerBox
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
            />
          </View>
        </ScrollView>
        <View ref={ref}>
          <PostTyping
            handleGalleryPicker={handlePickMedia}
            handlePostAction={async () =>
              await createPost(caption, selectedMedia, () => {
                Alert.alert(
                  "Your post is being created and will be done soon!"
                );
                navigation.goBack();
              })
            }
            handleOpenCamera={()=>setIsCameraOpen(true)}
            handleOpenMicro={()=>setIsMicroOpen(true)}
          />
           {isMicroOpen? <View ref={ref}>
          <AudioRecorder setSelectedMedia={(uri,type,name)=>setSelectedMedia((prev)=>[...prev,{uri:uri,type:type,name:name}])}/>
        </View> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePostPage;
