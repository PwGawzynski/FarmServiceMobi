import { ListItem, SizableText, XStack } from 'tamagui';
import { TaskSessionResponseBase } from '../../FarmServiceApiTypes/TaskSession/Responses';

function formatDate(date: Date, haveDifferentYears: boolean) {
  return `${new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: '2-digit',
    year: haveDifferentYears ? 'numeric' : undefined,
  })} ${new Date(date).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })}`;
}

export function TaskSessionItem({
  session,
}: {
  session: TaskSessionResponseBase;
}) {
  const haveDifferentYears =
    new Date(session.openedAt).getFullYear() !==
    new Date(session.closedAt || new Date())?.getFullYear();
  return (
    <ListItem p="$1" backgroundColor="transparent" key={Math.random()}>
      <XStack className="flex-1 items-center justify-between">
        <SizableText f={1} textAlign="center">
          {formatDate(session.openedAt, haveDifferentYears)}
        </SizableText>
        <SizableText textAlign="center" f={1} color="$color4">
          {new Date(
            Math.abs(
              new Date(session.closedAt || Date.now()).getTime() -
                new Date(session.openedAt).getTime(),
            ),
          )
            .toISOString()
            .substring(11, 19)}{' '}
          H
        </SizableText>
        <SizableText textAlign="center" f={1}>
          {session.closedAt
            ? formatDate(session.closedAt, haveDifferentYears)
            : '-'}
        </SizableText>
      </XStack>
    </ListItem>
  );
}
