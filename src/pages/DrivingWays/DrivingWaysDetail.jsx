import React from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/Buttons/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { dateFormatChange } from "../../utilities/UtilFunctions";
import ImgBox from "../../components/Boxes/ImgBox";
import PagesTitle from "../../components/PagesTitle";

const DrivingWaysDetail = () => {
  const nav = useNavigate();
  const location = useLocation();
  const {
    id,
    dname,
    car_no,
    usageName,
    start_place,
    reason,
    end_place,
    start_kilo,
    startKilo_photo,
    endKilo_photo,
    end_kilo,
    start_time,
    end_time,
    route,
    created_at,
  } = location.state;
  // console.log(location.state);
  return (
    <Container>
      {/* <PagesTitle title={"Driving Way Details"} /> */}
      <div className="py-2 pl-8 pr-20 flex justify-between items-center flex-wrap">
        <h1 className="text-3xl">Driving Way Details</h1>
        <CustomButton
          text={"Back"}
          className={"text-white bg-[#3c8dbc]"}
          click={() => nav(-1)}
        />
      </div>
      <div className="grid grid-cols-3 pt-4">
        <div className="justify-self-start flex-1 flex gap-4 flex-col justify-center">
          <div className="text-lg font-bold">Driver</div>
          <div className="text-lg font-bold">Car No.</div>
          <div className="text-lg font-bold">Instructor</div>
          <div className="text-lg font-bold">Start Place</div>
          <div className="text-lg font-bold">Reason</div>
          <div className="text-lg font-bold">End Place</div>
          <div className="text-lg font-bold">Start Kilo</div>
          <div className="text-lg font-bold">End Kilo</div>
          <div className="text-lg font-bold">Driving Kilo</div>
          <div className="text-lg font-bold">Start Time</div>
          <div className="text-lg font-bold">End Time</div>
          <div className="text-lg font-bold">Route</div>
          <div className="text-lg font-bold">Date</div>
        </div>
        <div className="justify-self-start flex-1 flex gap-4 flex-col justify-center">
          <div className="text-lg font-bold">{dname}</div>
          <div className="text-lg font-bold">{car_no}</div>
          <div className="text-lg font-bold">{usageName}</div>
          <div className="text-lg font-bold">
            {start_place ? start_place : "-"}
          </div>
          <div className="text-lg font-bold">{reason}</div>
          <div className="text-lg font-bold">{end_place ? end_place : "-"}</div>
          <div className="text-lg font-bold">{start_kilo}</div>
          <div className="text-lg font-bold">
            {end_kilo ? end_kilo : "Way in process."}
          </div>
          <div className="text-lg font-bold">
            {end_kilo == null
              ? "Way in process."
              : Math.floor(end_kilo - start_kilo)}
          </div>
          <div className="text-lg font-bold">{start_time}</div>
          <div className="text-lg font-bold">
            {end_time == null ? "Way in process." : end_time}
          </div>
          <div className="text-lg font-bold">{route ? route : "-"}</div>
          <div className="text-lg font-bold">
            {dateFormatChange(created_at)}
          </div>
        </div>
        <div className="col-start-3">
          <div className="flex gap-8 flex-col justify-center">
            <div className="flex-1 flex gap-4 items-center">
              <div className="text-lg font-bold">Start Kilo Photo</div>
              <ImgBox width={200} height={200} img={startKilo_photo} />
            </div>
            <div className="flex-1 flex gap-4 items-center">
              <div className="text-lg font-bold">End Kilo Photo</div>
              <ImgBox width={200} height={200} img={endKilo_photo} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DrivingWaysDetail;
