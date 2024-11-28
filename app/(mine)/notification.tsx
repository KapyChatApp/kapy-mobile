import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Previous from '@/components/ui/Previous'
import { useNavigation } from 'expo-router'
import NotificationBox from '@/components/shared/system/NotificationBox'
import { bgLight100Dark0, bgLight500Dark10 } from '@/styles/theme'

const NotificationPage = () => {
  const navigation = useNavigation();
    return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
        <View className='mt-[10px] ml-[10px]'>
            <Previous navigation={navigation} header="Notification"/>
        </View>
        <ScrollView className='mt-[10px]'>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
            <NotificationBox/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationPage