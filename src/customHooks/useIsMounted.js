import { useCallback, useEffect, useRef } from "react";

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const mounted = useCallback(() => isMounted.current, []);

  return mounted;
}

export default useIsMounted;
