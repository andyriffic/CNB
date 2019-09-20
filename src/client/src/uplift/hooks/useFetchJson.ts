import { useEffect, useState } from 'react';

type UseFetchJson<T> = [boolean, T | undefined];

export function useFetchJson<T>(url: string): UseFetchJson<T> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();

  useEffect(() => {
    fetch(url, {
      cache: 'no-store',
    }).then(resp => {
      resp.json().then((data: T) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return [loading, data];
}
