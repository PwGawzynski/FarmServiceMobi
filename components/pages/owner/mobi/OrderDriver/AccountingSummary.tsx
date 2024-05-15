import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Separator } from 'tamagui';
import i18next from 'i18next';
import { useIsFocused } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { Switch } from '../../../../atoms/Switch';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { HintCard } from '../../../../atoms/HintCard';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { ClientsCompanyResponseBase } from '../../../../../FarmServiceApiTypes/ClientsCompany/Responses';
import { AppLinkButton } from '../../../../atoms/AppLinkButton';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import { OrderStatus } from '../../../../../FarmServiceApiTypes/Order/Enums';
import { TaskType } from '../../../../../FarmServiceApiTypes/Task/Enums';
import { AccountingTaskCard } from '../../../../molecules/AccountingTaskCard';
import { OrderAccountingSummary } from '../../../../../types/self/common/types';
import InfoIco from '../../../../../assets/info.svg';
import { account } from '../../../../../api/Order/Order';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { InvoiceLanguage } from '../../../../../FarmServiceApiTypes/InvoiceEntity/Enums';
import { InvoiceResponseBase } from '../../../../../FarmServiceApiTypes/Invoice/Responses';
import { TRANSLATIONS } from '../../../../../helepers/Translations/AccountingSummaryTranslations';

const companyTranslatedKeys = {
  name: TRANSLATIONS.companyName,
  NIP: TRANSLATIONS.companyNIP,
  email: TRANSLATIONS.companyEmail,
  phoneNumber: TRANSLATIONS.companyPhoneNumber,
};

const companyAddressTranslatedKeys = {
  city: TRANSLATIONS.city,
  street: TRANSLATIONS.street,
  postalCode: TRANSLATIONS.postalCode,
  houseNumber: TRANSLATIONS.houseNumber,
  county: TRANSLATIONS.county,
  apartmentNumber: TRANSLATIONS.apartmentNumber,
  voivodeship: TRANSLATIONS.voivodeship,
};

const personalDataTranslatedKeys = {
  name: TRANSLATIONS.name,
  surname: TRANSLATIONS.surname,
  phoneNumber: TRANSLATIONS.phoneNumber,
};

const orderInfoTranslatedKeys = {
  name: TRANSLATIONS.orderName,
  performanceDate: TRANSLATIONS.performanceDate,
  totalArea: TRANSLATIONS.totalArea,
  status: TRANSLATIONS.status,
  openedAt: TRANSLATIONS.openedAt,
  createdAt: TRANSLATIONS.createdAt,
};

const accountingSummaryTranslatedKeys = {
  tax: TRANSLATIONS.taxValue,
  totalPrice: TRANSLATIONS.totalPrice,
  totalPriceWithTax: TRANSLATIONS.totalPriceWithTax,
};

const prepareOrderData = (order: OrderResponseBase) => ({
  name: order.name,
  performanceDate: new Date(order.performanceDate).toLocaleDateString(),
  totalArea: Number.isNaN(order.totalArea)
    ? '0.00'
    : Number(order.totalArea).toFixed(2),
  status: OrderStatus[order.status],
  openedAt: order.openedAt
    ? new Date(order.openedAt).toLocaleDateString()
    : TRANSLATIONS.noData,
  createdAt: order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : TRANSLATIONS.noData,
});

const accountingSetupForTaskType = (accounting: OrderAccountingSummary) => {
  const totalAreaByTaskTypeConvertedKeys = Object.keys(
    accounting.summary.TaskTypeArea,
  ).reduce(
    (p, c) => ({
      ...p,
      [`${c}_area`]:
        accounting.summary.TaskTypeArea[c as keyof typeof TaskType],
    }),
    {},
  );

  const TaskTypeNames = {
    Harvesting_area: TRANSLATIONS.harvestingTotalArea,
    Transport_area: TRANSLATIONS.transportTotalArea,
  } as Record<keyof typeof totalAreaByTaskTypeConvertedKeys, string>;

  const actuallyUsedTaskTypeNames = Object.keys(
    totalAreaByTaskTypeConvertedKeys,
  ).reduce(
    (p, c) => ({
      ...p,
      [`${c}`]:
        TaskTypeNames[c as keyof typeof totalAreaByTaskTypeConvertedKeys],
    }),
    {} as Record<keyof typeof TaskType, string>,
  );

  const TaskPriceByTypeNames = {
    Harvesting: TRANSLATIONS.harvestingTotalPrice,
    Transport: TRANSLATIONS.transportTotalPrice,
  } as Record<keyof typeof TaskType, string>;

  const actuallyUsedTaskPriceByTypeNames = Object.keys(
    accounting.summary.TaskTypeArea,
  ).reduce(
    (p, c) => ({
      ...p,
      [c]: TaskPriceByTypeNames[c as keyof typeof TaskType],
    }),
    {} as Record<keyof typeof TaskType, string>,
  );

  return {
    totalAreaByTaskTypeConvertedKeys,
    actuallyUsedTaskTypeNames,
    actuallyUsedTaskPriceByTypeNames,
  };
};

