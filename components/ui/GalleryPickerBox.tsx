import React from "react";
import { View, FlatList, Image, Dimensions } from "react-native";
import { Video as ExpoVideo } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon"; // Đường dẫn đến component Icon của bạn
import { IconURL } from "@/constants/IconURL"; // Đường dẫn đến IconURL của bạn

const screenWidth = Dimensions.get("window").width;

const GalleryPickerBox = ({
  selectedMedia,
  setSelectedMedia,
}: {
  selectedMedia: { uri: string; type: string }[];
  setSelectedMedia: (media: { uri: string; type: string }[]) => void;
}) => {
  const handleDelete = (index: number) => {
    const updatedMedia = selectedMedia.filter((_, i) => i !== index);
    setSelectedMedia(updatedMedia);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { uri: string; type: string };
    index: number;
  }) => (
    <View style={{ marginHorizontal: 5, width: screenWidth * 0.8 }}>
      <View style={{ position: "relative" }}>
        {item.type.startsWith("image") ? (
          <View>
            <Image
              source={{ uri: item.uri }}
              style={{
                width: screenWidth,
                height: screenWidth, // Tỉ lệ 4:3 cho ảnh
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
            <View
              className="flex-1 absolute top-[4px] right-[4px]"
              style={{ zIndex: 20 }}
            >
              <TouchableOpacity
                onPress={() => handleDelete(index)}
              >
                <Icon iconURL={IconURL.close} size={24} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <ExpoVideo
              source={{ uri: item.uri }}
              style={{
                width: screenWidth,
                height: screenWidth, // Tỉ lệ 16:9 cho video
                borderRadius: 10,
              }}
              useNativeControls
              isLooping
            />
            <View
              className="flex-1  absolute top-[4px] right-[4px]"
              style={{ zIndex: 20 }}
            >
              <TouchableOpacity
                onPress={() => handleDelete(index)}
              >
                <Icon iconURL={IconURL.close} size={24} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={selectedMedia}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Khoảng cách giữa các mục
      />
    </View>
  );
};

export default GalleryPickerBox;
