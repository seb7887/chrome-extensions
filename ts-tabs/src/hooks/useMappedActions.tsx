import { useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { mapValues } from 'lodash';

export function useMappedActions<T>(actionsObj: T): T {
  const dispatch = useDispatch();
  // @ts-ignore
  return mapValues(actionsObj, value => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCallback((...args) => dispatch(value(...args)), []);
  });
}
