import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { createContext } from 'react';
import { getBackendURL } from './Urls';

export const add = (a: number, b: number): number => {
  return a + b;
};

axiosRetry(axios, { retries: 5 });
const backendUrl = getBackendURL();
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create({
  baseURL: getBackendURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100,
});

// DO NOT USE AXIOS OUTSIDE OF THIS PAGE.
// Instead, import the 'api' object exported from this file.

// Token Info
// Access Token expires after five minutes.
// Refresh Token expires after 14 days.

// Build URLs
// const registrationURL = `${backendUrl}/rest-auth/registration/`;
const loginURL = `${backendUrl}/api/token/obtain/`;
const refreshURL = `${backendUrl}/api/token/refresh/`;
const awakeURL = `${backendUrl}/api/awake/`;


export function getAccessToken() {
  const token = localStorage.getItem('token') || null;
  const expiry =
    Date.parse(localStorage.getItem('token-expiry') || '') || undefined;
  const data = {
    token: token,
    expiry: expiry,
  };
  return data;
}

export function getRefreshToken() {
  const token = localStorage.getItem('refresh-token') || null;
  const expiry =
    Date.parse(localStorage.getItem('refresh-token-expiry') || '') || undefined;

  const data = {
    refreshToken: token,
    refreshTokenExpiry: expiry,
  };
  return data;
}

export function setNewAccessToken(token: string) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  localStorage.setItem('token', token);
  localStorage.setItem('token-expiry', now.toDateString());
}

export function setNewRefreshToken(token: string) {
  const now = new Date(Date.now() + 12096e5); // Now + two weeks in ms.
  localStorage.setItem('refresh-token', token);
  localStorage.setItem('refresh-token-expiry', now.toDateString());
}

export function wakeUpBackend(successFunction: () => null) {
  api
    .get(awakeURL, config)
    .then((response) => {
      if (response.status === 200) {
        successFunction();
      } else {
        console.error('Backend returned an invalid code.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function login(
  username: string,
  password: string,
  errorMsgFunction: (err: Error) => any,
  successFunction: (response: AxiosResponse) => any
) {
  console.log(`POSTing login url: ${loginURL}`);
  api
    .post(
      loginURL,
      {
        username: username,
        password: password,
      },
      config
    )
    .then((response) => {
      console.log('Got response from backend:');
      console.log(response);
      if (
        response.data &&
        response.data.access !== null &&
        response.data.refresh !== null
      ) {
        setNewAccessToken(response.data.access);
        setNewRefreshToken(response.data.refresh);
        successFunction(response);
      } else {
        const msg = 'Received an unexpected response from the server.';
        console.error(msg);
      }
    })
    .catch((error) => {
      errorMsgFunction(error);
    });
}
export function logout(afterFunction: () => any) {
  localStorage.removeItem('token');
  localStorage.removeItem('token-expiry');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('refresh-token-expiry');
  afterFunction();
}

export async function preRequestRefreshAuth() {
  isAuthenticated().then((result) => {
    return result;
  });
}

export async function isAuthenticated() {
  // If the access token is valid, return true immediately.
  if (isAccessTokenValid()) {
    console.log('Access token is still valid.');
    return true;
  }
  // If the refresh token is valid, attempt to get a new access token.
  if (isRefreshTokenValid()) {
    console.log('Getting new access token using refresh token...');
    const refreshToken = localStorage.getItem('refresh-token') || null;
    if (refreshToken == null) return false; // Fail if no refresh token.
    try {
      const response = await api.post(
        refreshURL,
        {
          refresh: refreshToken,
        },
        config
      );
      // Response should contain new access token.
      if (response.data.access) {
        console.log('Success, got new access token.');
        setNewAccessToken(response.data.access);
        return true;
      } else {
        console.log('Failure, please log in again.');
        throw new Error('No access token in refresh response.');
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  // If neither of these operations is successful, return false.
  return false;
}

export function isAccessTokenValid() {
  const { token, expiry } = getAccessToken();
  if (token == null || expiry == null) return false;
  console.log('Access Token exists, checking expiry...');
  return isExpiryDateValid(expiry);
}

export function isRefreshTokenValid() {
  const { refreshToken, refreshTokenExpiry } = getRefreshToken();
  if (refreshToken == null || refreshTokenExpiry == null) return false;
  console.log('Refresh Token exists, checking expiry...');
  return isExpiryDateValid(refreshTokenExpiry);
}

export function isExpiryDateValid(date: Date | number) {
  const now = new Date();
  if (date instanceof Date) {
    return date.getTime() >= now.getTime();
  } else if (typeof date === 'number') {
    return date >= now.getTime();
  }
  console.error('Provided date is invalid.');
  return false;
}
