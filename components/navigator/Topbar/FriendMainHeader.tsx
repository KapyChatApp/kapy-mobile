import { View, Text } from "react-native";
import React, { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import { bgLight500Dark0 } from "@/styles/theme";
import FriendTopBar from "./FriendTopBar";

const FriendMainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FriendTopBar isOpen={isOpen} setIsOpen={setIsOpen}></FriendTopBar>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}></SideBar>
    </>
  );
};

export default FriendMainHeader;
