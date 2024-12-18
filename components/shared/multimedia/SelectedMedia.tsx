import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import VideoPlayer from "./VideoPlayer";
import { textLight0Dark500 } from "@/styles/theme";

const SelectedMedia = ({ selectedMedia, setSelectedMedia }: any) => {
  const renderMediaItem = (item: any) => {
    console.log(item.type);
    console.log(item.uri);
    switch (item.type) {
      case "image":
        return  <Image
        source={{ uri: item.uri }}
        style={{
          width: "100%", 
          height: "100%", 
          aspectRatio: item.width / item.height, 
          resizeMode: "contain", 
        }}
      />
      case "video":
        return <VideoPlayer videoSource={item.uri} />;
      case "audio":
        return <Icon iconURL={IconURL.voice} size={70} />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Icon iconURL={IconURL.docx} size={70} />;
      case "application/xls":
        return <Icon iconURL={IconURL.xls} size={70} />;
      case "application/ppt":
        return <Icon iconURL={IconURL.ppt} size={70} />;
      case "application/pdf":
        return <Icon iconURL={IconURL.pdf} size={70} />;
      default:
        return <Icon iconURL={IconURL.my_document} size={70} />;
    }
  };
  return (
    <View className={`flex flex-row bg-light-510 dark:bg-dark-20`}>
      <FlatList
        horizontal
        data={selectedMedia}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        renderItem={({ item, index }) => (
          <View className="p-[10px]">
            <View className="w-[140px] h-[140px] rounded-xl flex items-center justify-center bg-light-340 dark:bg-dark-20">
              {renderMediaItem(item)}
            </View>
            <TouchableOpacity
              onPress={() =>
                setSelectedMedia((prev: any) =>
                  prev.filter((_: any, i: any) => i !== index)
                )
              }
              className="absolute top-[12px] right-[12px] "
            >
              <Icon iconURL={IconURL.close} size={20} />
            </TouchableOpacity>
            <View className="flex flex-row">
                {(item.type!="image") &&(item.type!="video")&&(item.type!="audio")? <Text className={`${textLight0Dark500} font-helvetica-bold text-10 flex-grow-0 text-ellipsis`}>{item.name}</Text>:null}
              </View>
          </View>
        )}
      />
    </View>
  );
};

export default SelectedMedia;
