import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
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
import axios from "axios";

const UpdateProfilePage = () => {
  const [bioProps, setBioProps] = useState<BioEditorProps | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        
        const response = await axios.get(
          process.env.EXPO_PUBLIC_BASE_URL + "/mine/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        setBioProps(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
        <ScrollView className="flex-1">
          <HeaderProfileEditor />
          <View className="space w-full h-[90px]"></View>
          <BioEditor {...bioProps} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateProfilePage;
