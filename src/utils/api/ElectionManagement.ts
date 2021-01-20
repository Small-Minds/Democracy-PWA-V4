import { AxiosResponse } from 'axios';
import { api } from '../API';

const createURL = `/elections/manage/election/`;

export async function create(
  formData: any,
  accessToken: string
): Promise<AxiosResponse> {
  return api.post(createURL, formData, {
    headers: { Authorization: `JWT ${accessToken}` },
  });
}
