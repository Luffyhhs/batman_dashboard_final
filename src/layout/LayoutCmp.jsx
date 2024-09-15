import React, { useCallback, useEffect, useState } from "react";
// import SideBar from "../components/Bars/SideBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/Bars/TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownLineUsers,
  getDriverList,
  getOwnUserInfo,
  selectAllDrivers,
  selectAllDriversStatus,
  selectUser,
  setAgentSelectBox,
  setSelectBoxDrivers,
} from "../app/UserSlice/UserSlice";
import {
  getFullCarsList,
  selectCars,
  selectCarsStatus,
  setSelectBoxCars,
} from "../app/CarSlice/CarSlice";
import { Layout, Menu } from "antd";
import { sideBarData } from "../constants/SideBarData.jsx";
import {
  getReward,
  setRewardSelectBoxData,
} from "../app/RewardSlice/rewardSlice.jsx";
import Loader from "../components/Loader/Loader.jsx";

const LayoutCmp = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  // const driversFull = useSelector(selectAllDrivers);
  // const driversFullStatus = useSelector(selectAllDriversStatus);
  // const carsFull = useSelector(selectCars);
  // const carsFullStatus = useSelector(selectCarsStatus);
  // console.log(carsFull, driversFull);
  // const { car_no } = location.state;
  const { Sider, Content } = Layout;

  const getTitle = (path) => {
    if (path.includes("/reward")) return "Rewards";
    if (path.includes("/luckyNumbers")) return "Luckies";
    if (path.includes("/lottery")) return "Lottery";
    if (path.includes("/top-10")) return "Top 10";
    if (path.includes("/agent")) return "Agents";
    if (path.includes("/term")) return "Terms & Policy";
    if (path.includes("/report")) return "Reports";
    return "Dashboard";
  };
  const handleMenuClick = (e) => {
    nav(e.key);
  };
  const currentUser = useSelector(selectUser);
  const reward = useSelector((state) => state.reward.rewardArr);
  const userList = useSelector((state) => state.user.userList);
  useEffect(() => {
    const agentList =
      currentUser.role !== "Admin"
        ? []
        : userList.map((d) => ({ label: d.name, value: d._id }));
    agentList.unshift({ label: "Select Agent...", value: "" });
    currentUser.role === "Admin" && dispatch(setAgentSelectBox(agentList));
  }, [userList]);
  console.log(userList);
  const getUsers = useCallback(() => {
    currentUser.role === "Admin"
      ? dispatch(getDownLineUsers({ api: "user?role=Agent" }))
      : dispatch(getDownLineUsers({ api: "user" }));
  }, [currentUser, dispatch]);
  const getRewards = useCallback(() => {
    currentUser.role === "Admin" && dispatch(getReward({ api: "reward" }));
  }, [currentUser, dispatch]);
  useEffect(() => {
    // dispatch(getOwnUserInfo({ api: `user/${currentUser._id}` }));
    getRewards();
    getUsers();
  }, [getUsers, getRewards]);
  useEffect(() => {
    if (reward.length !== 0) {
      const selectData = reward.map((d) => {
        return { label: d.name, value: `${d._id}` };
      });
      selectData.unshift({ label: "Select Reward", value: "" });
      dispatch(setRewardSelectBoxData(selectData));
    }
  }, [reward]);
  useEffect(() => {
    document.title = getTitle(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser, dispatch]);
  useEffect(() => {
    dispatch(getOwnUserInfo({ api: `user/${currentUser._id}` }));
  }, []);
  // console.log(location.pathname, location.pathname.split("/"));
  return loading ? (
    <Loader spin={true} fullscreen={true} />
  ) : (
    <Layout hasSider>
      <Sider
        style={{
          minHeight: "100vh",
          maxHeight: "auto",
        }}
        className="custom-sider"
        breakpoint="md"
        zeroWidthTriggerStyle={{ top: "10px" }}
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div
          className=" text-white text-center px-5 py-8 cursor-pointer"
          onClick={() => nav("/")}
        >
          Batman VIP Luckies
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={`/${location.pathname.split("/")[1]}`}
          items={sideBarData(currentUser)}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <TopBar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
      {/*<NavBar />*/}
      {/*<h1 className="fixed text-2xl font-bold w-full md:w-[20rem] left-0 py-4 text-center text-blue-700 bg-slate-100 z-10">*/}
      {/*  Linn Car DB*/}
      {/*</h1>*/}
      {/*<SideBar />*/}
    </Layout>
  );
};

export default LayoutCmp;
