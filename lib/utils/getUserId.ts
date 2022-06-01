import decode from "jwt-decode";
import { getAuthToken } from "../services/storage/authToken";

export function getUserId() {
  const token = getAuthToken();

  if (token === null) return null;

  const decodeToken = decode<{ sub: string }>(token);

  return decodeToken.sub;
}
