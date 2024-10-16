import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import Previous from '@/components/ui/Previous';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '@/components/shared/function/Search';
import { bgLight500Dark10 } from '@/styles/theme';
import InvitrList from '@/components/shared/group/InviteList';

const InviteGroupPage = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className={`${bgLight500Dark10} flex-1`}>
      <View className='ml-[10px] mt-[10px]'>
        <Previous navigation={navigation}/>
      </View>
      <Search/>
      <InvitrList/>
    </SafeAreaView>
  )
}

export default InviteGroupPage