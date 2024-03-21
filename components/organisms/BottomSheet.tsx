import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Portal } from '@gorhom/portal';
import { View } from 'tamagui';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Colors } from '../../settings/styles/colors';

export type MainBottomSheetProps = {
  children?: React.ReactNode;
  modalRef?: React.RefObject<BottomSheetModal>;
  modalSettings?: BottomSheetProps;
  snapPoints?: string[];
};

const styles = (theme: Theme | undefined) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme === Theme.dark ? Colors.MID_GRAY : Colors.DARK,
      borderRadius: 20,
    },
    handle: {
      backgroundColor: theme === Theme.dark ? Colors.WHITE : Colors.WHITE,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme === Theme.dark ? Colors.MID_GRAY : Colors.DARK,
    },
  });

export function MainBottomSheet({
  modalSettings,
  modalRef,
  snapPoints: _snapPoints,
}: MainBottomSheetProps) {
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const theme = useSelector(selectTheme);

  return (
    <Portal handleOnMount={data => console.log(data, 'kuraw')}>
      <BottomSheetModal
        backgroundStyle={styles(theme).container}
        style={styles(theme).container}
        handleIndicatorStyle={styles(theme).handle}
        enablePanDownToClose
        ref={modalRef}
        snapPoints={_snapPoints || snapPoints}
        {...modalSettings}
      >
        {data => <View f={1}>{data?.data}</View>}
      </BottomSheetModal>
    </Portal>
  );
}
