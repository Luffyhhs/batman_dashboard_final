import React, { useEffect } from "react";
import Container from "../components/Container";
import CustomForm from "../components/Forms/CustomForm";
import { carNew } from "../constants/FormInputs";
import { useNavigate } from "react-router-dom";
import PagesTitle from "../components/PagesTitle";
import { base64Changer, dateFormatChange } from "../utilities/UtilFunctions";
import Loader from "../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  createCar,
  selectCreateCarError,
  selectCreateCarLoading,
  selectCreateCarMsg,
  selectCreateCarSuccess,
} from "../app/CarSlice/CarSlice";
import { toast } from "react-toastify";
import Notification from "../components/Notification";

const CarCreate = () => {
  const nav = useNavigate();
  // console.log(carNew);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const final = await base64Changer(values, [
      "photo",
      "licence_front",
      "licence_back",
      "owner_book",
    ]);
    final.licenceexpiredate = dateFormatChange(final.licenceexpiredate);
    // console.log(final);
    dispatch(createCar({ api: "cars_create", pData: final }));
  };
  const createCarLoading = useSelector(selectCreateCarLoading);
  const createCarSuccess = useSelector(selectCreateCarSuccess);
  const createCarError = useSelector(selectCreateCarError);
  const createCarMsg = useSelector(selectCreateCarMsg);

  useEffect(() => {
    createCarSuccess &&
      toast.success(createCarMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    createCarError &&
      toast.error(createCarMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });

    if (createCarSuccess === "success") {
      const timer = setTimeout(() => {
        nav(-1);
      }, 2000); // 2000 milliseconds = 2 seconds
      // Cleanup the timer if the component unmounts or drivingCreateStatus changes
      return () => clearTimeout(timer);
    }
    // createCarSuccess && nav(-1);
  }, [createCarSuccess, createCarError]);
  return (
    <Container>
      <Notification />
      <Loader spin={createCarLoading} fullscreen percent={"auto"} />
      <PagesTitle title={"Add New Car"} />
      <div className="p-8">
        <CustomForm data={carNew} onFinish={onFinish} />
      </div>
    </Container>
  );
};

export default CarCreate;
