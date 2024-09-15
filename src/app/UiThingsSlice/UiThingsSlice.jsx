import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDataWithToken,
  getDataWithToken,
  postDataWithToken,
  postMultipartDataWithToken,
} from "../../utilities/ApiCalls";

const initialState = {
  adsArr: [],
  adsArrStatus: "idle",
  adsArrMsg: "",

  modifyAdsStatus: "idle",
  modifyAdsMsg: "",

  modifyTermsStatus: "idle",
  modifyTermsMsg: "",

  wheelArr: [],
  wheelArrStatus: "idle",
  wheelArrMsg: "",

  modifyWheelStatus: "idle",
  modifyWheelMsg: "",

  deleteAdsStatus: "idle",
  deleteAdsMsg: "",

  addMoreWinnerStatus: "idle",
  addMoreWinnerMsg: "",

  modifyTopListStatus: "idle",
  modifyTopListMsg: "",
};

export const getAds = createAsyncThunk(
  "ui/getAds",
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

export const getWheel = createAsyncThunk(
  "ui/getWheel",
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

export const deleteAds = createAsyncThunk(
  "ui/deleteAds",
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

export const modifyAds = createAsyncThunk(
  "ui/modifyAds",
  async ({ api, postData }, thunkApi) => {
    try {
      const response = await postMultipartDataWithToken(api, postData);
      if (response.staus === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const modifyWheel = createAsyncThunk(
  "ui/modifyWheel",
  async ({ api, postData }, thunkApi) => {
    try {
      const response = await postMultipartDataWithToken(api, postData);
      if (response.staus === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addMoreWinner = createAsyncThunk(
  "ui/addMoreWinner",
  async ({ api, postData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, postData);
      if (response.status === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const modifyTopList = createAsyncThunk(
  "ui/modifyTopList",
  async ({ api, postData }, thunkApi) => {
    try {
      const response = await postDataWithToken(api, postData);
      if (response.status === "failed") {
        return thunkApi.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const modifyTerms = createAsyncThunk(
  "ui/modifyTerms",
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

const uiThingsSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetAdsDeleteStatus: (state) => {
      state.deleteAdsStatus = "idle";
    },
    resetAdsModifyStatus: (state) => {
      state.modifyAdsStatus = "idle";
    },
    resetTermsModifyStatus: (state) => {
      state.modifyTermsStatus = "idle";
    },
    resetWheelStatus: (state) => {
      state.modifyWheelStatus = "idle";
    },
    resetModifyTopListStatus: (state) => {
      state.modifyTopListStatus = "idle";
    },
    resetAddMoreWinnerStatus: (state) => {
      state.addMoreWinnerStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAds.pending, (state) => {
        state.adsArrStatus = "loading";
      })
      .addCase(getAds.rejected, (state, action) => {
        state.adsArrStatus = "fail";
        state.adsArrMsg = action.payload.message;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.adsArrStatus = "success";
        state.adsArr = action.payload.data;
      })
      .addCase(modifyAds.pending, (state) => {
        state.modifyAdsStatus = "loading";
      })
      .addCase(modifyAds.rejected, (state, action) => {
        state.modifyAdsStatus = "fail";
        state.modifyAdsMsg = action.payload.message;
      })
      .addCase(modifyAds.fulfilled, (state, action) => {
        state.modifyAdsStatus = "success";
        state.modifyAdsMsg = action.payload.message;
      })
      .addCase(modifyTerms.pending, (state) => {
        state.modifyTermsStatus = "loading";
      })
      .addCase(modifyTerms.rejected, (state, action) => {
        state.modifyTermsStatus = "fail";
        state.modifyTermsMsg = action.payload.message;
      })
      .addCase(modifyTerms.fulfilled, (state, action) => {
        state.modifyTermsStatus = "success";
        state.modifyTermsMsg = action.payload.message;
      })
      .addCase(deleteAds.pending, (state) => {
        state.deleteAdsStatus = "loading";
      })
      .addCase(deleteAds.rejected, (state, action) => {
        state.deleteAdsStatus = "fail";
        state.deleteAdsMsg = action.payload.message;
      })
      .addCase(deleteAds.fulfilled, (state, action) => {
        state.deleteAdsStatus = "success";
        state.deleteAdsMsg = action.payload.message;
      })
      .addCase(getWheel.pending, (state) => {
        state.wheelArrStatus = "loading";
      })
      .addCase(getWheel.rejected, (state, action) => {
        state.wheelArrStatus = "fail";
        state.wheelArrMsg = action.payload.message;
      })
      .addCase(getWheel.fulfilled, (state, action) => {
        state.wheelArrStatus = "success";
        state.wheelArr = action.payload.data;
      })
      .addCase(modifyWheel.pending, (state) => {
        state.modifyWheelStatus = "loading";
      })
      .addCase(modifyWheel.rejected, (state, action) => {
        state.modifyWheelStatus = "fail";
        state.modifyWheelMsg = action.payload.message;
      })
      .addCase(modifyWheel.fulfilled, (state, action) => {
        state.modifyWheelStatus = "success";
        state.modifyWheelMsg = action.payload.message;
      })
      .addCase(addMoreWinner.pending, (state) => {
        state.addMoreWinnerStatus = "loading";
      })
      .addCase(addMoreWinner.rejected, (state, action) => {
        state.addMoreWinnerStatus = "fail";
        state.addMoreWinnerMsg = action.payload.message;
      })
      .addCase(addMoreWinner.fulfilled, (state, action) => {
        state.addMoreWinnerStatus = "success";
        state.addMoreWinnerMsg = action.payload.message;
      })
      .addCase(modifyTopList.pending, (state) => {
        state.modifyTopListStatus = "loading";
      })
      .addCase(modifyTopList.rejected, (state, action) => {
        state.modifyTopListStatus = "fail";
        state.modifyTopListMsg = action.payload.message;
      })
      .addCase(modifyTopList.fulfilled, (state, action) => {
        state.modifyTopListStatus = "success";
        state.modifyTopListMsg = action.payload.message;
      });
  },
});

export const {
  resetAddMoreWinnerStatus,
  resetModifyTopListStatus,
  resetAdsDeleteStatus,
  resetAdsModifyStatus,
  resetWheelStatus,
  resetTermsModifyStatus,
} = uiThingsSlice.actions;

export default uiThingsSlice.reducer;
