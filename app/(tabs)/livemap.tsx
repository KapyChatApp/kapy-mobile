import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { IconURL } from "@/constants/IconURL";
import { HeadProfileProps } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import Icon from "@/components/ui/Icon";
import Search from "@/components/shared/function/Search";
import { bgLight100Dark0, bgLight500Dark10 } from "@/styles/theme";
import CreateMapStatusForm from "@/components/form/CreateMapStatusForm";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const darkModeStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c6e49",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#3e3e3e",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c6e49",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
];

const LiveMap: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [localUser, setLocalUser] = useState<HeadProfileProps>();
  const [markerSize, setMarkerSize] = useState<number>(40); // Kích thước marker
  const [markerBottom, setMarkerBottom] = useState<number>(70); // Giá trị bottom của marker
  const [isMarkerVisible, setIsMarkerVisible] = useState<boolean>(true); // Trạng thái marker
  const [q, setQ] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    if (region.latitudeDelta > 0.6) {
      // Nếu zoom out quá mức (ví dụ: khi latitudeDelta > 0.1)
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
    <View className={`flex-1 ${bgLight500Dark10}`} style={{ rowGap: 8 }}>
      <View className="flex flex-row items-center">
        <View className="w-10/12"><Search onChangeText={setQ}/></View>
        <TouchableOpacity className="items-center justify-center mr-[4px]" onPress={()=>setIsFormOpen(true)}>
          <Icon iconURL={IconURL.editable} size={30}/>
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={adjustMarkerSizeAndPosition} // Gọi khi zoom thay đổi
        customMapStyle={darkModeStyle}
      >
        {isMarkerVisible && ( // Kiểm tra nếu marker được hiển thị
          <Marker coordinate={currentLocation} title="Vị trí của bạn">
            <View style={styles.customMarker} className="">
              <View
                className="flex items-center absolute  h-[70px]"
                style={{ bottom: markerBottom, rowGap: 4 }}
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
      <CreateMapStatusForm isVisible={isFormOpen} onClose={()=>setIsFormOpen(false)}/>
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
