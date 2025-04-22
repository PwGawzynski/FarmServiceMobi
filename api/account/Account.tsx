import { UpdateAccountReqI } from '../../FarmServiceApiTypes/Account/Requests';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import { query } from '../../helepers/Api/QueryDriver';

export async function updateAccount(data: UpdateAccountReqI) {
  return query<UpdateAccountReqI, ResponseObject>({
    type: 'PUT',
    path: '/user/account-settings',
    data,
  });
}
