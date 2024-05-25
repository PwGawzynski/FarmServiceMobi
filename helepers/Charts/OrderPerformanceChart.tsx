import { SharedValue } from 'react-native-reanimated';
import { Text, useFont } from '@shopify/react-native-skia';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { BarObjectData } from '../../components/molecules/OrderPerformanceChart';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import helvetica from '../../helvetica/Helvetica/Helvetica.ttf';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export function ToolTip({
  x,
  y,
  area,
  theme,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
  area: SharedValue<number>;
  theme?: Theme;
}) {
  const font = useFont(helvetica, 12);
  return (
    <Text
      color={theme === Theme.dark ? '#d7df71' : '#081e3f'}
      x={x.value - area.value.toString().length * 6}
      y={y.value - 10}
      text={`${area.value.toFixed(2).toString()}`}
      font={font}
    />
  );
}

export const dateWithoutTime = (date: string) => {
  return new Date(date).setHours(0, 0, 0, 0);
};

export const filterDoneTasks = (tasks: TaskResponseBase[]) =>
  tasks?.filter(_ => _?.closedAt !== undefined && _?.isDone);
export const sortTasksByClosedDate = (tasks: TaskResponseBase[]) =>
  tasks
    .sort(
      (a, b) =>
        new Date(dateWithoutTime(a.closedAt as unknown as string)).getTime() -
        new Date(dateWithoutTime(b.closedAt as unknown as string)).getTime(),
    )
    .map(_ => _.closedAt as Date);
export const mapTasksToChartData = (tasks: TaskResponseBase[]) =>
  tasks.map(
    task =>
      ({
        day: new Date(task.closedAt as unknown as string).toLocaleDateString(),
        fieldArea: Number(task.field.area),
      }) as BarObjectData,
  );
export const getUniqueDays = (chartData: BarObjectData[]) => [
  ...new Set(chartData.map(d => d.day)),
];

export const calculateUniqueData = (
  chartData: BarObjectData[],
  uniqueDays: string[],
) =>
  uniqueDays.map(day => {
    const dayData = chartData.filter(d => d.day === day);
    return {
      day,
      fieldArea: dayData.reduce((acc, curr) => acc + curr.fieldArea, 0),
    };
  });

export const getDateSeries = (minDate: Date, maxDate: Date) => {
  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);
  return Array.from(
    { length: (maxDate.getTime() - minDate.getTime()) / 86400000 + 1 },
    (_, i) => {
      const date = new Date(minDate.getTime() + i * 86400000);
      return date.toLocaleDateString();
    },
  );
};

export const mapDataToBarChartFormat = (
  dateSeries: string[],
  uniqueData: BarObjectData[],
) => {
  return dateSeries.map(date => ({
    day: date,
    fieldArea: uniqueData.find(d => d.day === date)?.fieldArea || 0,
  }));
};
