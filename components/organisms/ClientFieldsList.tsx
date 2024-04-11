import { useQuery } from '@tanstack/react-query';
import {
  ForwardedRef,
  forwardRef,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { XStack, YStack } from 'tamagui';
import { t } from 'i18next';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { getClientFields } from '../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../settings/query/querySettings';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import FieldListItem from '../molecules/FieldListItem';
import { FieldBottomSheetContent } from '../molecules/FieldBottomSheetContent';
import { SearchBox } from '../molecules/SearchBox';
import { UniversalList } from './UniversalList';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import SelectAllIco from '../../assets/list-checks.svg';
import DeselectIco from '../../assets/list-x.svg';
import { TranslationNames } from '../../locales/TranslationNames';
import { clientFieldsFilter } from '../../helepers/filterFunctions';

export interface Props {
  /* eslint-disable react/no-unused-prop-types */
  client: ClientResponseBase;
  modalRef: RefObject<BottomSheetModal>;
  /**
   * Callback triggered when the selected fields change
   * @param isEmpty
   */
  triggerOnSelectedChange?: (isEmpty: boolean) => void;
  /**
   * Changes the list to selectable mode
   */
  isSelectable?: boolean;
  /* eslint-enable react/no-unused-prop-types */
}

export interface ClientFieldsListRef {
  fields: FieldResponseBase[];
}

const TRANSLATIONS = {
  searchPlaceholder: t(
    TranslationNames.components.clientsFieldsList.searchPlaceholder,
  ),
};

const ClientFieldsList = memo(
  forwardRef(
    (
      { client, modalRef, triggerOnSelectedChange, isSelectable }: Props,
      ref: ForwardedRef<ClientFieldsListRef>,
    ) => {
      const [filter, setFilter] = useState<string | undefined>(undefined);
      const [fields, setFields] = useState<FieldResponseBase[] | []>([]);

      const { data } = useQuery({
        queryKey: ['clientFields', client.id],
        queryFn: keys => getClientFields(keys.queryKey[1] as string),
        staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
      });

      /**
       * Exposes the fields selected
       */
      useImperativeHandle(
        ref,
        () =>
          ({
            fields,
          }) as ClientFieldsListRef,
        [fields],
      );

      useEffect(() => {
        if (triggerOnSelectedChange) triggerOnSelectedChange(!fields.length);
      }, [fields]);

      const handleFieldSelection = (field: FieldResponseBase) =>
        setFields(p => [...p, field]);
      const handleFieldDeselection = (field: FieldResponseBase) =>
        setFields(prevState => prevState.filter(f => f.id !== field.id));
      const handleSelectBtn = () => {
        if (!fields.length) setFields(data ?? []);
        else setFields([]);
      };

      const renderItem = useCallback(
        (
          { item }: ListRenderItemInfo<FieldResponseBase>,
          bottomSheetRef: RefObject<BottomSheetModal>,
        ) => {
          const handlePress = () => {
            bottomSheetRef.current?.present(
              <FieldBottomSheetContent
                field={item}
                client={client}
                bottomSheetRef={bottomSheetRef}
              />,
            );
          };
          return (
            <FieldListItem
              isSelected={!!fields?.find(f => f.id === item.id)}
              onSelected={isSelectable ? handleFieldSelection : undefined}
              onDeselected={isSelectable ? handleFieldDeselection : undefined}
              onPress={handlePress}
              field={item}
            />
          );
        },
        [fields],
      );

      const sorted = clientFieldsFilter(data, filter);

      return (
        <>
          <YStack mt="$4">
            <XStack ai="center">
              <YStack f={1}>
                <SearchBox
                  onTextChange={text => setFilter(text)}
                  placeholder={TRANSLATIONS.searchPlaceholder}
                />
              </YStack>
              {isSelectable && (
                <ButtonTamagui
                  icon={fields.length ? <DeselectIco /> : <SelectAllIco />}
                  buttonProps={{
                    onPress: handleSelectBtn,
                    ml: '$2',
                  }}
                />
              )}
            </XStack>
          </YStack>
          <YStack mt="$4" f={1}>
            <UniversalList
              renderItem={item => renderItem(item, modalRef)}
              data={sorted}
            />
          </YStack>
        </>
      );
    },
  ),
  (prevProps: Props, nextProps: Props) =>
    prevProps.client.id === nextProps.client.id,
);

ClientFieldsList.displayName = 'ClientFieldsList';

export default ClientFieldsList;
