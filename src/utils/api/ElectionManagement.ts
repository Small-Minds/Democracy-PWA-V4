import { AxiosResponse } from 'axios';
import { api } from '../API';

const electionURL = `/elections/manage/election/`;

export type Election = {
  id: string;
  created: Date;
  title: string;
  description: string;
};

export async function create(
  formData: any,
  accessToken: string
): Promise<Election> {
  return api
    .post(electionURL, formData, {
      headers: { Authorization: `JWT ${accessToken}` },
    })
    .then((res) => {
      const election: Election = res.data;
      return election;
    });
}

export async function list(accessToken: string): Promise<AxiosResponse> {
  return api.get(electionURL, {
    headers: { Authorization: `JWT ${accessToken}` },
  });
}
