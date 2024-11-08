// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import LayoutCmp from "../layout/LayoutCmp.jsx";
import Dashboard from "../pages/Dashboard";

import NotFoundPage from "../pages/NotFoundPage";

import PrivateRoute from "./PrivateRoute";

// import Test from "../Test.jsx";
import Reward from "../pages/Rewards/Reward.jsx";

import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../app/UserSlice/UserSlice.jsx";
// const Users = lazy(() => import("../pages/AgentPages/Users.jsx"));
import Users from "../pages/AgentPages/Users.jsx";
// const AgentReports = lazy(() => import("../pages/AgentPages/AgentReports.jsx"));
import AgentReports from "../pages/AgentPages/AgentReports.jsx";
// const LuckyNumbers = lazy(() => import("../pages/LuckyNumbers.jsx"));
import LuckyNumbers from "../pages/LuckyNumbers.jsx";
// const Terms = lazy(() => import("../pages/Terms/Terms.jsx"));
import Terms from "../pages/Terms/Terms.jsx";
// const UpdateLuckyNumber = lazy(() =>
//   import("../pages/Drivers/UpdateLuckyNumber.jsx")
// );
import UpdateLuckyNumber from "../pages/Drivers/UpdateLuckyNumber.jsx";
// const Lottery = lazy(() => import("../pages/Lottery/Lottery.jsx"));
import Lottery from "../pages/Lottery/Lottery.jsx";
// const Top10 = lazy(() => import("../pages/Top10/Top10.jsx"));
import Top10 from "../pages/Top10/Top10.jsx";
// const Agent = lazy(() => import("../pages/Agent/Agent.jsx"));
import Agent from "../pages/Agent/Agent.jsx";
// const UpdateReward = lazy(() => import("../pages/Rewards/UpdateReward.jsx"));
import UpdateReward from "../pages/Rewards/UpdateReward.jsx";
// const Reports = lazy(() => import("../pages/Reports/Reports.jsx"));
import Reports from "../pages/Reports/Reports.jsx";
const Router = () => {
  const currentUser = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<LayoutCmp />}>
            {currentUser?.role === "Admin" ? (
              <>
                <Route index element={<Dashboard />} />
                <Route path="reward" element={<Reward />} />
                <Route path="reward/:id" element={<UpdateReward />} />
                <Route path="lottery" element={<Lottery />} />
                <Route path="top-10" element={<Top10 />} />
                <Route path="agent" element={<Agent />} />
                <Route path="term" element={<Terms />} />
                <Route path="report" element={<Reports />} />
                <Route path="luckyNumbers" element={<LuckyNumbers />} />
                <Route
                  path="luckyNumbers/:id"
                  element={<UpdateLuckyNumber />}
                />
              </>
            ) : (
              <>
                <Route index element={<Users />} />
                <Route path="report" element={<AgentReports />} />
              </>
            )}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
