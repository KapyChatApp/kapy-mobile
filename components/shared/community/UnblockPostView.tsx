import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import CustomButton from '@/components/ui/CustomButton'
import { textLight0Dark500 } from '@/styles/theme'
import { addBFF } from '@/requests/add-request'

const UnblockPostView = ({friendId}:{friendId:string}) => {
  const [sent, setSent] = useState<boolean>();
  return (
    <View className={`flex items-center justify-center ${Platform.OS==="ios"? "top-[180px] ":"top-[200px]"} mb-[200px]`} style={{rowGap:26}}>
        <View className='flex flex-row'>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>You have to be their </Text>
        <Link href="/">
            <Text className='text-specialRelation font-helvetica-bold text-14 underline'>BestFriend</Text>
        </Link>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}> to see their posts!</Text>
        </View>
        <CustomButton type={true} label={sent? "Requested":"Send Bestfriend request"} width={200} height={62} onPress={async()=>await addBFF(friendId,()=> setSent(true))}/>
    </View>
  )
}

export default UnblockPostView