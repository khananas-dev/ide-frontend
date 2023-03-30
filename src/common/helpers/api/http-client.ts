import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseTransformer,
} from "axios";
import { AppConfig, IMicroServicesPort } from "../../config/app.config";
import store from "../../store";
import apiInstance from "./api-instance";
import { IApiResponseStruct } from "./api-response";

export default class HttpClient {
  // Here you can use your server URL

  private static readonly baseURL: string =
    process.env.REACT_APP_API_BASEURL || AppConfig.apiURL;

  private static buildHeader(obj = {}): AxiosRequestHeaders {
    const header: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const token = store.getState()?.auth?.token;
    if (token) {
      header["x-access-token"] = token;
    }
    Object.assign(header, obj);

    return header;
  }

  private static client(): AxiosInstance {
    const axiosInstance = apiInstance;
    axiosInstance.interceptors.request.use((value) => {
      const service: IMicroServicesPort = value.url?.split(
        "/"
      )[1] as IMicroServicesPort;
      const port = AppConfig.microServices[service];
      if (port) {
        value.baseURL = this.baseURL + port;
      } else {
        value.baseURL = this.baseURL + ":8080";
      }
      value.headers = this.buildHeader();
      return value;
    });
    return axiosInstance;
  }

  /**
   *
   * @param url
   * @returns
   */
  public static get(
    url: string,
    meta?: any
  ): Promise<AxiosResponse<IApiResponseStruct>> {
    return this.client().get(url);
  }

  /**
   *
   * @param url
   * @param payload
   * @returns
   */
  public static post<T>(
    url: string,
    payload: T,
    meta?: any
  ): Promise<AxiosResponse<IApiResponseStruct>> {
    return this.client().post(url, payload);
  }

  public static patch<T>(
    url: string,
    payload: T,
    meta?: any
  ): Promise<AxiosResponse<IApiResponseStruct>> {
    return this.client().patch(url, payload);
  }

  public static put<T>(
    url: string,
    payload?: T,
    meta?: any
  ): Promise<AxiosResponse<IApiResponseStruct>> {
    return this.client().put(url, payload);
  }

  public static delete(
    url: string,
    meta?: any
  ): Promise<AxiosResponse<IApiResponseStruct>> {
    return this.client().delete(url);
  }
}
