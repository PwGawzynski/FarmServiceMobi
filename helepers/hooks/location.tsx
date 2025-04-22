import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { PermissionStatus } from 'expo-location';

export function useLocation() {
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);

  const requestPermission = async () => {
    if (permissionStatus !== PermissionStatus.GRANTED) {
      console.log('res/');
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
    }
  };

  const requestCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      return location;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  return { permissionStatus, requestCurrentLocation, requestPermission };
}
