import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { IconURL } from "@/constants/IconURL";
import { HeadProfileProps } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import Icon from "@/components/ui/Icon";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const LiveMap: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [localUser, setLocalUser] = useState<HeadProfileProps>();
  const [markerSize, setMarkerSize] = useState<number>(40); // Kích thước marker
  const [markerBottom, setMarkerBottom] = useState<number>(70); // Giá trị bottom của marker
  const [isMarkerVisible, setIsMarkerVisible] = useState<boolean>(true); // Trạng thái marker

  useEffect(() => {
    const getLocalData = async () => {
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString!);
      setLocalUser(user);
    };

    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied.");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg("Failed to fetch location.");
      }
    };

    getLocalData();
    getCurrentLocation();
  }, []);

  // Điều chỉnh kích thước và vị trí marker theo zoom level
  const adjustMarkerSizeAndPosition = (region: any) => {
    const zoomLevel = Math.log2(360 / region.latitudeDelta); // Công thức tính zoom chính xác hơn
    const size = Math.max(20, Math.min(zoomLevel * 10, 50)); // Giới hạn kích thước từ 20 đến 50

    // Điều chỉnh bottom tuyến tính khi zoom out
    const bottomValue = Math.max(30, Math.min(zoomLevel * 2, 50)); // Bottom giảm dần khi zoom out theo tỷ lệ zoom

    // Điều chỉnh trạng thái hiển thị marker khi zoom out
    if (region.latitudeDelta > 0.6) { // Nếu zoom out quá mức (ví dụ: khi latitudeDelta > 0.1)
      setIsMarkerVisible(false); // Ẩn marker
    } else {
      setIsMarkerVisible(true); // Hiển thị marker
    }

    setMarkerSize(size);
    setMarkerBottom(bottomValue);
  };

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{errorMsg || "Đang tải vị trí hiện tại..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={adjustMarkerSizeAndPosition} // Gọi khi zoom thay đổi
      >
        {isMarkerVisible && ( // Kiểm tra nếu marker được hiển thị
          <Marker coordinate={currentLocation} title="Vị trí của bạn">
            <View style={styles.customMarker} className="">
              <View
                className="flex items-center absolute  h-[70px]"
                style={{ bottom: markerBottom,rowGap:4 }}
              >
                <UserAvatarLink
                  avatarURL={{ uri: localUser?.avatar }}
                  size={markerSize} // Sử dụng kích thước tự động
                  userId={localUser?._id}
                />
                <View className="bg-cardinal flex flex-row p-[5px] rounded-lg absolute top-[55px] min-w-[140px]">
                  <Text className="text-white font-helvetica-bold text-10 text-center w-full">
                    {localUser?.firstName + " " + localUser?.lastName}
                  </Text>
                </View>
              </View>
              <Icon iconURL={IconURL.marker} size={markerSize / 2} />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  customMarker: {
    alignItems: "center",
  },
});

export default LiveMap;
