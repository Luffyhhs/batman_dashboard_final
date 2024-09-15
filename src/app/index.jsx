import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/UserSlice";
import CarSlice from "./CarSlice/CarSlice";
import FuelSlice from "./FuelSlice/FuelSlice";
import DrivingHistorySlice from "./DrivingHistorySlice/DrivingHistorySlice";
import MaintenanceSlice from "./MaintenanceSlice/MaintenanceSlice";
import DashboardSlice from "./DashboardSlice/DashboardSlice";
import ReportSlice from "./ReportSlice/ReportSlice";
import UiThingsSlice from "./UiThingsSlice/UiThingsSlice";
import rewardSlice from "./RewardSlice/rewardSlice";
import LuckySlice from "./LuckySlice/LuckySlice";
import lotterySlice from "./LotterySlice/lotterySlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    // car: CarSlice,
    // fuel: FuelSlice,
    // drivingWays: DrivingHistorySlice,
    // maintenance: MaintenanceSlice,
    report: ReportSlice,
    // dashboard: DashboardSlice,
    ui: UiThingsSlice,
    reward: rewardSlice,
    lucky: LuckySlice,
    lottery: lotterySlice,
  },
});
