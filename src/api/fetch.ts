/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line max-classes-per-file
import { STORAGE_ACCESS_TOKEN, STORAGE_PROVIDER, STORAGE_REFRESH_TOKEN } from './constant';
import * as storage from './storage';
import type { IRequestInit, IResponse, ObjectLiteral } from './types';

export class HttpError extends Error {
  status: number;

  response: Response;

  statusText: string;

  constructor(response: Response) {
    const { status, statusText } = response;

    super(statusText || String(status));

    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

export async function fetchRequest<Data>(path: string, { host, method, headers, ...rest }: IRequestInit = {}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const apiDomain = host ?? import.meta.env.VITE_BASE_URL_ENDPOINT ?? '';
  const token = storage.get<string>(STORAGE_ACCESS_TOKEN);

  const headersConfig: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(headers && { ...headers }),
  };

  const response = await fetch(`${apiDomain}${path}`, { method, headers: headersConfig, ...rest });

  if (response.ok) {
    return response.json() as Data;
  }

  throw new HttpError(response);
}

export function sendJSON<Data>(
  path: string,
  params: ObjectLiteral = {},
  { body, headers, ...rest }: IRequestInit = {}
) {
  const config: IRequestInit = {
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      ...(headers && { ...headers }),
    },
    ...rest,
  };

  return fetchRequest<Data>(path, config);
}

export function sendFormData<Data>(
  path: string,
  params: Record<string, string | Blob> = {},
  { body, headers, ...rest }: IRequestInit = {}
) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(params)) formData.append(key, value);

  const config: IRequestInit = {
    body: formData,
    headers: {
      ...(headers && { ...headers }),
    },
    ...rest,
  };

  return fetchRequest<Data>(path, config);
}

export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export class HttpErrorWithResponse extends HttpError {
  errorResponse: IResponse<unknown>;

  constructor(response: Response, errorResponse: IResponse<unknown>) {
    super(response);

    this.errorResponse = errorResponse;
  }
}

const getAPIHeaders = () => {
  const headers = {
    'X-Origin': window.location.origin,
  };

  return headers;
};

export const logout = (showToast = true) => {
  if (storage.get(STORAGE_ACCESS_TOKEN)) {
    storage.remove(STORAGE_ACCESS_TOKEN);
    storage.remove(STORAGE_REFRESH_TOKEN);
    storage.remove(STORAGE_PROVIDER);
    storage.remove('perme-ex-auth');
    document.dispatchEvent(new CustomEvent('perme-logout'));
    if (showToast) {
      console.log('You have been logged out.');
    }
  }
};

const pendingRefreshTokenRequests = new Map();
let stopPolling = false;

// TODO: check again after BE implement
export const refreshToken = async () => {
  try {
    storage.set(STORAGE_ACCESS_TOKEN, undefined);

    const url = '/api/v1/auth/refresh-token';
    const params = {
      refresh_token: storage.get(STORAGE_REFRESH_TOKEN),
    };

    const previousController = pendingRefreshTokenRequests.get(url) as AbortController;
    const controller = new AbortController();

    pendingRefreshTokenRequests.set(url, controller);
    if (previousController) {
      const poll = () =>
        new Promise((_, reject) => {
          const timer = setInterval(() => {
            if (stopPolling) {
              clearInterval(timer);
              reject(stopPolling);
            }
          }, 100);
        });

      try {
        await poll();
        controller.abort();
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    const res = await sendJSON<IResponse<IRefreshTokenResponse>>(url, params, {
      method: 'POST',
      headers: getAPIHeaders(),
      signal: controller.signal,
    });
    const data = res?.data;

    stopPolling = true;
    storage.set(STORAGE_ACCESS_TOKEN, data?.access_token);
    storage.set(STORAGE_REFRESH_TOKEN, data?.refresh_token);
    return data;
  } catch (error) {
    console.error(error);
    stopPolling = true;
    logout();
    return null;
  }
};

export const handlerTokenError = async <Data>(error: HttpError, retryRequest?: () => Promise<Data>) => {
  const errorResponse = (await error?.response?.json()) as IResponse<unknown>;

  if (error.status === 401 || errorResponse?.code === 20001 || errorResponse?.code === 20002) {
    // handle access token expired
    const refreshData = await refreshToken();

    if (refreshData) {
      try {
        const res = (await retryRequest?.()) as Data;

        stopPolling = false;
        pendingRefreshTokenRequests.clear();
        return res;
      } catch {
        const res = (await retryRequest?.()) as Data;

        stopPolling = false;
        pendingRefreshTokenRequests.clear();
        return res;
      }
    }
  }
  if (error.status === 403 || errorResponse?.code === 20014) {
    logout(false);
    console.log('Your login session has expired. Please login again');
  }
  if (errorResponse?.code === 34012) {
    console.log('Please try to log in after processing the withdrawal from Perme.');
  }
  return new HttpErrorWithResponse(error?.response, errorResponse);
};

export const errorHandler = async <Data>(error: HttpError, retryRequest?: () => Promise<Data>) => {
  const errorRes = (await handlerTokenError(error, retryRequest)) as HttpErrorWithResponse;

  if (errorRes?.errorResponse?.code === 34012) return error;

  switch (error.status) {
    case 401:
    case 403: {
      break;
    }
    case 504: {
      console.log(
        'Due to an excessive number of requests to the server, it was unable to function properly. Please try again in a moment.'
      );

      break;
    }
    default: {
      console.log('Server connection failed. Please try again shortly.');
      break;
    }
  }
  return error;
};

export const getAPI = async <Data>(path: string, { method = 'GET', ...rest }: IRequestInit = {}): Promise<Data> => {
  try {
    const res = await fetchRequest<IResponse<Data>>(path, {
      method,
      headers: getAPIHeaders(),
      ...rest,
    });

    return res.data as Data;
  } catch (error) {
    const data = (await handlerTokenError(error as HttpError, () => getAPI(path, { method, ...rest }))) as
      | HttpError
      | Data;

    if ((data as HttpError)?.status) {
      throw data as HttpError;
    } else {
      return data as Data;
    }
  }
};

export const postAPI = async <Data>(
  path: string,
  params: ObjectLiteral = {},
  { method = 'POST', ...rest }: IRequestInit = {},
  hasGlobalError: boolean = true
) => {
  try {
    const res = await sendJSON<IResponse<Data>>(path, params, { method, headers: getAPIHeaders(), ...rest });

    return res.data as Data;
  } catch (error) {
    if (hasGlobalError) {
      throw await errorHandler(error as HttpError, () => postAPI(path, params, { method, ...rest }));
    }
    const errorData = (await handlerTokenError(error as HttpError, () =>
      postAPI(path, params, { method, ...rest })
    )) as HttpError | IResponse<Data>;

    if ((errorData as HttpError).status) {
      throw errorData as HttpError;
    }
    return errorData;
  }
};

export const deleteAPI = async <Data>(
  path: string,
  { method = 'DELETE', ...rest }: IRequestInit = {},
  hasGlobalError: boolean = true
) => {
  try {
    const res = await fetchRequest<IResponse<Data>>(path, { method, headers: getAPIHeaders(), ...rest });

    return res.data as Data;
  } catch (error) {
    if (hasGlobalError) {
      throw await errorHandler(error as HttpError, () => deleteAPI(path, { method, ...rest }));
    }
    const errorData = (await handlerTokenError(error as HttpError, () => deleteAPI(path, { method, ...rest }))) as
      | HttpError
      | IResponse<Data>;

    if ((errorData as HttpError).status) {
      throw errorData as HttpError;
    }
    return errorData;
  }
};
