import { useState, useEffect } from "react";

export type LoaderFunction<T, A extends any[] = any[]> = (...args: A) => Promise<T>;

export interface LoaderResult<T = any> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useLoader = <T = any, A extends any[] = any[]>(
  fn: LoaderFunction<T, A>,
  dependencies: ReadonlyArray<any>,
  ...args: A
): LoaderResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fn(...args);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};