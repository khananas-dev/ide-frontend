import React from "react";

export function useStateHistory<T>(
  initialValue?: T | (() => T)
): [T | undefined, (state: T) => void, Array<T | undefined>] {
  const stateHistoryRef = React.useRef<Array<T | undefined>>([]);
  const [state, setState] = React.useState<T | undefined>(initialValue);

  React.useEffect(() => {
    stateHistoryRef.current = [...stateHistoryRef.current, state];
  }, [state]);

  return [state, setState, stateHistoryRef.current];
}
