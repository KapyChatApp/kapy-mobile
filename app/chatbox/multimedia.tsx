import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native";
import { FileProps } from "@/types/file";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { allAudiosOfMessageBox, allFilesOfMessageBox, allImagesOfMessageBox, allVideosOfMessageBox } from "@/lib/media";
import { Image } from "react-native";
import VideoPlayer from "@/components/shared/multimedia/VideoPlayer";

const ChatMultimediaPage = () => {
   const {boxId} = useLocalSearchParams();
   const navigation = useNavigation();
  const [selected, setSelected] = useState("images");
  const [images, setImages] = useState<FileProps[]>([]);
  const [videos, setVideos] = useState<FileProps[]>([]);
  const [files, setFiles] = useState<FileProps[]>([]);
  const [audios, setAudios] = useState<FileProps[]>([]);
  useFocusEffect(useCallback(()=>{
    const getMultimediaFUNC = async ()=>{
        const images = await allImagesOfMessageBox(boxId.toString());
        setImages(images);
        const videos = await allVideosOfMessageBox(boxId.toString());
        setVideos(videos);
        const audios = await allAudiosOfMessageBox(boxId.toString());
        setAudios(audios);
        const files = await allFilesOfMessageBox(boxId.toString());
        setFiles(files);
    }
   getMultimediaFUNC();
  },[images, videos,audios,files]))
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`} style={{rowGap:10}}>
      <View className="mt-[10px] ml-[10px]">
        <Previous navigation={navigation} header="Multimedia" />
      </View>
      <View className="w-full flex flex-row justify-between items-center p-[10px]">
        <TouchableOpacity
          onPress={() => {
            setSelected("images");
          }}
          className="flex-1 flex items-center justify-center" style={{rowGap:12}}
        >
          <Text className="text-cardinal text-16 font-helvetica-bold text-center">
            Images
          </Text>
          {selected === "images" ? (
            <View className="w-[80px] h-[2px] bg-cardinal"></View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected("videos");
          }}
          className="flex-1 flex items-center justify-center" style={{rowGap:12}}
        >
          <Text className="text-cardinal text-16 font-helvetica-bold text-center">
            Videos
          </Text>
          {selected==="videos"?<View className="w-[80px] h-[2px] bg-cardinal"></View> :null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected("audios");
          }}
          className="flex-1 flex items-center justify-center" style={{rowGap:12}}
        >
          <Text className="text-cardinal text-16 font-helvetica-bold text-center">
            Audios
          </Text>
          {selected==="audios"?<View className="w-[80px] h-[2px] bg-cardinal"></View> :null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected("files")}
          className="flex-1 flex items-center justify-center" style={{rowGap:12}}
        >
          <Text className="text-cardinal text-16 font-helvetica-bold text-center">
            Files
          </Text>
          {selected==="files"?<View className="w-[80px] h-[2px] bg-cardinal"></View> :null}
        </TouchableOpacity>
      </View>
      <View>
        {selected==="images"?   <FlatList  data={images}
      renderItem={({ item }) => (
        <TouchableOpacity className="flex-1 w-[70px] h-[70px]"><Image source={{uri:item.url}}/></TouchableOpacity>
      )}
      keyExtractor={(item) => item._id!}
      numColumns={4}  
      /> : ( selected==="videos"?<FlatList  data={videos}
        renderItem={({ item }) => (
          <TouchableOpacity><VideoPlayer videoSource={item.url!}/></TouchableOpacity>
        )}
        keyExtractor={(item) => item._id!}
        numColumns={4}  
        />:(selected==="audios"? <View></View> : <View></View>))}
       
      </View>
    </SafeAreaView>
  );
};

export default ChatMultimediaPage;
