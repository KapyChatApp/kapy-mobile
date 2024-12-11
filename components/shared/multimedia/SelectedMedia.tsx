import { View, Text, FlatList, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import VideoPlayer from "./VideoPlayer";

const SelectedMedia = ({ selectedMedia, setSelectedMedia }: any) => {
  return (
    <View className={`flex flex-row bg-light-510 dark:bg-dark-20`}>
      <FlatList
        horizontal
        data={selectedMedia}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        renderItem={({ item, index }) => (
          <View className="p-[10px]">
            <View className="w-[140px] h-[140px] rounded-xl flex items-center justify-center bg-light-340 dark:bg-dark-20">
            {item.type==="image"?  <Image
              source={{ uri: item.uri }}
            />: (item.type==="video"?<VideoPlayer videoSource={item.uri}/> :(item.type==="audio"? <Icon iconURL={IconURL.voice} size={70}/>:(null)))}
            </View>
            <TouchableOpacity
              onPress={() =>
                setSelectedMedia((prev:any) => prev.filter((_:any, i:any) => i !== index))
              }
              className="absolute top-[12px] right-[12px] "
            >
            <Icon iconURL={IconURL.close} size={20}/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SelectedMedia;
