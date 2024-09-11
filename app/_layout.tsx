import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
export default function _layout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
    <ClerkLoaded>
      <Slot />
    </ClerkLoaded>
  </ClerkProvider>
  )
}

const styles = StyleSheet.create({})