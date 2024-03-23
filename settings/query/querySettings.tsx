if (Number.isNaN(Number(process.env.EXPO_PUBLIC_MIN_QUERY_RETRY_COUNT))) {
  console.error(
    'Error: EXPO_PUBLIC_DEFAULT_THEME is not a number is: ',
    process.env.EXPO_PUBLIC_MIN_QUERY_RETRY_COUNT,
  );
}
if (
  Number.isNaN(Number(process.env.EXPO_PUBLIC_QUERY_RETRY_DELAY_MULTIPLICATION))
) {
  console.error(
    'Error: EXPO_PUBLIC_DEFAULT_THEME is not a number is: ',
    process.env.EXPO_PUBLIC_QUERY_RETRY_DELAY_MULTIPLICATION,
  );
}
if (Number.isNaN(Number(process.env.EXPO_PUBLIC_CLIENTS_QUERY_STALE_TIME))) {
  console.error(
    'Error: EXPO_PUBLIC_DEFAULT_THEME is not a number is: ',
    process.env.EXPO_PUBLIC_CLIENTS_QUERY_STALE_TIME,
  );
}

export const MIN_QUERY_RETRY_COUNT = Number(
  process.env.EXPO_PUBLIC_MIN_QUERY_RETRY_COUNT,
);

export const QUERY_RETRY_DELAY_MULTIPLICATION = Number(
  process.env.EXPO_PUBLIC_QUERY_RETRY_DELAY_MULTIPLICATION,
);

export const EXPO_PUBLIC_QUERY_STALE_TIME = Number(
  process.env.EXPO_PUBLIC_CLIENTS_QUERY_STALE_TIME,
);
