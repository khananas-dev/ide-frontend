import { AxiosError } from "axios";
import { ToastService } from "../../../components/toast/ToastService";
import { logoutUserStore } from "../../store/features/auth/loginSlice";
import apiInstance from "./api-instance";

const apiInterceptorSetup = (store: any) => {
  const { dispatch } = store;
  apiInstance.interceptors.response.use(
    (res) => {
      console.log("This is the res in side the api interceptor", res);
      return res;
    },
    async (err: AxiosError) => {
      console.log("This is the error in side the api interceptor", err);

      if (err.response?.status === 409) {
        dispatch().then((val: any) => {
          logoutUserStore(store.getState().auth.userDetails.userId);
          ToastService.info("Session Timeout, Please login again");
        });
      } else if (err.response?.status === 401) {
        // Incorrect User or Password
        ToastService.error((err.response.data as any).errorMsg);
      }
      return Promise.reject(err);
    }
  );
};

export default apiInterceptorSetup;
