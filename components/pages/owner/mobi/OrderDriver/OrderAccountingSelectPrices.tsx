import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { Card, ScrollView, YStack } from 'tamagui';
import { t } from 'i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { objectKeys } from '@tamagui/create-theme';
import { ScreenBase } from '../common/ScreenBase';
import { createTaskTypePriceSetup } from '../../../../../helepers/FormSetups/TaskTypePricesSetup';
import { FormCreator } from '../../../../atoms/FormCreator';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { TaskType } from '../../../../../FarmServiceApiTypes/Task/Enums';
import { KeyValuePair } from '../../../../atoms/KeyValuePair';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { OrderAccountingFormI } from '../../../../../types/self/common/types';
import { AccountingTaskCard } from '../../../../molecules/AccountingTaskCard';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { updateOrderPrice } from '../../../../../api/Order/Order';
import { CreateOrderPriceReqI } from '../../../../../FarmServiceApiTypes/OrderPricing/Requests';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.orderDriver.OrderAccountingSelectPrices
      .screenTitle,
  ),
  area: t(
    TranslationNames.screens.orderDriver.OrderAccountingSelectPrices.area,
  ),
  total: t(
    TranslationNames.screens.orderDriver.OrderAccountingSelectPrices.total,
  ),
  sum: t(TranslationNames.screens.orderDriver.OrderAccountingSelectPrices.sum),
  totalWithTax: t(
    TranslationNames.screens.orderDriver.OrderAccountingSelectPrices
      .totalWithTax,
  ),
  tasksNotSelected: t(
    TranslationNames.screens.orderDriver.OrderAccountingSelectPrices
      .tasksNotSelected,
  ),
  nextButton: t(
    TranslationNames.screens.orderDriver.OrderAccountingSelectPrices.nextButton,
  ),
};

