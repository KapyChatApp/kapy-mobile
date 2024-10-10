import { View, Text } from "react-native";
import React, { useState } from "react";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { EditablePopoverProps } from "@/types/ui-props";
import { textLight0Dark500 } from "@/styles/theme";

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
  return (
    <View className="">
      <View className="flex flex-row items-center gap-x-[4px]">
        <Text className={`font-helvetica-light text-14 ${textLight0Dark500}`}>
          {label}
        </Text>
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
        className="flex flex-row items-center "
        style={{ width: width, height: height, columnGap: 5 }}
      >
        <View className="flex items-center flex-row flex-1">
          <Popover
            backgroundStyle={{ backgroundColor: "transparent" }}
            arrowSize={{ width: 0, height: 0 }}
            placement={PopoverPlacement.BOTTOM}
            popoverStyle={{ width: 120 }}
            from={
              <TouchableOpacity className="border border-border rounded-full px-[12px]  flex flex-row items-center justify-between h-full w-full flex-1">
                <Text className="text-14 text-border">{data}</Text>
                <Icon iconURL={moreIconURL} size={size}></Icon>
              </TouchableOpacity>
            }
          >
            {values.map((item) => (
              <TouchableOpacity
                className="flex items-center justify-start w-full border-b border-border"
                onPress={() => setData?.(item.name)}
                key={item.index}
              >
                <Text className="font-helvetica-bold text-12 text-border px-[4px] py-[12px]">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </Popover>
        </View>

        <TouchableOpacity>
          <Icon iconURL={IconURL.editable} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditablePopover;
