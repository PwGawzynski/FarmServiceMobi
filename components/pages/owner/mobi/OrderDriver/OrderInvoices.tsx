import { useQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as WebBrowser from 'expo-web-browser';
import i18next, { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { getInvoices } from '../../../../../api/Order/Order';
import List from '../../../../organisms/List';
import { InvoiceResponseBase } from '../../../../../FarmServiceApiTypes/Invoice/Responses';
import { InvoiceLanguage } from '../../../../../FarmServiceApiTypes/InvoiceEntity/Enums';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.orderDriver.orderInvoices.screenTitle,
  ),
  backButton: t(TranslationNames.screens.orderDriver.orderInvoices.backButton),
};

export function OrderInvoices({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<
  'orderInvoices',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const { order } = params;

  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ['orderInvoices', order.id],
    queryFn: context => getInvoices(context.queryKey[1] as string),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const modalRef = useRef<BottomSheetModal>(null);
  const handleOnItemPress = useCallback((item: InvoiceResponseBase) => {
    (async () => {
      await WebBrowser.openBrowserAsync(
        `${item.invoiceDownloadLink}&version=` +
          `${i18next.language === 'pl' ? InvoiceLanguage[InvoiceLanguage.PL] : InvoiceLanguage[InvoiceLanguage.EN]}`,
      );
    })();
  }, []);

  const handleBack = () => navigation.navigate('orderControlPanel', { order });

  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <List<InvoiceResponseBase>
        isFetching={isFetching}
        isError={isError}
        isLoading={isLoading}
        data={data}
        modalRef={modalRef}
        handleOnItemPress={handleOnItemPress}
        listStyleSettings={item => ({
          header: item.number,
          bottomRightText: ` DATE: ${new Date(
            item.issueDate,
          ).toLocaleDateString()}`,
          alignment: 'left',
          infoIco: true,
        })}
      />
      <ButtonTamagui
        text={TRANSLATIONS.backButton}
        buttonProps={{
          mt: '$4',
          onPress: handleBack,
        }}
      />
    </ScreenBase>
  );
}
