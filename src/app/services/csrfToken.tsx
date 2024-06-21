import { Options } from "../types/types";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL: string = "api/";
let csrfToken: string = "";
// Configurar instancia de Axios
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
});

// Interceptor para añadir el CSRF token a las cabeceras
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para obtener el token CSRF desde Laravel y almacenarlo en la variable csrfToken
const getCookie = async (): Promise<void> => {
  try {
    const url = `sanctum/csrf-cookie`;
    await axiosInstance.get(url);
    const xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="));
    if (xsrfToken) {
      csrfToken = xsrfToken.split("=")[1];
    }
  } catch (error) {
    throw new Error(`Error obtaining CSRF cookie: ${error}`);
  }
};

// Ejemplo de una solicitud POST después de obtener el CSRF token
const csrf_fetch = async (
  end: string,
  options: Options
): Promise<AxiosResponse | any> => {
  try {
    if (csrfToken === "") await getCookie();
    const url = `${end}`;
    return await axiosInstance({
      url,
      method: options.method,
      headers: {
        ...options.headers,
      },
      data: options.data,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 419) {
        await getCookie();
        return await csrf_fetch(end, options);
      } else {
        return error.response;
      }
    }
  }
};

export default csrf_fetch;
