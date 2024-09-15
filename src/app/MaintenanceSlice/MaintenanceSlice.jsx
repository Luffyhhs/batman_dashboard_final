import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postMultipartDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  maintenanceList: [],
  maintenanceListStatus: "idle",
  maintenanceListMsg: "",
  maintenanceListTotal: 0,
  maintenanceAmtTotal: 0,

  createMaintenanceStatus: "idle",
  createMaintenanceMsg: "",

  updateMaintenanceStatus: "idle",
  updateMaintenanceMsg: "",

  deleteMaintenanceStatus: "idle",
  deleteMaintenanceMsg: "",

  deleteMaintenancePhotoStatus: "idle",
  deleteMaintenancePhotoMsg: "",
};

export const getMaintenanceList = createAsyncThunk(
  "maintenance/getMaintenanceList",
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

export const createMaintenance = createAsyncThunk(
  "maintenance/createMaintenance",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postMultipartDataWithToken(api, pData);
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

export const updateMaintenance = createAsyncThunk(
  "maintenance/updateMaintenance",
  async ({ api, pData }, thunkApi) => {
    try {
      const response = await postMultipartDataWithToken(api, pData);
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

export const deleteMaintenance = createAsyncThunk(
  "maintenance/deleteMaintenance",
  async ({ api }, thunkApi) => {
    try {
      const response = await deleteDataWithToken(api);
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

export const deleteMaintenancePhoto = createAsyncThunk(
  "maintenance/deleteMaintenancePhoto",
  async ({ api }, thunkApi) => {
    try {
      const response = await deleteDataWithToken(api);
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

export const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    resetDeleteMaintenanceStatus: (state) => {
      state.deleteMaintenanceStatus = "idle";
    },
    resetUpdateMaintenanceStatus: (state) => {
      state.updateMaintenanceStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaintenanceList.pending, (state) => {
        state.maintenanceListStatus = "loading";
      })
      .addCase(getMaintenanceList.fulfilled, (state, action) => {
        state.maintenanceListStatus = "success";
        state.maintenanceList = action.payload.data.data;
        state.maintenanceAmtTotal = action.payload.total_amt;
        state.maintenanceListTotal = action.payload.data.total;
      })
      .addCase(getMaintenanceList.rejected, (state, action) => {
        state.maintenanceListStatus = "fail";
        state.maintenanceListMsg = action.payload.message;
      })
      .addCase(createMaintenance.pending, (state) => {
        state.createMaintenanceStatus = "loading";
      })
      .addCase(createMaintenance.fulfilled, (state, action) => {
        state.createMaintenanceStatus = "success";
        state.createMaintenanceMsg = action.payload;
      })
      .addCase(createMaintenance.rejected, (state, action) => {
        state.createMaintenanceStatus = "fail";
        state.createMaintenanceMsg = action.payload.message;
      })
      .addCase(updateMaintenance.pending, (state) => {
        state.updateMaintenanceStatus = "loading";
      })
      .addCase(updateMaintenance.fulfilled, (state, action) => {
        state.updateMaintenanceStatus = "success";
        state.updateMaintenanceMsg = action.payload;
      })
      .addCase(updateMaintenance.rejected, (state, action) => {
        state.updateMaintenanceStatus = "fail";
        state.updateMaintenanceMsg = action.payload.message;
      })
      .addCase(deleteMaintenance.pending, (state) => {
        state.deleteMaintenanceStatus = "loading";
      })
      .addCase(deleteMaintenance.fulfilled, (state, action) => {
        state.deleteMaintenanceStatus = "success";
        state.deleteMaintenanceMsg = action.payload;
      })
      .addCase(deleteMaintenance.rejected, (state, action) => {
        state.deleteMaintenanceStatus = "fail";
        state.deleteMaintenanceMsg = action.payload.message;
      })
      .addCase(deleteMaintenancePhoto.pending, (state) => {
        state.deleteMaintenancePhotoStatus = "loading";
      })
      .addCase(deleteMaintenancePhoto.fulfilled, (state, action) => {
        state.deleteMaintenancePhotoStatus = "success";
        state.deleteMaintenancePhotoMsg = action.payload.message;
      })
      .addCase(deleteMaintenancePhoto.rejected, (state, action) => {
        state.deleteMaintenancePhotoStatus = "fail";
        state.deleteMaintenancePhotoMsg = action.payload.message;
      });
  },
});
export const { resetDeleteMaintenanceStatus, resetUpdateMaintenanceStatus } =
  maintenanceSlice.actions;
export const selectMaintenanceList = (state) =>
  state.maintenance.maintenanceList;
export const selectMaintenanceListStatus = (state) =>
  state.maintenance.maintenanceListStatus;
export const selectMaintenanceMsg = (state) =>
  state.maintenance.maintenanceListMsg;
export const selectMaintenanceTotal = (state) =>
  state.maintenance.maintenanceListTotal;
export const selectMaintenanceAmtTotal = (state) =>
  state.maintenance.maintenanceAmtTotal;
export const selectCreateMaintenanceStatus = (state) =>
  state.maintenance.createMaintenanceStatus;
export const selectCreateMaintenanceMsg = (state) =>
  state.maintenance.createMaintenanceMsg;
export const selectUpdateMaintenanceStatus = (state) =>
  state.maintenance.updateMaintenanceStatus;
export const selectUpdateMaintenanceMsg = (state) =>
  state.maintenance.updateMaintenanceMsg;
export const selectDeleteMaintenanceStatus = (state) =>
  state.maintenance.deleteMaintenanceStatus;
export const selectDeleteMaintenanceMsg = (state) =>
  state.maintenance.deleteMaintenanceMsg;
export const selectDeleteMaintenancePhotoStatus = (state) =>
  state.maintenance.deleteMaintenancePhotoStatus;
export const selectDeleteMaintenancePhotoMsg = (state) =>
  state.maintenance.deleteMaintenancePhotoMsg;
export default maintenanceSlice.reducer;
