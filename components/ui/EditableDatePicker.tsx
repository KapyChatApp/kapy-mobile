 import { View, Text, Button, Platform, Image } from 'react-native'
 import React, { useState } from 'react'
import Popover, { PopoverPlacement } from 'react-native-popover-view'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from './Icon'
import { IconURL } from '@/constants/IconURL'
import { EditabelDatePickerProps } from '@/types/ui-props'
import DatePicker from 'react-native-date-picker'
import DateTimePicker from 'react-native-ui-datepicker'
 
 const EditableDatePicker = ({
  label,
  placeHolder,
  width,
  height,
  data,
  setData,
}: EditabelDatePickerProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
   return (
    <View>
    <View className="w-full flex flex-row items-center gap-x-[4px]">
      <Text className="font-helvetica-light text-14">{label}</Text>
      <View className="w-[68px] h-[26px]">
        <Popover
          offset={0}
          popoverShift={{ x: 0, y: 0 }}
          backgroundStyle={{ backgroundColor: "transparent" }}
          arrowSize={{ width: 0, height: 0 }}
          placement={PopoverPlacement.BOTTOM}
          from={
            <TouchableOpacity className="border border-border rounded-full p-[2px]  flex flex-row items-center justify-center">
              <Text className="font-helvetica-bold text-12 text-border ">
                {isPrivate ? "Private" : "Public"}
              </Text>
              <Icon iconURL={IconURL.show_more_func} size={10}></Icon>
            </TouchableOpacity>
          }
        >
          <TouchableOpacity
            className="flex items-center justify-start w-[68px] border-b border-border"
            onPress={() => setIsPrivate?.(false)}
          >
            <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
              Public
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-start w-[68px]"
            onPress={() => setIsPrivate?.(true)}
          >
            <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
              Private
            </Text>
          </TouchableOpacity>
        </Popover>
      </View>
    </View>
    <View
      className="flex items-center flex-row  w-full"
      style={{ width: width, height: height, columnGap: 5 }}
    > 
           {Platform.OS==="android"? (
             <DatePicker
             modal
             open={open}
             date={date}
             onConfirm={(date) => {
               setOpen(false)
               setDate(date)
             }}
             onCancel={() => {
               setOpen(false)
             }}
           />
           ) :(

            <TextInput
            className="rounded-full border border-border font-helvetica-light text-14 px-[12px] flex-1 w-full h-full"
   
            placeholder={placeHolder}

          >
        
          </TextInput>
           )}
     
        <TouchableOpacity >
          <Icon iconURL={IconURL.editable} size={18} />
        </TouchableOpacity>
    </View>
  </View>
   )
 }
 
 export default EditableDatePicker