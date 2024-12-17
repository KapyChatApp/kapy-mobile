import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from './Icon'
import { IconURL } from '@/constants/IconURL'
import { bgLight500Dark10 } from '@/styles/theme'

const MessageLove = ({onPress, totalLike, isLiked}:{onPress:()=>void, totalLike:number,  isLiked:boolean}) => {
  return (
    <View className=''>
      <TouchableOpacity className={`px-[4px] h-[24px] bg-light-310 dark:bg-dark-20 rounded-3xl flex items-center justify-center flex-row`} style={{columnGap:2}} onPress={onPress} >
        <Icon iconURL={isLiked? IconURL.loved:IconURL.love} size={12}/>
        {totalLike>0? <Text className='text-10 font-helvetica-bold'>{totalLike}</Text>:null}
      </TouchableOpacity>
    </View>
  )
}

export default MessageLove