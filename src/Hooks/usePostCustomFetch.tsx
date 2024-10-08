import {useEffect, useState} from 'react';
import {FetchResponsePOST} from '../../../../../Types/Types';

const usePostCustomFetch = <Data extends any, Param extends any>(
  url: RequestInfo,
  method?: 'PATCH' | 'DELETE',
): FetchResponsePOST<Data, Param> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>(null);
  const [serverError, setServerError] = useState(null);

  const fetcher = async (param?: Param, token?: any, isForm?: boolean) => {
    setIsLoading(true);
    try {
      const request = await fetch(url, {
        method: method || 'POST',
        headers: {
          Accept: 'application/json',
          ...(!isForm && {'Content-Type': 'application/json'}),
          ...(token && {Authorization: `Bearer ${token}`}),
        },
        ...(param && {
          body: isForm ? (param as any) : JSON.stringify(param),
        }),
      });

      const response = await request.json();
      if (response.error) {
        setServerError(response);
      } else {
        setApiData(response);
      }

      setIsLoading(false);
    } catch (error: any) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  const clear = () => {
    setIsLoading(false);
    setApiData(null);
    setIsLoading(false);
    setServerError(null);
  };

  return {
    response: apiData,
    error: serverError,
    loading: isLoading,
    fetcher,
    clear,
  };
};

export default usePostCustomFetch;
