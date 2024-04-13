import { FieldResponseBase } from '../FarmServiceApiTypes/Field/Ressponses';
import { MachineResponseBase } from '../FarmServiceApiTypes/Machine/Responses';
import { OrderResponseBase } from '../FarmServiceApiTypes/Order/Ressponses';
import { ClientResponseBase } from '../FarmServiceApiTypes/Clients/Responses';

export const searchEngineNameSurnameFilter = <
  T extends { personalData: { name: string; surname: string } },
>(
  data: Array<T> | undefined,
  filter: string | undefined,
) =>
  data
    ?.filter(worker =>
      filter
        ? (worker.personalData.name.trim() + worker.personalData.surname.trim())
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      a.personalData.surname.toLowerCase() >
      b.personalData.surname.toLowerCase()
        ? 1
        : -1,
    );

export const clientFieldsFilter = (
  data: FieldResponseBase[] | undefined,
  filter: string | undefined,
) =>
  data
    ?.filter(f =>
      filter
        ? f.nameLabel
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      a.nameLabel.toLowerCase() > b.nameLabel.toLowerCase() ? 1 : -1,
    );

export const machineFilter = (
  data: MachineResponseBase[] | undefined,
  filter: string | undefined,
) =>
  data
    ?.filter(m =>
      filter
        ? (m.name + m.licensePlate)
            .trim()
            .replaceAll(' ', '')
            .toLowerCase()
            .includes(filter.toLowerCase().replaceAll(' ', ''))
        : true,
    )
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

export const filterOrder = (
  data: OrderResponseBase[] | undefined,
  filter: string | undefined,
) =>
  data
    ?.filter(order =>
      filter
        ? order.name
            .trim()
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      new Date(a.performanceDate).getTime() >
      new Date(b.performanceDate).getTime()
        ? 1
        : -1,
    );

export const clientListFilter = (
  data: ClientResponseBase[] | undefined,
  filter: string | undefined,
) =>
  data
    ?.filter(client =>
      filter
        ? (
            client.user.personal_data.name.trim() +
            client.user.personal_data.surname.trim()
          )
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      a.user.personal_data.surname.toLowerCase() >
      b.user.personal_data.surname.toLowerCase()
        ? 1
        : -1,
    );
