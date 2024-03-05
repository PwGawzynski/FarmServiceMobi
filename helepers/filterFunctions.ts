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
