import { View, Text } from "react-native";
import React from "react";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import { textLight0Dark500 } from "@/styles/theme";
import Icon from "@/components/ui/Icon";
import { IconURL } from "@/constants/IconURL";
import { RateProps } from "@/types/rate";
import { formatDateDistance } from "@/utils/DateFormatter";

const renderCarrot = (point: number) => {
  const fullCarrots = Math.floor(point / 10);
  const remainder = point % 10;

  const carrots = [];
  for (let i = 0; i < fullCarrots; i++) {
    carrots.push(
      <Icon key={`carrot-full-${i}`} iconURL={IconURL.carrot} size={15} />
    );
  }

  if (remainder > 0) {
    carrots.push(
      <View
        key="carrot-partial"
        style={{
          width: `${(remainder / 10) * 100}%`,
          overflow: "hidden",
        }}
      >
        <Icon iconURL={IconURL.carrot} size={15} />
      </View>
    );
  }

  return <View style={{ flexDirection: "row", columnGap: 5 }}>{carrots}</View>;
};

const Rate = (props: RateProps) => {
  return (
    <View
      className={`border-border  border rounded-3xl flex flex-row py-[10px] px-[12px] flex-1`}
      style={{ columnGap: 10 }}
    >
      <View className="absolute -top-[8px] -left-[8px]">
        <Icon size={26} iconURL={props.point>=50?IconURL.lettuce_l:IconURL.lettuce_d} />
      </View>
      <View>
        <UserAvatarLink
          avatarURL={{ uri: props.user.avatar }}
          userId={props.user._id}
          size={49}
        />
        <Text className="text-light-330 font-helvetica-light text-10">
          {formatDateDistance(props.createAt)}
        </Text>
      </View>
      <View className="flex flex-1 " style={{ rowGap: 4 }}>
        <Text className={`font-helvetica-bold text-14 ${textLight0Dark500}`}>
          {props.user.firstName + " " + props.user.lastName}
        </Text>
        <Text className="font-helvetica-bold text-14 text-cardinal">
          {props.point}
        </Text>
        <View className="flex flex-row" style={{ columnGap: 5 }}>
          {renderCarrot(props.point)}
        </View>
        <View className="flex flex-row">
          <Text
            className={`${textLight0Dark500} font-helvetica-light text-12 flex-1 flex-wrap`}
          >
            {props.message}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Rate;
