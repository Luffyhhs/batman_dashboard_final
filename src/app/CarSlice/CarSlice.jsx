import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  selectBoxCars: [],

  cars: [],
  carsStatus: "idle",
  carsMsg: "",

  carList: [],
  carListLoading: false,
  carListError: false,
  carsListMsg: "",
  totalCars: 0,

  carDetails: {},
  carDetailsStatus: "idle",
  carDetailsMsg: "",

  carDetailsHistory: {},
  carDetailsHistoryStatus: "idle",
  carDetailsHistoryMsg: "",
  carDetailsHistoryTotal: 0,
  carDetailsFuel: {},
  carDetailsFuelStatus: "idle",
  carDetailsFuelMsg: "",
  carDetailsFuelTotal: 0,

  carDetailsMaintenance: {},
  carDetailsMaintenanceStatus: "idle",
  carDetailsMaintenanceMsg: "",
  carDetailsMaintenanceTotal: 0,

  createCarLoading: false,
  createCarError: false,
  createCarMsg: "",
  createCarStatus: "idle",
  createCarSuccess: false,

  updateCarStatus: "idle",
  updateCarLoading: false,
  updateCarError: false,
  updateCarMsg: "",
  updateCarSuccess: false,

  deleteCarLoading: false,
  deleteCarError: false,
  deleteCarMsg: "",
  deleteCarStatus: "idle",
  deleteCarSuccess: false,

  changeCarStatus: "idle",
  changeCarMsg: "",
};

