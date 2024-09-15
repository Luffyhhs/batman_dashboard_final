import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataWithToken } from "../../utilities/ApiCalls";

const initialState = {
  dashboardData: {},
  dashboardDataStatus: "idle",
  dashboardDataMsg: "",

  kiloChartData: [],
  fuelChartData: [],
  maintenanceChartData: [],
  chartDataStatus: "idle",
  chartDataMsg: "",

  dashboardListMsg: "",
  dashboardListStatus: "idle",
  maximumDrivingDriver: [],
  maximumDrivingCar: [],
  todayWays: [],
};

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
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

export const getChartData = createAsyncThunk(
  "dashboard/getChartData",
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

export const getDashboardList = createAsyncThunk(
  "dashboard/getDashboardList",
  async ({ api }, thunkAPi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.status === 0) {
        return thunkAPi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.dashboardDataStatus = "loading";
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
        state.dashboardDataStatus = "success";
        state.dashboardDataMsg = action.payload.message;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.dashboardDataStatus = "fail";
        state.dashboardDataMsg = action.payload.message;
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.kiloChartData = action.payload.kiloArr;
        state.fuelChartData = action.payload.fuelArr;
        state.maintenanceChartData = action.payload.maintainArr;
        state.chartDataStatus = "success";
        state.chartDataMsg = action.payload.message;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.chartDataStatus = "fail";
        state.chartDataMsg = action.payload.message;
      })
      .addCase(getChartData.pending, (state) => {
        state.chartDataStatus = "loading";
      })
      .addCase(getDashboardList.fulfilled, (state, action) => {
        state.maximumDrivingDriver = action.payload.max_driving_driver;
        state.maximumDrivingCar = action.payload.max_driving_car;
        state.todayWays = action.payload.todayUsing;
        state.dashboardListStatus = "success";
        state.dashboardListMsg = action.payload.message;
      })
      .addCase(getDashboardList.rejected, (state, action) => {
        state.dashboardListStatus = "fail";
        state.dashboardListMsg = action.payload.message;
      })
      .addCase(getDashboardList.pending, (state) => {
        state.dashboardListStatus = "loading";
      });
  },
});

export const selectDashboardData = (state) => state.dashboard.dashboardData;
export const selectDashboardDataStatus = (state) =>
  state.dashboard.dashboardDataStatus;
export const selectDashboardDataMsg = (state) =>
  state.dashboard.dashboardDataMsg;
export const selectKiloChartData = (state) => state.dashboard.kiloChartData;
export const selectFuelChartData = (state) => state.dashboard.fuelChartData;
export const selectMaintenanceChartData = (state) =>
  state.dashboard.maintenanceChartData;
export const selectChartDataStatus = (state) => state.dashboard.chartDataStatus;
export const selectChartDataMsg = (state) => state.dashboard.chartDataMsg;
export const selectMaximumDrivingDrivers = (state) =>
  state.dashboard.maximumDrivingDriver;
export const selectMaximumDrivingCars = (state) =>
  state.dashboard.maximumDrivingCar;
export const selectTodayWays = (state) => state.dashboard.todayWays;
export const selectDashboardListStatus = (state) =>
  state.dashboard.dashboardListStatus;
export const selectDashboardListMsg = (state) =>
  state.dashboard.dashboardListMsg;
export default dashboardSlice.reducer;
