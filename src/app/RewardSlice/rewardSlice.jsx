import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  rewardSelectBoxData: [],

  rewardArr: [],
  rewardArrStatus: "idle",
  rewardArrMsg: "",

  modifyRewardStatus: "idle",
  modifyRewardMsg: "",

  deleteRewardStatus: "idle",
  deleteRewardMsg: "",
};

export const getReward = createAsyncThunk(
  "reward/getReward",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.status === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteReward = createAsyncThunk(
  "reward/deleteReward",
  async ({ api }, thunkApi) => {
    try {
      const response = await deleteDataWithToken(api);
      if (response.status === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const modifyReward = createAsyncThunk(
  "reward/modifyReward",
  async ({ api, postData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, postData);
      if (response.staus === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    resetRewardArrStatus: (state) => {
      state.rewardArrStatus = "idle";
    },
    resetModifyRewardStatus: (state) => {
      state.modifyRewardStatus = "idle";
    },
    resetDeleteRewardStatus: (state) => {
      state.deleteRewardStatus = "idle";
    },
    setRewardSelectBoxData: (state, action) => {
      state.rewardSelectBoxData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReward.pending, (state) => {
        state.rewardArrStatus = "loading";
      })
      .addCase(getReward.rejected, (state, action) => {
        state.rewardArrStatus = "fail";
        state.rewardArrMsg = action.payload.message;
      })
      .addCase(getReward.fulfilled, (state, action) => {
        state.rewardArrStatus = "success";
        state.rewardArr = action.payload.data;
        state.rewardArrMsg = action.payload.message;
      })
      .addCase(modifyReward.pending, (state) => {
        state.modifyRewardStatus = "loading";
      })
      .addCase(modifyReward.rejected, (state, action) => {
        state.modifyRewardStatus = "fail";
        state.modifyRewardMsg = action.payload.message;
      })
      .addCase(modifyReward.fulfilled, (state, action) => {
        state.modifyRewardStatus = "success";
        state.modifyRewardMsg = action.payload.data.message;
      })
      .addCase(deleteReward.pending, (state) => {
        state.deleteRewardStatus = "loading";
      })
      .addCase(deleteReward.rejected, (state, action) => {
        state.deleteRewardStatus = "fail";
        state.deleteRewardMsg = action.payload.message;
      })
      .addCase(deleteReward.fulfilled, (state, action) => {
        state.deleteRewardStatus = "success";
        state.deleteRewardMsg = action.payload.data.message;
      });
  },
});

export const {
  resetDeleteRewardStatus,
  resetModifyRewardStatus,
  resetRewardArrStatus,
  setRewardSelectBoxData,
} = rewardSlice.actions;

export default rewardSlice.reducer;
