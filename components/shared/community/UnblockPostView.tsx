import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import CustomButton from '@/components/ui/CustomButton'
import { textLight0Dark500 } from '@/styles/theme'

const UnblockPostView = () => {
  return (
    <View className='flex items-center justify-center top-[240px]' style={{rowGap:26}}>
        <View className='flex flex-row'>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>You have to be their </Text>
        <Link href="/">
            <Text className='text-specialRelation font-helvetica-bold text-14 underline'>BestFriend</Text>
        </Link>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}> to see their posts!</Text>
        </View>
        <CustomButton type={true} label="Request BestFriend" width={200} height={62}/>
    </View>
  )
}

export default UnblockPostView