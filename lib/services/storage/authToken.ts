const tokenKey = "authToken";

const isServerSide = typeof window === "undefined";

export function setAuthToken(token: string) {
  if (isServerSide) return;

  window.localStorage.setItem(tokenKey, token);
}

export function getAuthToken() {
  if (isServerSide) return null;

  return window.localStorage.getItem(tokenKey);
}

export function deleteAuthToken() {
  if (isServerSide) return;

  window.localStorage.removeItem(tokenKey);
}
