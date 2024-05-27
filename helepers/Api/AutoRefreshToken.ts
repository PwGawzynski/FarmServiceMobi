/* ---------------------------------------AUTO_REFRESH_TOKENS--------------------------------------- */
import { ApiSelf } from '../../api/Api';

const API_EXCLUDED_FROM_AUTO_REFRESH = [
  'loginUser',
  'init',
  'googleLogin',
  'registerNewUser',
  'logout',
  'isMailFree',
  'saveTokensToSecureStoreFromResPayload',
];

export function methodDecorator(
  // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any,func-names
  descriptor.value = async function (...args: any[]) {
    //
    if (API_EXCLUDED_FROM_AUTO_REFRESH.includes(key))
      return originalMethod.apply(this, args);
    const tokenRestorationStart = Date.now();
    const tokens = await ApiSelf.session();
    const tokenRestorationEnd = Date.now();
    console.log(
      ` \n \n During execution ${key}, determined tokens as ${
        tokens ? 'actual' : 'stale(system executed Api.restoreTokens)'
      }, operation has been processed in  ~ ${
        tokenRestorationEnd - tokenRestorationStart
      } ms \n \n `,
    );
    return originalMethod.apply(this, args);
  };

  return descriptor;
}
