const tokenAccess = "token-access";
const tokenRefresh = "token-refresh";
import axios, { AxiosResponse } from "axios";

export function getAuthenticationToken() {
  return localStorage.getItem(tokenAccess);
}

export function setAuthenticationToken(token = "") {
  return localStorage.setItem(tokenAccess, token);
}

export function getRefreshToken() {
  return localStorage.getItem(tokenRefresh);
}

export function setRefreshToken(token = "") {
  return localStorage.setItem(tokenRefresh, token);
}

export function renewToken() {
  axios
    .post<Token>("http://127.0.0.1:8000/refresh", {
      refresh: getRefreshToken(),
    })
    .then((result) => {
      setAuthenticationToken(result.data.access);
    })
    .catch((error) => {
      console.log(error);
    });
}

interface Token {
  access: string;
}
