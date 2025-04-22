/* ---------------------------------------DECORATOR_USED_TO_DELAY_RES--------------------------------------- */

const DELAY_TIME = 2000;

function delayRes() {
  return process.env.EXPO_PUBLIC_IS_DEV === 'true'
    ? new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, DELAY_TIME);
      })
    : true;
}

export const IsDelayed = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any,func-names
    descriptor.value = async function (...args: any[]) {
      const delayStart = Date.now();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      await delayRes();
      const delayEnd = Date.now();
      console.log(
        `\n \n Method ${key} has been delayed about ~ ${
          delayEnd - delayStart
        } ms \n \n `,
      );
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
};
