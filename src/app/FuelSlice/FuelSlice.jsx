import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postMultipartDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  fuel: [],
  fuelStatus: "idle",
  fuelMsg: "",
  fuelTotal: 0,
  fuelTotalPrice: 0,

  fuelDetailsList: [],
  fuelDetailsListStatus: "idle",
  fuelDetailsListMsg: "",
  fuelDetailsListTotal: 0,
  fuelDetailsListTotalPrice: 0,
  fuelDetailsListAvgPrice: 0,

  createFuelStatus: "idle",
  createFuelMsg: "",

  updateFuelStatus: "idle",
  updateFuelMsg: "",

  deleteFuelStatus: "idle",
  deleteFuelMsg: "",
};

export const getFuel = createAsyncThunk(
  "fuel/getFuel",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createFuel = createAsyncThunk(
  "fuel/createFuel",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postMultipartDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateFuel = createAsyncThunk(
  "fuel/updateFuel",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postMultipartDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteFuel = createAsyncThunk(
  "fuel/deleteFuel",
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

export const fuelDetailsList = createAsyncThunk(
  "fuel/fuelDetailsList",
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
// [FILEPATH] src/features/fuel/fuelSlice.js [/FILEassistant]

const fuelSlice = createSlice({
  name: "fuel",
  initialState,
  reducers: {
    resetFuelUpdateStatus: (state) => {
      state.updateFuelStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFuel.pending, (state) => {
        state.fuelStatus = "loading";
      })
      .addCase(getFuel.fulfilled, (state, action) => {
        state.fuelStatus = "success";
        state.fuel = action.payload.data.data;
        state.fuelTotalPrice = action.payload.total_amt;
        state.fuelTotal = action.payload.data.total;
      })
      .addCase(getFuel.rejected, (state) => {
        state.fuelStatus = "fail";
      })
      .addCase(createFuel.pending, (state) => {
        state.createFuelStatus = "loading";
      })
      .addCase(createFuel.fulfilled, (state, action) => {
        state.createFuelStatus = "success";
        state.createFuelMsg = action.payload.message;
      })
      .addCase(createFuel.rejected, (state, action) => {
        state.createFuelStatus = "fail";
        state.createFuelMsg = action.payload.message;
      })
      .addCase(updateFuel.pending, (state) => {
        state.updateFuelStatus = "loading";
      })
      .addCase(updateFuel.fulfilled, (state, action) => {
        state.updateFuelStatus = "success";
        state.updateFuelMsg = action.payload.message;
      })
      .addCase(updateFuel.rejected, (state, action) => {
        state.createFuelMsg = action.payload.message;
        state.updateFuelStatus = "fail";
      })
      .addCase(deleteFuel.pending, (state) => {
        state.deleteFuelStatus = "loading";
      })
      .addCase(deleteFuel.fulfilled, (state, action) => {
        state.deleteFuelStatus = "success";
        state.deleteFuelMsg = action.payload.message;
      })
      .addCase(deleteFuel.rejected, (state, action) => {
        state.deleteFuelStatus = "fail";
        state.deleteFuelMsg = action.payload.message;
      })
      .addCase(fuelDetailsList.pending, (state) => {
        state.fuelDetailsListStatus = "loading";
      })
      .addCase(fuelDetailsList.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.fuelDetailsList = action.payload.data.data;
        state.fuelDetailsListTotal = action.payload.data.total;
        state.fuelDetailsListTotalPrice = action.payload.fuel_amt;
        state.fuelDetailsListAvgPrice = action.payload.avg_amt;
        state.fuelDetailsListStatus = "success";
        state.fuelDetailsListMsg = action.payload.message;
      })
      .addCase(fuelDetailsList.rejected, (state, action) => {
        state.fuelDetailsListStatus = "fail";
        state.fuelDetailsListMsg = action.payload.message;
      });
  },
});
export const { resetFuelUpdateStatus } = fuelSlice.actions;
export const selectFuel = (state) => state.fuel.fuel;
export const selectFuelStatus = (state) => state.fuel.fuelStatus;
export const selectFuelTotalPrice = (state) => state.fuel.fuelTotalPrice;
export const selectFuelTotal = (state) => state.fuel.fuelTotal;
export const selectCreateFuelStatus = (state) => state.fuel.createFuelStatus;
export const selectCreateFuelMsg = (state) => state.fuel.createFuelMsg;
export const selectUpdateFuelStatus = (state) => state.fuel.updateFuelStatus;
export const selectUpdateFuelMsg = (state) => state.fuel.updateFuelMsg;
export const selectDeleteFuelStatus = (state) => state.fuel.deleteFuelStatus;
export const selectDeleteFuelMsg = (state) => state.fuel.deleteFuelMsg;
export const selectFuelDetailsList = (state) => state.fuel.fuelDetailsList;
export const selectFuelDetailsListStatus = (state) =>
  state.fuel.fuelDetailsListStatus;
export const selectFuelDetailsListTotal = (state) =>
  state.fuel.fuelDetailsListTotal;
export const selectFuelDetailsListMsg = (state) =>
  state.fuel.fuelDetailsListMsg;
export const selectFuelDetailsListTotalPrice = (state) =>
  state.fuel.fuelDetailsListTotalPrice;
export const selectFuelDetailsListAvgPrice = (state) =>
  state.fuel.fuelDetailsListAvgPrice;
export default fuelSlice.reducer;
