import axios, { AxiosResponse } from "axios";
import CONFIG from "../config";

export type Methods = "get" | "delete" | "post" | "put" | "patch";
type ApiRequest = {
  [key in Methods]: (
    url: string,
    data?: any,
    config?: any,
  ) => Promise<AxiosResponse>;
};

const baseURL = `${CONFIG.SETUP.api}`;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${CONFIG.SETUP.userToken}`,
  },
});
const apiRequest: ApiRequest = {
  get: (url, request) => baseInstance.get(url, request),
  delete: (url, request) => baseInstance.delete(url, request),
  post: (url, data, config) => baseInstance.post(url, data, config),
  put: (url, data, config) => baseInstance.put(url, data, config),
  patch: (url, data, config) => baseInstance.patch(url, data, config),
};

export default apiRequest;
