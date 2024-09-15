import React from "react";
import Container from "../../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/Buttons/CustomButton";
import { dateFormatChange } from "../../utilities/UtilFunctions";
import ImgBox from "../../components/Boxes/ImgBox";
import PagesTitle from "../../components/PagesTitle";

const MaintenanceDetail = () => {
  const location = useLocation();
  const nav = useNavigate();
  // console.log(location.state);
  const { id, created_at, car_no, reason, amount, photo } = location.state;
  return (
    <Container>
      {/* <PagesTitle title={"Maintenance Details"} /> */}
      <div className="py-2 pl-8 pr-20 flex justify-between items-center flex-wrap">
        <h1 className="text-3xl">Maintenance Details</h1>
        <CustomButton
          text={"Back"}
          className={"text-white bg-[#3c8dbc]"}
          click={() => nav(-1)}
        />
      </div>
      <div className=" mt-20 grid grid-cols-5">
        <div className="col-start-2 flex">
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-xl font-bold">Date</p>
            <p className="text-xl font-bold">Car no.</p>
            <p className="text-xl font-bold">Reason</p>
            <p className="text-xl font-bold">Amount</p>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-xl font-bold">{dateFormatChange(created_at)}</p>
            <p className="text-xl font-bold">{car_no}</p>
            <p className="text-xl font-bold">{reason}</p>
            <p className="text-xl font-bold">{amount}</p>
          </div>
        </div>
        <div className="col-start-4">
          <ImgBox width={100} height={100} img={photo} deleteAble={false} />
        </div>
      </div>
    </Container>
  );
};

export default MaintenanceDetail;
