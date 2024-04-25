import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReactNode, useState } from 'react';
import { Card, SizableText } from 'tamagui';
import { UserLocationI } from './TaskWorkView';
import {
  MAP_ANIMATION_DURATION,
  MAP_DEF_LAT_DELTA,
  MAP_DEF_LONG_DELTA,
} from '../../settings/map/defaults';

export interface MapContainerProps {
  scaleUp?: boolean;
  initialCords: {
    latitude: number;
    longitude: number;
  };
  Marker: ReactNode;
  mapRef: React.RefObject<MapView>;
}

export function MapContainer({
  scaleUp,
  initialCords,
  Marker,
  mapRef,
}: MapContainerProps) {
  const scale = useSharedValue(1);
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const position = useSharedValue(0);
  const positionStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));
  const initialState = {
    latitude: Number(initialCords.latitude) || 37.78825,
    longitude: Number(initialCords.longitude) || -122.4324,
    latitudeDelta: MAP_DEF_LAT_DELTA,
    longitudeDelta: MAP_DEF_LONG_DELTA,
  };

  if (scaleUp) {
    scale.value = withTiming(1.6, { duration: MAP_ANIMATION_DURATION });
    position.value = withTiming(-40, { duration: MAP_ANIMATION_DURATION });
  } else {
    scale.value = withTiming(1, { duration: MAP_ANIMATION_DURATION });
    position.value = withTiming(0, { duration: MAP_ANIMATION_DURATION });
  }

  const [userLocation, setUserLocation] = useState<UserLocationI | null>(null);

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: 10,
          },
          positionStyle,
        ]}
      >
        <Card
          p="$2"
          m="$2"
          bordered
          bg="$color1"
          position="absolute"
          zIndex={10}
        >
          <SizableText className=" font-bold text-green">
            {userLocation?.speed !== undefined && userLocation.speed >= 0
              ? userLocation?.speed?.toFixed(0)
              : 0}{' '}
            km/h
          </SizableText>
          <SizableText fontSize={8} className="mt-[2] font-bold text-dark-gray">
            AC: {userLocation?.accuracy?.toFixed(2)} M
          </SizableText>
        </Card>
      </Animated.View>
      <Animated.View style={[{ flex: 1 }, scaleStyle]}>
        <MapView
          showsUserLocation
          ref={mapRef}
          onUserLocationChange={e =>
            setUserLocation({ ...e.nativeEvent.coordinate })
          }
          shouldRasterizeIOS
          initialRegion={initialState}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={{
            flex: 1,
            borderRadius: 20,
          }}
          followsUserLocation
          mapType="satellite"
          showsCompass={false}
        >
          {Marker}
        </MapView>
      </Animated.View>
    </>
  );
}
