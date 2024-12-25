import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatBubble = ({ message }: any) => {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatBubble}>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.mui} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    alignItems: "flex-start", // Đặt các ô chat theo chiều dọc
    marginVertical: 5, // Khoảng cách giữa các ô chat
  },
  chatBubble: {
    position: "relative",
    backgroundColor: "#F57602", // Màu nền của ô chat
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10, // Góc bo tròn
    maxWidth: 300, // Độ rộng tối đa của ô chat
  },
  text: {
    color: "white", // Màu chữ trắng
    fontSize: 16,
  },
  mui: {
    position: "absolute",
    bottom: -10,
    left: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#F57602", // Màu của mui nhọn cùng màu với nền ô chat
  },
});

export default ChatBubble;
