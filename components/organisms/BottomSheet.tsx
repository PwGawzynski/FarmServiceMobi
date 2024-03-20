import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Colors } from '../../settings/styles/colors';

export type MainBottomSheetProps = {
  children?: React.ReactNode;
  modalRef?: React.RefObject<BottomSheet>;
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
  children,
  snapPoints: _snapPoints,
}: MainBottomSheetProps) {
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const theme = useSelector(selectTheme);

  return (
    <BottomSheet
      backgroundStyle={styles(theme).container}
      style={styles(theme).container}
      handleIndicatorStyle={styles(theme).handle}
      enablePanDownToClose
      ref={modalRef}
      index={-1}
      snapPoints={_snapPoints || snapPoints}
      {...modalSettings}
    >
      <BottomSheetView style={styles(theme).contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}
