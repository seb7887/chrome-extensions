import { useEffect, useRef } from 'react';

export function useOnUpdate<T>(onUpdate: (prevValue: T) => void, value: T) {
  const isMounted = useRef<boolean>(false);

  const valueRef = useRef<T | void>(undefined);

  useEffect(() => {
    const prevValue = valueRef.current as T;
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      onUpdate(prevValue);
    }
    valueRef.current = value;
  }, [value]);
}
