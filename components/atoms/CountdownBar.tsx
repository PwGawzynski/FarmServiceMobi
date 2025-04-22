import { Progress } from 'tamagui';
import { useEffect, useState } from 'react';

export interface CountdownBarProps {
  time: number;
  step?: number;
}
export function CountdownBar({ time, step }: CountdownBarProps) {
  const [currentTime, setCurrentTime] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prevState => prevState - (step || 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  if (currentTime <= 0) return null;

  return (
    <Progress
      height="$1"
      className="border-2 border-b-dark-blue dark:border-green"
      value={(currentTime / time) * 100}
    >
      <Progress.Indicator
        className="bg-dark-blue dark:bg-green"
        animation="slow"
      />
    </Progress>
  );
}
