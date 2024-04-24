import { Card, H5 } from 'tamagui';
import { useEffect, useState } from 'react';

export interface SessionTimeCounterProps {
  startTime: Date;
}

function time(sessionTime: number) {
  return `${new Date(Math.abs(new Date(sessionTime).getTime()))
    .toISOString()
    .substring(11, 19)}`;
}

export function TimeCounter({ startTime }: SessionTimeCounterProps) {
  const [sessionTime, setSessionTime] = useState(
    new Date().getTime() - startTime.getTime(),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(p => p + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Card
      height={100}
      bordered
      width="full"
      mt="$4"
      mb="$2"
      jc="center"
      ai="center"
    >
      <H5>{time(sessionTime)} H</H5>
    </Card>
  );
}
