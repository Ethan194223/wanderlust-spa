// src/utils/api.ts
import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosError,
  type AxiosHeaders,
  type AxiosRequestHeaders,
} from 'axios';

/* ──────────────────────────────────────────────────────────
   Axios instance
────────────────────────────────────────────────────────── */
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE ??
    import.meta.env.VITE_API_URL ??
    'http://localhost:3000',

  // Flip to `true` if you later switch to cookie-based auth
  withCredentials: false,
});

/* ───────── Request interceptor: inject JWT ───────── */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (!token) return config;

    // ── Case ① headers is an AxiosHeaders instance ──
    if (config.headers && 'set' in config.headers) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${token}`,
      );
    }
    // ── Case ② headers is undefined or a plain object ──
    else {
      // Cast to a mutable record *before* indexing
      const hdrs =
        (config.headers as AxiosRequestHeaders | undefined) ??
        ({} as Record<string, string>);

      hdrs['Authorization'] = `Bearer ${token}`;

      // Re-assign with a compatible type – satisfies TS
      config.headers = hdrs as unknown as AxiosRequestHeaders;
    }

    return config;
  },
);

/* ───────── Response interceptor: normalise errors ───────── */
axiosInstance.interceptors.response.use(
  res => res,
  (err: AxiosError) => {
    const msg =
      (err.response?.data as any)?.msg ||
      err.response?.statusText ||
      err.message;
    return Promise.reject(new Error(msg));
  },
);

/* ───────── fetch-style helper (unwraps .data, keeps generics) ───────── */
export async function api<T = unknown>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<T> {
  const res = await axiosInstance.request<T>({ url: path, ...config });
  return res.data;
}

/* Default export: raw Axios instance for edge cases */
export default axiosInstance;
