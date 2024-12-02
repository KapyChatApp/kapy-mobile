import { View, Text, Modal, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { EditablePopoverProps } from "@/types/ui-props";
import { textLight0Dark500 } from "@/styles/theme";
import { useClickOutside } from "react-native-click-outside";
import { capitalizeFirstLetter } from "@/utils/Text";

const EditablePopover = ({
  label,
  placeHolder,
  width,
  height,
  values,
  data,
  setData,
  moreIconURL,
  size,
}: EditablePopoverProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const ref = useClickOutside<View>(() => setIsPopoverOpen(false));
  const buttonRef = useRef<View | null>(null);

  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleToggle = () => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setPopoverPosition({ top: py + height, left: px });
      setIsPopoverOpen(true);
    });
  };
  return (
    <View className="">
      <View className="flex flex-row items-center gap-x-[4px]">
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          {label}
        </Text>
        <View className="w-[68px] h-[26px]"></View>
      </View>
      <View
        className="flex flex-row items-center "
        style={{ width: width, height: height, columnGap: 5 }}
      >
        <View className="flex items-center flex-row flex-1">
          <TouchableOpacity onPress={handleToggle} className="flex-1">
            <View ref={buttonRef} className="border border-border rounded-full px-[12px]  flex flex-row items-center justify-between h-full w-full flex-1">
              <Text className="text-14 text-border">{typeof data ==="boolean" ? (data? "Male":"Female"):capitalizeFirstLetter(data)}</Text>
              <Icon iconURL={moreIconURL} size={size}></Icon>
            </View>
          </TouchableOpacity>
          {isPopoverOpen ? (
            <Modal
              transparent={true}
              visible={isPopoverOpen}
              animationType="fade"
              onRequestClose={() => setIsPopoverOpen(false)}
            >
              <View ref={ref} className="absolute rounded-xl bg-light-510 dark:bg-dark-20" style={{top:popoverPosition.top, left: popoverPosition.left}} >
                {values.map((item)=> <TouchableOpacity
                key={item.index}
                  className={`w-[150px]  h-[50px] flex items-center justify-center ${item.index != values.length-1?  "border-b-[0.5px] border-border": ""}`}
                  onPress={() => {
                    setIsPopoverOpen(false);
                    setData?.(item.value);
                  }}
          
                >
                  <Text
                    className={`${textLight0Dark500} font-helvetica-light text-14 text-center`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>)}
             
              </View>
            </Modal>
          ) : null}
        </View>

        <TouchableOpacity>
          <Icon iconURL={IconURL.editable} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditablePopover;
