import { View, Text, Image } from 'react-native'
import React from 'react'
import { textLight0Dark500, textLight330Dark500 } from '@/styles/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MediaCard = ({image}:any) => {
  return (
    <TouchableOpacity className='flex flex-row items-center border border-border px-[12px] rounded-3xl h-[70px]' style={{columnGap:4}}>
      <Image source={image? image:require("../../../assets/images/default-file.png")} style={{width:40, height:40}}></Image>
      <View>
        <Text className={`${textLight0Dark500} font-helvetica-bold text-12`}>
            File name
        </Text>
        <Text className={`${textLight0Dark500} font-helvetica-light text-10`}>
            0kB
        </Text>
        <Text className={`${textLight330Dark500} font-helvetica-ultra-light text-10`}>
            00:00
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MediaCard