import { Alert } from 'react-native';
import { LocationObject } from 'expo-location';
import { OpenTaskData } from '../../api/Task/Task';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';

export const performAction = async (
  callback: (data: OpenTaskData) => void,
  requestCurrentLocation: () => Promise<LocationObject | null>,
  taskId: string,
  alertMessage: {
    header: string;
    description: string;
  },
) => {
  const location = await requestCurrentLocation();
  if (location) {
    callback({
      taskId,
      taskSession: {
        workerLatitude: location.coords.latitude.toString().slice(0, 14),
        workerLongitude: location.coords.longitude.toString().slice(0, 14),
      },
    });
  } else {
    Alert.prompt(alertMessage.header, alertMessage.description);
  }
};

export function findClientById(
  clients: ClientResponseBase[] | undefined,
  id: string,
) {
  if (clients) return clients.find(client => client.id === id);
  return undefined;
}
