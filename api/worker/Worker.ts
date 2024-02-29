import { Api } from '../Api';

export async function workerData() {
  return (await Api.workerData()).payload;
}
