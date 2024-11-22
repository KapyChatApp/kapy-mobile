import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { textLight0Dark500 } from "@/styles/theme";
import { addBFF } from "@/lib/add-request";
import { unBFF } from "@/lib/un-request";
import { acceptBFF } from "@/lib/accept-request";

const UnblockPostView = ({
  friendId,
  relation,
  lastName,
  reload,
}: {
  friendId: string;
  relation: string | undefined;
  lastName: string | undefined;
  reload: () => void;
}) => {
  const [sent, setSent] = useState<boolean>(
    relation === "received_bff" ? true : false
  );
  const [unSent, setUnSent] = useState<boolean>(false);
  return (
    <View
      className={`flex items-center justify-center ${
        Platform.OS === "ios" ? "top-[180px] " : "top-[200px]"
      } mb-[200px]`}
      style={{ rowGap: 26 }}
    >
      <View className="flex flex-row">
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          You have to be their{" "}
        </Text>
        <Link href="/">
          <Text className="text-specialRelation font-helvetica-bold text-14 underline">
            BestFriend
          </Text>
        </Link>
        <Text className={`${textLight0Dark500} font-helvetica-light text-14`}>
          {" "}
          to see their posts!
        </Text>
      </View>
      {relation === "received_bff" ? (
        <View
          className="flex items-center justify-center"
          style={{ rowGap: 10 }}
        >
          <CustomButton
            type={true}
            label="Accept"
            width={200}
            height={62}
            onPress={async () =>
              await acceptBFF(friendId, () => {
                setSent(true);
                reload();
              })
            }
          />
          <View
            className="flex flex-row items-center justify-center"
            style={{ columnGap: 5 }}
          >
            <Text className="text-specialRelation text-14 font-helvetica-bold">
              {lastName}
            </Text>
            <Text
              className={`${textLight0Dark500} text-14 font-helvetica-light`}
            >
              sent a Bestfriend request to you
            </Text>
          </View>
        </View>
      ) : !unSent && relation === "sent_bff" ? (
        <CustomButton
          type={true}
          label="Requested"
          width={200}
          height={62}
          onPress={async () => await unBFF(friendId, () => setUnSent(true))}
        />
      ) : (
        <CustomButton
          type={true}
          label="Send Bestfriend request"
          width={200}
          height={62}
          onPress={async () => await addBFF(friendId, () => setSent(false))}
        />
      )}
    </View>
  );
};

export default UnblockPostView;
