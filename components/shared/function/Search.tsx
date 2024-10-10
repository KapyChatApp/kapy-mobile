import { View, Text, Image } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { IconURL } from "@/constants/IconURL";
import { bgLight600Dark300, textLight0Dark500 } from "@/styles/theme";
const Search = () => {
  return (
    <View className="flex flex-row items-center justify-center mt-[6px] mx-[18px] ">
      <Image
        source={IconURL.search}
        className="w-[28px] h-[28px] absolute z-10 left-4"
      ></Image>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#A9A9A9"
        className= {`w-full h-[42px] pl-[56px] pr-[6px] rounded-full bg-light-600 dark:bg-dark-300 ${textLight0Dark500} `}
      ></TextInput>
    </View>
  );
};

export default Search;
