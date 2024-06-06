import {
  CreateFieldReqI,
  updateFieldReqI,
} from '../../FarmServiceApiTypes/Field/Requests';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import { query } from '../../helepers/Api/QueryDriver';

export async function createField(data: CreateFieldReqI) {
  return query<CreateFieldReqI, FieldResponseBase>({
    type: 'POST',
    path: '/field',
    data,
  });
}
export async function editField(data: updateFieldReqI) {
  return query<updateFieldReqI, FieldResponseBase>({
    type: 'PUT',
    path: '/field/edit',
    data,
  });
}

export async function delField(data: FieldResponseBase) {
  return query<undefined, FieldResponseBase>({
    type: 'DELETE',
    path: '/field',
    config: {
      params: { id: data.id },
    },
  });
}
