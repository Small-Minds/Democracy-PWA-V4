import { AxiosResponse } from 'axios';
import { api, preRequestRefreshAuth } from '../API';

const userUrl = `/api/users/me/`;

type UserInfo = {
  id: string;
  username: string;
  email: string;
  name: string;
};

export async function getElectionList(): Promise<UserInfo> {
  const token: string = await preRequestRefreshAuth();
  const res: AxiosResponse = await api.get(userUrl, {
    headers: { Authorization: `JWT ${token}` },
  });
  return res.data;
}
