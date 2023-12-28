import { AxiosError, HttpStatusCode } from 'axios';
import { Api } from '../Api';
import { ErrorCause } from '../../types/self/api/ErrorTypes';

/**
 * Method used when user login in app
 * @param loginData : LoginUser
 * @returns boolean to indicate that access is given or not
 * @throws Error as ErrorCause when server response with UNAUTHORIZED
 * @throws Error with only message on any other error
 */
export async function me() {
  const UNAUTHORIZED_MSG = 'Session expired, please login again';
  const DEFAULT_MSG = 'Something went wrong, try again later';
  try {
    return (await Api.me()).payload;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.response?.status);
      switch (e.response?.status) {
        case HttpStatusCode.Unauthorized:
          throw new Error(UNAUTHORIZED_MSG, {
            cause: HttpStatusCode.Unauthorized,
          } as ErrorCause);
        default:
          throw new Error(DEFAULT_MSG);
      }
    } else throw new Error(DEFAULT_MSG);
  }
}
