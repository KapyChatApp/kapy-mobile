import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import Icon from '@/components/ui/Icon'
import { IconURL } from '@/constants/IconURL'
import { bgLight500Dark10 } from '@/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import PreviousDouble from '@/components/ui/PreviousDouble'
import Previous from '@/components/ui/Previous'

const NotFoundPage = () => {
    const navigation = useNavigation();
  return (
    <View className={`flex-1 flex items-center justify-center ${bgLight500Dark10}`}>
      <View className='top-[30px] left-[10px] absolute'>
      <PreviousDouble navigation={navigation}/>
      </View>
      <View className='flex items-center justify-center flex-1'>
        <Icon iconURL={IconURL.not_found} size={100}/>
        <Text className='text-cardinal text-14 font-helvetica-bold'>Your require is not found!</Text>
      </View>
    </View>
  )
}

export default NotFoundPage