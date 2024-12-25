import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { IconURL } from "@/constants/IconURL";
import { HeadProfileProps } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import Icon from "@/components/ui/Icon";
import Search from "@/components/shared/function/Search";
import { bgLight100Dark0, bgLight500Dark10 } from "@/styles/theme";
import MapStatusForm from "@/components/form/MapStatusForm";
import { LocationProps } from "@/types/location";
import {
  getMyBffMapStatus,
  getMyMapStatus,
  initiateMapStatus,
} from "@/lib/map";
import { MapStatusProps } from "@/types/map";
import UserMarker from "@/components/shared/livemap/UserMarker";
import ImageViewing from "react-native-image-viewing";
import ExpoCamera from "@/components/shared/multimedia/ExpoCamera";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const LiveMap = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationProps>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [localUser, setLocalUser] = useState<HeadProfileProps>();
  const [markerSize, setMarkerSize] = useState<number>(40);
  const [markerBottom, setMarkerBottom] = useState<number>(70);
  const [isMarkerVisible, setIsMarkerVisible] = useState<boolean>(true);
  const [q, setQ] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bffMapStatus, setBffMapStatus] = useState<MapStatusProps[]>([]);
  const [myMapStatus, setMyMapStatus] = useState<MapStatusProps>();
  const [isImageViewingOpen, setIsImageViewingOpen] = useState(false);
  const [imageViewing, setImageViewing] = useState("");

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLocalData = async () => {
      const userString = await AsyncStorage.getItem("user");
      const user = await JSON.parse(userString!);
      setLocalUser(user);
    };

    const getMyMapStatusFUNC = async () => {};

    const getBffMapStatuses = async () => {
      const bffMapStatuses: MapStatusProps[] = await getMyBffMapStatus();
      setBffMapStatus(bffMapStatuses);
    };

    const initiateMap = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied.");
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation({
          latitude: Number(location.coords.latitude),
          longitude: Number(location.coords.longitude),
          altitude: Number(location.coords.altitude),
          accuracy: Number(location.coords.accuracy),
          altitudeAccuracy: Number(location.coords.altitudeAccuracy),
          heading: Number(location.coords.heading),
          speed: Number(location.coords.speed),
        });
        const myMapStatus: MapStatusProps = await getMyMapStatus();
        const myMapStatusWithTrueLocation: MapStatusProps = {
          ...myMapStatus,
          location: location.coords,
        };
        setMyMapStatus(myMapStatusWithTrueLocation);
        console.log("my map data: ", myMapStatusWithTrueLocation);
        await initiateMapStatus(location.coords);
      } catch (error) {
        setErrorMsg("Failed to fetch location.");
      }
    };

    getLocalData();
    initiateMap();
    getMyMapStatusFUNC();
    getBffMapStatuses();
  }, [isFormOpen]);

  const adjustMarkerSizeAndPosition = (region: any) => {
    const zoomLevel = Math.log2(360 / region.latitudeDelta);
    const size = Math.min(Math.max(10, zoomLevel * 3), 60);
    const bottomValue = Math.max(30, Math.min(zoomLevel * 2, 50));

    setIsMarkerVisible(region.latitudeDelta <= 0.6);

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
        <View className="w-10/12">
          <Search onChangeText={setQ} />
        </View>
        <TouchableOpacity
          className="items-center justify-center mr-[4px]"
          onPress={() => setIsFormOpen(true)}
        >
          <Icon iconURL={IconURL.editable} size={30} />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude!,
          longitude: currentLocation.longitude!,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={adjustMarkerSizeAndPosition}
      >
        {isMarkerVisible && bffMapStatus.length != 0
          ? bffMapStatus.map((item, index) => (
              <UserMarker
                key={index}
                {...item}
                markerBottom={markerBottom}
                markerSize={markerSize}
                handleImageViewing={(data) => {
                  setImageViewing(data);
                  setIsImageViewingOpen(true);
                }}
              />
            ))
          : null}
        <UserMarker
          {...myMapStatus}
          markerBottom={markerBottom}
          markerSize={markerSize}
          handleImageViewing={(data) => {
            setImageViewing(data);
            setIsImageViewingOpen(true);
          }}
        /> 
      </MapView>
      <MapStatusForm
        isVisible={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        after={(data: any) => {
          if (data) {
            setMyMapStatus(data);
          } else {
            setMyMapStatus({ ...myMapStatus, caption: "", content: undefined });
          }
        }}
        startLoading={()=>setLoading(true)}
        endLoading={()=>setLoading(false)}
        isLoading={()=>setIsLoading(true)}
        notIsLoading={()=>setIsLoading(false)}
      />
      {isImageViewingOpen ? (
        <ImageViewing
          images={[{ uri: imageViewing }]}
          imageIndex={0}
          visible={isImageViewingOpen}
          onRequestClose={() => setIsImageViewingOpen(false)}
          doubleTapToZoomEnabled={true}
        />
      ) : null}
    {loading? <LoadingSpinner loading={isLoading}/>:null}
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
