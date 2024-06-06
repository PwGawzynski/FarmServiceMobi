import { CreateCompanyReqI } from '../../FarmServiceApiTypes/Company/Requests';
import { CompanyResponseBase } from '../../FarmServiceApiTypes/Company/Responses';
import { query } from '../../helepers/Api/QueryDriver';

export async function createCompany(data: CreateCompanyReqI) {
  return query<CreateCompanyReqI, CompanyResponseBase>({
    type: 'POST',
    path: '/company',
    data,
  });
}
