export const TOAST_DURATION =
  (Number.isNaN(Number(process.env.TOAST_DURATION)) &&
    Number(process.env.TOAST_DURATION)) ||
  3000;