export function OrderAccountingSelectPrices({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<
  'orderAccountingSelectPrices',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const { tasks, order, client } = params;
  const { control, formState, handleSubmit, watch } =
    useForm<OrderAccountingFormI>({
      defaultValues: {
        ...order?.pricing?.prices,
        Tax: order?.pricing?.tax,
      },
    });

  console.log({
    ...order?.pricing?.prices,
    Tax: order?.pricing?.tax,
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationKey: ['updateOrderPricing', order.id],
    mutationFn: updateOrderPrice,
    onSuccess: (sth, variables) => {
      queryClient.setQueryData(
        ['orders'],
        (oldData: Array<OrderResponseBase>) => {
          if (variables) {
            return [...oldData.filter(o => o.id !== sth?.id), sth];
          }
          return oldData;
        },
      );
    },
  });

  /**
   * Set Created based on a given task, which includes only uniq task type
   */
  const typesSet = useMemo(
    () => Array.from(new Set(tasks?.map(i => TaskType[i.type]))),
    [tasks],
  );

  /**
   * Form setup filtered to create only inputs matched witch types in a task set
   */
  const setup = useMemo(
    () =>
      createTaskTypePriceSetup(control).filter(
        s => typesSet.includes(s.name) || s.name === ('Tax' as never),
      ),
    [typesSet],
  );
  /**
   * Maps task types to set {type: TotalAreaForType}
   */
  const TotalAreaSet = useMemo(() => {
    return typesSet.reduce(
      (p, n) => ({
        ...p,
        [n]:
          tasks
            ?.filter(task_ => TaskType[task_.type] === n)
            .reduce((a, b) => a + Number(b.field.area), 0) || 0,
      }),
      { Transport: 0, Harvesting: 0 },
    );
  }, [tasks]);
  /**
   * Maps task types to set {type: TotalPriceForType(TotalAreaForType * PriceForType)}
   */
  const TotalPriceSet = useMemo(() => {
    const values = watch();
    return Object.keys(values)
      .filter(k => k !== 'Tax')
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            Number(values[key as keyof OrderAccountingFormI] || 0) *
            Number(TotalAreaSet[key as keyof typeof TotalAreaSet]),
        }),
        { Transport: 0, Harvesting: 0 },
      );
  }, [watch(), TotalAreaSet]);

  /**
   * Sum of all prices
   */
  const PriceInTotal = useMemo(() => {
    return Object.values(TotalPriceSet).reduce((p, c) => p + c);
  }, [TotalPriceSet, watch()]);

  /**
   * set of components to display total area for each type
   */
  const TotalAreaByType = useMemo(
    () =>
      Object.entries(TotalAreaSet).map(([key, value]) => (
        <KeyValuePair
          key={Math.random()}
          name={`${key} ${TRANSLATIONS.area}`.toUpperCase()}
          value={value.toFixed(2).toString()}
        />
      )),
    [TotalAreaSet],
  );

  /**
   * set of components to display total price for each type
   */
  const TotalPricesByType = useMemo(
    () =>
      Object.entries(TotalPriceSet).map(([key, value]) => (
        <KeyValuePair
          key={Math.random()}
          name={`${key} ${TRANSLATIONS.total}`.toUpperCase()}
          value={value.toFixed(2).toString()}
        />
      )),
    [TotalPriceSet],
  );

  /**
   * Component to display sum of all prices
   */
  const PriceSum = useMemo(
    () => (
      <KeyValuePair
        name={TRANSLATIONS.sum}
        value={PriceInTotal.toFixed(2).toString()}
      />
    ),
    [PriceInTotal],
  );

  const PriceSumWTaxValue = useMemo(
    () =>
      PriceInTotal *
      (1 + (Number.isNaN(Number(watch('Tax'))) ? 0 : Number(watch('Tax')))),
    [PriceInTotal, watch()],
  );
  /**
   * Component to display sum of all prices with tax
   */
  const PriceSumWTaxComponent = useMemo(() => {
    return (
      <KeyValuePair
        name={TRANSLATIONS.totalWithTax}
        value={PriceSumWTaxValue.toFixed(2).toString()}
      />
    );
  }, [PriceSumWTaxValue, watch()]);

  useEffect(() => {
    if (isSuccess && data && data.pricing && data.pricing && tasks)
      navigation.navigate('orderAccountingInvoice', {
        order,
        tasks,
        client,
        accounting: {
          summary: {
            TaskTypeArea: TotalAreaSet,
            TaskTypePrice: TotalPriceSet,
          },
          pricesForTaskTypeUnit: data.pricing.prices,
          tax: Number(data.pricing.tax),
          totalPrice: PriceInTotal,
          totalPriceWithTax: PriceSumWTaxValue,
        },
      });
  }, [isSuccess, data, tasks]);

  const onSubmit = (formData: OrderAccountingFormI) => {
    mutate({
      order: order.id,
      prices: objectKeys(formData)
        .filter(k => k !== 'Tax')
        .reduce(
          (p, c) => ({ ...p, [c]: Number(formData[c]) }),
          {} as CreateOrderPriceReqI['prices'],
        ),
      tax: formData.Tax,
    });
  };

  if (!tasks) {
    Alert.prompt(TRANSLATIONS.tasksNotSelected);
    navigation.goBack();
    return null;
  }

  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <FormCreator
        abs=" max-h-[30%]"
        controllerSetups={setup}
        errors={formState.errors}
      />
      <YStack f={1} mb="$4">
        <Card f={1} p="$4">
          <ScrollView>
            {TotalAreaByType}
            {TotalPricesByType}
            {PriceSum}
            {PriceSumWTaxComponent}
          </ScrollView>
        </Card>
        <AccountingTaskCard tasks={tasks} itemProps={{ watch }} />
      </YStack>
      <ButtonTamagui
        isPending={isPending}
        text={TRANSLATIONS.nextButton}
        buttonProps={{
          onPress: handleSubmit(onSubmit),
        }}
      />
    </ScreenBase>
  );
}
