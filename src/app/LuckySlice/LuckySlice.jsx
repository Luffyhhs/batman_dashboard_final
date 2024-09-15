import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postDataWithToken,
  postMultipartDataWithToken,
  putDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  luckyArr: [],
  luckyArrStatus: "idle",
  luckyArrMsg: "",
  luckyArrTotal: 0,
  luckyArrTotalPrice: 0,

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

export const getLucky = createAsyncThunk(
  "lucky/getLucky",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const createFuel = createAsyncThunk(
//   "fuel/createFuel",
//   async ({ api, pData }, thunkApi) => {
//     try {
//       const response = await postMultipartDataWithToken(api, pData);
//       if (response.status === 0) {
//         return thunkApi.rejectWithValue(response);
//       }
//       return response;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

export const updateLucky = createAsyncThunk(
  "lucky/updateLucky",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await putDataWithToken(api, pData);
      if (response.status === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const banLucky = createAsyncThunk(
  "lucky/banLucky",
  async ({ api, pData = { status: "out" } }, thunkApi) => {
    try {
      const response = await putDataWithToken(api, pData);
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

const luckySlice = createSlice({
  name: "lucky",
  initialState,
  reducers: {
    resetUpdateLuckyStatus: (state) => {
      state.updateLuckyStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLucky.pending, (state) => {
        state.luckyArrStatus = "loading";
      })
      .addCase(getLucky.fulfilled, (state, action) => {
        state.luckyArrStatus = "success";
        state.luckyArr = action.payload.data.data;
        // state.luckyArrTotalPrice = action.payload.total_amt;
        state.luckyArrTotal = action.payload.data.totalCount;
      })
      .addCase(getLucky.rejected, (state) => {
        state.luckyArrStatus = "fail";
      })
      //   .addCase(createFuel.pending, (state) => {
      //     state.createFuelStatus = "loading";
      //   })
      //   .addCase(createFuel.fulfilled, (state, action) => {
      //     state.createFuelStatus = "success";
      //     state.createFuelMsg = action.payload.message;
      //   })
      //   .addCase(createFuel.rejected, (state, action) => {
      //     state.createFuelStatus = "fail";
      //     state.createFuelMsg = action.payload.message;
      //   })
      .addCase(updateLucky.pending, (state) => {
        state.updateLuckyStatus = "loading";
      })
      .addCase(updateLucky.fulfilled, (state, action) => {
        state.updateLuckyStatus = "success";
        state.updateLuckyMsg = action.payload.message;
      })
      .addCase(updateLucky.rejected, (state, action) => {
        state.updateLuckyMsg = action.payload.message;
        state.updateLuckyStatus = "fail";
      })
      .addCase(banLucky.pending, (state) => {
        state.banLuckyStatus = "loading";
      })
      .addCase(banLucky.fulfilled, (state, action) => {
        state.banLuckyStatus = "success";
        state.banLuckyMsg = action.payload.message;
      })
      .addCase(banLucky.rejected, (state, action) => {
        state.banLuckyStatus = "fail";
        state.banLuckyMsg = action.payload.message;
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
export const { resetUpdateLuckyStatus } = luckySlice.actions;

export default luckySlice.reducer;
