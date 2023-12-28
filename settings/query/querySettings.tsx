export const RETRY_MAX_ATTEMPTS =
  (Number.isNaN(Number(process.env.RETRY_MAX_ATTEMPTS)) &&
    Number(process.env.RETRY_MAX_ATTEMPTS)) ||
  5;
export const RETRY_INTERVAL =
  (Number.isNaN(Number(process.env.RETRY_INTERVAL)) &&
    Number(process.env.RETRY_INTERVALs)) ||
  1000;
