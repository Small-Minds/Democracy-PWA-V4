import { AxiosResponse } from 'axios';
import { api } from '../API';

const aliveURL = `/alive/alive/`;

export async function alive(): Promise<AxiosResponse> {
  return api.get(aliveURL).then((response) => {
    console.log(response);
    return response;
  });
}
