export const MIN_QUERY_RETRY_COUNT =
  (Number.isNaN(Number(process.env.MIN_QUERY_RETRY_COUNT)) &&
    Number(process.env.MIN_QUERY_RETRY_COUNT)) ||
  3;
export const QUERY_RETRY_DELAY_MULTIPLICATION =
  (Number.isNaN(Number(process.env.QUERY_RETRY_DELAY_MULTIPLICATION)) &&
    Number(process.env.QUERY_RETRY_DELAY_MULTIPLICATION)) ||
  1000;
