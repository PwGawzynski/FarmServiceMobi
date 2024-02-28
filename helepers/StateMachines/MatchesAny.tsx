// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function matchesAny(state: any, ...args: any[]) {
  return args.some(arg => state.matches(arg));
}
