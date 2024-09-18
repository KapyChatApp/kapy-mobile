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
      <View>
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          className="flex right-[22px] top-[6px] items-center justify-center border border-border w-[104px] h-[18px] rounded-full z-20"
        >
          <Text className="text-12 font-helvetica-bold text-deny text-center">
            View by
          </Text>
        </TouchableOpacity>
        {isOpen ? (
          <View className="absolute bg-white z-50 right-[22px] top-[25px]">
            <TouchableOpacity
              className="flex items-center justify-center p-[8px] border border-border"
              onPress={filter1}
            >
              <Text className="text-10 font-helvetica-light">Only Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center justify-center p-[8px] border border-border"
              onPress={filter2}
            >
              <Text className="text-10 font-helvetica-light">
                Only Bestfriends
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center justify-center p-[8px] border border-border"
              onPress={filter3}
            >
              <Text className="text-10 font-helvetica-light">Alphabet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center justify-center p-[8px] border border-border"
              onPress={filter4}
            >
              <Text className="text-10 font-helvetica-light">
                Time increasing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center justify-center p-[8px] border border-border"
              onPress={filter5}
            >
              <Text className="text-10 font-helvetica-light">
                Time decreasing
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
  );
};

export default FriendFilter;
