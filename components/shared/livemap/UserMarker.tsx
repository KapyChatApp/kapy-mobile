import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { MapStatusProps } from "@/types/map";
import { Callout, CalloutSubview, Marker } from "react-native-maps";
import Icon from "@/components/ui/Icon";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { IconURL } from "@/constants/IconURL";
import ChatBubble from "@/components/ui/ChatBubble";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import UserAvatar from "@/components/ui/UserAvatar";
import { useClickOutside } from "react-native-click-outside";
import { clamp } from "@/utils/Number";

const UserMarker = (props: MapStatusProps) => {
  const { markerSize } = props;
  const [isNameLabelOpen, setIsNameLabelOpen] = useState(false);
  return (
    <Marker
      coordinate={{
        latitude: Number(props.location?.latitude),
        longitude: Number(props.location?.longitude),
      }}
      onPress={() => props.handleImageViewing?.(props.content?.url)}
    >
      <View className="flex items-center">
        <View
          className="absolute "
          style={{
            bottom: clamp(
              markerSize! * 3,
              markerSize! * 3 + 20,
              markerSize! * 3 - 10
            ),
          }}
        >
              <TouchableOpacity
                onPress={() => props.handleImageViewing?.(props.content?.url)}
              >
                <Image
                  className="rounded-2xl"
                  width={markerSize! * 3}
                  height={markerSize! * 3}
                  source={{ uri: props.content?.url }}
                />
              </TouchableOpacity>
        </View>
        {props.caption !== "" && props.caption ? (
          <View
            className={`absolute p-[5px] ${bgLight500Dark10} border-cardinal border-2 rounded-md `}
            style={{
              width: markerSize! * 4 - 60,
              bottom: markerSize! + 4.2 * (markerSize! / 4),
            }}
          >
            <Text
              className="font-helvetica-bold text-cardinal"
              style={{ fontSize: markerSize! / 4 }}
            >
              {props.caption}
            </Text>
          </View>
        ) : null}

        <View
          className={`absolute w-[${
            markerSize! * 200
          }px] p-[5px] bg-cardinal rounded-md `}
          style={{
            bottom: markerSize! / 4 + 2,
            width: markerSize! * 2,
          }}
        >
          <Text
            numberOfLines={1}
            className="text-white font-helvetica-bold text-center"
            style={{ fontSize: markerSize! / 3.6 }}
          >
            {props.createBy?.lastName}
          </Text>
        </View>

        <View
          className="absolute"
          style={{ bottom: markerSize! / 4 + 3 * (markerSize! / 4) }}
          pointerEvents="box-none"
        >
          <UserAvatar
            avatarURL={{ uri: props.createBy?.avatar }}
            size={markerSize}
            userId={props.createBy?._id}
          />
        </View>
        <Icon iconURL={IconURL.marker} size={markerSize! / 4} />
      </View>
    </Marker>
  );
};

export default UserMarker;

const styles = StyleSheet.create({
  customMarker: {
    alignItems: "center",
    position: "relative",
  },
  markerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 5,
  },
  nameContainer: {
    backgroundColor: "#F57602", // Color of name background
    padding: 5,
    borderRadius: 10,
    minWidth: 140, // Fixed width for the name background, not affected by markerSize
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    color: "white",
    fontSize: 10, // Fixed font size, not affected by markerSize
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
  },
});
