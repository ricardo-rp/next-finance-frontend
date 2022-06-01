import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUserPermissionLevel } from "./getUserPermissionLevel";
import { UserPermissionLevels } from "../types/UserPermissionLevels";

/**
 * @description Redirects user if their permissions do not match the `needsAuthToken` param
 * @param neededPermission - Whether or not the user needs to be authenticated to access the route
 * @param routeToBounce - The route to redirect to if the user does not have the correct permissions
 * @returns A boolean indicating whether or not the user should be redirected
 */
export function useRoutePermission(
  neededPermission: UserPermissionLevels,
  routeToBounce: string
) {
  const router = useRouter();

  const userPermission = getUserPermissionLevel();

  // If the user doesn't meet the permission requirements, they should be redirected
  const shouldRedirect = neededPermission > userPermission;

  useEffect(() => {
    if (shouldRedirect) router.replace(routeToBounce);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Server-side must always be assumed to have the correct permissions to allow for static optimization
  const isServerSide = typeof window === "undefined";
  if (isServerSide) return false;

  return shouldRedirect;
}
