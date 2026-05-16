/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import qs from "qs";

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  constructor(message: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
  code?: string;
}

const handleResponse = (response: AxiosResponse<string, unknown>) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(response.statusText);
};

const handleError = (error: AxiosError | Error): never => {
  if ("response" in error && error.response) {
    if ((error.response?.data as Record<string, any>)?.error?.code === 429) {
      throw new ApiError(
        "Too many requests. Please Retry after 30 seconds.",
        "429",
      );
    }

    const missingPermissions = (error.response?.data as Record<string, any>)
      ?.data?.missingPermissions;
    if (Array.isArray(missingPermissions) && missingPermissions.length > 0) {
      throw new ApiError(JSON.stringify(error.response), "403");
    }

    const errorData = error.response?.data as Record<string, any>;
    throw new ApiError(
      errorData?.msg ||
        errorData?.message ||
        errorData?.body?.error ||
        "Something went wrong",
      errorData?.error?.code,
    );
  } else if ("request" in error && error.request) {
    throw new ApiError("No response received from the server");
  } else {
    throw new ApiError(
      error.message || "Something went wrong",
      "response" in error
        ? (error.response?.data as Record<string, any>)?.error?.code
        : undefined,
    );
  }
};

type HeadersInit =
  | RawAxiosRequestHeaders
  | {
      headers?: RawAxiosRequestHeaders;
      [key: string]: unknown;
    };

const normalizeHeaders = (input?: HeadersInit): RawAxiosRequestHeaders => {
  if (!input || typeof input !== "object") {
    return {};
  }

  const normalized = { ...(input as RawAxiosRequestHeaders) };
  const maybeNested = (input as Record<string, unknown>).headers;

  if (
    maybeNested &&
    typeof maybeNested === "object" &&
    !Array.isArray(maybeNested)
  ) {
    delete (normalized as Record<string, unknown>).headers;
    return {
      ...normalized,
      ...(maybeNested as RawAxiosRequestHeaders),
    };
  }

  return normalized;
};

export const getToken = () => localStorage.getItem("__token");
export const getCompany = () => localStorage.getItem("__activeCompany");
export const getParentCompany = () => localStorage.getItem("__parentCompany");
export const getImpersonatedUser = () => {
  const impersonationData = JSON.parse(
    localStorage.getItem("__impersonation") || "{}",
  );
  return impersonationData.impersonatedUser || null;
};

export const logout = (cb?: () => void) => {
  localStorage.removeItem("__activeCompany");
  localStorage.removeItem("__parentCompany");
  localStorage.removeItem("__token");
  localStorage.removeItem("__sidebarOpen");
  localStorage.removeItem("__impersonation");
  sessionStorage.clear();
  if (cb) cb();
};

const apiRequest = async (
  method: string,
  path: string,
  payload: Record<string, unknown> | null = null,
  headers: HeadersInit = {},
  secure: boolean,
  configOverrides: AxiosRequestConfig = {},
) => {
  let url = `${API_BASE_URL}${path}`;
  const methodIsGet = method === "GET" || method === "DELETE";

  if (methodIsGet) {
    url = payload ? `${url}?${qs.stringify(payload)}` : url;
  }

  const resolvedHeaders = normalizeHeaders(headers);
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...resolvedHeaders,
    },
    ...configOverrides,
  };

  if (payload && !methodIsGet) {
    config.data = payload;
  }

  if (secure) {
    const token = getToken();
    const activeCompany = getCompany();
    const parentCompany = getParentCompany();
    const impersonatedUser = getImpersonatedUser();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}${
        activeCompany && parentCompany
          ? ` ${activeCompany} ${parentCompany}`
          : activeCompany
            ? ` ${activeCompany}`
            : ""
      }`;
      if (impersonatedUser) {
        config.headers.Authorization = `${config.headers.Authorization} ${impersonatedUser.id}`;
      }
    } else {
      throw new Error("Need to login first. Please login and try again.");
    }
  }

  try {
    const response = await axios(config);
    return handleResponse(response);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError?.response?.status === 401) {
      logout();
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }
    handleError(axiosError);
  }
};

export const get = (
  path: string,
  queryParams: Record<string, unknown> = {},
  headers: HeadersInit = {},
  secure = true,
  configOverrides: AxiosRequestConfig = {},
) => {
  return apiRequest("GET", path, queryParams, headers, secure, configOverrides);
};
export const post = (
  path: string,
  body: Record<string, unknown>,
  headers: HeadersInit = {},
  secure = true,
) => {
  return apiRequest("POST", path, body, headers, secure);
};
export const put = (
  path: string,
  body: Record<string, unknown>,
  headers: HeadersInit = {},
  secure = true,
) => {
  return apiRequest("PUT", path, body, headers, secure);
};
export const patch = (
  path: string,
  body: Record<string, unknown>,
  headers: HeadersInit = {},
  secure = true,
) => {
  return apiRequest("PATCH", path, body, headers, secure);
};
export const del = (
  path: string,
  queryParams: Record<string, unknown> = {},
  headers: HeadersInit = {},
  secure = true,
) => {
  return apiRequest("DELETE", path, queryParams, headers, secure);
};
