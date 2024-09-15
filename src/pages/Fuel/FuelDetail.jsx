import React from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/Buttons/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormatChange } from "../../utilities/UtilFunctions";
import { Image } from "antd";
import ImgBox from "../../components/Boxes/ImgBox";
import { PHOTO_BASE_URL } from "../../utilities/Api";
import PagesTitle from "../../components/PagesTitle";

const FuelDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  const { id, created_at, car_no, kilo, liters, price, dname, photo } =
    location.state;
  // console.log(location.state);
  return (
    <Container>
      {/* <PagesTitle title={"Fuel Detail"} /> */}
      <div className="py-2 pl-8 pr-20 flex justify-between items-center flex-wrap">
        <h1 className="text-3xl">Fuel Detail</h1>
        <CustomButton
          text={"Back"}
          className={"text-white bg-[#3c8dbc]"}
          click={() => nav(-1)}
        />
      </div>
      <div className="grid grid-cols-5 mt-20">
        <div className="col-start-2 flex ">
          <div className="flex flex-col flex-1 gap-4">
            <p className="text-xl font-bold">Date</p>
            <p className="text-xl font-bold">Car no.</p>
            <p className="text-xl font-bold">Kilo</p>
            <p className="text-xl font-bold">Liters</p>
            <p className="text-xl font-bold">Price</p>
            <p className="text-xl font-bold">Driver Name</p>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="text-xl font-bold">{dateFormatChange(created_at)}</p>
            <p className="text-xl font-bold">{car_no}</p>
            <p className="text-xl font-bold">{kilo}</p>
            <p className="text-xl font-bold">{liters}</p>
            <p className="text-xl font-bold">{price}</p>
            <p className="text-xl font-bold">{dname}</p>
          </div>
        </div>
        <div className="col-start-4 flex gap-8">
          <p className="text-xl font-bold">Photo</p>
          <ImgBox
            width={200}
            height={200}
            img={
              photo?.startsWith("https")
                ? photo
                : PHOTO_BASE_URL + "fuel/" + photo
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default FuelDetail;
