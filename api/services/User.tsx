import { LoginUser } from '../../FarmServiceApiTypes/User/LoginUser';
import {
  CreateUserReqI,
  UserResetPasswordReqI,
} from '../../FarmServiceApiTypes/User/Requests';
import { UserResponseBase } from '../../FarmServiceApiTypes/User/Responses';
import { query } from '../../helepers/Api/QueryDriver';

/**
 * Method used to get user data from api
 * @throws Error when session expired or something went wrong
 * @return UserResponseBase | undefined
 */
export async function me() {
  return query<undefined, UserResponseBase>({
    type: 'GET',
    path: '/user/me',
  });
}

/**
 * Method used to login user
 * @param data : LoginUser
 * @throws Error when credentials are wrong or something went wrong
 * @return UserResponseBase | undefined
 */
export async function login(
  data: LoginUser,
): Promise<UserResponseBase | undefined> {
  return query<LoginUser, UserResponseBase>({
    type: 'CUSTOM',
    path: '/user/login',
    data,
    fnName: 'loginUser',
  });
}

export async function resetPwd(data: UserResetPasswordReqI) {
  return query<UserResetPasswordReqI, UserResponseBase>({
    type: 'PUT',
    path: '/user/reset-password',
    config: {
      params: { email: data?.email },
    },
  });
}

export async function registerUser(data: CreateUserReqI) {
  return query<CreateUserReqI, UserResponseBase>({
    type: 'CUSTOM',
    path: '/user',
    data,
    fnName: 'registerNewUser',
  });
}

export async function loginByGoogle(idToken: string) {
  return query<string, UserResponseBase>({
    type: 'CUSTOM',
    path: '/auth/g-login',
    config: {
      params: { 'id-token': idToken },
    },
    fnName: 'googleLogin',
    queryCustomSettings: { treatAsText: true },
  });
}

export async function isMailFree(email: string) {
  return query<undefined, boolean>({
    type: 'CUSTOM',
    path: '/auth/exist',
    config: {
      params: { email },
    },
    fnName: 'isMailFree',
  });
}

export async function logout() {
  return query<undefined, undefined>({
    type: 'CUSTOM',
    path: '/user/logout',
    fnName: 'logout',
  });
}
