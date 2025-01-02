import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { IconURL } from "@/constants/IconURL";
import { HeadProfileProps } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserAvatarLink from "@/components/ui/UserAvatarLink";
import Icon from "@/components/ui/Icon";
import Search from "@/components/shared/function/Search";
import {
  bgLight100Dark0,
  bgLight500Dark10,
  textLight0Dark500,
} from "@/styles/theme";
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
import { Camera } from "expo-camera";
import { useCamera } from "@/context/CameraContext";
import CustomButton from "@/components/ui/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import UserAvatar from "@/components/ui/UserAvatar";
import { getMyBFFs } from "@/lib/my-bff";
import { pusherClient } from "@/lib/pusher";
import { push } from "expo-router/build/global-state/routing";
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
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState("");
  const { openCamera, closeCamera, photoUri } = useCamera();
  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef<MapView | null>(null);

  const [caption, setCaption] = useState("");
  const [keepOldContent, setKeepOldContent] = useState(true);

  const focusToLocation = (latitude: number, longitude: number) => {
    console.log("here");
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const searchBffsMapStatus = () => {
    const lowerCaseQuery = q.toLowerCase();
    return (
      bffMapStatus.filter((status) => {
        const fullName =
          `${status.createBy?.firstName} ${status.createBy?.lastName}`.toLowerCase();
        const reverseFullName =
          `${status.createBy?.lastName} ${status.createBy?.firstName}`.toLowerCase();

        return (
          status.createBy?.firstName?.toLowerCase().includes(lowerCaseQuery) ||
          status.createBy?.lastName?.toLowerCase().includes(lowerCaseQuery) ||
          fullName.includes(lowerCaseQuery) ||
          reverseFullName.includes(lowerCaseQuery)
        );
      }) || []
    );
  };

  useEffect(() => {
    const getLocalData = async () => {
      const userString = await AsyncStorage.getItem("user");
      const user = await JSON.parse(userString!);
      setLocalUser(user);
      const bffs = await getMyBFFs();
      for (const bff of bffs) {
        pusherClient.subscribe(`private-${bff._id}`);
      }
    };

    // pusherClient.bind("map-status", async(data: any) => {
    //   await getBffMapStatuses();
    //   });

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
        await initiateMapStatus(location.coords);
      } catch (error) {
        setErrorMsg("Failed to fetch location.");
      }
    };

    getLocalData();
    initiateMap();
    getBffMapStatuses();
    if (photoUri !== "") {
      setIsFormOpen(true);
    }
  }, [isFormOpen, photoUri, reload]);

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
        <View className="w-10/12 items-center justify-center flex">
          <Search onChangeText={setQ} value={q} />
        </View>
        <View className="flex items-center justify-center">
          <TouchableOpacity
            className="items-center justify-center mr-[4px]"
            onPress={() => setIsFormOpen(true)}
          >
            <Icon iconURL={IconURL.editable} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        ref={mapRef}
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
      {isFormOpen ? (
        <MapStatusForm
          isVisible={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          after={(data: any) => {
            if (data) {
              setMyMapStatus(data);
            } else {
              setMyMapStatus({
                ...myMapStatus,
                caption: undefined,
                content: undefined,
              });
            }
            setReload(true);
          }}
          startLoading={() => setLoading(true)}
          endLoading={() => setLoading(false)}
          isLoading={() => setIsLoading(true)}
          notIsLoading={() => setIsLoading(false)}
          caption={caption}
          setCaption={setCaption}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
          keepOldContent={keepOldContent}
          setKeepOldContent={setKeepOldContent}
        />
      ) : null}

      {isImageViewingOpen ? (
        <ImageViewing
          images={[{ uri: imageViewing }]}
          imageIndex={0}
          visible={isImageViewingOpen}
          onRequestClose={() => setIsImageViewingOpen(false)}
          doubleTapToZoomEnabled={true}
        />
      ) : null}
      {loading ? <LoadingSpinner loading={isLoading} /> : null}
      {isCameraOpen ? (
        <View className="flex-1 absolute w-full h-full z-[50]">
          <ExpoCamera
            onClose={() => {
              setIsCameraOpen(false);
              closeCamera();
            }}
            setSelectedMedia={setSelectedMedia}
          />
        </View>
      ) : null}
      {q !== "" ? (
        <View className="absolute max-h-[300px] w-screen top-[48px]">
          <ScrollView>
            {searchBffsMapStatus().map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`${bgLight500Dark10} flex flex-row items-center py-[12px] px-[30px]`}
                style={{ columnGap: 10 }}
                onPress={() => {
                  setQ("");
                  focusToLocation(
                    item.location?.latitude!,
                    item.location?.longitude!
                  );
                }}
              >
                <UserAvatar
                  avatarURL={{ uri: item.createBy?.avatar }}
                  size={40}
                />
                <Text
                  className={`${textLight0Dark500} font-helvetica-bold text-12`}
                >
                  {item.createBy?.firstName + " " + item.createBy?.lastName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <View className="absolute right-[10px] bottom-[10px]" style={{rowGap:8}}>
         <TouchableOpacity
          className={`w-[50px] h-[50px] ${bgLight500Dark10} rounded-xl items-center justify-center`}
          onPress={
            async () => { const bffMap = await getMyBffMapStatus();  setBffMapStatus(bffMap); } 
          }
        >
          <Icon iconURL={IconURL.reload_orange} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-[50px] h-[50px] ${bgLight500Dark10} rounded-xl items-center justify-center`}
          onPress={() =>
            focusToLocation(
              currentLocation.latitude!,
              currentLocation.longitude!
            )
          }
        >
          <Icon iconURL={IconURL.pin_myself} size={30} />
        </TouchableOpacity>
      </View>
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
