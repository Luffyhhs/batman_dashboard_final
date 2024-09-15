import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataWithToken, postDataWithToken } from "../../utilities/ApiCalls";

const initialState = {
  reportList: [],
  reportListStatus: "idle",
  reportListMsg: "",
  reportListTotal: 0,

  updateReportStatus: "idle",
  updateReportMsg: "",
};

export const getReportList = createAsyncThunk(
  "report/getReportList",
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

export const updateReport = createAsyncThunk(
  "report/updateReport",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportList.pending, (state) => {
        state.reportListStatus = "loading";
      })
      .addCase(getReportList.fulfilled, (state, action) => {
        state.reportListStatus = "success";
        state.reportList = action.payload.data.data;
        state.reportListTotal = action.payload.data.totalCount;
      })
      .addCase(getReportList.rejected, (state, action) => {
        state.reportListStatus = "fail";
        state.reportListMsg = action.payload.message;
      })
      .addCase(updateReport.pending, (state) => {
        state.updateReportStatus = "loading";
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.updateReportStatus = "success";
        state.updateReportMsg = action.payload.message;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.updateReportStatus = "fail";
        state.updateReportMsg = action.payload.message;
      });
  },
});
// export const {} = reportSlice.actions;
export const selectReportList = (state) => state.report.reportList;
export const selectReportStatus = (state) => state.report.reportListStatus;
export const selectReportListMsg = (state) => state.report.reportListMsg;

export default reportSlice.reducer;
