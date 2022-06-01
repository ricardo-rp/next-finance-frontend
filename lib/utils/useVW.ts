import { useEffect, useState } from "react";

export function useVW() {
  // Initialize state with undefined so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [viewportWidth, setViewportWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      const handleResize = () => setViewportWidth(window.innerWidth);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return viewportWidth;
}
