import { useCallback, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const isThrottled = useRef<boolean>(false);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (!isThrottled.current) {
        callback(...args);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
  return throttledCallback as T;
}
