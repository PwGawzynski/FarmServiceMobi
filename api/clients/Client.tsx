import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import {
  CreateClientReqI,
  UpdateClientReqI,
} from '../../FarmServiceApiTypes/Clients/Requests';
import {
  CreateClientsCompanyReqI,
  UpdateClientsCompanyReqI,
} from '../../FarmServiceApiTypes/ClientsCompany/Requests';
import { ClientsCompanyResponseBase } from '../../FarmServiceApiTypes/ClientsCompany/Responses';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import { query } from '../../helepers/Api/QueryDriver';

export async function createClient(data: CreateClientReqI) {
  return query<CreateClientReqI, ClientResponseBase>({
    type: 'POST',
    path: '/clients',
    data,
  });
}

export async function assignCompanyToClient(data: CreateClientsCompanyReqI) {
  return query<CreateClientsCompanyReqI, ClientsCompanyResponseBase>({
    type: 'POST',
    path: '/clients-company',
    data,
  });
}

export async function updateClientsCompany(data: UpdateClientsCompanyReqI) {
  return query<UpdateClientsCompanyReqI, ClientsCompanyResponseBase>({
    type: 'PUT',
    path: '/clients-company',
    data,
  });
}

export async function updateClient(data: UpdateClientReqI) {
  return query<UpdateClientReqI, ClientResponseBase>({
    type: 'PUT',
    path: '/clients',
    data,
  });
}

export async function getClients() {
  return query<undefined, ClientResponseBase[]>({
    type: 'GET',
    path: '/clients/all',
  });
}
export async function getClientFields(id: string) {
  return query<undefined, FieldResponseBase[]>({
    type: 'GET',
    path: '/field/all',
    config: {
      params: { client: id },
    },
  });
}
