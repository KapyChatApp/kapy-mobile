import { View, Text, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DefaultAva } from '@/constants/DefaultAva'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { bgLight500Dark10 } from '@/styles/theme'

const MyAvatar = ({size}:any) => {
  const router = useRouter();
  const [avatar, setAvatar]= useState("");
  useFocusEffect(useCallback(()=>{
    const getLocalUserFunc = async()=>{
        const user = await AsyncStorage.getItem("user");
        if(!user){
            throw new Error('You are unauthenticated!');
        }
        const {avatar} = JSON.parse(user);
        setAvatar(avatar);
        console.log("ava ",avatar);
        }
    getLocalUserFunc();
  },[]))
  return (
    <TouchableOpacity className="flex" onPress={()=>router.push("/(mine)/my-wall")}>
      {avatar===undefined||avatar===""?<Image
        source={DefaultAva.user}
        className={`rounded-full ${bgLight500Dark10}`}
        style={{height:size, width:size}}
      ></Image>:<Image
      source={{uri:avatar}}
      className={`rounded-full`}
      style={{height:size, width:size}}
    ></Image>}
    </TouchableOpacity>
  )
}

export default MyAvatar