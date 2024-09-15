// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import LayoutCmp from "../layout/LayoutCmp.jsx";
import Dashboard from "../pages/Dashboard";

import NotFoundPage from "../pages/NotFoundPage";

import PrivateRoute from "./PrivateRoute";

import Test from "../Test.jsx";
import Reward from "../pages/Rewards/Reward.jsx";

import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader.jsx";
const LuckyNumbers = lazy(() => import("../pages/LuckyNumbers.jsx"));
const Terms = lazy(() => import("../pages/Terms/Terms.jsx"));
const UpdateLuckyNumber = lazy(() =>
  import("../pages/Drivers/UpdateLuckyNumber.jsx")
);
const Lottery = lazy(() => import("../pages/Lottery/Lottery.jsx"));
const Top10 = lazy(() => import("../pages/Top10/Top10.jsx"));
const Agent = lazy(() => import("../pages/Agent/Agent.jsx"));
const UpdateReward = lazy(() => import("../pages/Rewards/UpdateReward.jsx"));
const Reports = lazy(() => import("../pages/Reports/Reports.jsx"));
const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader spin={true} />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<LayoutCmp />}>
              <Route index element={<Dashboard />} />
              <Route path="reward" element={<Reward />} />
              <Route path="reward/:id" element={<UpdateReward />} />
              <Route path="lottery" element={<Lottery />} />
              <Route path="top-10" element={<Top10 />} />
              <Route path="agent" element={<Agent />} />
              <Route path="term" element={<Terms />} />
              <Route path="report" element={<Reports />} />
              {/* <Route path="cars/create" element={<CarCreate />} />
              <Route path="cars/:id" element={<CarDetail />}>
                <Route index element={<CarInfo />} />
                <Route path="history" element={<CarHistory />} />
                <Route path="fuel" element={<CarFuel />} />
                <Route path="maintenance" element={<CarMaintenance />} />
              </Route> */}
              {/* <Route path="cars/:id/edit" element={<CarUpdate />} /> */}
              <Route path="luckyNumbers" element={<LuckyNumbers />} />
              <Route path="luckyNumbers/:id" element={<UpdateLuckyNumber />} />
              {/* <Route path="drivers/create" element={<DriverCreate />} /> */}
              {/* <Route path="drivers/:id" element={<DriverDetail />}> */}
              {/* <Route index element={<DriverInfo />} /> */}
              {/* <Route path="history" element={<DriverHistory />} /> */}
              {/* <Route path="fuel" element={<DriverFuel />} />
                <Route path="maintenance" element={<DriverMaintenance />} />
              </Route>
              <Route path="drivers/:id/edit" element={<DriverUpdate />} />
              <Route path="driving-history" element={<DrivingHistory />} />
              <Route
                path="driving-history/create"
                element={<DrivingWayCreate />}
              />
              <Route
                path="driving-history/:id"
                element={<DrivingWaysDetail />}
              />
              <Route
                path="driving-history/:id/edit"
                element={<DrivingWaysEdit />}
              />
              <Route path="reports" element={<Report />} />
              <Route path="fuel" element={<Fuel />} />
              <Route path="fuel-report" element={<FuelReport />} />
              <Route path="fuel-report-daily" element={<FuelReportDaily />} />
              <Route path="fuel/create" element={<FuelCreate />} />
              <Route path="fuel/:id" element={<FuelDetail />} />
              <Route path="fuel/:id/edit" element={<FuelDetailEdit />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route
                path="maintenance/create"
                element={<MaintenanceCreate />}
              />
              <Route path="maintenance/:id" element={<MaintenanceDetail />} />
              <Route
                path="maintenance/:id/edit"
                element={<MaintenanceEdit />}
              />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="user-management/create" element={<UserCreate />} />
              <Route path="user-management/:id/edit" element={<UserEdit />} /> */}
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
