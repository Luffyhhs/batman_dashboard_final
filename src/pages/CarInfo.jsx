import React, { useEffect, useState } from "react";
import ImgBox from "../components/Boxes/ImgBox";
import { useLocation } from "react-router-dom";
import { PHOTO_BASE_URL } from "../utilities/Api";
import Loader from "../components/Loader/Loader";
import { dateFormatChange } from "../utilities/UtilFunctions";
import { useSelector } from "react-redux";
import {
  // selectCarDetails,
  selectCarDetailsStatus,
} from "../app/CarSlice/CarSlice";

const CarInfo = () => {
  const location = useLocation();
  const [carData, setCarData] = useState(null);
  const {
    car_load,
    weight,
    vehicle_no,
    type,
    branch,
    car_no,
    photo,
    licence_back,
    licence_front,
    owner_book,
    model,
    frame_no,
    color,
    licenceexpiredate,
    remark,
    owner_name,
    vehicle_type,
    gear_type,
    frame_type,
    front_axis,
    middle_axis,
    back_axis,
    vehicle_length,
    vehicle_height,
    vehicle_ground_clearance,
    model_year,
    engine_power,
    fuel_type,
  } = location.state;
  // console.log(location.state);
  useEffect(() => {
    if (location.state) {
      setCarData({ ...location.state });
    }
  }, [location.state]);
  // const carDetails = useSelector(selectCarDetails);
  // console.log(carDetails);
  // const finalCarDetails = photoUrlFix(carDetails, [
  //   { folder: "car/", attributes: ["photo"] },
  //   { folder: "front_licence/", attributes: ["licence_front"] },
  //   { folder: "back_licence/", attributes: ["licence_back"] },
  // ]);
  const carDetailsStatus = useSelector(selectCarDetailsStatus);
  // console.log(location.state.photo, typeof location.state.photo, carData);
  return (
    <>
      <Loader spin={carDetailsStatus === "loading"} />
      <div className="flex w-[95%] mx-auto justify-between">
        <ImgBox
          width={100}
          height={100}
          img={
            photo?.startsWith("https") ? photo : PHOTO_BASE_URL + "car/" + photo
          }
        />
        <ImgBox
          width={100}
          height={100}
          img={
            licence_front?.startsWith("https")
              ? licence_front
              : PHOTO_BASE_URL + "front_licence/" + licence_front
          }
        />
        <ImgBox
          width={100}
          height={100}
          img={
            licence_back?.startsWith("https")
              ? licence_back
              : PHOTO_BASE_URL + "back_licence/" + licence_back
          }
        />
        <ImgBox
          width={100}
          height={100}
          img={
            owner_book?.startsWith("https")
              ? owner_book
              : PHOTO_BASE_URL + "owner_book/" + owner_book
          }
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex w-[95%] mx-auto gap-2 flex-col mt-10 text-xl">
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>Branch(Linn/mm-link)</p>
            </div>
            <div className="flex-1 text-left">
              <p>{branch}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>ယာဉ်အမှတ်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{car_no}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>ယာဉ်အမျိုးအမည်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{type}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>ယာဉ်အမျိုးအစား</p>
            </div>
            <div className="flex-1 text-left">
              <p>{model}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>စက်အမှတ်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{vehicle_no}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>ဘောင်အမှတ်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{frame_no}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>ယာဉ်အလေးချိန်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{weight}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>တင်အား</p>
            </div>
            <div className="flex-1 text-left">
              <p>{car_load}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4 ">
              <p>ဆေးရောင်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{color}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>မှတ်ပုံတင်ထားသူအမည်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{owner_name}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>သက်တမ်းကုန်ဆုံးရက်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{dateFormatChange(licenceexpiredate)}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>မှတ်ချက်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{remark}</p>
            </div>
          </div>
        </div>
        <div className="flex w-[95%] mx-auto gap-2 flex-col mt-10 text-xl">
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>စက်အမျိုးအမည်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{vehicle_type}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>ဂီယာအမျိုးအမည်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{gear_type}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>ဘောင်အမျိုးအမည်</p>
            </div>
            <div className="flex-1 text-left">
              <p>{frame_type}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>ရှေ့ဝင်ရိုး</p>
            </div>
            <div className="flex-1 text-left">
              <p>{front_axis}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>အလယ်ဝင်ရိုး</p>
            </div>
            <div className="flex-1 text-left">
              <p>{middle_axis}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>နောက်ဝင်ရိုး</p>
            </div>
            <div className="flex-1 text-left">
              <p>{back_axis}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>ယာဉ်အလျား(မီလီမီတာ)</p>
            </div>
            <div className="flex-1 text-left">
              <p>{vehicle_length}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>ယာဉ်အနံ(မီလီမီတာ)</p>
            </div>
            <div className="flex-1 text-left">
              <p>{vehicle_height}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>ယာဉ်အမြင့်(မီလီမီတာ)</p>
            </div>
            <div className="flex-1 text-left">
              <p>{vehicle_ground_clearance}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>Model Year</p>
            </div>
            <div className="flex-1 text-left">
              <p>{model_year}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>Engine Power</p>
            </div>
            <div className="flex-1 text-left">
              <p>{engine_power}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2 md:gap-20 items-start sm:items-center">
            <div className="font-semibold flex-1 text-left pr-4">
              <p>Fuel Type</p>
            </div>
            <div className="flex-1 text-left">
              <p>{fuel_type}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarInfo;
