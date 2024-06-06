import { t } from 'i18next';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { TranslationNames } from '../../locales/TranslationNames';
import { Api, ApiSelf } from '../../api/Api';
import { ResponseCode } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import { InvalidRequestCodes } from '../../FarmServiceApiTypes/InvalidRequestCodes';
import { QueryErrors } from '../../api/setup/QueryErrors';

export interface ErrorToastConfig {
  header: string;
  description: string;
}

type AllKeysDefined<T> = {
  [P in keyof T]-?: T[P];
};

export type Handlers<E extends number> = AllKeysDefined<
  Record<E, string | ErrorToastConfig>
>;

export interface QuerySettings<D> {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CUSTOM';
  path: string;
  data?: D;
  config?: AxiosRequestConfig;
  fnName?: string | keyof ApiSelf;
}

export async function query<QUERY_DATA, RESPONSE_DATA>({
  path,
  data,
  config,
  type,
  fnName,
}: QuerySettings<QUERY_DATA>): Promise<RESPONSE_DATA | undefined> {
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  try {
    switch (type) {
      case 'GET': {
        const response = await Api.get(path, config);
        return response?.payload;
      }
      case 'POST': {
        const response = await Api.post(path, data, config);
        return response?.payload;
      }
      case 'PUT': {
        const response = await Api.put(path, data, config);
        return response?.payload;
      }
      case 'DELETE': {
        const response = await Api.delete(path, config);
        return response?.payload;
      }
      case 'CUSTOM': {
        if (!fnName) {
          console.error('Custom function name is not provided');
          return undefined;
        }
        const response = await Api[fnName](path, data, config);
        return response.payload;
      }
      default: {
        return undefined;
      }
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response?.data;
      console.info(
        '\x1b[41m',
        `${type}: ${path}`,
        '\x1b[0m',
        '\x1b[31m',
        response,
        '\x1b[0m',
      );
      if (response?.code === ResponseCode.Error) {
        if (response.payload?.code) {
          const error = response.payload.code as InvalidRequestCodes;
          const conf = QueryErrors?.[error];
          if (typeof conf === 'string') throw new Error(conf || DEFAULT_MSG);
          else if (QueryErrors?.[error]) {
            throw new Error(undefined, {
              cause: QueryErrors[error] as ErrorToastConfig,
            });
          } else {
            console.error(
              'Undefined error handler',
              error,
              response.payload.message,
            );
          }
        }
      } else throw new Error(DEFAULT_MSG);
    } else throw new Error(DEFAULT_MSG);
  }
  throw new Error(DEFAULT_MSG);
}
