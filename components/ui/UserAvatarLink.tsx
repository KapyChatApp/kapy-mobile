import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DefaultAva } from '@/constants/DefaultAva'
import { useNavigation, useRouter } from 'expo-router'
import { bgLight500Dark10 } from '@/styles/theme'

const UserAvatarLink = ({avatarURL,size,userId}:any) => {
  const router = useRouter();
  const imageSource = avatarURL && avatarURL.uri ? avatarURL : DefaultAva.user;
  return (
    <TouchableOpacity className="flex" onPress={()=>router.push({
      pathname:"/friend/friend-profile/[friendId]",params:{friendId:userId}
    })}>
      <Image
        source={imageSource}
        className={`rounded-full ${bgLight500Dark10}`}
        style={{height:size, width:size}}
      ></Image>
    </TouchableOpacity>
  )
}

export default UserAvatarLink