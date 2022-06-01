import Router from "next/router";
import { useMutation } from "react-query";
import { setAuthToken } from "../../storage/authToken";
import { axiosInstance } from "../axios";

type LoginParams = { username: string; password: string };
type LoginData = { access_token: string };

const login = async ({ username, password }: LoginParams) => {
  const { data } = await axiosInstance.post("login", { username, password });

  return data;
};

function handleLoginSuccess(loginData: LoginData) {
  setAuthToken(loginData.access_token);
  Router.push("home");
}

export function useLogin() {
  return useMutation("login", login, { onSuccess: handleLoginSuccess });
}
