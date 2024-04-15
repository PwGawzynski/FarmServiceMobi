import { ForwardedRef, RefObject, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import { getAllMachines } from '../../api/Machine/Machine';
import List, { ListRef } from './List';
import { MachineResponseBase } from '../../FarmServiceApiTypes/Machine/Responses';
import { machineFilter } from '../../helepers/filterFunctions';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { TranslationNames } from '../../locales/TranslationNames';

export interface SelectMachineProps {
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  machineListRef: ForwardedRef<ListRef<MachineResponseBase>>;
  maxSelectedItems?: number;
}

const TRANSLATIONS = {
  searchPlaceholder: t(
    TranslationNames.components.machineSelector.searchPlaceholder,
  ),
  next_step_button: t(
    TranslationNames.components.machineSelector.subbmitButton,
  ),
};

export function MachineSelector({
  modalRef,
  onSetAction,
  machineListRef,
  maxSelectedItems,
}: SelectMachineProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['machines'],
    queryFn: getAllMachines,
  });
  return (
    <YStack f={1}>
      <List<MachineResponseBase>
        isSelectable
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        maxSelectedItems={maxSelectedItems}
        ref={machineListRef}
        isFetching={isFetching}
        isError={isError}
        isLoading={isLoading}
        data={data}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: item.name,
          bottomRightText: item.licensePlate,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={machineFilter}
        searchEnginePlaceholder={TRANSLATIONS.searchPlaceholder}
      />
      {canSubmit && (
        <ButtonTamagui
          text={TRANSLATIONS.next_step_button}
          buttonProps={{
            onPress: () => onSetAction(),
          }}
        />
      )}
    </YStack>
  );
}
