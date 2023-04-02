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
export const deleteFileApi = createAsyncThunk(
  "workspace/delete-file",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.put(`/api/deleteFile`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const deleteFolderApi = createAsyncThunk(
  "workspace/delete-folder",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.put(`/api/deleteFolder`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const renameFolderApi = createAsyncThunk(
  "workspace/rename-folder",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.put(`/api/renameFolder`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const renameFileApi = createAsyncThunk(
  "workspace/rename-file",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.put(`/api/renameFile`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);
export const getFileDataApi = createAsyncThunk(
  "workspace/get-file-data",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.post(`/api/getFileData`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

export const saveFileDataApi = createAsyncThunk(
  "workspace/save-file-data",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.put(`/api/saveFileData`, payload);
      return response.data;
    } catch (error_) {
      console.log(error_);
      if (typeof error_ != "string") error_ = JSON.stringify(error_);
      return thunkAPI.rejectWithValue(error_);
    }
  }
);

export const terminalApi = createAsyncThunk(
  "workspace/terminal",
  async (payload: any, thunkAPI) => {
    try {
      const response = await HttpClient.put(`/api/terminal`, payload);
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
