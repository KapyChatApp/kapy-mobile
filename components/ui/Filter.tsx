import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useRef, useState } from "react";
import { FilterProps } from "@/types/filter";
import Icon from "./Icon";
import { IconURL } from "@/constants/IconURL";
import { useClickOutside } from "react-native-click-outside";

const Filter = ({ props }: any) => {
  const [option, setOption] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<View>(() => setIsOpen(false));
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<View | null>(null);
  const handleToggle = () => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setPopoverPosition({ top: py + height, left: px });
      setIsOpen(true);
    });
  };

  return (
    <View className="h-[30px] flex items-center justify-center">
      <View ref={buttonRef} className="flex-1">
        <View>
        <TouchableOpacity
          onPress={handleToggle}
          className="w-[120px] h-[30px] border-[0.5px] border-border rounded-full flex flex-row items-center justify-center"
          style={{ columnGap: 5 }}
        >
          <Text className="text-light-350 dark:text-dark-500 font-helvetica-bold text-12">
            {option? option:"View by"}
          </Text>
          <Icon iconURL={IconURL.show_more_func} size={10} />
        </TouchableOpacity>
        </View>
        {isOpen ? (
          <Modal
            transparent={true}
            visible={isOpen}
            animationType="fade"
            onRequestClose={() => setIsOpen(false)}
          >
            <View ref={ref} className="w-[120px] rounded-xl  bg-light-510 dark:bg-dark-20" style={{top:popoverPosition.top, left:popoverPosition.left}}>
              {props.map((item: any) => (
                <TouchableOpacity key={item.index}
                  className={`w-full h-[40px] flex items-center justify-center ${item.index!=props.length-1? "border-b-[0.5px] border-border":""}`}
                  onPress={() => {
                    setOption(item.label);
                    item.filter();
                    setIsOpen(false);
                  }}
                >
                  <Text
                    className={`text-light-350 dark:text-dark-500 text-center font-helvetica-light`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        ) : (
          "null"
        )}
      </View>
    </View>
  );
};

export default Filter;
