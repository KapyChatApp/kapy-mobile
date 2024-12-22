import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { IconURL } from '@/constants/IconURL'; // Đường dẫn đến icon tùy chỉnh của bạn

// Định nghĩa kiểu dữ liệu cho vị trí
interface LocationCoords {
  latitude: number;
  longitude: number;
}

const LiveMap: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        // Kiểm tra quyền truy cập vị trí
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied.');
          return;
        }

        // Lấy vị trí hiện tại
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('Failed to fetch location.');
      }
    };

    getCurrentLocation();
  }, []);

  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{errorMsg || 'Đang tải vị trí hiện tại...'}</Text>
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
          latitudeDelta: 0.01, // Độ phóng to bản đồ
          longitudeDelta: 0.01,
        }}
      >
        {/* Marker cho vị trí hiện tại */}
        <Marker
          coordinate={currentLocation}
          title="Vị trí của bạn"
          description="Bạn đang ở đây"
        >
          <View style={styles.customMarker}>
            <Image
              source={IconURL.location_l} // Icon tùy chỉnh của bạn
              style={styles.markerImage}
            />
            <Text style={styles.markerText}>My Location</Text>
          </View>
        </Marker>

        {/* Polyline mẫu (nếu muốn vẽ đường) */}
        <Polyline
          coordinates={[
            currentLocation,
            {
              latitude: currentLocation.latitude + 0.01,
              longitude: currentLocation.longitude + 0.01,
            },
          ]}
          strokeColor="#FF0000"
          strokeWidth={4}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarker: {
    alignItems: 'center',
  },
  markerImage: {
    width: 30,
    height: 30,
  },
  markerText: {
    color: 'black',
    fontSize: 12,
    marginTop: 4,
  },
});

export default LiveMap;
