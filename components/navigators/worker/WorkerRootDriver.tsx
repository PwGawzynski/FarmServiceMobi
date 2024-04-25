import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenOptionsBase } from '../../../settings/navigators/NativeStackScreenOptionsBase';
import { ActivityDriver } from './activities/ActivitiesDriver';
import { WorkerRootDriverParamList } from '../../../types/self/navigation/Worker/paramList/WorkerRootDriverParamList';
import { WorkerAssignation } from '../../pages/worker/WorkerAssignation';
import { Work } from '../../pages/worker/Work';
import { ScreenBaseWithoutSaveArea } from '../../pages/owner/mobi/common/ScreenBase';
import { WorkerModalContext } from '../../../helepers/context/WorkerModalContext';

const Stack = createNativeStackNavigator<WorkerRootDriverParamList>();

export function WorkerRootDriver() {
  const modalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const workerModalValue = useMemo(
    () => ({
      modalRef,
      isModalVisible,
      setIsModalVisible,
    }),
    [modalRef],
  );
  return (
    <WorkerModalContext.Provider value={workerModalValue}>
      <ScreenBaseWithoutSaveArea
        bottomSheetsProps={{
          modalRef,
          snapPoints: ['50%', '90%'],
          modalSettings: {
            enablePanDownToClose: false,
            animationConfigs: {
              duration: 300,
            },
          },
        }}
      >
        <Stack.Navigator
          // REMEMEBER TO change navigation in Landing when changing initialRouteName
          initialRouteName="workerActivityDriver"
          screenOptions={{
            ...NativeStackScreenOptionsBase,
          }}
        >
          <Stack.Screen
            options={{
              gestureEnabled: false,
              animation: 'fade',
            }}
            name="workerActivityDriver"
            component={ActivityDriver}
          />
          <Stack.Screen
            name="workerAssignationScreen"
            component={WorkerAssignation}
          />
          <Stack.Screen name="work" component={Work} />
        </Stack.Navigator>
      </ScreenBaseWithoutSaveArea>
    </WorkerModalContext.Provider>
  );
}