export function AccountingSummary({
  route,
  navigation,
}: OrdersDriverScreenProps<
  'orderAccountingInvoice',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const { order, client, accounting, tasks } = route.params;
  const [useClientCompanyData, setUseClientCompanyData] = useState(true);
  const {
    totalAreaByTaskTypeConvertedKeys,
    actuallyUsedTaskTypeNames,
    actuallyUsedTaskPriceByTypeNames,
  } = useMemo(() => accountingSetupForTaskType(accounting), [accounting]);

  const queryClient = useQueryClient();
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationKey: ['account', order.id],
    mutationFn: account,
    onSuccess: res => {
      queryClient.setQueryData(
        ['orderInvoices', order.id],
        (old: InvoiceResponseBase[]) => {
          if (old) return [...old, res];
          return [res];
        },
      );
    },
  });

  useEffect(() => {
    if (isError) {
      Alert.alert(TRANSLATIONS.alertTitle, TRANSLATIONS.alertDescription);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      (async () => {
        await WebBrowser.openBrowserAsync(
          `${data.invoiceDownloadLink}&version=` +
            `${i18next.language === 'pl' ? InvoiceLanguage[InvoiceLanguage.PL] : InvoiceLanguage[InvoiceLanguage.EN]}`,
        );
      })();
      navigation.navigate('orderInvoices', {
        order,
      });
    }
  }, [isSuccess, data]);

  const handleAccountOrder = () => {
    mutate({
      orderId: order.id,
      tasks: tasks.map(task_ => task_.id),
    });
  };

  // refreshes the screen params when user comes back from an assign company
  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);

  const handleClientCreateCompany = () =>
    navigation.navigate('clientsDriver', {
      screen: 'clientDetails',
      params: { client: client as ClientResponseBase },
    });

  const clientCompanyInfo = useMemo(() => {
    if (!client.company)
      return (
        <HintCard
          header={TRANSLATIONS.companyDataIsEmpty}
          text={TRANSLATIONS.clientNoCompanyDesc}
        >
          <AppLinkButton
            title={TRANSLATIONS.createCompanyData}
            onPress={handleClientCreateCompany}
          />
        </HintCard>
      );
    return (
      <>
        <EntityAsACard<Omit<ClientResponseBase['user']['personalData'], 'id'>>
          data={client.user.personalData}
          names={personalDataTranslatedKeys}
          onTopRightBtnPress={handleClientCreateCompany}
          cardName={TRANSLATIONS.clientCardName}
          topRightButtonName={TRANSLATIONS.clientCardTopRightButtonName}
          topRightButtonIcon={<InfoIco />}
          cardClassName="mt-0"
        />
        <EntityAsACard<
          Omit<ClientsCompanyResponseBase, 'id' | 'client' | 'address'>
        >
          data={{
            name: client.company.name,
            NIP: client.company.NIP,
            email: client.company.email,
            phoneNumber: client.company.phoneNumber,
          }}
          names={companyTranslatedKeys}
        />
        <EntityAsACard<Omit<ClientsCompanyResponseBase['address'], 'id'>>
          data={client.company.address}
          names={companyAddressTranslatedKeys}
        />
      </>
    );
  }, [client.company, useClientCompanyData]);

  const clientPersonalInfo = useMemo(() => {
    if (!client.user) return undefined;
    return (
      <>
        <HintCard
          header={TRANSLATIONS.usingClientPersonalDataHintHeader}
          text={TRANSLATIONS.usingClientPersonalDataHintDesc}
        />
        <EntityAsACard<Omit<ClientResponseBase['user']['personalData'], 'id'>>
          data={client.user.personalData}
          names={personalDataTranslatedKeys}
        />
      </>
    );
  }, [client.user]);

  return (
    <ScreenBase name={TRANSLATIONS.clientInvoiceData}>
      <ScrollView f={1} marginTop="$4" showsVerticalScrollIndicator={false}>
        {useClientCompanyData ? clientCompanyInfo : clientPersonalInfo}
        <Switch
          label={TRANSLATIONS.useClientsCompanyData}
          onCheckedChange={setUseClientCompanyData}
        />
        <Separator mb="$4" mt="$2" />
        <EntityAsACard<
          Record<
            keyof Omit<
              OrderResponseBase,
              'id' | 'clientId' | 'additionalInfo' | 'pricing'
            >,
            string | undefined
          >
        >
          cardClassName="mt-0"
          data={prepareOrderData(order)}
          names={orderInfoTranslatedKeys}
          cardName={TRANSLATIONS.orderCardName}
        />
        <EntityAsACard
          data={{
            ...accounting.summary.TaskTypePrice,
            ...totalAreaByTaskTypeConvertedKeys,
            tax: `${(accounting.tax * 100).toFixed(2)} %`,
            totalPrice: accounting.totalPrice.toFixed(2),
            totalPriceWithTax: accounting.totalPriceWithTax.toFixed(2),
          }}
          names={{
            ...actuallyUsedTaskTypeNames,
            ...actuallyUsedTaskPriceByTypeNames,
            ...accountingSummaryTranslatedKeys,
          }}
        />
        <AccountingTaskCard
          tasks={tasks}
          itemProps={{
            tax: accounting.tax,
            prices: accounting.pricesForTaskTypeUnit,
          }}
          bordered
          cardStyle={{
            height: 20 * tasks.length + 40,
          }}
        />
      </ScrollView>
      <ButtonTamagui
        isPending={isPending}
        text={TRANSLATIONS.generateInvoiceButton}
        buttonProps={{
          onPress: handleAccountOrder,
          mt: '$4',
          mb: '$4',
        }}
      />
    </ScreenBase>
  );
}
