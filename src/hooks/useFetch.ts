import { useAuth0 } from "@auth0/auth0-react";
import { useState, useCallback } from "react";
import * as Sentry from "@sentry/react";

const BASE_API_URL = import.meta.env.VITE_REACT_APP_BASE_API_URL;

interface FetchOptions<TBody> {
  method?: string;
  body?: TBody;
  returnHttpResponse?: boolean;
  id?: string | number;
  param?: string;
}

export interface UseFetchResponse<TData> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  Get: (options?: {
    id?: string | number;
    param?: string;
    returnHttpResponse?: boolean;
  }) => Promise<TData | Response | void>;
  Post: (options: {
    body: unknown;
    id?: string | number;
    param?: string;
    returnHttpResponse?: boolean;
  }) => Promise<TData | Response | void>;
  Put: (options: {
    body: unknown;
    id?: string | number;
    param?: string;
    returnHttpResponse?: boolean;
  }) => Promise<TData | Response | void>;
  Patch: (options: {
    body: unknown;
    id?: string | number;
    param?: string;
    returnHttpResponse?: boolean;
  }) => Promise<TData | Response | void>;
  Delete: (options?: {
    body?: unknown;
    id?: string | number;
    param?: string;
    returnHttpResponse?: boolean;
  }) => Promise<TData | Response | void>;
}

const useFetch = <TData = unknown>(
  endpoint: string,
  isPublic = false
): UseFetchResponse<TData> => {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async <TBody = unknown>({
      method = "GET",
      body,
      returnHttpResponse = false,
      id,
      param,
    }: FetchOptions<TBody>): Promise<TData | Response | void> => {
      setLoading(true);
      setError(null);

      try {
        const headers: Record<string, string> = {};

        if (!isPublic) {
          const token = await getAccessTokenSilently();
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        }

        if (body) {
          headers["Content-Type"] = "application/json";
        }

        let fullUrl = `${BASE_API_URL}${endpoint}`;
        if (id !== undefined) fullUrl += `/${id}`;
        if (param) fullUrl += `${param.startsWith("/") ? "" : "/"}${param}`;

        const response = await fetch(fullUrl, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });

        if (returnHttpResponse) return response;

        if (response.status === 400) {
          const text = await response.text();
          throw new Error(text || "Bad Request");
        }

        try {
          const json = await response.clone().json();
          setData(json);
          return json;
        } catch {
          const text = await response.text();
          setData(text as unknown as TData);
          return text as unknown as TData;
        }
      } catch (err: unknown) {
        Sentry.captureException(err, {
          extra: { endpoint, method, id, param },
        });
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, isPublic, getAccessTokenSilently]
  );

  const Get = useCallback(
    (options?: {
      id?: string | number;
      param?: string;
      returnHttpResponse?: boolean;
    }) => fetchData({ method: "GET", ...options }),
    [fetchData]
  );

  const Post = useCallback(
    (options: {
      body: unknown;
      id?: string | number;
      param?: string;
      returnHttpResponse?: boolean;
    }) => fetchData({ method: "POST", ...options }),
    [fetchData]
  );

  const Put = useCallback(
    (options: {
      body: unknown;
      id?: string | number;
      param?: string;
      returnHttpResponse?: boolean;
    }) => fetchData({ method: "PUT", ...options }),
    [fetchData]
  );

  const Patch = useCallback(
    (options: {
      body: unknown;
      id?: string | number;
      param?: string;
      returnHttpResponse?: boolean;
    }) => fetchData({ method: "PATCH", ...options }),
    [fetchData]
  );

  const Delete = useCallback(
    (options?: {
      body?: unknown;
      id?: string | number;
      param?: string;
      returnHttpResponse?: boolean;
    }) => fetchData({ method: "DELETE", ...options }),
    [fetchData]
  );

  return { data, loading, error, Get, Post, Put, Patch, Delete };
};

export default useFetch;
