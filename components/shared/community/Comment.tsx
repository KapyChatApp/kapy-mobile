import { View, Text } from 'react-native'
import React from 'react'
import UserAvatarLink from '@/components/ui/UserAvatarLink'
import Love from '@/components/ui/Love'
import Reply from '@/components/ui/Reply'
import { textLight0Dark500 } from '@/styles/theme'

const Comment = () => {
  return (
    <View className='flex border border-border p-[14px] rounded-3xl mb-[40px] pb-[38px]'>
      <View className='flex flex-row' style={{columnGap:10}}>
        <UserAvatarLink size={40}/>
        <View className='flex' style={{rowGap:5}}>
            <Text className={`${textLight0Dark500} font-helvetica-bold text-14`}>Name</Text>
            <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>Content</Text>
        </View>
      </View>
      <View className='flex flex-row absolute items-end  -bottom-[20px] left-[10px]' style={{columnGap:8}}>
        <Text className='text-dark-330 text-12'>00:00</Text>
        <Love/>
        <Reply/>
      </View>
    </View>
  )
}

export default Comment