import { LinearGradient, useFont, vec } from '@shopify/react-native-skia';
import { Bar, CartesianChart, useChartPressState } from 'victory-native';
import { SizableText, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18next';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import helvetica from '../../helvetica/Helvetica/Helvetica.ttf';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { getTaskByOrder } from '../../api/Task/Task';
import { PendingInfo } from '../atoms/PendingInfo';
import { HintCard } from '../atoms/HintCard';
import {
  calculateUniqueData,
  filterDoneTasks,
  getUniqueDays,
  mapDataToBarChartFormat,
  mapTasksToChartData,
  ToolTip,
} from '../../helepers/Charts/OrderPerformanceChart';
import XIco from '../../assets/x.svg';
import { TranslationNames } from '../../locales/TranslationNames';

const TRANSLATIONS = {
  errorFetchingData: t(
    TranslationNames.components.orderPerformanceChart.computingPerformance,
  ),

  tryAgainLater: t(
    TranslationNames.components.orderPerformanceChart.computingPerformance,
  ),
  computingPerformance: t(
    TranslationNames.components.orderPerformanceChart.computingPerformance,
  ),
  hintCardTitle: t(
    TranslationNames.components.orderPerformanceChart.hintCardTitle,
  ),
  hintCardDescription: t(
    TranslationNames.components.orderPerformanceChart.hintCardDescription,
  ),
  dailyPerformance: t(
    TranslationNames.components.orderPerformanceChart.dailyPerformance,
  ),
};

export interface OrderPerformanceChartProps {
  orderId: string;
}

export interface BarObjectData {
  day: string;
  fieldArea: number;
}

export function OrderPerformanceChart({ orderId }: OrderPerformanceChartProps) {
  const font = useFont(helvetica, 12);
  const theme = useSelector(selectTheme);
  const { state, isActive } = useChartPressState({
    x: '0',
    y: { fieldArea: 0 },
  });

  const { data: tasks, isError } = useQuery({
    queryKey: ['orderTasks', orderId],
    queryFn: context => getTaskByOrder(context.queryKey[1]),
  });

  const isFocused = useIsFocused();

  const data = useMemo(() => {
    if (tasks?.length === 0) return [];
    if (!tasks) return null;
    const doneTasks = filterDoneTasks(tasks);
    // UNCOMMENT if u want to se day by day series from first task closed to last
    // const sortedTasks = sortTasksByClosedDate(doneTasks);

    // const minDate = new Date(sortedTasks[0]);
    // const maxDate = new Date(sortedTasks[sortedTasks.length - 1]);
    const chartData = mapTasksToChartData(doneTasks);
    const uniqueDays = getUniqueDays(chartData);
    const uniqueDataWithFieldArea = calculateUniqueData(chartData, uniqueDays);
    // const dateSeries = getDateSeries(minDate, maxDate);
    return mapDataToBarChartFormat(uniqueDays, uniqueDataWithFieldArea);
  }, [tasks]);

  if (isError)
    return (
      <YStack f={1} mt="$4">
        <YStack f={1} jc="center" ai="center">
          <XIco width={40} height={40} color={Colors.ERROR_RED} />
          <SizableText
            mt="$4"
            fontSize="$4"
            className="text-center text-error-red"
          >
            {TRANSLATIONS.errorFetchingData}
          </SizableText>
          <SizableText fontSize="$4" className="text-center text-error-red">
            {TRANSLATIONS.tryAgainLater}
          </SizableText>
        </YStack>
      </YStack>
    );

  if (data?.length === 0)
    return (
      <YStack f={1} mt="$4">
        <HintCard
          header={TRANSLATIONS.hintCardTitle}
          text={TRANSLATIONS.hintCardDescription}
        />
      </YStack>
    );

  if (!data)
    return (
      <YStack f={1} mt="$4">
        <PendingInfo isVisible infoText={TRANSLATIONS.computingPerformance} />
      </YStack>
    );
  const gradientStartColor =
    theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE;
  const gradientEndColor = theme === Theme.dark ? Colors.WHITE : Colors.GREEN;
  return (
    <YStack f={1} p="$$">
      <SizableText fontSize="$4" className="uppercase font-semibold mt-2 mb-1">
        {TRANSLATIONS.dailyPerformance}
      </SizableText>
      <CartesianChart
        chartPressState={state}
        data={data}
        xKey="day"
        yKeys={['fieldArea']}
        padding={{ bottom: 20 }}
        domainPadding={{ left: 40, right: 40, top: 30 }}
        axisOptions={{
          font,
          lineWidth: 0,
          labelColor: theme === Theme.dark ? Colors.WHITE : Colors.DARK_BLUE,
          lineColor: theme === Theme.dark ? Colors.WHITE : Colors.DARK_BLUE,
          labelOffset: 0,
          tickCount: data.length,
          formatYLabel: () => ``, // we don't want to show y labels
          formatXLabel: s => (s !== undefined ? s : ''),
          labelPosition: {
            y: 'inset',
            x: 'outset',
          },
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Bar
              points={points.fieldArea}
              roundedCorners={{ topLeft: 10, topRight: 10 }}
              chartBounds={chartBounds}
              innerPadding={data.length < 10 ? 0.85 : 0.5}
              animate={
                isFocused ? { type: 'timing', duration: 900 } : undefined
              }
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 400)}
                colors={[gradientStartColor, gradientEndColor]}
              />
            </Bar>
            {isActive ? (
              <ToolTip
                theme={theme}
                area={state.y.fieldArea.value}
                x={state.x.position}
                y={state.y.fieldArea.position}
              />
            ) : null}
          </>
        )}
      </CartesianChart>
    </YStack>
  );
}
