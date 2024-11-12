import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, withRepeat, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const SocialSkeletonLoader = () => {
  // Shared value for pulse animation
  const pulse = useSharedValue(1);

  // Animated style to control opacity
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withTiming(pulse.value, { duration: 1500, easing: Easing.ease }),
        -1,
        true 
      ),
    };
  });

  return (
    <View  className="flex border border-border rounded-3xl p-[16px] w-full pb-[50px]"
    style={{ rowGap: 8 }}>
      <View className='flex flex-row ' style={{columnGap:10}}>
        <Animated.View
        className="w-[60px] h-[60px] rounded-full bg-skeleton"
          style={animatedStyle} 
        />
        <View className='pt-[10px]'>
          <Animated.View
          className="w-[200px] h-[10px] rounded-full bg-skeleton"
            style={ animatedStyle} 
          />
          <Animated.View
          className="bg-skeleton w-[80px] h-[8px] rounded-full mt-[6px]"
            style={animatedStyle} 
          />
        </View>
      </View>

      <Animated.View
      className="w-full h-[8px] rounded-full bg-skeleton"
        style={animatedStyle}
      />
      <Animated.View
      className="w-full h-[8px] rounded-full bg-skeleton"
        style={animatedStyle}
      />
      <Animated.View
      className="w-full h-[8px] rounded-full bg-skeleton"
        style={animatedStyle}
      />
      
      <Animated.View
    className="w-full h-[160px] rounded-2xl bg-skeleton mt-[20px]"
  style={animatedStyle} 
      />

      <View className='flex flex-row absolute -bottom-3 ml-[20px]' style={{columnGap:8}}>
        <Animated.View
        className="w-[90px] h-[30px] bg-skeleton rounded-lg"
          style={animatedStyle}
        />
         <Animated.View
        className="w-[90px] h-[30px] bg-skeleton rounded-lg"
          style={animatedStyle} 
        />
         <Animated.View
        className="w-[90px] h-[30px] bg-skeleton rounded-lg"
          style={animatedStyle}
        />
     
      </View>
    </View>
  );
};



export default SocialSkeletonLoader;
