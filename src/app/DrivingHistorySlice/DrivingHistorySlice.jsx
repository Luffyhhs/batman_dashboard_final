import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  drivingHistory: [],
  drivingHistoryStatus: "idle",
  drivingHistoryMsg: "",
  drivingHistoryTotal: 0,

  createDrivingHistoryStatus: "idle",
  createDrivingHistoryMsg: "",
  updateDrivingHistoryStatus: "idle",
  updateDrivingHistoryMsg: "",
  deleteDrivingHistoryStatus: "idle",
  deleteDrivingHistoryMsg: "",
};

export const getDrivingHistory = createAsyncThunk(
  "drivingWays/getDrivingHistory",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createDrivingHistory = createAsyncThunk(
  "drivingWays/createDrivingHistory",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateDrivingHistory = createAsyncThunk(
  "drivingWays/updateDrivingHistory",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteDrivingHistory = createAsyncThunk(
  "drivingWays/deleteDrivingHistory",
  async ({ api }, thunkApi) => {
    try {
      const response = await deleteDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const drivingHistorySlice = createSlice({
  name: "drivingWays",
  initialState,
  reducers: {
    resetDeleteDrivingStatus: (state) => {
      state.deleteDrivingHistoryStatus = "idle";
    },
    resetUpdateDrivingStatus: (state) => {
      state.updateDrivingHistoryStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDrivingHistory.pending, (state) => {
        state.drivingHistoryStatus = "loading";
      })
      .addCase(getDrivingHistory.fulfilled, (state, action) => {
        state.drivingHistoryStatus = "success";
        state.drivingHistory = action.payload.data.data;
        // console.log(action.payload.data.total);
        state.drivingHistoryTotal = action.payload?.data?.total;
        state.drivingHistoryMsg = action.payload.message;
      })
      .addCase(getDrivingHistory.rejected, (state, action) => {
        state.drivingHistoryStatus = "fail";
        state.drivingHistoryMsg = action.payload.message;
      })
      .addCase(createDrivingHistory.pending, (state) => {
        state.createDrivingHistoryStatus = "loading";
      })
      .addCase(createDrivingHistory.fulfilled, (state, action) => {
        state.createDrivingHistoryStatus = "success";
        state.createDrivingHistoryMsg = action.payload.message;
      })
      .addCase(createDrivingHistory.rejected, (state, action) => {
        state.createDrivingHistoryStatus = "fail";
        state.createDrivingHistoryMsg = action.payload.message;
      })
      .addCase(updateDrivingHistory.pending, (state) => {
        state.updateDrivingHistoryStatus = "loading";
      })
      .addCase(updateDrivingHistory.fulfilled, (state, action) => {
        state.updateDrivingHistoryStatus = "success";
        state.updateDrivingHistoryMsg = action.payload.message;
      })
      .addCase(updateDrivingHistory.rejected, (state, action) => {
        state.updateDrivingHistoryStatus = "fail";
        state.updateDrivingHistoryMsg = action.payload.message;
      })
      .addCase(deleteDrivingHistory.pending, (state) => {
        state.deleteDrivingHistoryStatus = "loading";
      })
      .addCase(deleteDrivingHistory.fulfilled, (state, action) => {
        state.deleteDrivingHistoryStatus = "success";
        state.deleteDrivingHistoryMsg = action.payload.message;
      })
      .addCase(deleteDrivingHistory.rejected, (state, action) => {
        state.deleteDrivingHistoryStatus = "fail";
        // console.log(action.payload.message);
        state.deleteDrivingHistoryMsg = action.payload.message;
      });
  },
});

export const { resetDeleteDrivingStatus, resetUpdateDrivingStatus } =
  drivingHistorySlice.actions;
export const selectDrivingHistory = (state) => state.drivingWays.drivingHistory;
export const selectDrivingHistoryStatus = (state) =>
  state.drivingWays.drivingHistoryStatus;
export const selectDrivingHistoryMsg = (state) =>
  state.drivingWays.drivingHistoryMsg;
export const selectDrivingHistoryTotal = (state) =>
  //   console.log(state.drivingWays.drivingHistoryTotal);
  state.drivingWays.drivingHistoryTotal;
export const selectCreateDrivingHistoryStatus = (state) =>
  state.drivingWays.createDrivingHistoryStatus;

export const selectCreateDrivingHistoryMsg = (state) =>
  state.drivingWays.createDrivingHistoryMsg;

export const selectUpdateDrivingHistoryStatus = (state) =>
  state.drivingWays.updateDrivingHistoryStatus;

export const selectUpdateDrivingHistoryMsg = (state) =>
  state.drivingWays.updateDrivingHistoryMsg;

export const selectDeleteDrivingHistoryStatus = (state) =>
  state.drivingWays.deleteDrivingHistoryStatus;

export const selectDeleteDrivingHistoryMsg = (state) =>
  state.drivingWays.deleteDrivingHistoryMsg;

export default drivingHistorySlice.reducer;
