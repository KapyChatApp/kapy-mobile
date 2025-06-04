import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styled } from "nativewind";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  callerName: string;
  onAccept: () => void;
  onDecline: () => void;
  avatarUrl?: string; // Tuỳ chọn: có thể truyền ảnh đại diện
};

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);

const IncomingCallOverlay = ({ visible, callerName, onAccept, onDecline, avatarUrl }: Props) => {
  if (!visible) return null;

  return (
    <StyledView className="absolute top-0 left-0 right-0 bottom-0 bg-[#F57206] justify-between items-center pt-24 pb-16 z-50">
      {/* Thông tin người gọi */}
      <StyledView className="items-center">
        <StyledImage
          source={{
            uri: avatarUrl || "https://cdn-icons-png.flaticon.com/512/147/147144.png",
          }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <StyledText className="text-white text-2xl font-bold mb-2">📞 Cuộc gọi đến</StyledText>
        <StyledText className="text-white text-xl">{callerName}</StyledText>
      </StyledView>

      {/* Các nút điều khiển */}
      <StyledView className="flex-row justify-between w-3/5">
        <StyledTouchable
          className="w-16 h-16 bg-red-600 rounded-full justify-center items-center"
          onPress={onDecline}
        >
          <Ionicons name="call" size={26} color="#fff" />
        </StyledTouchable>

        <StyledTouchable
          className="w-16 h-16 bg-green-600 rounded-full justify-center items-center"
          onPress={onAccept}
        >
          <Ionicons name="call" size={26} color="#fff" />
        </StyledTouchable>
      </StyledView>
    </StyledView>
  );
};

export default IncomingCallOverlay;
