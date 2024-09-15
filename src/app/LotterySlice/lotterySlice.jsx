import { getDataWithToken } from "../../utilities/ApiCalls";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  lotteryList: [],
  lotteryListStatus: "idle",
  lotteryListMsg: "",
};

export const getLottery = createAsyncThunk(
  "lottery/getLottery",
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

const lotterySLice = createSlice({
  name: "lottery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLottery.pending, (state) => {
        state.lotteryListStatus = "loading";
      })
      .addCase(getLottery.fulfilled, (state, action) => {
        state.lotteryListStatus = "success";
        state.lotteryList = action.payload.data;
      })
      .addCase(getLottery.rejected, (state, action) => {
        state.lotteryListStatus = "fail";
        state.lotteryListMsg = action.payload.message;
      });
  },
});
export const {} = lotterySLice.actions;
export default lotterySLice.reducer;
