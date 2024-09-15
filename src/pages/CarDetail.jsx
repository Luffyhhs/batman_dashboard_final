import React, { useEffect } from "react";
import Container from "../components/Container";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../components/Buttons/CustomButton";
import { FaCar, FaRegClock, FaGasPump } from "react-icons/fa";
import { TbTool } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarDetails,
  selectCarDetails,
  selectCarDetailsStatus,
} from "../app/CarSlice/CarSlice";
import { photoUrlFix } from "../utilities/UtilFunctions";

const CarDetail = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location.state);
  const { car_no, id } = location.state;
  useEffect(() => {
    dispatch(getCarDetails({ api: `cardetail?carId=${id}` }));
    window.scrollTo(0, 0);
  }, []);
  const carDetails = useSelector(selectCarDetails);
  const carDetailsStatus = useSelector(selectCarDetailsStatus);
  // console.log(carDetailsStatus);
  // console.log(location.pathname.includes("cars"));
  // console.log(carDetails);
  const finalCarDetails = photoUrlFix(carDetails, [
    { folder: "car/", attributes: ["photo"] },
    { folder: "front_licence/", attributes: ["licence_front"] },
    { folder: "back_licence/", attributes: ["licence_back"] },
    { folder: "owner_book/", attributes: ["owner_book"] },
  ]);
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
      <h2 className="text-3xl px-4 mb-4">{car_no}</h2>
      <div className="w-[95%] px-4 shadow-md h-auto">
        <div className="row flex text-center gap-1">
          <div
            onClick={() => {
              nav("", { state: { ...finalCarDetails } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/cars/${id}`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<FaCar />}</span>Car Info
          </div>
          <div
            onClick={() => {
              nav("history", { state: { ...finalCarDetails } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/cars/${id}/history`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<FaRegClock />}</span>Driving
            History
          </div>
          <div
            onClick={() => {
              nav("fuel", { state: { ...finalCarDetails } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/cars/${id}/fuel`
            )}`}
          >
            <span className={"inline-block mr-2"}>{<FaGasPump />}</span>Fuel
            Record
          </div>
          <div
            onClick={() => {
              nav("maintenance", { state: { ...finalCarDetails } });
            }}
            className={`cursor-pointer col-12 col-md-6 p-4 w-full text-white bg-slate-500 hover:text-slate-500 hover:bg-white hover:border-b-2 hover:border-slate-500 ${getActiveClass(
              `/cars/${id}/maintenance`
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

export default CarDetail;
