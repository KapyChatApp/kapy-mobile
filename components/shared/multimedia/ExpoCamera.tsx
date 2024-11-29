import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { IconURL } from '@/constants/IconURL';
import Icon from '@/components/ui/Icon';
import { bgLight500Dark10, textLight0Dark500 } from '@/styles/theme';
import CustomButton from '@/components/ui/CustomButton';

const ExpoCamera =({onClose}:{onClose:()=>void})  =>{
  const [facing, setFacing] = useState<CameraType>('back');  
  const [permission, requestPermission] = useCameraPermissions();  

  if (!permission) {

    return <View />;
  }
  if (!permission.granted) {
    return (
      <View className={`flex-1 items-center justify-center ${bgLight500Dark10}`} style={{rowGap:20}}>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>We need your permission to show the camera</Text>
        <CustomButton width={150} height={40} label="Grant Permission" onPress={requestPermission}/>
      </View>
    );
  }

  const toggleCameraFacing = ()=> {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className='flex-1 w-screen h-screen fixed' >
      <CameraView style={styles.camera} facing={facing}>
        <View className='flex flex-row justify-between item-center p-[20px]' >
          <TouchableOpacity onPress={onClose}>
            <Icon iconURL={IconURL.close_single} size={30}/>
          </TouchableOpacity>
           <TouchableOpacity onPress={toggleCameraFacing}>
            <Icon size={30} iconURL={IconURL.change_cam}/>
          </TouchableOpacity></View>
         
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});

export default ExpoCamera;