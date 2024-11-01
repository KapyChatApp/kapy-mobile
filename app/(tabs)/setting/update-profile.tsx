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
import { BioEditorProps, HeaderProfileEditorProps } from "@/types/user";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const UpdateProfilePage = () => {
  const [bioProps, setBioProps] = useState<BioEditorProps | undefined>();
  const [headerProps, setHeaderProps] = useState<
    HeaderProfileEditorProps | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [reload, setReload] = useState<boolean>(false);
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
        setHeaderProps(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [reload]);
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1">
          <HeaderProfileEditor
            {...headerProps}
            setStartLoading={() => setLoading(true)}
            setEndLoading={() => setLoading(false)}
            setIsLoading={() => setIsLoading(true)}
            setNotIsLoading={() => setIsLoading(false)}
            setReload={() => setReload(true)}
          />
          <View className="space w-full h-[90px]"></View>
          <BioEditor
            {...bioProps}
            setStartLoading={() => setLoading(true)}
            setEndLoading={() => setLoading(false)}
            setIsLoading={() => setIsLoading(true)}
            setNotIsLoading={() => setIsLoading(false)}
          />
        </ScrollView>
        {loading ? <LoadingSpinner loading={isLoading} /> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateProfilePage;
