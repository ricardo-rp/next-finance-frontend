import { getAuthToken } from "../services/storage/authToken";
import jwtDecode from "jwt-decode";
import { UserPermissionLevels } from "../types/UserPermissionLevels";
import { userInfo } from "os";

interface IJwtData {
  nickname: string;
  username: string;
  sub: string;
  evo: {
    _id: string;
    name: string;
  };
  iat: number;
  exp: number;
}

export function getUserPermissionLevel(): UserPermissionLevels {
  const token = getAuthToken();

  if (token === null) return UserPermissionLevels.unauthed;

  const jwtData = jwtDecode<IJwtData>(token);

  if (jwtData.evo === undefined) return UserPermissionLevels.authed;

  return UserPermissionLevels.evo;
}
