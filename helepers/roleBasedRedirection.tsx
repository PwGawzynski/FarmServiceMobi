import { UserRole } from '../FarmServiceApiTypes/User/Enums';
import { UserResponseBase } from '../FarmServiceApiTypes/User/Responses';
import { setUserAsync } from '../src/redux/feature/userSlice';

export function roleBasedRedirection(
  data: UserResponseBase | string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any,
) {
  if (!data) return;
  if (typeof data === 'string') {
    navigation.navigate('chooseRole', {
      byGoogle: {
        email: data as string,
      },
    });
    return;
  }
  if (data) dispatch(setUserAsync(data));
  if (!data.company) {
    navigation.navigate('createCompany');
    return;
  }
  if (data.role === UserRole.Owner)
    navigation.navigate('ownerRootDriver', {
      screen: 'activityDriver',
      params: {
        screen: 'activityDesktopRoot',
        params: {
          screen: 'lastActivities',
        },
      },
    });
  else if (data.role === UserRole.Worker) {
    navigation.navigate('workerRootDriver', {
      screen: 'workerAssignationScreen',
    });
  }
}
