import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | void {
  const ref = useRef<T | void>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
