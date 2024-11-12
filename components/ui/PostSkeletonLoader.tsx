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
      <View style={styles.avatarContainer}>
        <Animated.View
          style={[styles.avatar, animatedStyle]} 
        />
        <View style={styles.textContainer}>
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  textContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    width: 120,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  date: {
    width: 80,
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 6,
  },
  caption: {
    width: '100%',
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 14,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
});

export default SocialSkeletonLoader;
