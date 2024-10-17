import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import Previous from "@/components/ui/Previous";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import FastMediaList from "@/components/shared/multimedia/FastMediaList";
import FunctionCard from "@/components/shared/function/FunctionCard";
import { useTheme } from "@/context/ThemeProviders";
import { IconURL } from "@/constants/IconURL";
import { ScrollView } from "react-native-gesture-handler";
import MediaCard from "@/components/shared/multimedia/MediaCard";

const MyMultimediaPage = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <ScrollView className="flex-1"
        contentContainerStyle={{
          display: "flex",
          rowGap: 4,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="ml-[12px] my-[10px]">
          <Previous
            navigation={navigation}
            header="My media"
            isAbsolute={false}
          />
          <View className="w-full h-[20px]"></View>
          <FastMediaList label="Recent photos" />
          <View className="ml-[12px] my-[10px]"></View>
          <FastMediaList label="Recent videos" />
          <View className="w-full h-[20px]"></View>
          <View className="flex" style={{ rowGap: 8 }}>
            <Text
              className={`${textLight0Dark500} font-helvetica-bold text-16`}
            >
              Recent files
            </Text>
            <View className="flex p-[10px]" style={{rowGap:4}}>
              <MediaCard />
              <MediaCard />
              <MediaCard />
            </View>
          </View>
          <View className="flex" style={{ rowGap: 8 }}>
            <Text
              className={`${textLight0Dark500} font-helvetica-bold text-16`}
            >
              Recent links
            </Text>
            <View className="flex p-[10px]" style={{rowGap:4}}>
              <MediaCard />
              <MediaCard />
              <MediaCard />
            </View>
          </View>
          <View className="w-full h-[20px]"></View>
          <View className="p-[10px] flex " style={{ rowGap: 4 }}>
            <FunctionCard
              iconURL={
                theme === "light" ? IconURL.allphoto_l : IconURL.allphoto_d
              }
              label="All Photos"
              URL="/"
            />
            <FunctionCard
              iconURL={
                theme === "light" ? IconURL.allvideo_l : IconURL.allvideo_d
              }
              label="All videos"
              URL="/"
            />
            <FunctionCard
              iconURL={
                theme === "light"
                  ? IconURL.alldocument_l
                  : IconURL.alldocument_d
              }
              label="All files"
              URL="/"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyMultimediaPage;
