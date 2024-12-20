import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import UserAvatar from '@/components/ui/UserAvatar'
import { FriendBoxProps } from '@/types/friend'
import { useRouter } from 'expo-router'
import { ReceiverProps } from '@/types/message'
import { textLight0Dark500 } from '@/styles/theme'

const MemberBox = (props:ReceiverProps) => {
    const router = useRouter();
  return (
    <TouchableOpacity className='flex flex-row py-[12px] px-[10px] items-center' onPress={()=>router.push({pathname:props._id === props.localUserId? "/(mine)/my-wall": "/friend/friend-profile/[friendId]",params:{friendId:props._id}})} style={{columnGap:12}} >
        <UserAvatar size={40} avatarURL={{uri:props.avatar}}/>
        <Text className={`${textLight0Dark500} text-14 font-helvetica-bold`}>{props.firstName + " " + props.lastName}</Text>
    </TouchableOpacity>
  )
}

export default MemberBox