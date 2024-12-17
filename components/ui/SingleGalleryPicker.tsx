import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Video as ExpoVideo } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import VideoPlayer from "../shared/multimedia/VideoPlayer";
import File from "./File";
import LocalFile from "./LocalFile";

const SingleGalleryPickerBox = ({
  selectedMedia,
  setSelectedMedia,
}: {
    selectedMedia: { uri: string; type: string , name:string}|null;
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
            selectedMedia.type==="Video"?
            <View className="flex items-start flex-row justify-start">
              <VideoPlayer videoSource={selectedMedia.uri}/>
              <TouchableOpacity
                onPress={handleDelete}
              >
                <Icon iconURL={IconURL.close} size={16} />
              </TouchableOpacity>
            </View>
          :(selectedMedia.type==="Audio"? <View className="flex items-center flex-row justify-center">
            <Icon iconURL={IconURL.voice} size={50}/>
            <TouchableOpacity
              onPress={handleDelete}
            >
              <Icon iconURL={IconURL.close} size={16} />
            </TouchableOpacity>
          </View>: <View className="flex items-start flex-row justify-start">
          <LocalFile file={selectedMedia} size={100} iconSize={30}/>
            <TouchableOpacity
              onPress={handleDelete}
            >   
                 <Icon iconURL={IconURL.close} size={16} />
            </TouchableOpacity>
          </View> ))}
        </View>
      ) : null}
    </View>
  );
};

export default SingleGalleryPickerBox;
