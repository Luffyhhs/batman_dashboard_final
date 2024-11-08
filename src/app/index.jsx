import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/UserSlice";
import ReportSlice from "./ReportSlice/ReportSlice";
import UiThingsSlice from "./UiThingsSlice/UiThingsSlice";
import rewardSlice from "./RewardSlice/rewardSlice";
import LuckySlice from "./LuckySlice/LuckySlice";
import lotterySlice from "./LotterySlice/lotterySlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    report: ReportSlice,
    ui: UiThingsSlice,
    reward: rewardSlice,
    lucky: LuckySlice,
    lottery: lotterySlice,
  },
});
