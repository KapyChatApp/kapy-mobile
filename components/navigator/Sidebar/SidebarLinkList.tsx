import { View, Text } from "react-native";
import React from "react";
import SidebarItems from "./SidebarItems";
import { IconURL } from "@/constants/IconURL";
import { useTheme } from "@/context/ThemeProviders";
import Icon from "@/components/ui/Icon";

const SidebarLinkList = () => {
  const { theme } = useTheme();
  return (
    <View className="mt-[10px]">
      <SidebarItems
        label="Groups"
        link="/friends/my-groups"
        iconURL={theme === "light" ? IconURL.groups_l : IconURL.groups_d}
      ></SidebarItems>
      <SidebarItems
        label="Bestfriends"
        link="/(mine)/bff-list"
        iconURL={theme === "light" ? IconURL.bff_list_l : IconURL.bff_list_d}
      ></SidebarItems>
      <SidebarItems
        label="Blocked list"
        link="/(mine)/blocked-list"
        iconURL={
          theme === "light" ? IconURL.block_list_l : IconURL.block_list_d
        }
      ></SidebarItems>
      <SidebarItems
        label="Security"
        link="/friends/invite-group"
        iconURL={theme === "light" ? IconURL.security_l : IconURL.security_d}
      ></SidebarItems>
      <SidebarItems
        label="Media"
        link="/my-multimedia"
        iconURL={
          theme === "light" ? IconURL.multimedia_l : IconURL.multimedia_d
        }
      ></SidebarItems>
      <SidebarItems label="IO" link="/io" iconURL={theme==="light"? IconURL.io_l:IconURL.io_d}></SidebarItems>
    </View>
  );
};

export default SidebarLinkList;
