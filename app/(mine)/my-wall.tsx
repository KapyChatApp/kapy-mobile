import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import HeadProfile from "@/components/shared/community/HeadProfile";
import { ScrollView } from "react-native-gesture-handler";
import Previous from "@/components/ui/Previous";
import UserBio from "@/components/shared/community/UserBio";
import { bgLight500Dark10 } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeadProfileProps, UserBioProps } from "@/types/user";

const MyWallPage = () => {
  const navigation = useNavigation();
  const [headerProps,setHeaderProps] = useState<HeadProfileProps | undefined>();
  const [bioProps, setBioProps] = useState<UserBioProps | undefined>();
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
        const { firstName, lastName, nickName, description,...bio } = result; 
        setHeaderProps({ firstName, lastName , nickName, description });
        setBioProps(bio);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${bgLight500Dark10}`}>
    <ScrollView>
      <HeadProfile {...headerProps}/>
      <Previous navigation={navigation} isAbsolute={true} />
      <UserBio {...bioProps} />
      <View className="w-full h-[300px]"></View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default MyWallPage;
