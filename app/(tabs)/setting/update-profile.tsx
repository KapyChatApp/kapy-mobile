import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderProfileEditor from "@/components/shared/setting/HeaderProfileEditor";
import BioEditor from "@/components/shared/setting/BioEditor";
import { ScrollView } from "react-native-gesture-handler";
import { bgLight500Dark10 } from "@/styles/theme";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BioEditorProps } from "@/types/user";

const UpdateProfilePage = () => {
  const [bioProps, setBioProps] = useState<BioEditorProps|undefined>();
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.4.126:3000/api/mine/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setBioProps(result);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  },[]);
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <ScrollView className="flex-1">
        <HeaderProfileEditor />
        <View className="space w-full h-[90px]"></View>
        <BioEditor {...bioProps}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfilePage;
