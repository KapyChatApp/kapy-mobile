import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const RequestButton = ({ type,onPress }: any) => {
  return (
    <TouchableOpacity
    className={`flex justify-center items-center w-[93px] h-[31px] rounded-full ${
      type ? "bg-specialRelation" : "bg-cardinal"
    }`}
    onPress={onPress}
  >
    <Text className="text-white dark:text-black text-12 font-helvetica-bold">
      Accept
    </Text>
  </TouchableOpacity>
  )
}

export default RequestButton 