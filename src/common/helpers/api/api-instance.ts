import axios, { AxiosResponseTransformer } from "axios";

function transformResponse(
  input: string
): AxiosResponseTransformer | AxiosResponseTransformer[] {
  return JSON.parse(input);
}

const apiInstance = axios.create({
  transformResponse: [
    (data) => {
      try {
        return data && typeof data === "string"
          ? transformResponse(data)
          : data;
      } catch (e) {
        return data;
      }
    },
  ],
});

export default apiInstance;
