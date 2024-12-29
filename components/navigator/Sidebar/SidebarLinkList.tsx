import { View, Text } from "react-native";
import React from "react";
import SidebarItems from "./SidebarItems";
import { IconURL } from "@/constants/IconURL";
import { useTheme } from "@/context/ThemeProviders";
import Icon from "@/components/ui/Icon";

const SidebarLinkList = ({ onClose }: any) => {
  const { theme } = useTheme();
  return (
    <View className="mt-[10px]">
      <SidebarItems
        label="Groups"
        link="/(mine)/my-groups"
        iconURL={theme === "light" ? IconURL.groups_l : IconURL.groups_d}
        onClose={onClose}
      ></SidebarItems>
      <SidebarItems
        label="Bestfriends"
        link="/(mine)/bff-list"
        iconURL={theme === "light" ? IconURL.bff_list_l : IconURL.bff_list_d}
        onClose={onClose}
      ></SidebarItems>
      <SidebarItems
        label="Blocked list"
        link="/(mine)/blocked-list"
        iconURL={
          theme === "light" ? IconURL.block_list_l : IconURL.block_list_d
        }
        onClose={onClose}
      ></SidebarItems>
      <SidebarItems
        label="My request"
        link="/(tabs)/friends/all-request"
        iconURL={theme === "light" ? IconURL.addmem_l : IconURL.addmem_d}
        onClose={onClose}
      ></SidebarItems>
      <SidebarItems
        label="Media"
        link="/my-multimedia"
        iconURL={
          theme === "light" ? IconURL.multimedia_l : IconURL.multimedia_d
        }
        onClose={onClose}
      ></SidebarItems>
      <SidebarItems
        label="IO"
        link="/io"
        iconURL={theme === "light" ? IconURL.io_l : IconURL.io_d}
        onClose={onClose}
      ></SidebarItems>
    </View>
  );
};

export default SidebarLinkList;
