import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { bgLight500Dark10 } from "@/styles/theme";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { synchronizeData } from "@/lib/local";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";

const SyncDataPage = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSyncData = async () => {
    try {
      const sync = await synchronizeData(
        () => setLoading(true),
        () => setLoading(false)
      );
      if (sync) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "(tabs)" }],
          })
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Failed to sync your data",
        "",
        [{ text: "OK", onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    }
  };
  useEffect(() => {
    handleSyncData();
  }, []);
  return (
    <View className={`flex-1 ${bgLight500Dark10}`}>
      {loading ? <LoadingSpinner loading={loading} fullScreen={true} title="Synchronizing your data..."/> : null}
    </View>
  );
};

export default SyncDataPage;
