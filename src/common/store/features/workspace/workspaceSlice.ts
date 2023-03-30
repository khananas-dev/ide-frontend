import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../../../helpers/api/http-client";

// Get All Solution
export const getAllWorkSpaceDataApi = createAsyncThunk(
  "workspace/get-all-workspace-data",
  async (id: any, thunkAPI) => {
    try {
      const response = await HttpClient.get(`/api/usersWorkspace/${id}`);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const getAllWorkSpaceDirectoriesApi = createAsyncThunk(
  "workspace/get-all-workspace-directories",
  async (id: any, thunkAPI) => {
    try {
      const response = await HttpClient.get(`/api/folderList/${id}`);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const createFileApi = createAsyncThunk(
  "workspace/create-file",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.post(`/api/createFile`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const createFolderApi = createAsyncThunk(
  "workspace/create-folder",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.post(`/api/createFolder`, payload);
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
