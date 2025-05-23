import { useCallback } from "react";

type QueryParams = {
  get: (param: string) => string | null;
  set: (param: string, value: string) => void;
};

const useQueryParams = (
  paramString: string = window.location.search
): QueryParams => {
  const searchParams = new URLSearchParams(paramString);

  const setQueryStringParameter = useCallback(
    (name: string, value: string) => {
      searchParams.set(name, value);
      const newUrl = decodeURIComponent(
        `${window.location.pathname}?${searchParams.toString()}`
      );
      window.history.replaceState({}, "", newUrl);
    },
    [searchParams]
  );

  return {
    get: (param: string): string | null => {
      return searchParams.get(param);
    },
    set: (param: string, value: string): void => {
      setQueryStringParameter(param, value);
    },
  };
};

export default useQueryParams;
