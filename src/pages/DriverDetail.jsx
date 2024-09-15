import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../components/Buttons/CustomButton";
import { TbTool } from "react-icons/tb";
import { FaGasPump, FaRegClock } from "react-icons/fa6";
import { BsPeople } from "react-icons/bs";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getDriverDetails,
  selectDriverDetails,
  selectDriverDetailsStatus,
} from "../app/UserSlice/UserSlice";
import Loader from "../components/Loader/Loader";

const DriverDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log(location.state);
  const { dname, id } = location.state;
  useEffect(() => {
    dispatch(getDriverDetails({ api: `driverDetail?driverId=${id}` }));
    window.scrollTo(0, 0);
  }, []);
  const driverDetails = useSelector(selectDriverDetails);
  // console.log(driverDetails);
  const driverDetailsStatus = useSelector(selectDriverDetailsStatus);
  // console.log(location.pathname.includes("cars"));
  const getActiveClass = (path) => {
    // console.log(location.pathname === path);
    return location.pathname === path ? "active" : "";
  };

  return (
    <Container>
      <div className="w-full px-20 flex justify-end">
        <CustomButton
          text={"Back"}
          click={() => {
            nav(-1);
          }}
          className={"bg-[#3c8dbc] my-8 text-white"}
        />
      </div>
      <h2 className="text-3xl px-4 mb-4">{dname}</h2>
      <div className="w-[95%] px-4 shadow-md h-auto">
        <div className="row flex text-center gap-1">
          <div
            onClick={() => {
              nav("", { state: { ...location.state } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/drivers/${id}`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<BsPeople />}</span>Driver
            Info
          </div>
          <div
            onClick={() => {
              nav("history", { state: { ...location.state } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/drivers/${id}/history`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<FaRegClock />}</span>Driving
            History
          </div>
          <div
            onClick={() => {
              nav("fuel", { state: { ...location.state } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/drivers/${id}/fuel`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<FaGasPump />}</span>Fuel
            Record
          </div>
          <div
            onClick={() => {
              nav("maintenance", { state: { ...location.state } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/drivers/${id}/maintenance`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<TbTool />}</span>Maintenance
            Record
          </div>
        </div>
        <div className="my-4 w-full">{<Outlet />}</div>
      </div>
    </Container>
  );
};

export default DriverDetail;
