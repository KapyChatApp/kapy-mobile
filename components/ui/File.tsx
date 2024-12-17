import { View, Text, Pressable } from "react-native";
import React from "react";
import { FileProps } from "@/types/file";
import { IconURL } from "@/constants/IconURL";
import { VideoPlayer } from "expo-video";
import AudioPlayer from "../shared/multimedia/AudioPlayer";
import Icon from "./Icon";
import { openWebFile } from "@/utils/File";

const File = ({ file, isSender, position }: { file: FileProps, isSender:boolean, position:string }) => {
    const roundedValueReceiver = () => {
        switch (position) {
          case "top":
            return "rounded-t-2xl rounded-bl-sm rounded-tr-3xl rounded-br-3xl";
          case "middle":
            return "rounded-tl-sm rounded-bl-sm rounded-tr-3xl rounded-br-3xl";
          case "bottom":
            return "rounded-tl-sm rounded-bl-2xl rounded-tr-3xl rounded-br-3xl";
          case "free":
            return "rounded-3xl";
        }
      };
      const roundedValueSender = () => {
        switch (position) {
          case "top":
            return "rounded-tl-3xl rounded-bl-3xl rounded-tr-2xl rounded-br-sm";
          case "middle":
            return "rounded-tl-3xl rounded-bl-3xl rounded-tr-sm rounded-br-sm";
          case "bottom":
            return "rounded-tl-3xl rounded-bl-3xl rounded-tr-sm rounded-br-2xl";
          case "free":
            return "rounded-3xl";
        }
      };
      switch (file.url?.split(".").pop()) {
        case "docx":
          return (
            <Pressable
              className={`flex flex-row p-[10px]  ${
                isSender
                  ? "bg-cardinal"
                  : " bg-ios-light-340 dark:bg-ios-dark-330"
              } ${
                isSender ? roundedValueSender() : roundedValueReceiver()
              }`}
              style={{ columnGap: 4 }}
              onPress={async() => openWebFile(file.url!)}
            >
              <View
                className={`flex items-center justify-center rounded-2xl p-[10px] bg-light-510`}
              >
                <Icon iconURL={IconURL.docx} size={40} />
              </View>
              <View className="flex" style={{ rowGap: 4 }}>
                <View className="flex flex-row w-[140px]">
                  <Text
                    className={`${
                      isSender ? "text-white" : "text-black"
                    } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                    numberOfLines={3}
                  >
                    {file.fileName}
                  </Text>
                </View>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {file.url.split(".").pop()?.toUpperCase()}
                </Text>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {0.001 * file.bytes!}kB
                </Text>
              </View>
            </Pressable>
          );
        case "xls":
          return (
            <Pressable
              className={`flex flex-row p-[10px]  ${
                isSender
                  ? "bg-cardinal"
                  : " bg-ios-light-340 dark:bg-ios-dark-330"
              } ${
                isSender ? roundedValueSender() : roundedValueReceiver()
              }`}
              style={{ columnGap: 4 }}
              onPress={async() => openWebFile(file.url!)}
            >
              <View
                className={`flex items-center justify-center rounded-2xl p-[10px] bg-light-510`}
              >
                <Icon iconURL={IconURL.xls} size={40} />
              </View>
              <View className="flex" style={{ rowGap: 4 }}>
                <View className="flex flex-row w-[140px]">
                  <Text
                    className={`${
                      isSender ? "text-white" : "text-black"
                    } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                    numberOfLines={3}
                  >
                    {file.fileName}
                  </Text>
                </View>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {file.url.split(".").pop()?.toUpperCase()}
                </Text>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  }font-helvetica-light text-10`}
                >
                  {0.001 * file.bytes!}kB
                </Text>
              </View>
            </Pressable>
          );
        case "pptx":
          return (
            <Pressable
              className={`flex flex-row p-[10px]  ${
                isSender
                  ? "bg-cardinal"
                  : " bg-ios-light-340 dark:bg-ios-dark-330"
              } ${
                isSender ? roundedValueSender() : roundedValueReceiver()
              }`}
              style={{ columnGap: 4 }}
              onPress={async() => openWebFile(file.url!)}
            >
              <View
                className={`flex items-center justify-center rounded-2xl bg-light- p-[10px]  bg-light-510`}
              >
                <Icon iconURL={IconURL.ppt} size={40} />
              </View>
              <View className="flex" style={{ rowGap: 4 }}>
                <View className="flex flex-row w-[140px]">
                  <Text
                    className={`${
                      isSender ? "text-white" : "text-black"
                    } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                    numberOfLines={3}
                  >
                    {file.fileName}
                  </Text>
                </View>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {file.url.split(".").pop()?.toUpperCase()}
                </Text>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {0.001 * file.bytes!}kB
                </Text>
              </View>
            </Pressable>
          );
        case "pdf":
          return (
            <Pressable
              className={`flex flex-row p-[10px]  ${
                isSender
                  ? "bg-cardinal"
                  : " bg-ios-light-340 dark:bg-ios-dark-330"
              } ${
                isSender ? roundedValueSender() : roundedValueReceiver()
              }`}
              style={{ columnGap: 4 }}
              onPress={async() => openWebFile(file.url!)}
            >
              <View
                className={`flex items-center justify-center rounded-2xl bg-light- p-[10px] bg-light-510`}
              >
                <Icon iconURL={IconURL.pdf} size={40} />
              </View>
              <View className="flex" style={{ rowGap: 4 }}>
                <View className="flex flex-row w-[140px]">
                  <Text
                    className={`${
                      isSender ? "text-white" : "text-black"
                    } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                    numberOfLines={3}
                  >
                    {file.fileName}
                  </Text>
                </View>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {file.url.split(".").pop()?.toUpperCase()}
                </Text>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {0.001 * file.bytes!}kB
                </Text>
              </View>
            </Pressable>
          );
        default:
          return (
            <Pressable
              className={`flex flex-row p-[10px] ${
                isSender
                  ? "bg-cardinal"
                  : " bg-ios-light-340 dark:bg-ios-dark-330"
              } ${
                isSender ? roundedValueSender() : roundedValueReceiver()
              }`}
              style={{ columnGap: 4 }}
              onPress={async() => openWebFile(file.url!)}
            >
              <Icon iconURL={IconURL.my_document} size={40} />
              <View className="flex" style={{ rowGap: 4 }}>
                <View className="flex flex-row w-[140px]">
                  <Text
                    className={`${
                      isSender ? "text-white" : "text-black"
                    } font-helvetica-bold text-12 flex-1 flex-grow text-ellipsis`}
                    numberOfLines={3}
                  >
                    {file.fileName}
                  </Text>
                </View>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {file.url?.split(".").pop()?.toLocaleUpperCase()}
                </Text>
                <Text
                  className={`${
                    isSender ? "text-white" : "text-black"
                  } font-helvetica-light text-10`}
                >
                  {0.001 * file.bytes!}kB
                </Text>
              </View>
            </Pressable>
          );
      }
};

export default File;
