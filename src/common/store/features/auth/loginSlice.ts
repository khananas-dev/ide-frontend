import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastService } from "../../../../components/toast/ToastService";
import HttpClient from "../../../helpers/api/http-client";
import { useAppDispatch } from "../../hooks";

interface AuthState {
  token?: string | undefined;
  userDetails?: any;
  navModules?: any[];
  loading: boolean;
  error?: string | undefined;
}

const initialState: AuthState = {
  token: undefined,
  userDetails: undefined,
  navModules: undefined,
  loading: false,
  error: undefined,
};

export const createUser = createAsyncThunk(
  "auth/signup",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.post("/api/auth/signup", payload);
      return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const loginUserAPI = createAsyncThunk(
  "auth/login",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.post(
        "/api/auth/signin",
        payload,
        "login"
      );
      return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

export const logoutUserStore = createAsyncThunk(
  "auth/logout",
  async (payload: any, thunkAPI) => {
    try {
      // const response = await HttpClient.get(
      //   `/login-service/api/logout/${payload}`,
      //   "login"
      // );
      thunkAPI.dispatch({ type: "logout/LOGOUT" });
      localStorage.clear();
      // return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

export const getUserProfileDetailsAPI = createAsyncThunk(
  "userLogin/profile",
  async (payload: void, thunkAPI) => {
    try {
      const response = await HttpClient.get("/api/usersById", "admin");
      if (response.data?.error) return thunkAPI.rejectWithValue(response.data);
      return response.data;
      // const response = await  HttpClient.get("/admin-service/admin/userProfile/getUserProfileByUserId","admin");
      // return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

export const getUserNavDetailsAPI = createAsyncThunk(
  "userLogin/nav",
  async (payload: void, thunkAPI) => {
    try {
      const response = await HttpClient.get(
        "/admin-service/admin/userProfile/findUserModuleSubModule",
        "admin"
      );
      if (response.data?.error) return thunkAPI.rejectWithValue(response.data);
      return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

// Forget Password Api
export const forgetPasswordApi = createAsyncThunk(
  "auth/forget-password",
  async (email: string, thunkAPI) => {
    try {
      const response = await HttpClient.post(
        `/admin-service/auth/resetPassword?emailId=${email}`,
        null
      );
      if (response.data?.error) return thunkAPI.rejectWithValue(response.data);
      return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const validateForgetPasswordToken = createAsyncThunk(
  "auth/validate-forget-password-token",
  async ({ id, token }: any, thunkAPI) => {
    try {
      const response = await HttpClient.get(
        `/admin-service/auth/changePassword?id=${id}&token=${token}`,
        null
      );
      if (response.data?.error) return thunkAPI.rejectWithValue(response.data);
      return response.data;
    } catch (error_) {
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
// Change user Password
export const ChangeUserPasswordNew = createAsyncThunk(
  "userLogin/change-user-password",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.post(
        "/admin-service/auth/savePassword",
        payload,
        "admin"
      );
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

const slice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    clear: (state) => {
      state.token = undefined;
      state.error = undefined;
      state.loading = false;
      return state;
    },
    completeLoggedIn: (state) => {
      state.loading = false;
      return state;
    },
  },
  extraReducers(builder): any {
    // API Starts
    builder.addCase(loginUserAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileDetailsAPI.pending, (state) => {
      state.loading = true;
    });
    // builder.addCase(getUserNavDetailsAPI.pending, (state) => {
    //   state.loading = true;
    // });
    // API Completed
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.token = action.payload as unknown as string;
      state.loading = false;
    });
    builder.addCase(getUserProfileDetailsAPI.fulfilled, (state, action) => {
      if (action.payload && action.payload?.data) {
        const data = {
          ...action.payload.data,
          fullName:
            action.payload.data.firstName + " " + action.payload.data.lastName,
        };
        state.userDetails = action.payload.data;
      }
      state.loading = false;
    });
    // builder.addCase(getUserNavDetailsAPI.fulfilled, (state, action) => {
    //   if (action.payload && action.payload?.data)
    //     state.navModules = action.payload.data
    //       ?.map((item: any) => {
    //         item.productSubModuleViewList?.sort(function (a: any, b: any) {
    //           return a.submoduleOrder - b.submoduleOrder;
    //         });
    //         return item;
    //       })
    //       .sort(function (a: any, b: any) {
    //         return a.moduleOrder - b.moduleOrder;
    //       });
    //   state.loading = false;
    // });
    // API Fails
    builder.addCase(loginUserAPI.rejected, (state, action: any) => {
      state.loading = false;

      // ToastService.error(JSON?.parse(action?.payload?)?.);
    });
    builder.addCase(getUserProfileDetailsAPI.rejected, (state, action) => {
      state.loading = false;
    });
    // builder.addCase(getUserNavDetailsAPI.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

export default slice;
