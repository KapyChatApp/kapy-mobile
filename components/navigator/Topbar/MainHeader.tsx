import { View, Text } from "react-native";
import React, { useState } from "react";
import TopBar from "./TopBar";
import SideBar from "../Sidebar/SideBar";
import { bgLight500Dark0 } from "@/styles/theme";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TopBar isOpen={isOpen} setIsOpen={setIsOpen}></TopBar>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen}></SideBar>
    </>
  );
};

export default MainHeader;
