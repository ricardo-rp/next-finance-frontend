import { useVW } from "./useVW";

const breakPoint = 768;

export function useIsMobile() {
  const viewPortWidth = useVW();

  if (viewPortWidth === undefined) return undefined;

  return viewPortWidth < breakPoint;
}
