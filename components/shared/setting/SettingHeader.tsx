import { View, Text, Switch, Image } from 'react-native'
import React, { useState } from 'react'
import UserAvatar from '@/components/ui/UserAvatar'
import CustomButton from '@/components/ui/CustomButton'
import { IconURL } from '@/constants/IconURL'
import SunMoonSwitch from '@/components/ui/SunMoonSwitch'
const SettingHeader = () => {
    const [isOn, setIsOn] = useState(false);
  return (
    <View className ='flex flex-row items-center justify-between'>
      <View className='flex flex-row'>
        <UserAvatar size={72}></UserAvatar>
        <View className="flex ml-[12px] justify-center">
            <Text className='text-18 font-helvetica-bold'>Name</Text>
            <Text className='text-16 font-helvetica-light'>@linkname</Text>
            <Text className='text-14 font-helvetica-bold text-cardinal'>100</Text>
        </View>
      </View>
        <View>
            <CustomButton width={106} height={33} label="Update profile"></CustomButton>
            <SunMoonSwitch></SunMoonSwitch>
        </View>
    </View>
  )
}

export default SettingHeader