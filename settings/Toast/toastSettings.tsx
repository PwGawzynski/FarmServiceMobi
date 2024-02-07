if (Number.isNaN(Number(process.env.EXPO_PUBLIC_TOAST_DURATION))) {
  console.error(
    'Error: EXPO_PUBLIC_TOAST_DURATION is not a number is: ',
    process.env.EXPO_PUBLIC_TOAST_DURATION,
  );
}

export const TOAST_DURATION = Number(
  process.env.EXPO_PUBLIC_TOAST_DURATIONTOAST_DURATION,
);
