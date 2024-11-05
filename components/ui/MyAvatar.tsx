import { View, Text, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DefaultAva } from '@/constants/DefaultAva'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        }
    getLocalUserFunc()
  },[]))
  return (
    <TouchableOpacity className="flex" onPress={()=>router.push("/(mine)/my-wall")}>
      <Image
        source={{uri:avatar}}
        className={`rounded-full`}
        style={{height:size, width:size}}
      ></Image>
    </TouchableOpacity>
  )
}

export default MyAvatar