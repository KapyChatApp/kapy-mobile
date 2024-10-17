import { View, Text } from "react-native";
import React from "react";

const ReplyTree = ({ isReply }: { isReply: boolean }) => {
    return (
        <View
        style={{
          width: 1,
          backgroundColor: "#ccc",
          marginLeft: 20,
          marginTop: isReply ? 20 : 0, // Thay đổi marginTop ở đây
          marginBottom: 10,
          marginRight:10
        }}
      />
    );
  };

export default ReplyTree;
