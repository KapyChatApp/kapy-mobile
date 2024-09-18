import { View, Text } from "react-native";
import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const FriendFilter = ({
  isOpen,
  setIsOpen,
  filter1,
  filter2,
  filter3,
  filter4,
  filter5,
}: any) => {
  const setClosed = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };
  return (
    <View className="relative z-20">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex right-[22px] top-[6px] items-center justify-center border border-border w-[90px] h-[22px] rounded-full z-20"
      >
        <Text className="text-14  font-helvetica-bold text-deny text-center">
          View by
        </Text>
      </TouchableOpacity>
      {isOpen ? (
        <View className="absolute bg-white z-10 right-[22px] top-[30px]">
          <TouchableOpacity
            className="flex items-center justify-center p-[12px] border border-border"
            onPress={filter1}
          >
            <Text className="text-12 font-helvetica-light">Only Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center p-[12px] border border-border"
            onPress={filter2}
          >
            <Text className="text-12 font-helvetica-light">
              Only Bestfriends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center p-[12px] border border-border"
            onPress={filter3}
          >
            <Text className="text-12 font-helvetica-light">Alphabet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center p-[12px] border border-border"
            onPress={filter4}
          >
            <Text className="text-12 font-helvetica-light">
              Time increasing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex items-center justify-center p-[12px] border border-border"
            onPress={filter5}
          >
            <Text className="text-12 font-helvetica-light">
              Time decreasing
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default FriendFilter;