export const getFullCarsList = createAsyncThunk(
  "car/getCarList",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      // console.log(response);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getCarDetails = createAsyncThunk(
  "car/getCarDetails",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getCarDetailsHistory = createAsyncThunk(
  "car/getCarDetailsHistory",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getCarDetailsFuel = createAsyncThunk(
  "car/getCarDetailsFuel",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getCarDetailsMaintenance = createAsyncThunk(
  "car/getCarDetailsMaintenance",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCarsListPaginate = createAsyncThunk(
  "car/getCarListPaginate",
  async ({ api }, thunkApi) => {
    try {
      const response = await getDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      // console.log(response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const changeCar = createAsyncThunk(
  "car/changeCar",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      // console.log("changecar:", pData, response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createCar = createAsyncThunk(
  "car/createCar",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateCar = createAsyncThunk(
  "car/updateCar",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, pData);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "car/deleteCar",
  async ({ api }, thunkApi) => {
    try {
      const response = await deleteDataWithToken(api);
      if (response.status === 0) {
        return thunkApi.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const carSlice = createSlice({
  name: "car",
  initialState,

  reducers: {
    setSelectBoxCars: (state, action) => {
      state.selectBoxCars = action.payload;
    },
    resetCarUpdateStatus: (state) => {
      state.updateCarStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFullCarsList.pending, (state) => {
        state.carsStatus = "loading";
      })
      .addCase(getFullCarsList.rejected, (state, action) => {
        state.carsStatus = "fail";
        state.carsMsg = action.payload.message;
      })
      .addCase(getFullCarsList.fulfilled, (state, action) => {
        state.cars = action.payload.car_list;
        state.carsStatus = "success";
      })
      .addCase(getCarsListPaginate.pending, (state) => {
        state.carListLoading = true;
      })
      .addCase(getCarsListPaginate.fulfilled, (state, action) => {
        state.carList = action.payload.data.data;
        state.totalCars = action.payload.count;
        state.carListLoading = false;
      })
      .addCase(getCarsListPaginate.rejected, (state, action) => {
        state.carListError = true;
        state.carListLoading = false;
        state.carsListMsg = action.payload.message;
      })
      .addCase(createCar.pending, (state) => {
        state.createCarLoading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.createCarLoading = false;
        state.createCarMsg = action.payload.message;
        state.createCarSuccess = true;
      })
      .addCase(createCar.rejected, (state, action) => {
        state.createCarError = true;
        state.createCarLoading = false;
        state.createCarMsg = action.payload.message;
      })
      .addCase(updateCar.pending, (state) => {
        state.updateCarLoading = true;
        state.updateCarStatus = "loading";
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.updateCarLoading = false;
        state.updateCarMsg = action.payload.message;
        state.updateCarSuccess = true;
        state.updateCarStatus = "success";
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.updateCarError = true;
        state.updateCarLoading = false;
        state.updateCarMsg = action.payload.message;
        state.updateCarStatus = "fail";
      })
      .addCase(deleteCar.pending, (state) => {
        state.deleteCarLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.deleteCarLoading = false;
        state.deleteCarMsg = action.payload.message;
        state.deleteCarSuccess = true;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.deleteCarError = true;
        state.deleteCarLoading = false;
        state.deleteCarMsg = action.payload.message;
      })
      .addCase(changeCar.pending, (state) => {
        state.changeCarStatus = "loading";
      })
      .addCase(changeCar.fulfilled, (state, action) => {
        state.changeCarStatus = "success";
        state.changeCarMsg = action.payload.message;
        // state.changeCarSuccess = true;
      })
      .addCase(changeCar.rejected, (state, action) => {
        state.changeCarStatus = "fail";
        // state.changeCarLoading = false;
        state.changeCarMsg = action.payload.message;
      })
      .addCase(getCarDetails.pending, (state) => {
        state.carDetailsStatus = "loading";
      })
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.carDetailsStatus = "success";
        state.carDetails = action.payload;
        // state.carDetailsMsg = action.payload.message;
        // state.changeCarSuccess = true;
      })
      .addCase(getCarDetails.rejected, (state, action) => {
        state.carDetailsStatus = "fail";
        // state.changeCarLoading = false;
        // state.carDetailsMsg = action.payload?.message;
      })
      .addCase(getCarDetailsHistory.pending, (state) => {
        state.carDetailsHistoryStatus = "loading";
      })
      .addCase(getCarDetailsHistory.fulfilled, (state, action) => {
        state.carDetailsHistoryStatus = "success";
        state.carDetailsHistory = action.payload;
        state.carDetailsHistoryTotal = action.payload.report.total;
        // state.carDetailsMsg = action.payload.message;
        // state.changeCarSuccess = true;
      })
      .addCase(getCarDetailsHistory.rejected, (state, action) => {
        state.carDetailsHistoryStatus = "fail";
        // state.changeCarLoading = false;
        // state.carDetailsHistoryMsg = action.payload.message;
      })
      .addCase(getCarDetailsFuel.pending, (state) => {
        state.carDetailsFuelStatus = "loading";
      })
      .addCase(getCarDetailsFuel.fulfilled, (state, action) => {
        state.carDetailsFuelStatus = "success";
        state.carDetailsFuel = action.payload;
        state.carDetailsFuelTotal = action.payload.fuel.total;
        // state.carDetailsMsg = action.payload.message;
        // state.changeCarSuccess = true;
      })
      .addCase(getCarDetailsFuel.rejected, (state, action) => {
        state.carDetailsFuelStatus = "fail";
        // state.changeCarLoading = false;
        // state.carDetailsFuelMsg = action.payload.message;
      })
      .addCase(getCarDetailsMaintenance.pending, (state) => {
        state.carDetailsMaintenanceStatus = "loading";
      })
      .addCase(getCarDetailsMaintenance.fulfilled, (state, action) => {
        state.carDetailsMaintenanceStatus = "success";
        state.carDetailsMaintenance = action.payload;
        state.carDetailsMaintenanceTotal = action.payload.maintenance.total;
        // state.carDetailsMsg = action.payload.message;
        // state.changeCarSuccess = true;
      })
      .addCase(getCarDetailsMaintenance.rejected, (state, action) => {
        state.carDetailsMaintenanceStatus = "fail";
        // state.changeCarLoading = false;
        // state.carDetailsMaintenanceMsg = action.payload.message;
      });
  },
});

export const { setSelectBoxCars, resetCarUpdateStatus } = carSlice.actions;
export const selectCars = (state) => state.car.cars;
export const selectCarsStatus = (state) => state.car.carsStatus;
export const selectCarMsg = (state) => state.car.carsMsg;
export const selectCarList = (state) => state.car.carList;
export const selectCarListLoading = (state) => state.car.carListLoading;
export const selectTotalCars = (state) => state.car.totalCars;
export const selectCreateCarLoading = (state) => state.car.createCarLoading;
export const selectCreateCarError = (state) => state.car.createCarError;
export const selectCreateCarSuccess = (state) => state.car.createCarSuccess;
export const selectCreateCarMsg = (state) => state.car.createCarMsg;
export const selectUpdateCarLoading = (state) => state.car.updateCarLoading;
export const selectUpdateCarError = (state) => state.car.updateCarError;
export const selectUpdateCarSuccess = (state) => state.car.updateCarSuccess;
export const selectUpdateCarMsg = (state) => state.car.updateCarMsg;
export const selectUpdateCarStatus = (state) => state.car.updateCarStatus;
export const selectDeleteCarLoading = (state) => state.car.deleteCarLoading;
export const selectDeleteCarError = (state) => state.car.deleteCarError;
export const selectDeleteCarSuccess = (state) => state.car.deleteCarSuccess;
export const selectDeleteCarMsg = (state) => state.car.deleteCarMsg;
export const selectChangeCarMsg = (state) => state.car.changeCarMsg;
export const selectChangeCarStatus = (state) => state.car.changeCarStatus;
export const selectCarDetails = (state) => state.car.carDetails;
export const selectCarDetailsMsg = (state) => state.car.carDetailsMsg;
export const selectCarDetailsStatus = (state) => state.car.carDetailsStatus;
export const selectCarDetailsHistory = (state) => state.car.carDetailsHistory;
export const selectCarDetailsHistoryMsg = (state) =>
  state.car.carDetailsHistoryMsg;
export const selectCarDetailsHistoryStatus = (state) =>
  state.car.carDetailsHistoryStatus;
export const selectCarDetailsHistoryTotal = (state) =>
  state.car.carDetailsHistoryTotal;
export const selectCarDetailsFuel = (state) => state.car.carDetailsFuel;
export const selectCarDetailsFuelMsg = (state) => state.car.carDetailsFuelMsg;
export const selectCarDetailsFuelStatus = (state) =>
  state.car.carDetailsFuelStatus;
export const selectCarDetailsFuelTotal = (state) =>
  state.car.carDetailsFuelTotal;
export const selectCarDetailsMaintenance = (state) =>
  state.car.carDetailsMaintenance;
export const selectCarDetailsMaintenanceMsg = (state) =>
  state.car.carDetailsMaintenanceMsg;
export const selectCarDetailsMaintenanceStatus = (state) =>
  state.car.carDetailsMaintenanceStatus;
export const selectCarDetailsMaintenanceTotal = (state) =>
  state.car.carDetailsMaintenanceTotal;
export const selectCarSelectInputs = (state) => state.car.selectBoxCars;
export default carSlice.reducer;
