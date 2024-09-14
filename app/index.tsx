import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View className='flex-1 items-center justify-center h-full w-full'>
        <Link href="/sign-in">Start</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})