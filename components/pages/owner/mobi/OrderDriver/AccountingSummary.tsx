import { useMemo, useState } from 'react';
import { ScrollView } from 'tamagui';
import { t } from 'i18next';
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
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { OrderAccountingSummary } from '../../../../../types/self/common/types';

const TRANSLATIONS = {
  clientInvoiceData: t(
    TranslationNames.screens.orderDriver.accountingSummary.clientInvoiceData,
  ),
  useClientsCompanyData: t(
    TranslationNames.screens.orderDriver.accountingSummary
      .useClientsCompanyData,
  ),
  createCompanyData: t(
    TranslationNames.screens.orderDriver.accountingSummary.createCompanyData,
  ),
  companyName: t(
    TranslationNames.screens.orderDriver.accountingSummary.companyName,
  ),
  companyNIP: t(
    TranslationNames.screens.orderDriver.accountingSummary.companyNIP,
  ),
  county: t(TranslationNames.screens.orderDriver.accountingSummary.county),
  apartmentNumber: t(
    TranslationNames.screens.orderDriver.accountingSummary.apartmentNumber,
  ),
  voivodeship: t(
    TranslationNames.screens.orderDriver.accountingSummary.voivodeship,
  ),
  name: t(TranslationNames.screens.orderDriver.accountingSummary.name),
  surname: t(TranslationNames.screens.orderDriver.accountingSummary.surname),
  phoneNumber: t(
    TranslationNames.screens.orderDriver.accountingSummary.phoneNumber,
  ),
  orderName: t(
    TranslationNames.screens.orderDriver.accountingSummary.orderName,
  ),
  performanceDate: t(
    TranslationNames.screens.orderDriver.accountingSummary.performanceDate,
  ),
  totalArea: t(
    TranslationNames.screens.orderDriver.accountingSummary.totalArea,
  ),
  status: t(TranslationNames.screens.orderDriver.accountingSummary.status),
  openedAt: t(TranslationNames.screens.orderDriver.accountingSummary.openedAt),
  createdAt: t(
    TranslationNames.screens.orderDriver.accountingSummary.createdAt,
  ),
  taxValue: t(TranslationNames.screens.orderDriver.accountingSummary.taxValue),
  totalPrice: t(
    TranslationNames.screens.orderDriver.accountingSummary.totalPrice,
  ),
  totalPriceWithTax: t(
    TranslationNames.screens.orderDriver.accountingSummary.totalPriceWithTax,
  ),
  harvestingTotalArea: t(
    TranslationNames.screens.orderDriver.accountingSummary.harvestingTotalArea,
  ),
  transportTotalArea: t(
    TranslationNames.screens.orderDriver.accountingSummary.transportTotalArea,
  ),
  harvestingTotalPrice: t(
    TranslationNames.screens.orderDriver.accountingSummary.harvestingTotalPrice,
  ),
  transportTotalPrice: t(
    TranslationNames.screens.orderDriver.accountingSummary.transportTotalPrice,
  ),
  companyDataIsEmpty: t(
    TranslationNames.screens.orderDriver.accountingSummary.companyDataIsEmpty,
  ),
  clientNoCompanyDesc: t(
    TranslationNames.screens.orderDriver.accountingSummary.clientNoCompany,
  ),
  companyEmail: t(
    TranslationNames.screens.orderDriver.accountingSummary.companyEmail,
  ),
  companyPhoneNumber: t(
    TranslationNames.screens.orderDriver.accountingSummary.companyPhoneNumber,
  ),
  city: t(TranslationNames.screens.orderDriver.accountingSummary.city),
  street: t(TranslationNames.screens.orderDriver.accountingSummary.street),
  postalCode: t(
    TranslationNames.screens.orderDriver.accountingSummary.postalCode,
  ),
  houseNumber: t(
    TranslationNames.screens.orderDriver.accountingSummary.houseNumber,
  ),
  fillCompanyData: t(
    TranslationNames.screens.orderDriver.accountingSummary.fillCompanyData,
  ),
  usingClientPersonalDataHintHeader: t(
    TranslationNames.screens.orderDriver.accountingSummary
      .usingClientPersonalDataHintHeader,
  ),
  usingClientPersonalDataHintDesc: t(
    TranslationNames.screens.orderDriver.accountingSummary
      .usingClientPersonalDataHintDesc,
  ),
  noData: t(TranslationNames.screens.orderDriver.accountingSummary.noData),
};

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
  route: { params },
  navigation,
}: OrdersDriverScreenProps<
  'orderAccountingInvoice',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const { order, client, accounting, tasks } = params;
  const [useClientCompanyData, setUseClientCompanyData] = useState(
    !!client.company,
  );
  const {
    totalAreaByTaskTypeConvertedKeys,
    actuallyUsedTaskTypeNames,
    actuallyUsedTaskPriceByTypeNames,
  } = useMemo(() => accountingSetupForTaskType(accounting), [accounting]);

  const handleClientMore = () =>
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
            onPress={handleClientMore}
          />
        </HintCard>
      );
    return (
      <>
        <EntityAsACard<
          Omit<ClientsCompanyResponseBase, 'id' | 'client' | 'address'>
        >
          cardClassName="mt-0"
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
  }, [client.company]);

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
      <ScrollView marginTop="$4" showsVerticalScrollIndicator={false}>
        {useClientCompanyData ? clientCompanyInfo : clientPersonalInfo}
        <Switch
          label={TRANSLATIONS.useClientsCompanyData}
          onCheckedChange={setUseClientCompanyData}
        />
        <EntityAsACard<
          Record<
            keyof Omit<OrderResponseBase, 'id' | 'clientId' | 'additionalInfo'>,
            string | undefined
          >
        >
          cardClassName="mt-0"
          data={prepareOrderData(order)}
          names={orderInfoTranslatedKeys}
        />
        <EntityAsACard
          data={{
            ...accounting.summary.TaskTypePrice,
            ...totalAreaByTaskTypeConvertedKeys,
            tax: `${accounting.tax.toFixed(2)} %`,
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
          itemProps={{ tax: accounting.tax }}
          bordered
          cardStyle={{
            height: 20 * tasks.length + 40,
          }}
        />
      </ScrollView>
    </ScreenBase>
  );
}
