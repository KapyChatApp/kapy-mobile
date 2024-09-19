import { View, Text } from 'react-native'
import React from 'react'
import SidebarItems from './SidebarItems'
import { IconURL } from '@/constants/IconURL'

const SidebarLinkList = () => {
  return (
    <View className="mt-[10px]">
          <SidebarItems
            label="Groups"
            link="/groups"
            iconURL={IconURL.groups_l}
          ></SidebarItems>
          <SidebarItems
            label="Bestfriends"
            link="/bfs"
            iconURL={IconURL.bff_list_l}
          ></SidebarItems>
          <SidebarItems
            label="Blocked list"
            link="/blocked-list"
            iconURL={IconURL.block_list_l}
          ></SidebarItems>
          <SidebarItems
            label="Security"
            link="/security"
            iconURL={IconURL.security_l}
          ></SidebarItems>
          <SidebarItems
            label="Media"
            link="/media"
            iconURL={IconURL.multimedia_l}
          ></SidebarItems>
          <SidebarItems
            label="IO"
            link="/io"
            iconURL={IconURL.io_l}
          ></SidebarItems>
        </View>
  )
}

export default SidebarLinkList