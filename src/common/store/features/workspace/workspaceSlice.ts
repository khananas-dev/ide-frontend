import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../../../helpers/api/http-client";

// Get All Solution
export const getAllWorkSpaceDataApi = createAsyncThunk(
  "workspace/get-all-workspace-data",
  async (userId: any, thunkAPI) => {
    try {
      const response = await HttpClient.get(`/api/workspaces?userId=${userId}`);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

const slice = createSlice({
  name: "workspace",
  initialState: {},
  reducers: {},
});

export default slice;
