import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Video as ExpoVideo } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";

const SingleGalleryPickerBox = ({
  selectedMedia,
  setSelectedMedia,
}: {
    selectedMedia: { uri: string; type: string }|null;
    setSelectedMedia:any
}) => {
  const handleDelete = () => {
    setSelectedMedia(null);
  };
  useEffect(()=>{


  },[selectedMedia])
  return (
    <View className="" >
      {selectedMedia ? (
        <View className="w-[100px]">
          {selectedMedia.type.startsWith("image") ? (
            <View className="flex items-start flex-row justify-start" pointerEvents="box-none">
              <Image
                source={{ uri: selectedMedia.uri }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={handleDelete}
               
              >
                <Icon iconURL={IconURL.close} size={16} />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex items-start flex-row justify-start">
              <ExpoVideo
                source={{ uri: selectedMedia.uri }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                useNativeControls
                isLooping
              />
              <TouchableOpacity
                onPress={handleDelete}
              >
                <Icon iconURL={IconURL.close} size={16} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default SingleGalleryPickerBox;
