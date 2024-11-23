import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Previous from "@/components/ui/Previous";
import { useNavigation } from "expo-router";
import { bgLight500Dark10, textLight0Dark500 } from "@/styles/theme";
import Rate from "@/components/shared/community/Rate";
import { RateProps } from "@/types/rate";
import { deleteRate, editRate, getRatesOfUser } from "@/lib/rate";
import { useLocalSearchParams } from "expo-router/build/hooks";
import CustomButton from "@/components/ui/CustomButton";
import { IconURL } from "@/constants/IconURL";
import RateForm from "@/components/form/RateForm";
import { getLocalAuth } from "@/lib/local-auth";
import EditRateForm from "@/components/form/EditRateForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const AllFriendRatePage = () => {
  const { userId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [rates, setRates] = useState<RateProps[]>();
  const [isRateFormOpen, setIsRateFormOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [editRateId, setEditRateId] = useState("");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editPoint, setEditPoint] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [deletePoint, setDeletePoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllRatesFUNC = async () => {
      const { _id } = await getLocalAuth();
      const result = await getRatesOfUser(userId.toString());
      const rates = result.map((rate: RateProps) => ({
        ...rate,
        localUserId: _id,
      }));
      console.log(rates);
      setRates(rates);
    };
    getAllRatesFUNC();
  }, [reload]);

  const handleDelete = async (pointId: string) => {
    await deleteRate(
      pointId,
      () => setLoading(true),
      () => setLoading(false),
      () => setIsLoading(true),
      () => setIsLoading(false),
      () => setReload(true)
    );
  };
  return (
    <SafeAreaView className={` ${bgLight500Dark10} flex-1`}>
      <View className="mt-[10px] mx-[10px] flex flex-row justify-between items-center">
        <Previous navigation={navigation} isAbsolute={false} />
        <CustomButton
          width={100}
          height={40}
          label="Rate"
          onPress={() => setIsRateFormOpen(true)}
        />
      </View>
      {isRateFormOpen ? (
        <RateForm
          userId={userId.toString()}
          onClose={() => setIsRateFormOpen(false)}
          setReload={() => setReload(true)}
        />
      ) : null}
      {isEditFormOpen ? (
        <EditRateForm
          pointId={editRateId}
          onClose={() => setIsEditFormOpen(false)}
          setReload={() => setReload(true)}
          defaultMessage={editMessage}
          defaultPoint={Number.parseInt(editPoint)}
        />
      ) : null}
      <ScrollView className="p-[16px]" contentContainerStyle={{ rowGap: 8 }}>
        {rates?.map((item) => (
          <Rate
            key={item._id}
            {...item}
            setEditRateId={setEditRateId}
            setIsEditFormOpen={() => setIsEditFormOpen(true)}
            setEditMessage={setEditMessage}
            setEditPoint={setEditPoint}
            handleDelete={handleDelete}
          />
        ))}
      </ScrollView>
      {loading ? <LoadingSpinner loading={isLoading} /> : null}
    </SafeAreaView>
  );
};

export default AllFriendRatePage;
