import React from "react";
import { useLocation } from "react-router-dom";
import { dateFormatChange } from "../../utilities/UtilFunctions";
import ImgBox from "../../components/Boxes/ImgBox";

const DriverInfo = () => {
  const location = useLocation();
  const {
    dname,
    phone,
    nrc,
    dob,
    licenceNo,
    licenceexpiredate,
    address,
    dphoto,
  } = location.state;
  // console.log(location.state);
  return (
    <>
      <div className="grid grid-cols-3 py-12">
        <div className="col-span-1 flex px-4">
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <div className="text-lg font-bold">Driver Name</div>
            <div className="text-lg font-bold">Phone</div>
            <div className="text-lg font-bold">Nrc</div>
            <div className="text-lg font-bold">Date Of Birth</div>
            <div className="text-lg font-bold">License No</div>
            <div className="text-lg font-bold">License Expire Date</div>
            <div className="text-lg font-bold">Address</div>
          </div>
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <div className="text-lg font-bold">{dname}</div>
            <div className="text-lg font-bold">{phone}</div>
            <div className="text-lg font-bold">{nrc}</div>
            <div className="text-lg font-bold">{dateFormatChange(dob)}</div>
            <div className="text-lg font-bold">{licenceNo}</div>
            <div className="text-lg font-bold">{licenceexpiredate}</div>
            <div className="text-lg font-bold">{address}</div>
          </div>
        </div>
        <div className="col-start-3 flex gap-8">
          <p>Photo</p>
          <ImgBox width={150} height={200} img={dphoto} />
        </div>
      </div>
    </>
  );
};

export default DriverInfo;
