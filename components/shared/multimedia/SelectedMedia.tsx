import { View, Text, FlatList, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";

const SelectedMedia = ({ selectedMedia, setSelectedMedia }: any) => {
  return (
    <View className={`flex flex-row bg-light-510 dark:bg-dark-20`}>
      <FlatList
        horizontal
        data={selectedMedia}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        renderItem={({ item, index }) => (
          <View className="p-[10px]">
            <Image
              source={{ uri: item.uri }}
              className="w-[140px] h-[140px] rounded-xl"
            />
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
