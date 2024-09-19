import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconURL } from '@/constants/IconURL'
import Icon from './Icon'

const SignOutButton = () => {
  return (
    <TouchableOpacity className='bg-deny w-[115px] h-[41px] rounded-full flex flex-row items-center justify-center'>
        <Text className='text-16 text-white font-helvetica'>Sign out</Text>
        <Icon size={26} iconURL={IconURL.leave_d}></Icon>
    </TouchableOpacity>
  )
}

export default SignOutButton