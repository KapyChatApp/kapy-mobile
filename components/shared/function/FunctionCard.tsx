import { View, Text } from 'react-native'
import React from 'react'
import Icon from '@/components/ui/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { textLight0Dark500 } from '@/styles/theme'

const FunctionCard = ({iconURL, label,onPress}:any) => {
    const router = useRouter();
  return (
    <TouchableOpacity className='flex justify-center px-[40px] border border-black dark:border-white w-full h-[60px] rounded-3xl' onPress={onPress}>
      <View className='flex flex-row items-center gap-x-[20px] w-fu'>
        <Icon iconURL={iconURL} size={26}/>
        <Text className={`${textLight0Dark500} font-helvetica-regular text-16`}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FunctionCard