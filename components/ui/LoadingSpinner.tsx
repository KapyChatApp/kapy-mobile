// LoadingSpinner.js
import { IconURL } from '@/constants/IconURL';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const LoadingSpinner = ({loading}:{loading:boolean}) => {
  const rotation = useSharedValue(0);
  const spinnerScale = useSharedValue(1); // Scale cho spinner
  const tickScale = useSharedValue(0); // Scale cho tick

  // Thiết lập hiệu ứng xoay cho spinner
  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      // Dừng spinner và thu nhỏ về kích thước 0
      spinnerScale.value = withTiming(0, { duration: 300 });
      setTimeout(() => {
        tickScale.value = withTiming(1, { duration: 300 });
      }, 300);
    }
  }, [loading, rotation, spinnerScale, tickScale]);

  // Tạo kiểu dáng animated cho spinner
  const spinnerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value * 360}deg` },
        { scale: spinnerScale.value },
      ],
    };
  });

  // Tạo kiểu dáng cho dấu tick
  const tickStyle = useAnimatedStyle(() => {
    return {
      opacity: loading ? 0 : 1,
      transform: [{ scale: tickScale.value }],
    };
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Animated.View style={[styles.spinner, spinnerStyle]} />
        <Animated.Image
          source={IconURL.tick} // Đường dẫn đến ảnh dấu tick
          style={[styles.tick, tickStyle]} 
          resizeMode="contain" // Để giữ nguyên tỷ lệ của ảnh
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp nền mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)', // Màu nền với độ trong suốt
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  spinner: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: '#F57602',
    borderTopColor: 'transparent',
    borderRadius: 25,
  },
  tick: {
    width: 50, // Chiều rộng của dấu tick
    height: 50, // Chiều cao của dấu tick
    position: 'absolute', // Đặt dấu tick ở vị trí tuyệt đối
  },
});

export default LoadingSpinner;
