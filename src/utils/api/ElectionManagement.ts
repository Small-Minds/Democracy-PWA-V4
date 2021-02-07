import { AxiosResponse } from 'axios';
import { api, getAccessToken, preRequestRefreshAuth } from '../API';

const electionURL = `/elections/manage/election/`;
const electionParticipationURL = `/elections/participate/election/`;

export type EmptyElection = {
  id: string;
  created: Date;
  title: string;
  description: string;
};

export type Position = {
  id: string;
  candidate: Array<string>;
  title: string;
  description: string;
  election: string;
};

export type Election = {
  created: string;
  description: string;
  election_email_domain: string;
  enable_multiple_submissions: boolean;
  id: string;
  manager: string;
  positions: Array<Position>;
  submission_end_time: string;
  submission_start_time: string;
  title: string;
  voting_end_time: string;
  voting_start_time: string;
};

export async function create(
  formData: any,
  accessToken: string
): Promise<EmptyElection> {
  await preRequestRefreshAuth();
  return api
    .post(electionURL, formData, {
      headers: { Authorization: `JWT ${accessToken}` },
    })
    .then((res) => {
      const election: EmptyElection = res.data;
      return election;
    });
}

export async function getPublicElectionList(
): Promise<AxiosResponse> {
  await preRequestRefreshAuth();
  const { token } = await getAccessToken();
  await preRequestRefreshAuth();
  return api.get(electionParticipationURL, {
    headers: { Authorization: `JWT ${token}` },
  });
}

export async function getElectionList(): Promise<AxiosResponse> {
  await preRequestRefreshAuth();
  const { token } = await getAccessToken();
  return api.get(electionURL, {
    headers: { Authorization: `JWT ${token}` },
  });
}

export async function getElection(
  electionId: string
): Promise<AxiosResponse> {
  await preRequestRefreshAuth();
  const { token } = await getAccessToken();
  let config = {
    headers: { Authorization: `JWT ${token}` },
    params: {
      id: electionId,
    },
  };
  return api.get(electionURL + electionId, config);
}
